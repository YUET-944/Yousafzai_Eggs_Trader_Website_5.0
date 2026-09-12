import React from 'react';
import { Truck, Warehouse, Snowflake, Globe } from 'lucide-react';

const LogisticsSection = ({ data }) => {
  const title = data?.title || "Cold-Chain Logistics & Warehousing";
  const description = data?.description || "State-of-the-art cold-chain solutions ensuring absolute product integrity across global distribution networks.";
  
  return (
    <section className="py-20 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-6">
              {title}
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              {description}
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Snowflake className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold">Unbroken Cold Chain</h3>
                  <p className="mt-2 text-slate-400">
                    Temperature-controlled transport from farm to destination, guaranteeing pristine quality.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Warehouse className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold">Modern Warehousing</h3>
                  <p className="mt-2 text-slate-400">
                    Hygienic, automated storage facilities designed specifically for sensitive egg storage.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Truck className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold">Efficient Distribution</h3>
                  <p className="mt-2 text-slate-400">
                    Optimized routing and reliable fleet management for on-time delivery across markets.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0 relative">
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl bg-slate-800 border border-slate-700 flex items-center justify-center p-12">
               <Globe className="w-full h-full text-slate-700 opacity-20" />
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogisticsSection;
