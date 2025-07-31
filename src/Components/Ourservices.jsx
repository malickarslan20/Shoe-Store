import React from 'react';

const Ourservices = () => {
  const services = [
    {
      title: 'Running Shoes',
      description: 'Designed for speed and endurance with lightweight cushioning and breathable support.',
    },
    {
      title: 'Hiking Boots',
      description: 'Built for rugged terrain with enhanced grip, ankle support, and waterproof protection.',
    },
    {
      title: 'Dress Shoes',
      description: 'Elegant and refined for formal wear, blending comfort with classic design.',
    },
    {
      title: 'Sneakers',
      description: 'Casual and stylish — perfect for everyday wear and street fashion.',
    },
    {
      title: 'Sandals & Slides',
      description: 'Breezy, lightweight options for summer comfort and relaxation.',
    },
    {
      title: 'Kids Footwear',
      description: 'Durable, playful shoes for children with both comfort and flexibility.',
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-red-600 to-white py-16 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-2">What We Offer</h2>
        <p className="text-red-100 text-lg">Explore our wide range of premium footwear for every occasion.</p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 hover:scale-105 transition-transform duration-300"
            style={{
              boxShadow: '0 10px 20px rgba(255, 0, 0, 0.15)',
            }}
          >
            <h3 className="text-xl font-semibold text-red-600 mb-2">{service.title}</h3>
            <p className="text-gray-700">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ourservices;
