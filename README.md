# GlobalTrade Pro — 飞书驱动的国际商品展示站

基于 **React + Vite + TypeScript** 构建的静态商品展示站，以**飞书多维表格**作为内容管理后台，通过 **GitHub Actions** 定期同步数据，部署到 **Vercel**。

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | React 19 + TypeScript + Vite |
| 样式 | Tailwind CSS + shadcn/ui |
| 动画 | GSAP + ScrollTrigger |
| 国际化 | i18next（EN / ZH / ES / AR，支持 RTL） |
| 数据源 | 飞书多维表格（云盘创建） |
| 同步脚本 | Python 3.11 |
| CI/CD | GitHub Actions |
| 托管 | Vercel |

---

## 项目结构

```
├── .github/
│   └── workflows/
│       └── sync-feishu.yml       # 定时同步 + 手动触发
├── public/
│   ├── data/
│   │   └── products.json         # 同步脚本生成，前端直接读取
│   └── images/
│       └── feishu/
│           └── product/          # 从飞书下载的商品图片
├── scripts/
│   ├── feishu_common.py          # 共享模块：认证、分页、图片下载
│   ├── sync_products.py          # 商品数据同步脚本
│   └── sync_all.sh               # 统一入口脚本
└── src/
    ├── hooks/useProducts.ts      # 运行时读取 /data/products.json
    ├── sections/Products.tsx     # 商品展示组件
    └── types/product.ts          # Product 类型定义
```

---

## 快速开始

### 1. 克隆并安装依赖

```bash
git clone <your-repo-url>
cd <project>
npm install
```

### 2. 本地开发

```bash
npm run dev
```

前端会读取 `public/data/products.json`。项目已内置一条占位数据，可直接预览页面效果。

### 3. 本地手动同步飞书数据（可选）

```bash
# 安装 Python 依赖
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install requests

# 配置环境变量（见下方说明）
export FEISHU_APP_ID=xxx
export FEISHU_APP_SECRET=xxx
export FEISHU_APP_TOKEN=xxx
export FEISHU_TABLE_PRODUCT=xxx

# 执行同步
bash scripts/sync_all.sh
```

---

## 飞书配置

### 飞书表格字段说明

在**飞书云盘**（非知识库）中创建多维表格，商品表需包含以下字段：

| 字段名 | 类型 | 说明 |
|--------|------|------|
| 商品标题 | 文本 | 商品名称（必填） |
| 商品slug | 文本 | URL 标识符，如 `my-product` |
| 货号 | 文本 | SKU 编号 |
| 商品价格 | 数字 | 单位：USD |
| 商品分类 | 关联/文本 | 分类名称 |
| 打标 | 多选 | 标签，如"Featured"、"New" |
| 商品图片 | 附件 | 直接上传图片（优先使用） |
| 商品图片网址 | 文本 | 图片外链，多个用英文逗号分隔 |
| 商品详情 | 文本 | 商品描述 |
| 亚马逊购买链接 | 文本 | Amazon 商品链接（可选） |
| 商品标题title | 文本 | SEO 标题 |
| 商品keywords | 多选 | SEO 关键词 |

### 获取飞书 Token 和 ID

1. 前往 [飞书开放平台](https://open.feishu.cn/) 创建企业自建应用
2. 在「权限管理」中开启：
   - `bitable:app:readonly` — 读取多维表格
   - `drive:file:readonly` — 下载附件图片
3. 将应用添加到多维表格所在的云盘文件夹
4. 获取以下信息：
   - **APP_ID** / **APP_SECRET**：应用凭证页面
   - **APP_TOKEN**：多维表格 URL 中 `/base/` 后的字符串
   - **TABLE_ID**：进入表格后 URL 中 `?table=` 后的字符串

---

## GitHub Actions 自动同步

### 配置 Secrets

在 GitHub 仓库 → Settings → Secrets and variables → Actions 中添加：

| Secret 名称 | 说明 |
|-------------|------|
| `FEISHU_APP_ID` | 飞书应用 App ID |
| `FEISHU_APP_SECRET` | 飞书应用 App Secret |
| `FEISHU_APP_TOKEN` | 多维表格 App Token |
| `FEISHU_TABLE_PRODUCT` | 商品信息表 Table ID |
| `FEISHU_TABLE_CATEGORY` | 商品分类表 Table ID（可选） |

### 触发方式

- **定时**：每天 UTC 00:00 自动运行（北京时间 08:00）
- **手动**：GitHub → Actions → `Sync Data from Feishu` → Run workflow

同步完成后，Actions 会自动将更新的 `products.json` 和图片 commit 回仓库，Vercel 检测到 push 后自动重新部署。

---

## Vercel 部署

### 首次部署

1. 将项目 push 到 GitHub
2. 登录 [Vercel](https://vercel.com)，点击 **Add New Project**，导入该仓库
3. 框架预设选 **Vite**，构建命令保持默认：

```
Build Command:  npm run build
Output Dir:     dist
```

4. 点击 **Deploy**

### 后续更新

每次 GitHub Actions 同步数据并 push 后，Vercel 会自动触发重新部署，无需手动操作。

---

## 数据流示意

```
飞书多维表格（客户编辑内容）
        ↓
  GitHub Actions（每日 UTC 00:00）
        ↓
  scripts/sync_products.py
        ↓
  public/data/products.json
  public/images/feishu/product/*.jpg
        ↓
  git commit & push → Vercel 自动部署
        ↓
  前端 fetch('/data/products.json') 渲染页面
```

---

## 本地构建

```bash
npm run build    # 输出到 dist/
npm run preview  # 本地预览构建产物
```

---

## 扩展同步更多表格

在 `scripts/feishu_common.py` 的 `TABLES` 字典中添加新表配置，然后参照 `sync_products.py` 新建对应的同步脚本，最后在 `sync_all.sh` 中追加调用即可。
