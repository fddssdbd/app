import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Users, Factory, Truck, Headphones } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content slide in
      gsap.fromTo(
        contentRef.current?.children || [],
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: Factory, text: 'State-of-the-art Manufacturing Facilities' },
    { icon: Users, text: 'Professional R&D Team' },
    { icon: Truck, text: 'Global Logistics Network' },
    { icon: Headphones, text: 'Dedicated Customer Support' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white relative overflow-hidden"
    >
      <div className="w-full section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Side */}
            <div ref={imageRef} className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Our Team"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                {/* Overlay Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#f2fe6f] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Factory className="w-7 h-7 text-[#1a1a1a]" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#1a1a1a]">10+</div>
                      <div className="text-sm text-[#333333]">{t('about.years')}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-[#f2fe6f] rounded-2xl p-4 shadow-lg animate-float">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1a1a1a]">150+</div>
                  <div className="text-xs text-[#333333]">{t('about.clients')}</div>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div ref={contentRef}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f2fe6f]/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-[#f2fe6f] rounded-full" />
                <span className="text-sm font-medium text-[#1a1a1a]">{t('about.title')}</span>
              </div>

              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
                {t('about.subtitle')}
              </h2>

              <p className="text-lg text-[#333333] leading-relaxed mb-8">
                {t('about.description')}
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 bg-[#f2fe6f]/20 rounded-lg flex items-center justify-center group-hover:bg-[#f2fe6f] transition-colors">
                      <feature.icon className="w-5 h-5 text-[#1a1a1a]" />
                    </div>
                    <span className="text-[#333333] font-medium">{feature.text}</span>
                    <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary inline-flex items-center gap-2"
              >
                {t('contact.title')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
