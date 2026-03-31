"""
飞书数据同步共享模块
通用逻辑：认证、分页拉取、图片下载、JSON 写入
"""

import os, json, pathlib, requests, time, re
from urllib.parse import urlparse

APP_ID     = os.getenv("FEISHU_APP_ID", "")
APP_SECRET = os.getenv("FEISHU_APP_SECRET", "")
BASE_URL   = "https://open.feishu.cn"

# 输出目录（相对于项目根目录）
DATA_DIR        = pathlib.Path(__file__).parent.parent / "public" / "data"
FEISHU_IMG_DIR  = pathlib.Path(__file__).parent.parent / "public" / "images" / "feishu"

TABLES = {
    "product": dict(
        cn_name="商品信息",
        app=os.getenv("FEISHU_APP_TOKEN", ""),
        tbl=os.getenv("FEISHU_TABLE_PRODUCT", ""),
    ),
    "category": dict(
        cn_name="商品分类",
        app=os.getenv("FEISHU_APP_TOKEN", ""),
        tbl=os.getenv("FEISHU_TABLE_CATEGORY", ""),
    ),
}


# ── 1. 飞书 API ──────────────────────────────────────────────────────────────

def get_tenant_token() -> str:
    url  = f"{BASE_URL}/open-apis/auth/v3/tenant_access_token/internal"
    r = requests.post(url, json={"app_id": APP_ID, "app_secret": APP_SECRET}, timeout=10)
    r.raise_for_status()
    data = r.json()
    if "tenant_access_token" not in data:
        raise RuntimeError(
            f"获取 tenant_access_token 失败，飞书返回：{data}\n"
            f"请检查 FEISHU_APP_ID={APP_ID!r} 和 FEISHU_APP_SECRET 是否正确配置。"
        )
    return data["tenant_access_token"]


def list_records(app_token: str, table_id: str, token: str, sort_field: str = None) -> list:
    """获取表格全部记录，自动处理分页"""
    all_records, page_token = [], ""
    while True:
        params = {"page_size": 500}
        if page_token:
            params["page_token"] = page_token
        if sort_field:
            params["sort"] = f'[{{"field_name":"{sort_field}","desc":false}}]'

        url = f"{BASE_URL}/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/records"
        r = requests.get(url, headers={"Authorization": f"Bearer {token}"}, params=params, timeout=30)
        r.raise_for_status()
        resp = r.json()

        if resp.get("code", 0) != 0:
            print(f"  ✗ Feishu API error: {resp.get('msg')} (code {resp.get('code')})")
            break

        data = resp.get("data", {})
        all_records.extend(data.get("items", []))

        if data.get("has_more"):
            page_token = data.get("page_token")
        else:
            break
        time.sleep(0.2)
    return all_records


def fetch_records(table_key: str, token: str, sort_field: str = None) -> list:
    info = TABLES[table_key]
    print(f"Fetching {info['cn_name']}...")
    records = list_records(info["app"], info["tbl"], token, sort_field)
    print(f"  → {len(records)} records")
    return records


# ── 2. 图片下载 ───────────────────────────────────────────────────────────────

def download_feishu_file(url: str, token: str, table_name: str) -> str | None:
    """下载飞书图片到本地，返回可公开访问的相对路径"""
    if not url:
        return None

    try:
        with requests.get(url, headers={"Authorization": f"Bearer {token}"},
                          stream=True, timeout=30) as r:
            r.raise_for_status()

            parsed = urlparse(url)
            file_token = parsed.path.split("/")[-2]

            cd = r.headers.get("Content-Disposition", "")
            m = re.search(r'filename="(.+)"', cd)
            if m:
                original = m.group(1)
                if not pathlib.Path(original).suffix:
                    ext = r.headers.get("Content-Type", "image/png").split("/")[-1]
                    original += f".{ext}"
            else:
                ext = r.headers.get("Content-Type", "image/png").split("/")[-1]
                original = f"download.{ext}"

            safe = re.sub(r'[\\/*?:"<>|]', "", original)
            filename = f"{file_token}-{safe}"

            save_dir = FEISHU_IMG_DIR / table_name
            save_dir.mkdir(parents=True, exist_ok=True)
            save_path = save_dir / filename

            # 已存在则跳过（增量优化）
            if save_path.exists():
                return f"/images/feishu/{table_name}/{filename}"

            with open(save_path, "wb") as f:
                for chunk in r.iter_content(8192):
                    f.write(chunk)

            print(f"  → Downloaded → {save_path}")
            return f"/images/feishu/{table_name}/{filename}"

    except requests.exceptions.HTTPError as e:
        print(f"  ✗ HTTP {e.response.status_code} downloading {url}")
        return None


# ── 3. 写入 JSON ──────────────────────────────────────────────────────────────

def write_json_file(data, filename: str):
    out = DATA_DIR / filename
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    count = f" ({len(data)} items)" if isinstance(data, list) else ""
    print(f"✔ Written → {out}{count}")
