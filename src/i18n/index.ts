import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        products: 'Products',
        services: 'Services',
        contact: 'Contact',
        getQuote: 'Get Quote',
        admin: 'Admin'
      },
      hero: {
        title: 'Your Trusted Global Trade Partner',
        subtitle: 'Premium Quality Products for International Markets',
        description: 'We provide exceptional products with international standards certification, helping your business grow globally.',
        cta: 'Explore Products',
        cta2: 'Contact Us'
      },
      products: {
        title: 'Our Products',
        subtitle: 'International Quality Standards Certified',
        viewDetails: 'View Details',
        inquiry: 'Send Inquiry',
        buyOnAmazon: 'Buy on Amazon',
        category: 'Category',
        description: 'Description',
        price: 'Price',
        noProducts: 'No products available',
        search: 'Search products...',
        filter: 'Filter by category',
        allCategories: 'All Categories'
      },
      about: {
        title: 'About Us',
        subtitle: 'Your Reliable Manufacturing Partner',
        description: 'With over 10 years of experience in international trade, we have established ourselves as a leading manufacturer and exporter of premium quality products.',
        years: 'Years Experience',
        clients: 'Global Clients',
        products: 'Products',
        countries: 'Countries Served'
      },
      services: {
        title: 'Our Services',
        oem: {
          title: 'OEM/ODM Service',
          desc: 'Custom manufacturing according to your specifications'
        },
        quality: {
          title: 'Quality Control',
          desc: 'Rigorous testing and inspection processes'
        },
        shipping: {
          title: 'Global Shipping',
          desc: 'Efficient logistics and delivery worldwide'
        },
        support: {
          title: '24/7 Support',
          desc: 'Dedicated customer service team'
        }
      },
      testimonials: {
        title: 'What Our Clients Say',
        subtitle: 'Trusted by businesses worldwide'
      },
      contact: {
        title: 'Contact Us',
        subtitle: 'Get in touch for business inquiries',
        name: 'Your Name',
        email: 'Email Address',
        company: 'Company Name',
        message: 'Message',
        send: 'Send Message',
        success: 'Message sent successfully!',
        address: 'Address',
        phone: 'Phone',
        whatsapp: 'WhatsApp'
      },
      footer: {
        description: 'Your trusted partner for international trade and premium quality products.',
        quickLinks: 'Quick Links',
        contact: 'Contact Info',
        rights: 'All rights reserved.',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service'
      },
      admin: {
        title: 'Product Management',
        login: 'Admin Login',
        password: 'Password',
        loginBtn: 'Login',
        logout: 'Logout',
        addNew: 'Add New Product',
        edit: 'Edit',
        delete: 'Delete',
        confirmDelete: 'Are you sure you want to delete this product?',
        name: 'Product Name',
        description: 'Description',
        price: 'Price (USD)',
        category: 'Category',
        image: 'Image URL',
        certification: 'Certification',
        moq: 'Minimum Order Quantity',
        featured: 'Featured Product'
      }
    }
  },
  zh: {
    translation: {
      nav: {
        home: '首页',
        about: '关于我们',
        products: '产品展示',
        services: '服务',
        contact: '联系我们',
        getQuote: '获取报价',
        admin: '管理后台'
      },
      hero: {
        title: '您值得信赖的全球贸易伙伴',
        subtitle: '国际市场的优质产品',
        description: '我们提供具有国际标准认证的卓越产品，助力您的业务在全球范围内蓬勃发展。',
        cta: '浏览产品',
        cta2: '联系我们'
      },
      products: {
        title: '我们的产品',
        subtitle: '国际标准认证',
        viewDetails: '查看详情',
        inquiry: '发送询盘',
        buyOnAmazon: '在亚马逊购买',
        category: '类别',
        description: '产品描述',
        price: '价格',
        noProducts: '暂无产品',
        search: '搜索产品...',
        filter: '按类别筛选',
        allCategories: '所有类别'
      },
      about: {
        title: '关于我们',
        subtitle: '您可靠的制造合作伙伴',
        description: '凭借超过10年的国际贸易经验，我们已成为优质产品的领先制造商和出口商。',
        years: '年经验',
        clients: '全球客户',
        products: '产品种类',
        countries: '服务国家'
      },
      services: {
        title: '我们的服务',
        oem: {
          title: 'OEM/ODM服务',
          desc: '根据您的规格定制生产'
        },
        quality: {
          title: '质量控制',
          desc: '严格的测试和检验流程'
        },
        shipping: {
          title: '全球物流',
          desc: '高效的全球物流配送'
        },
        support: {
          title: '24/7支持',
          desc: '专业的客户服务团队'
        }
      },
      testimonials: {
        title: '客户评价',
        subtitle: '深受全球企业信赖'
      },
      contact: {
        title: '联系我们',
        subtitle: '欢迎商务咨询',
        name: '您的姓名',
        email: '电子邮箱',
        company: '公司名称',
        message: '留言内容',
        send: '发送消息',
        success: '消息发送成功！',
        address: '地址',
        phone: '电话',
        whatsapp: 'WhatsApp'
      },
      footer: {
        description: '您值得信赖的国际贸易和优质产品合作伙伴。',
        quickLinks: '快速链接',
        contact: '联系方式',
        rights: '版权所有。',
        privacy: '隐私政策',
        terms: '服务条款'
      },
      admin: {
        title: '产品管理',
        login: '管理员登录',
        password: '密码',
        loginBtn: '登录',
        logout: '退出登录',
        addNew: '添加新产品',
        edit: '编辑',
        delete: '删除',
        confirmDelete: '确定要删除此产品吗？',
        name: '产品名称',
        description: '产品描述',
        price: '价格 (USD)',
        category: '类别',
        image: '图片链接',
        certification: '认证',
        moq: '最小起订量',
        featured: '推荐产品'
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: 'Inicio',
        about: 'Nosotros',
        products: 'Productos',
        services: 'Servicios',
        contact: 'Contacto',
        getQuote: 'Cotización',
        admin: 'Admin'
      },
      hero: {
        title: 'Su Socio Comercial de Confianza',
        subtitle: 'Productos Premium para Mercados Internacionales',
        description: 'Proporcionamos productos excepcionales con certificación de estándares internacionales, ayudando a su negocio a crecer globalmente.',
        cta: 'Explorar Productos',
        cta2: 'Contáctenos'
      },
      products: {
        title: 'Nuestros Productos',
        subtitle: 'Certificado de Estándares Internacionales',
        viewDetails: 'Ver Detalles',
        inquiry: 'Enviar Consulta',
        buyOnAmazon: 'Comprar en Amazon',
        category: 'Categoría',
        description: 'Descripción',
        price: 'Precio',
        noProducts: 'No hay productos disponibles',
        search: 'Buscar productos...',
        filter: 'Filtrar por categoría',
        allCategories: 'Todas las Categorías'
      },
      about: {
        title: 'Sobre Nosotros',
        subtitle: 'Su Socio de Fabricación Confiable',
        description: 'Con más de 10 años de experiencia en comercio internacional, nos hemos establecido como fabricantes y exportadores líderes de productos de alta calidad.',
        years: 'Años de Experiencia',
        clients: 'Clientes Globales',
        products: 'Productos',
        countries: 'Países Atendidos'
      },
      services: {
        title: 'Nuestros Servicios',
        oem: {
          title: 'Servicio OEM/ODM',
          desc: 'Fabricación personalizada según sus especificaciones'
        },
        quality: {
          title: 'Control de Calidad',
          desc: 'Procesos rigurosos de prueba e inspección'
        },
        shipping: {
          title: 'Envío Global',
          desc: 'Logística eficiente y entrega mundial'
        },
        support: {
          title: 'Soporte 24/7',
          desc: 'Equipo dedicado de servicio al cliente'
        }
      },
      testimonials: {
        title: 'Lo Que Dicen Nuestros Clientes',
        subtitle: 'Confiado por empresas de todo el mundo'
      },
      contact: {
        title: 'Contáctenos',
        subtitle: 'Póngase en contacto para consultas comerciales',
        name: 'Su Nombre',
        email: 'Correo Electrónico',
        company: 'Nombre de la Empresa',
        message: 'Mensaje',
        send: 'Enviar Mensaje',
        success: '¡Mensaje enviado con éxito!',
        address: 'Dirección',
        phone: 'Teléfono',
        whatsapp: 'WhatsApp'
      },
      footer: {
        description: 'Su socio confiable para el comercio internacional y productos de alta calidad.',
        quickLinks: 'Enlaces Rápidos',
        contact: 'Información de Contacto',
        rights: 'Todos los derechos reservados.',
        privacy: 'Política de Privacidad',
        terms: 'Términos de Servicio'
      },
      admin: {
        title: 'Gestión de Productos',
        login: 'Inicio de Sesión de Admin',
        password: 'Contraseña',
        loginBtn: 'Iniciar Sesión',
        logout: 'Cerrar Sesión',
        addNew: 'Agregar Nuevo Producto',
        edit: 'Editar',
        delete: 'Eliminar',
        confirmDelete: '¿Está seguro de que desea eliminar este producto?',
        name: 'Nombre del Producto',
        description: 'Descripción',
        price: 'Precio (USD)',
        category: 'Categoría',
        image: 'URL de la Imagen',
        certification: 'Certificación',
        moq: 'Cantidad Mínima de Pedido',
        featured: 'Producto Destacado'
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        about: 'من نحن',
        products: 'المنتجات',
        services: 'الخدمات',
        contact: 'اتصل بنا',
        getQuote: 'احصل على عرض',
        admin: 'الإدارة'
      },
      hero: {
        title: 'شريكك التجاري الموثوق',
        subtitle: 'منتجات متميزة للأسواق الدولية',
        description: 'نقدم منتجات استثنائية مع شهادات المعايير الدولية، مما يساعد عملك على النمو عالمياً.',
        cta: 'استكشف المنتجات',
        cta2: 'اتصل بنا'
      },
      products: {
        title: 'منتجاتنا',
        subtitle: 'معتمدة بمعايير دولية',
        viewDetails: 'عرض التفاصيل',
        inquiry: 'إرسال استفسار',
        buyOnAmazon: 'اشتر من أمازون',
        category: 'الفئة',
        description: 'الوصف',
        price: 'السعر',
        noProducts: 'لا توجد منتجات متاحة',
        search: 'البحث عن منتجات...',
        filter: 'تصفية حسب الفئة',
        allCategories: 'جميع الفئات'
      },
      about: {
        title: 'من نحن',
        subtitle: 'شريكك المصنع الموثوق',
        description: 'مع أكثر من 10 سنوات من الخبرة في التجارة الدولية، أصبحنا مصنعين ومصدرين رائدين للمنتجات عالية الجودة.',
        years: 'سنوات الخبرة',
        clients: 'عملاء عالميون',
        products: 'المنتجات',
        countries: 'الدول المخدمة'
      },
      services: {
        title: 'خدماتنا',
        oem: {
          title: 'خدمة OEM/ODM',
          desc: 'التصنيع المخصص حسب مواصفاتك'
        },
        quality: {
          title: 'مراقبة الجودة',
          desc: 'عمليات اختبار وتفتيش صارمة'
        },
        shipping: {
          title: 'الشحن العالمي',
          desc: 'لوجستيات فعالة وتوصيل عالمي'
        },
        support: {
          title: 'دعم 24/7',
          desc: 'فريق خدمة عملاء مخصص'
        }
      },
      testimonials: {
        title: 'ماذا يقول عملاؤنا',
        subtitle: 'موثوق به من قبل الشركات حول العالم'
      },
      contact: {
        title: 'اتصل بنا',
        subtitle: 'تواصل للاستفسارات التجارية',
        name: 'اسمك',
        email: 'البريد الإلكتروني',
        company: 'اسم الشركة',
        message: 'الرسالة',
        send: 'إرسال الرسالة',
        success: 'تم إرسال الرسالة بنجاح!',
        address: 'العنوان',
        phone: 'الهاتف',
        whatsapp: 'واتساب'
      },
      footer: {
        description: 'شريكك الموثوق للتجارة الدولية والمنتجات عالية الجودة.',
        quickLinks: 'روابط سريعة',
        contact: 'معلومات الاتصال',
        rights: 'جميع الحقوق محفوظة.',
        privacy: 'سياسة الخصوصية',
        terms: 'شروط الخدمة'
      },
      admin: {
        title: 'إدارة المنتجات',
        login: 'تسجيل دخول المشرف',
        password: 'كلمة المرور',
        loginBtn: 'تسجيل الدخول',
        logout: 'تسجيل الخروج',
        addNew: 'إضافة منتج جديد',
        edit: 'تعديل',
        delete: 'حذف',
        confirmDelete: 'هل أنت متأكد من حذف هذا المنتج؟',
        name: 'اسم المنتج',
        description: 'الوصف',
        price: 'السعر (USD)',
        category: 'الفئة',
        image: 'رابط الصورة',
        certification: 'الشهادة',
        moq: 'الحد الأدنى للطلب',
        featured: 'منتج مميز'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
