import React from 'react';

const ProductsSection = ({ data, websiteImages }) => {
  if (!data || !data.items) return null;

  // CRITICAL: ONLY render a product if item.confirmed === true
  const confirmedProducts = data.items.filter(item => item.confirmed === true);

  return (
    <section id="products" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Catalog</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {data.title || 'Premium Products'}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            {data.description || 'Discover our range of high-quality industrial egg products designed for the modern food processing sector.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {confirmedProducts.map((product, index) => {
            const productImg = websiteImages?.[product.image] || 'https://images.unsplash.com/photo-1598965402089-897ce52e8355?q=80&w=800&auto=format&fit=crop';
            
            return (
              <div key={index} className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
                <div className="flex-shrink-0 h-56 w-full relative">
                  <img
                    className="h-full w-full object-cover"
                    src={productImg}
                    alt={product.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white">
                    {product.name}
                  </h3>
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-base text-gray-600">
                      {product.description}
                    </p>
                    {product.applications && product.applications.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {product.applications.map((app, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0"></span>
                            {app}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="mt-6">
                    <button className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300 font-medium text-sm">
                      Request Specifications
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {confirmedProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No products currently available.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
