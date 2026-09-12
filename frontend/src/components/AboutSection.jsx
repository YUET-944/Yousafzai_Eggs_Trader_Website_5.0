import React from 'react';
import { ShieldCheck, Factory, TrendingUp } from 'lucide-react';

const AboutSection = ({ data }) => {
  if (!data) return null;

  const features = [
    {
      title: 'Stringent Quality Control',
      description: 'Our facilities adhere to the highest international food safety standards, ensuring every batch meets your exact specifications.',
      icon: <ShieldCheck className="h-6 w-6 text-white" />
    },
    {
      title: 'Advanced Processing',
      description: 'State-of-the-art technology provides consistent viscosity, emulsification, and functional properties for your production line.',
      icon: <Factory className="h-6 w-6 text-white" />
    },
    {
      title: 'Scalable Solutions',
      description: 'From pilot testing to full-scale commercial production, our supply chain adapts to your evolving business needs.',
      icon: <TrendingUp className="h-6 w-6 text-white" />
    }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-12 lg:mb-0">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Corporate Profile</h2>
            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {data.title || 'From Quality Eggs to Better Food Solutions'}
            </h3>
            <div className="mt-6 text-lg text-gray-500 space-y-6">
              <p>
                {data.description || 'We are a premier B2B supplier of industrial egg products, dedicated to serving the modern food processing sector. Our focus is on functional excellence, supply chain reliability, and uncompromising safety standards.'}
              </p>
              <p>
                We bridge the gap between agricultural raw materials and precision food manufacturing, providing solutions that integrate seamlessly into your commercial recipes.
              </p>
            </div>
            
            {data.stats && (
              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-gray-100 pt-10">
                {data.stats.map((stat, idx) => (
                  <div key={idx}>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="mt-1 text-sm text-gray-500 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 rounded-3xl transform skew-y-3 sm:skew-y-0 sm:-rotate-3 sm:rounded-3xl z-0"></div>
            <div className="relative bg-white shadow-xl rounded-2xl p-8 z-10 border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-8">Our Core Competencies</h4>
              <div className="space-y-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h5 className="text-lg leading-6 font-medium text-gray-900">{feature.title}</h5>
                      <p className="mt-2 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
