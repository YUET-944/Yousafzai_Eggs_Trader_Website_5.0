import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';

const HeroSection = ({ data, websiteImages }) => {
  if (!data) return null;

  const bgImage = websiteImages?.hero || 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2000&auto=format&fit=crop';

  return (
    <div className="relative bg-gray-900 min-h-[600px] h-[80vh] flex items-center justify-center text-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Hero Background"
          className="w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-6">
          {data.title || 'Premium Egg Products for B2B'}
        </h1>
        <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto font-light mb-10">
          {data.subtitle || 'Reliable supply chain solutions for modern food processing industries.'}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {data.primaryCTA && (
            <a
              href={data.primaryCTA.link || '#products'}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 transition duration-300 shadow-lg"
            >
              {data.primaryCTA.text || 'View Products'}
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </a>
          )}
          {data.secondaryCTA && (
            <a
              href={data.secondaryCTA.link || '#contact'}
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white/10 transition duration-300"
            >
              <Phone className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
              {data.secondaryCTA.text || 'Contact Sales'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
