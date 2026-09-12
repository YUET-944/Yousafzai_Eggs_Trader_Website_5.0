import React from 'react';

const IndustriesSection = ({ data }) => {
  if (!data) return null;
  
  const title = data.title || "Industries We Serve";
  const description = data.description || "Providing premium egg solutions across diverse sectors.";
  const items = data.industries || data.items || [];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{title}</h2>
          {description && (
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] flex items-center justify-center cursor-pointer">
              {item.image || item.img ? (
                <img 
                  src={item.image || item.img} 
                  alt={item.title || item.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-200 flex flex-col items-center justify-center text-gray-500 p-6 text-center">
                  <span className="text-sm uppercase tracking-wider font-semibold mb-2">Image Placeholder</span>
                  <span className="text-gray-400">{item.title || item.name}</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 transition-opacity" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {item.title || item.name}
                </h3>
                {(item.description || item.desc) && (
                  <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">
                    {item.description || item.desc}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
