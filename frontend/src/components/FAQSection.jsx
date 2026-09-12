import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);

  if (!data || !data.faqs) return null;

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {data.title || 'Frequently Asked Questions'}
          </h2>
          {data.subtitle && (
            <p className="mt-4 text-lg text-gray-600">
              {data.subtitle}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {data.faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 ${openIndex === index ? 'ring-2 ring-blue-500' : 'hover:border-gray-300'}`}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left bg-white focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              <div 
                className={`px-6 pb-6 text-gray-600 ${openIndex === index ? 'block' : 'hidden'}`}
              >
                <div className="pt-2 border-t border-gray-100 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
