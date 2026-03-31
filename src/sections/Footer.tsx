import { useTranslation } from 'react-i18next';
import { Globe, Facebook, Twitter, Linkedin, Instagram, ArrowUp, Mail } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'products', label: t('nav.products') },
    { id: 'services', label: t('nav.services') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white relative">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="w-full section-padding py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
                <p className="text-gray-400">Get the latest product updates and industry news</p>
              </div>
              <div className="flex gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-80">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-12 pl-12 pr-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f2fe6f]"
                  />
                </div>
                <button className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="w-full section-padding py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-[#f2fe6f] rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-[#1a1a1a]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">GlobalTrade</h4>
                  <p className="text-xs text-gray-400 -mt-1">Pro</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {t('footer.description')}
              </p>
              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#f2fe6f] hover:text-[#1a1a1a] transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-lg font-semibold mb-6">{t('footer.quickLinks')}</h5>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-gray-400 hover:text-[#f2fe6f] transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-[#f2fe6f] group-hover:w-3 transition-all" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h5 className="text-lg font-semibold mb-6">Our Services</h5>
              <ul className="space-y-3">
                <li className="text-gray-400">OEM/ODM Manufacturing</li>
                <li className="text-gray-400">Quality Control</li>
                <li className="text-gray-400">Global Logistics</li>
                <li className="text-gray-400">Product Sourcing</li>
                <li className="text-gray-400">Custom Packaging</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="text-lg font-semibold mb-6">{t('footer.contact')}</h5>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-0.5 text-[#f2fe6f]" />
                  <div>
                    <p className="text-gray-400 text-sm">Address</p>
                    <p className="text-white">Shanghai, China</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-0.5 text-[#f2fe6f]" />
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">contact@globaltrade.pro</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-0.5 text-[#f2fe6f]" />
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white">+86 21 1234 5678</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="w-full section-padding py-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} GlobalTrade Pro. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-6">
              <button className="text-gray-400 hover:text-white text-sm transition-colors">
                {t('footer.privacy')}
              </button>
              <button className="text-gray-400 hover:text-white text-sm transition-colors">
                {t('footer.terms')}
              </button>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-[#f2fe6f] rounded-lg flex items-center justify-center text-[#1a1a1a] hover:scale-110 transition-transform"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
