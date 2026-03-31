import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ExternalLink, Tag, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';
import type { Product } from '@/types/product';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { products, isLoaded } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!isLoaded) return;
    const found = products.find((p) => p.slug === slug);
    if (found) {
      setProduct(found);
      setActiveImage(0);
      // SEO
      if (found.seo?.title) document.title = found.seo.title;
    }
  }, [isLoaded, products, slug]);

  // Related products: same category first, fill up with others if needed
  const sameCategory = products.filter(
    (p) => p.categorySlug === product?.categorySlug && p.slug !== slug
  );
  const others = products.filter(
    (p) => p.categorySlug !== product?.categorySlug && p.slug !== slug
  );
  const related = [...sameCategory, ...others].slice(0, 8);

  const mainImage = (p: Product) =>
    p.images?.[0] ?? 'https://placehold.co/800x600?text=No+Image';

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f2fe6f]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] flex flex-col items-center justify-center gap-4">
        <Package className="w-16 h-16 text-gray-300" />
        <p className="text-gray-500 text-lg">Product not found</p>
        <Button onClick={() => navigate('/')} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-[#1a1a1a] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/#products" className="hover:text-[#1a1a1a] transition-colors">
              {t('products.title')}
            </Link>
            <span>/</span>
            <span className="text-[#1a1a1a] font-medium line-clamp-1">{product.title}</span>
          </nav>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">

            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden bg-white shadow-sm aspect-square">
                <img
                  src={product.images?.[activeImage] ?? mainImage(product)}
                  alt={product.title}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              {/* 缩略图：有图片就显示 */}
              {product.images && product.images.length > 0 && (
                <div className="flex gap-3 flex-wrap">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all bg-white flex-shrink-0 ${
                        activeImage === idx
                          ? 'border-[#f2fe6f] shadow-md ring-2 ring-[#f2fe6f]/50'
                          : 'border-gray-100 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt={`${product.title} ${idx + 1}`} className="w-full h-full object-contain p-1" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category + Tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
                  {product.categoryName}
                </span>
                {product.tags?.map((tag, i) => (
                  <Badge key={i} className="bg-[#f2fe6f] text-[#1a1a1a] font-medium">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] leading-tight">
                {product.title}
              </h1>

              {/* Price */}
              {product.price != null && (
                <div className="text-4xl font-bold text-[#1a1a1a]">
                  ${product.price.toLocaleString()}
                </div>
              )}

              {/* Description */}
              {product.details && (
                <p className="text-[#333333] leading-relaxed text-base">
                  {product.details}
                </p>
              )}

              {/* SKU */}
              {product.sku && (
                <div className="text-sm text-gray-500">
                  SKU: <span className="font-medium text-[#1a1a1a]">{product.sku}</span>
                </div>
              )}

              {/* CTA */}
              <div className="flex flex-col gap-3 pt-2">
                {product.amazonLink ? (
                  <a
                    href={product.amazonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#f2fe6f] hover:bg-[#e8f500] text-[#1a1a1a] font-semibold py-4 px-6 rounded-xl transition-colors text-base"
                  >
                    <ExternalLink className="w-5 h-5" />
                    {t('products.buyOnAmazon')}
                  </a>
                ) : (
                  <a
                    href="/#contact"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#f2fe6f] hover:bg-[#e8f500] text-[#1a1a1a] font-semibold py-4 px-6 rounded-xl transition-colors text-base"
                  >
                    {t('products.inquiry')}
                  </a>
                )}
                <Button
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="w-full py-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Related Products</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/products/${p.slug}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-square overflow-hidden bg-gray-50">
                      <img
                        src={mainImage(p)}
                        alt={p.title}
                        className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-400 mb-1">{p.categoryName}</p>
                      <p className="font-semibold text-[#1a1a1a] line-clamp-2 text-sm mb-3 leading-snug">
                        {p.title}
                      </p>
                      <div className="flex items-center justify-between">
                        {p.price != null ? (
                          <span className="font-bold text-[#1a1a1a]">${p.price.toLocaleString()}</span>
                        ) : <span />}
                        <span className="text-xs text-gray-400 group-hover:text-[#1a1a1a] transition-colors">
                          View →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
