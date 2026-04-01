"""
同步飞书"商品信息"表 → public/data/products.json
"""

import feishu_common as fc


def transform_products(records: list, token: str) -> list:
    data = []
    for index, r in enumerate(records):
        f = r["fields"]

        # 图片：优先上传的附件，其次图片网址字段
        images = []
        if f.get("商品图片"):
            for img in reversed(f.get("商品图片", [])):
                if img.get("url"):
                    path = fc.download_feishu_file(img["url"], token, "product")
                    if path:
                        images.append(path)
        elif f.get("商品图片网址"):
            for url in f.get("商品图片网址", "").split(","):
                url = url.strip()
                if url:
                    images.append(url)

        # 分类
        category_name = f.get("商品分类", [{}])[0].get("text", "") if isinstance(f.get("商品分类"), list) else f.get("商品分类", "")
        category_slug = (
            category_name.lower()
            .replace(" ", "-")
            .replace("&", "")
            .replace(",", "")
            .strip()
        )

        data.append({
            "title":        f.get("商品标题"),
            "slug":         f.get("商品slug"),
            "sku":          f.get("货号"),
            "price":        f.get("商品价格"),
            "categorySlug": category_slug,
            "categoryName": category_name,
            "tags":         f.get("打标", []),
            "images":       images,
            "details":      f.get("商品详情"),
            "amazonLink":   f.get("购买链接"),
            "seo": {
                "title":       f.get("商品标题title"),
                "keywords":    ", ".join(f.get("商品keywords", [])) if isinstance(f.get("商品keywords"), list) else f.get("商品keywords", ""),
                "description": f.get("商品详情"),
            },
            "createdAt": index,
        })

    # 最新商品排前面（表格末尾 = 最新）
    data.sort(key=lambda x: x.get("createdAt", 0), reverse=True)
    return data


def main():
    token = fc.get_tenant_token()
    records = fc.fetch_records("product", token)
    products = transform_products(records, token)
    fc.write_json_file(products, "products.json")


if __name__ == "__main__":
    main()
