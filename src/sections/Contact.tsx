import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.email'),
      value: 'contact@globaltrade.pro',
      href: 'mailto:contact@globaltrade.pro',
    },
    {
      icon: Phone,
      label: t('contact.phone'),
      value: '+86 21 1234 5678',
      href: 'tel:+862112345678',
    },
    {
      icon: MessageCircle,
      label: t('contact.whatsapp'),
      value: '+86 138 1234 5678',
      href: 'https://wa.me/8613812345678',
    },
    {
      icon: MapPin,
      label: t('contact.address'),
      value: 'Shanghai, China',
      href: '#',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#f2fe6f]/5 to-transparent" />
      
      <div className="w-full section-padding relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f2fe6f]/20 rounded-full mb-6">
              <Mail className="w-4 h-4 text-[#1a1a1a]" />
              <span className="text-sm font-medium text-[#1a1a1a]">{t('contact.title')}</span>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1a1a1a] mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-[#333333] max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-[#f7f7f7] rounded-3xl p-8 lg:p-10"
              >
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                      {t('contact.success')}
                    </h3>
                    <p className="text-[#333333]">We will get back to you soon!</p>
                  </div>
                ) : (
                  <>
                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#1a1a1a] font-medium">
                          {t('contact.name')}
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="h-12 bg-white border-0 shadow-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#1a1a1a] font-medium">
                          {t('contact.email')}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          required
                          className="h-12 bg-white border-0 shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <Label htmlFor="company" className="text-[#1a1a1a] font-medium">
                        {t('contact.company')}
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company Name"
                        className="h-12 bg-white border-0 shadow-sm"
                      />
                    </div>

                    <div className="space-y-2 mb-6">
                      <Label htmlFor="message" className="text-[#1a1a1a] font-medium">
                        {t('contact.message')}
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project requirements..."
                        required
                        rows={5}
                        className="bg-white border-0 shadow-sm resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full btn-primary flex items-center justify-center gap-2 h-12 text-lg"
                    >
                      <Send className="w-5 h-5" />
                      {t('contact.send')}
                    </Button>
                  </>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-start gap-4 p-6 bg-[#f7f7f7] rounded-2xl hover:bg-[#f2fe6f]/10 transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#f2fe6f] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-[#1a1a1a]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                    <p className="text-lg font-semibold text-[#1a1a1a]">{item.value}</p>
                  </div>
                </a>
              ))}

              {/* Business Hours */}
              <div className="p-6 bg-gradient-to-br from-[#1a1a1a] to-[#333333] rounded-2xl text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-[#f2fe6f]" />
                  <h4 className="text-lg font-semibold">Business Hours</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM (CST)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Saturday</span>
                    <span>9:00 AM - 12:00 PM (CST)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
