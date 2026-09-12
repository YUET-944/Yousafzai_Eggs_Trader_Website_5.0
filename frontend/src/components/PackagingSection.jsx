import React from 'react';
import { Package, Thermometer, Calendar, Scale } from 'lucide-react';

const PackagingSection = ({ data }) => {
  if (!data) return null;

  const { weight, packagingType, storageTemperature, shelfLife } = data;

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Premium Packaging Specifications</h2>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            Ensuring the highest quality and safety standards from our facilities to yours.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Weight */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
            <div className="p-3 bg-blue-100 rounded-full mb-4">
              <Scale className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Weight Standard</h3>
            <p className="mt-2 text-gray-600 font-medium">{weight || 'Standardized Weight'}</p>
          </div>

          {/* Packaging Type */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
            <div className="p-3 bg-blue-100 rounded-full mb-4">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Packaging Type</h3>
            <p className="mt-2 text-gray-600 font-medium">{packagingType || 'Export-grade Cartons'}</p>
          </div>

          {/* Storage Temp */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
            <div className="p-3 bg-blue-100 rounded-full mb-4">
              <Thermometer className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Storage Temp.</h3>
            <p className="mt-2 text-gray-600 font-medium">{storageTemperature || 'Optimal Chilled'}</p>
          </div>

          {/* Shelf Life */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
            <div className="p-3 bg-blue-100 rounded-full mb-4">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Shelf Life</h3>
            <p className="mt-2 text-gray-600 font-medium">{shelfLife || 'Extended Shelf Life'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagingSection;
