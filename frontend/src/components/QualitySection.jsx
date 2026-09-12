import React from 'react';
import { CheckCircle } from 'lucide-react';

const QualitySection = ({ data }) => {
  if (!data) return null;

  return (
    <section id="quality" className="py-20 bg-gray-50">
      <div id="quality" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="quality" className="text-center mb-16">
          <h2 id="quality" className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {data.title || 'Our Quality Commitment'}
          </h2>
          {data.subtitle && (
            <p id="quality" className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {data.subtitle}
            </p>
          )}
        </div>

        <div id="quality" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.points && data.points.map((point, index) => (
            <div key={index} id="quality" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow duration-300">
              <div id="quality" className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle id="quality" className="w-6 h-6 text-blue-600" />
              </div>
              <h3 id="quality" className="text-xl font-bold text-gray-900 mb-3">{point.title}</h3>
              <p id="quality" className="text-gray-600 leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
