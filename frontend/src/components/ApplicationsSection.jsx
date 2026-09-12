import React from 'react';

const ApplicationsSection = ({ data }) => {
  if (!data) return null;

  const title = data.title || "Applications";
  const description = data.description || "Perfect for a wide range of culinary and industrial applications.";
  const items = data.applications || data.items || [];

  return (
    <section id="applications" className="py-20 bg-gray-50">
      <div id="applications" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="applications" className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div id="applications" className="max-w-2xl">
            <h2 id="applications" className="text-3xl font-bold text-gray-900 sm:text-4xl">{title}</h2>
            {description && (
              <p id="applications" className="mt-4 text-xl text-gray-600">
                {description}
              </p>
            )}
          </div>
        </div>

        <div id="applications" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, index) => (
            <div key={index} id="applications" className="group flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
              <div id="applications" className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mb-4 overflow-hidden border-2 border-orange-100">
                {item.image || item.img ? (
                  <img src={item.image || item.img} alt={item.title || item.name} id="applications" className="w-full h-full object-cover" />
                ) : (
                  <span id="applications" className="text-orange-400 font-bold text-xl">{String(item.title || item.name || 'A').charAt(0)}</span>
                )}
              </div>
              <h3 id="applications" className="text-lg font-semibold text-gray-900 text-center mb-2">
                {item.title || item.name}
              </h3>
              {(item.description || item.desc) && (
                <p id="applications" className="text-sm text-gray-500 text-center line-clamp-2">
                  {item.description || item.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationsSection;
