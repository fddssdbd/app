import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, Package } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useProducts } from '@/hooks/useProducts';
import type { Product } from '@/types/product';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Products() {
  const { t } = useTranslation();
  const { products, isLoaded } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const categories = [
    { slug: 'all', name: t('products.allCategories') },
    ...Array.from(
      new Map(
        products
          .filter((p) => p.categorySlug && p.categoryName)
          .map((p) => [p.categorySlug, { slug: p.categorySlug, name: p.categoryName }])
      ).values()
    ),
  ];

  useEffect(() => {
    if (!isLoaded) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [isLoaded, products]);

  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (p.title ?? '').toLowerCase().includes(q) ||
      (p.details ?? '').toLowerCase().includes(q) ||
      (p.categoryName ?? '').toLowerCase().includes(q);
    const matchesCategory =
      selectedCategory === 'all' || p.categorySlug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const mainImage = (p: Product) =>
    p.images?.[0] ?? 'https://placehold.co/800x600?text=No+Image';

  if (!isLoaded) {
    return (
      <section id="products" className="py-20 bg-[#f7f7f7]">
        <div className="w-full section-padding flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f2fe6f]" />
        </div>
      </section>
    );
  }

  return (
    <section id="products" ref={sectionRef} className="py-20 lg:py-32 bg-[#f7f7f7] relative">
      <div className="w-full section-padding">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f2fe6f]/20 rounded-full mb-6">
              <Package className="w-4 h-4 text-[#1a1a1a]" />
              <span className="text-sm font-medium text-[#1a1a1a]">{t('products.title')}</span>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1a1a1a] mb-4">
              {t('products.title')}
            </h2>
            <p className="text-lg text-[#333333] max-w-2xl mx-auto">
              {t('products.subtitle')}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder={t('products.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-white border-0 shadow-sm"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-56 h-12 bg-white border-0 shadow-sm">
                <Filter className="w-4 h-4 mr-2 text-gray-400" />
                <SelectValue placeholder={t('products.filter')} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link
                  key={product.slug ?? product.title}
                  to={`/products/${product.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-56 overflow-hidden bg-gray-50">
                    <img
                      src={mainImage(product)}
                      alt={product.title}
                      className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.tags?.length > 0 && (
                      <div className="absolute top-4 left-4 flex flex-wrap gap-1">
                        {product.tags.slice(0, 2).map((tag, i) => (
                          <Badge key={i} className="bg-[#f2fe6f] text-[#1a1a1a] font-semibold text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">{product.categoryName}</div>
                    <h3 className="text-base font-bold text-[#1a1a1a] mb-2 line-clamp-2 leading-snug">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between mt-4">
                      {product.price != null && (
                        <div className="text-xl font-bold text-[#1a1a1a]">
                          ${product.price.toLocaleString()}
                        </div>
                      )}
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-[#1a1a1a] group-hover:gap-2 transition-all">
                        {t('products.viewDetails')}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">{t('products.noProducts')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
