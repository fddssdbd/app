import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings2, ShieldCheck, Ship, HeadphonesIcon, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
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

  const services = [
    {
      icon: Settings2,
      title: t('services.oem.title'),
      description: t('services.oem.desc'),
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: ShieldCheck,
      title: t('services.quality.title'),
      description: t('services.quality.desc'),
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Ship,
      title: t('services.shipping.title'),
      description: t('services.shipping.desc'),
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: HeadphonesIcon,
      title: t('services.support.title'),
      description: t('services.support.desc'),
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#f2fe6f]/5 to-transparent" />
      
      <div className="w-full section-padding relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f2fe6f]/20 rounded-full mb-6">
              <Settings2 className="w-4 h-4 text-[#1a1a1a]" />
              <span className="text-sm font-medium text-[#1a1a1a]">{t('services.title')}</span>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1a1a1a] mb-4">
              {t('services.title')}
            </h2>
            <p className="text-lg text-[#333333] max-w-2xl mx-auto">
              Comprehensive solutions for your international trade needs
            </p>
          </div>

          {/* Services Grid */}
          <div
            ref={cardsRef}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-[#f7f7f7] rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Hover Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#1a1a1a] group-hover:to-gray-600 transition-all">
                  {service.title}
                </h3>
                <p className="text-[#333333] text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Link */}
                <div className="flex items-center gap-2 text-[#1a1a1a] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm">Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>

                {/* Number Badge */}
                <div className="absolute top-6 right-6 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-gray-300 group-hover:bg-[#f2fe6f] group-hover:text-[#1a1a1a] transition-colors">
                  0{index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 bg-[#f2fe6f]/20 rounded-2xl px-8 py-6">
              <div className="text-left">
                <p className="text-sm text-[#333333]">Need a custom solution?</p>
                <p className="text-lg font-bold text-[#1a1a1a]">Contact us for OEM/ODM services</p>
              </div>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
