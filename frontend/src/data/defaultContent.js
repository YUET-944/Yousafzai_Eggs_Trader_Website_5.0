import heroImg from '../assets/images/hero_liquid_egg_factory.jpg';
import wholeEggImg from '../assets/images/product_whole_egg.jpg';
import exteriorImg from '../assets/images/factory_exterior.jpg';

export const defaultContent = {
  websiteImages: {
    hero: heroImg,
    factoryExterior: exteriorImg,
    factoryEntrance: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80', // clean corporate entrance
    factoryProductionFloor: 'https://images.unsplash.com/photo-1580982327559-c1202864be05?w=1200&q=80', // stainless factory
    factoryWorkers: 'https://images.unsplash.com/photo-1587301669837-9d54ce580bb6?w=1200&q=80', // factory workers
    wholeEgg: wholeEggImg,
    eggWhite: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=800&q=80',
    eggYolk: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=800&q=80',
    processReceiving: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1200&q=80', // warehouse receiving
    processInspection: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80', // lab inspection
    processBreaking: 'https://images.unsplash.com/photo-1628187886470-7ec829b39868?w=1200&q=80', // food processing
    processSeparation: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&q=80', // machinery
    processFiltration: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=1200&q=80', // stainless pipes
    processPasteurization: 'https://images.unsplash.com/photo-1605882174146-a464b70cf691?w=1200&q=80', // tanks
    processPackaging: 'https://images.unsplash.com/photo-1591197172062-c718f82aba20?w=1200&q=80', // packaging line
    processColdStorage: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80', // cold storage
    qualityLab: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&q=80', // lab
    qualityTesting: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=1200&q=80', // testing
    qualityInspection: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80', // inspection
    packagingProduct: 'https://images.unsplash.com/photo-1626804475297-41609ea004eb?w=800&q=80',
    packagingLabel: 'https://images.unsplash.com/photo-1606162386708-316886e0df07?w=800&q=80',
    packagingMultiple: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80',
    industryBakery: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
    industryHotel: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    industryRestaurant: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&q=80',
    industryFoodMfg: 'https://images.unsplash.com/photo-1563720224214-5d513813a48e?w=800&q=80',
    industryCatering: 'https://images.unsplash.com/photo-1555243896-c709bfa0b564?w=800&q=80',
    industryInstitutional: 'https://images.unsplash.com/photo-1577903264627-862d38562140?w=800&q=80',
    logisticsWarehouse: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80',
    logisticsDispatch: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=1200&q=80',
  },
  hero: {
    title: 'Premium Pasteurized Liquid Egg Products',
    subtitle: 'High-quality pasteurized liquid egg solutions designed for bakeries, food manufacturers, hotels, restaurants, caterers and commercial kitchens.',
    primaryCta: { label: 'Explore Our Products', action: '#products' },
    secondaryCta: { label: 'Request a Quote', action: '#quote' }
  },
  products: {
    title: 'Our Liquid Egg Products',
    items: [
      {
        id: 'liquid-whole-egg',
        name: 'Liquid Whole Egg',
        description: 'Pasteurized whole egg in convenient liquid form for commercial food production.',
        image: 'PRODUCT_WHOLE_EGG',
        applications: ['Baking', 'Prepared Foods', 'Sauces'],
        confirmed: true
      },
      {
        id: 'liquid-egg-white',
        name: 'Liquid Egg White',
        description: 'Pasteurized liquid egg white for applications requiring consistent protein and functional performance.',
        image: 'PRODUCT_EGG_WHITE',
        applications: ['Bakery', 'Confectionery', 'Protein Supplements'],
        confirmed: false
      },
      {
        id: 'liquid-egg-yolk',
        name: 'Liquid Egg Yolk',
        description: 'Pasteurized liquid egg yolk for bakery, sauces, confectionery and food-processing applications.',
        image: 'PRODUCT_EGG_YOLK',
        applications: ['Mayonnaise', 'Sauces', 'Pastries'],
        confirmed: false
      }
    ]
  },
  whyLiquidEgg: {
    title: 'Why Choose Liquid Egg?',
    benefits: [
      {
        title: 'Consistent Quality',
        description: 'Reliable quality and performance across commercial production.'
      },
      {
        title: 'Ready to Use',
        description: 'Reduce preparation time and simplify food production.'
      },
      {
        title: 'Hygienic Processing',
        description: 'Produced through controlled food-processing procedures.'
      },
      {
        title: 'Reduced Waste',
        description: 'Less shell handling and preparation waste.'
      },
      {
        title: 'Easy Handling',
        description: 'Convenient solution for high-volume food production.'
      }
    ]
  },
  productionProcess: {
    title: 'Our Production Process',
    steps: [
      { id: '01', title: 'Egg Receiving', desc: 'Quality eggs arrive at the processing facility.', img: 'PROCESS_EGG_RECEIVING' },
      { id: '02', title: 'Inspection', desc: 'Eggs undergo quality inspection before processing.', img: 'PROCESS_INSPECTION' },
      { id: '03', title: 'Breaking', desc: 'Eggs are mechanically broken for processing.', img: 'PROCESS_EGG_BREAKING' },
      { id: '04', title: 'Separation', desc: 'The egg components are processed according to product requirements.', img: 'PROCESS_SEPARATION' },
      { id: '05', title: 'Filtration', desc: 'The liquid egg is filtered for consistency.', img: 'PROCESS_FILTRATION' },
      { id: '06', title: 'Pasteurization', desc: 'The liquid egg undergoes controlled pasteurization.', img: 'PROCESS_PASTEURIZATION' },
      { id: '07', title: 'Filling & Packaging', desc: 'The finished product is hygienically filled into suitable packaging.', img: 'PROCESS_PACKAGING' },
      { id: '08', title: 'Cold Storage', desc: 'Finished products are stored under appropriate controlled conditions.', img: 'PROCESS_COLD_STORAGE' }
    ]
  },
  quality: {
    title: 'Quality You Can Trust',
    description: 'We are committed to delivering the highest standards of food safety, hygiene, and product consistency for our commercial partners.',
    points: ['Quality control', 'Product inspection', 'Controlled processing', 'Pasteurization', 'Batch consistency', 'Laboratory testing']
  },
  industries: {
    title: 'Industries We Serve',
    items: [
      { name: 'Bakeries', desc: 'Liquid egg solutions for commercial bakery production.', img: 'INDUSTRY_BAKERY' },
      { name: 'Hotels', desc: 'Convenient egg solutions for professional hotel kitchens.', img: 'INDUSTRY_HOTEL' },
      { name: 'Restaurants', desc: 'Reliable liquid egg for commercial food preparation.', img: 'INDUSTRY_RESTAURANT' },
      { name: 'Food Manufacturers', desc: 'Liquid egg solutions for industrial food production.', img: 'INDUSTRY_FOOD_MANUFACTURING' },
      { name: 'Catering', desc: 'Efficient solutions for high-volume food preparation.', img: 'INDUSTRY_CATERING' },
      { name: 'Institutional Kitchens', desc: 'Reliable supply for large-scale food operations.', img: 'INDUSTRY_INSTITUTIONAL' }
    ]
  },
  applications: {
    title: 'Applications',
    items: ['Cakes', 'Pastries', 'Bread', 'Biscuits', 'Mayonnaise', 'Sauces', 'Dressings', 'Prepared foods', 'Breakfast products', 'Food manufacturing']
  },
  about: {
    title: 'From Quality Eggs to Better Food Solutions',
    description: 'Yousafzai Agri Foods is a food-processing company focused on producing and supplying high-quality pasteurized liquid egg products for commercial and industrial customers. With a commitment to quality and controlled production, we deliver reliable food solutions tailored to the needs of modern businesses.'
  },
  packaging: {
    title: 'Packaging Solutions',
    specs: {
      weight: '[CLIENT TO CONFIRM]',
      packagingType: '[CLIENT TO CONFIRM]',
      storageTemperature: '[CLIENT TO CONFIRM]',
      shelfLife: '[CLIENT TO CONFIRM]'
    }
  },
  logistics: {
    title: 'Logistics & Supply',
    description: 'Our dedicated cold-chain supply and professional warehousing ensure that your liquid egg products arrive fresh and ready to use.',
    highlights: ['Warehouse storage', 'Finished products handling', 'Cold storage facility', 'Efficient dispatch', 'Cold-chain transportation']
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      { q: 'What is liquid egg?', a: 'Liquid egg is fresh egg that has been broken, filtered, and pasteurized for safe, convenient use in commercial food production.' },
      { q: 'Is your liquid egg pasteurized?', a: 'Yes, our products undergo controlled pasteurization to ensure food safety and extended shelf life while maintaining functional properties.' },
      { q: 'What liquid egg products do you supply?', a: 'We currently supply premium Pasteurized Liquid Whole Egg. (Additional product lines may be available upon request).' },
      { q: 'Which industries use your liquid egg products?', a: 'We serve commercial bakeries, food manufacturers, hotels, restaurants, caterers, and institutional kitchens.' },
      { q: 'How should liquid egg products be stored?', a: '[CLIENT TO CONFIRM]' },
      { q: 'What packaging options are available?', a: '[CLIENT TO CONFIRM]' },
      { q: 'What is the shelf life?', a: '[CLIENT TO CONFIRM]' },
      { q: 'Do you supply bulk orders?', a: 'Yes, we are a B2B supplier equipped to handle bulk and commercial order volumes.' },
      { q: 'Do you provide delivery?', a: '[CLIENT TO CONFIRM]' },
      { q: 'How can I request a quotation?', a: 'You can request a quote directly through our website by filling out the "Request a Quote" form.' }
    ]
  },
  contact: {
    title: 'Looking for a Reliable Liquid Egg Supplier?',
    description: 'Tell us about your requirements and our team will help you find the right liquid egg solution for your business.'
  },
  footer: {
    description: 'Premium Pasteurized Liquid Egg Solutions for Professional Food Businesses.',
    copyright: '© 2026 Yousafzai Agri Foods (Pvt) Ltd. All rights reserved.',
    address: '[CLIENT TO CONFIRM]',
    email: '[CLIENT TO CONFIRM]',
    phone: '[CLIENT TO CONFIRM]',
    socials: { facebook: '#', linkedin: '#', twitter: '#' }
  }
};
