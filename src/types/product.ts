// Product type aligned with Feishu sync script output
export interface Product {
  title: string;
  slug: string;
  sku?: string;
  price?: number;
  categorySlug: string;
  categoryName: string;
  tags: string[];
  images: string[];
  details?: string;
  amazonLink?: string;
  seo: {
    title?: string;
    keywords?: string;
    description?: string;
  };
  createdAt: number; // index-based sort key from sync script
}

export interface Category {
  id: string;
  name: string;
  nameZh?: string;
  nameEs?: string;
  nameAr?: string;
}

export type Language = 'en' | 'zh' | 'es' | 'ar';
