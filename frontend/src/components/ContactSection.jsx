import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

import { defaultContent } from '../data/defaultContent';

const ContactSection = ({ data }) => {
  const confirmedProducts = defaultContent.products.items.filter(item => item.confirmed);
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    productOfInterest: '',
    quantity: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // [CLIENT TO CONFIRM] handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry. We will contact you shortly.');
  };

  if (!data) return null;

  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-6">
              {data.title || 'Contact Our Sales Team'}
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              {data.description || 'Get in touch with us to discuss your wholesale egg requirements. We offer global shipping and competitive B2B pricing.'}
            </p>

            <div className="space-y-8">
              {data.contactDetails?.map((detail, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                    {detail.type === 'email' && <Mail className="w-6 h-6 text-blue-400" />}
                    {detail.type === 'phone' && <Phone className="w-6 h-6 text-blue-400" />}
                    {detail.type === 'address' && <MapPin className="w-6 h-6 text-blue-400" />}
                    {!['email', 'phone', 'address'].includes(detail.type) && <div className="w-6 h-6 bg-blue-400 rounded-full" />}
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-semibold text-gray-100">{detail.title}</h3>
                    <p className="mt-1 text-gray-400">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Request a Quote</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name *</label>
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 text-gray-900 p-3 border" />
                </div>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name *</label>
                  <input type="text" name="companyName" id="companyName" required value={formData.companyName} onChange={handleChange} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 text-gray-900 p-3 border" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Business Email *</label>
                  <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 text-gray-900 p-3 border" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number *</label>
                  <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleChange} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 text-gray-900 p-3 border" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country *</label>
                  <input type="text" name="country" id="country" required value={formData.country} onChange={handleChange} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 text-gray-900 p-3 border" />
                </div>
                <div>
                  <label htmlFor="productOfInterest" className="block text-sm font-medium text-gray-700">Product Interested In *</label>
                  <select name="productOfInterest" id="productOfInterest" required value={formData.productOfInterest} onChange={handleChange} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 text-gray-900 p-3 border">
                    <option value="">Select a product...</option>
                    {confirmedProducts.map(product => (
                      <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                    <option value="other">Other / Custom Bulk Order</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity Required (per month) *</label>
                <input type="text" name="quantity" id="quantity" required placeholder="e.g., 5 containers, 10,000 cartons" value={formData.quantity} onChange={handleChange} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 text-gray-900 p-3 border" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Additional Requirements / Message</label>
                <textarea name="message" id="message" rows="4" value={formData.message} onChange={handleChange} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 text-gray-900 p-3 border"></textarea>
              </div>

              <div>
                <button type="submit" className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                  <Send className="w-5 h-5 mr-2" />
                  Submit Inquiry
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
