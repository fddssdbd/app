import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: '1',
    name: 'Michael Chen',
    nameZh: '陈明',
    position: 'Procurement Director',
    positionZh: '采购总监',
    company: 'GlobalTech Industries',
    content: 'Working with GlobalTrade Pro has been an exceptional experience. Their product quality consistently exceeds our expectations, and their attention to international standards gives us complete confidence in every shipment.',
    contentZh: '与GlobalTrade Pro合作是一次非凡的体验。他们的产品质量始终超出我们的期望，对国际标准的关注让我们对每一次发货都充满信心。',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    rating: 5,
  },
  {
    id: '2',
    name: 'Sarah Martinez',
    nameZh: '莎拉·马丁内斯',
    position: 'CEO',
    positionZh: '首席执行官',
    company: 'EuroImport SA',
    content: 'The level of professionalism and customer service is unmatched. They understand the complexities of international trade and make the entire process seamless. Highly recommended!',
    contentZh: '专业水平和客户服务是无与伦比的。他们了解国际贸易的复杂性，使整个流程无缝衔接。强烈推荐！',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    rating: 5,
  },
  {
    id: '3',
    name: 'Ahmed Al-Rashid',
    nameZh: '艾哈迈德·拉希德',
    position: 'Supply Chain Manager',
    positionZh: '供应链经理',
    company: 'Middle East Trading Co.',
    content: 'We have been sourcing products from GlobalTrade Pro for over 5 years. Their commitment to quality, on-time delivery, and competitive pricing makes them our preferred supplier.',
    contentZh: '我们从GlobalTrade Pro采购产品已有5年多。他们对质量、准时交货和有竞争力的价格的承诺使他们成为我们的首选供应商。',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    rating: 5,
  },
  {
    id: '4',
    name: 'Emma Thompson',
    nameZh: '艾玛·汤普森',
    position: 'Operations Director',
    positionZh: '运营总监',
    company: 'UK Manufacturing Ltd',
    content: 'Their OEM services are outstanding. They worked closely with our team to develop custom products that perfectly match our specifications. The quality control processes are rigorous and reliable.',
    contentZh: '他们的OEM服务非常出色。他们与我们的团队紧密合作，开发出完全符合我们规格的定制产品。质量控制流程严格可靠。',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    rating: 5,
  },
];

export default function Testimonials() {
  const { t, i18n } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentLang = i18n.language;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getContent = (testimonial: typeof testimonials[0]) => {
    switch (currentLang) {
      case 'zh': return testimonial.contentZh || testimonial.content;
      default: return testimonial.content;
    }
  };

  const getName = (testimonial: typeof testimonials[0]) => {
    switch (currentLang) {
      case 'zh': return testimonial.nameZh || testimonial.name;
      default: return testimonial.name;
    }
  };

  const getPosition = (testimonial: typeof testimonials[0]) => {
    switch (currentLang) {
      case 'zh': return testimonial.positionZh || testimonial.position;
      default: return testimonial.position;
    }
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-[#f7f7f7] relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-[#f2fe6f]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#f2fe6f]/10 rounded-full blur-3xl" />

      <div className="w-full section-padding relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f2fe6f]/20 rounded-full mb-6">
              <MessageSquare className="w-4 h-4 text-[#1a1a1a]" />
              <span className="text-sm font-medium text-[#1a1a1a]">{t('testimonials.title')}</span>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1a1a1a] mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="text-lg text-[#333333] max-w-2xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </div>

          {/* Testimonial Content */}
          <div ref={contentRef} className="relative">
            {/* Main Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 relative">
              {/* Quote Icon */}
              <div className="absolute -top-6 left-8 w-12 h-12 bg-[#f2fe6f] rounded-xl flex items-center justify-center">
                <Quote className="w-6 h-6 text-[#1a1a1a]" />
              </div>

              <div className="grid lg:grid-cols-3 gap-8 items-center">
                {/* Avatar & Info */}
                <div className="text-center lg:text-left">
                  <div className="relative inline-block">
                    <img
                      src={testimonials[activeIndex].avatar}
                      alt={getName(testimonials[activeIndex])}
                      className="w-24 h-24 rounded-full object-cover border-4 border-[#f2fe6f] mx-auto lg:mx-0"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-[#1a1a1a] mt-4">
                    {getName(testimonials[activeIndex])}
                  </h4>
                  <p className="text-[#333333]">{getPosition(testimonials[activeIndex])}</p>
                  <p className="text-sm text-gray-500">{testimonials[activeIndex].company}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-3 justify-center lg:justify-start">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="lg:col-span-2">
                  <p className="text-lg lg:text-xl text-[#333333] leading-relaxed italic">
                    "{getContent(testimonials[activeIndex])}"
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        idx === activeIndex ? 'bg-[#f2fe6f] w-8' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevTestimonial}
                    className="rounded-full hover:bg-[#f2fe6f] hover:border-[#f2fe6f]"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextTestimonial}
                    className="rounded-full hover:bg-[#f2fe6f] hover:border-[#f2fe6f]"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Floating Avatars */}
            <div className="hidden lg:block">
              {testimonials.map((testimonial, idx) => {
                if (idx === activeIndex) return null;
                const positions = [
                  { top: '-10%', right: '5%', size: 'w-12 h-12' },
                  { bottom: '10%', left: '-3%', size: 'w-10 h-10' },
                  { top: '20%', right: '-2%', size: 'w-8 h-8' },
                ];
                const pos = positions[idx % positions.length];
                return (
                  <button
                    key={testimonial.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`absolute ${pos.size} rounded-full overflow-hidden border-2 border-white shadow-lg hover:scale-110 transition-transform`}
                    style={{
                      top: pos.top,
                      right: pos.right,
                      bottom: pos.bottom,
                      left: pos.left,
                    }}
                  >
                    <img
                      src={testimonial.avatar}
                      alt={getName(testimonial)}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
