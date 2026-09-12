import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const WhyLiquidEggSection = ({ data }) => {
  if (!data) return null;

  const title = data.title || "Why Choose Liquid Egg?";
  const description = data.description || "Discover the advantages of integrating liquid eggs into your production line.";
  const items = data.benefits || data.items || [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{title}</h2>
          {description && (
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 border border-gray-100">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyLiquidEggSection;
