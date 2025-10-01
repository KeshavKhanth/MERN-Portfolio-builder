import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ServicesSection = ({ 
  content = {}, 
  layout = 'cards',
  showPricing = false,
  isEditing,
  onContentChange,
  customizations,
  style = {}
}) => {
  const [servicesData, setServicesData] = useState({
    title: content.title || 'Services',
    subtitle: content.subtitle || 'What I Offer',
    services: content.services || [
      {
        icon: '🎨',
        title: 'Design',
        description: 'Beautiful and functional designs',
        price: '$500',
        features: ['Concept', 'Mockups', 'Revisions']
      }
    ]
  });

  const handleFieldChange = (field, value) => {
    const updated = { ...servicesData, [field]: value };
    setServicesData(updated);
    if (onContentChange) {
      onContentChange(updated);
    }
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...servicesData.services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    const updated = { ...servicesData, services: updatedServices };
    setServicesData(updated);
    if (onContentChange) {
      onContentChange(updated);
    }
  };

  const addService = () => {
    const newService = {
      icon: '✨',
      title: 'New Service',
      description: 'Service description',
      price: '$XXX',
      features: ['Feature 1', 'Feature 2']
    };
    handleFieldChange('services', [...servicesData.services, newService]);
  };

  const removeService = (index) => {
    const updatedServices = servicesData.services.filter((_, i) => i !== index);
    handleFieldChange('services', updatedServices);
  };

  // Sanitize style prop
  const sanitizedStyle = style && typeof style === 'object' && !Array.isArray(style)
    ? Object.fromEntries(
        Object.entries(style).filter(([key]) => 
          !key.startsWith('&') && !key.includes('::') && !key.includes(':')
        )
      )
    : {};

  if (isEditing) {
    return (
      <div className="py-16 px-6" style={sanitizedStyle}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 space-y-2">
            <input
              type="text"
              value={servicesData.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="Section Title"
              className="text-3xl font-bold w-full text-center border-b-2 border-gray-300 pb-2 outline-none bg-transparent"
            />
            <input
              type="text"
              value={servicesData.subtitle}
              onChange={(e) => handleFieldChange('subtitle', e.target.value)}
              placeholder="Section Subtitle"
              className="text-xl text-gray-600 w-full text-center border-b border-gray-200 pb-1 outline-none bg-transparent"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesData.services.map((service, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={service.icon}
                      onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                      placeholder="Icon"
                      className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
                    />
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                      placeholder="Service Title"
                      className="flex-1 border border-gray-300 rounded px-2 py-1"
                    />
                    {showPricing && (
                      <input
                        type="text"
                        value={service.price || ''}
                        onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                        placeholder="Price"
                        className="w-24 border border-gray-300 rounded px-2 py-1"
                      />
                    )}
                  </div>
                  <textarea
                    value={service.description}
                    onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                    placeholder="Service Description"
                    className="w-full border border-gray-300 rounded px-2 py-1"
                    rows={2}
                  />
                  <input
                    type="text"
                    value={service.features?.join(', ') || ''}
                    onChange={(e) => handleServiceChange(index, 'features', e.target.value.split(', '))}
                    placeholder="Features (comma separated)"
                    className="w-full border border-gray-300 rounded px-2 py-1"
                  />
                  <button
                    onClick={() => removeService(index)}
                    className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600"
                  >
                    Remove Service
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={addService}
            className="mt-4 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
          >
            Add Service
          </button>
        </div>
      </div>
    );
  }

  const renderCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {servicesData.services.map((service, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="text-4xl mb-4">{service.icon}</div>
          <h3 className="text-xl font-bold mb-2" style={{ fontFamily: customizations?.fonts?.heading }}>
            {service.title}
          </h3>
          {showPricing && service.price && (
            <div 
              className="text-2xl font-bold mb-2"
              style={{ color: customizations?.colors?.primary }}
            >
              {service.price}
            </div>
          )}
          <p className="text-gray-600 mb-4" style={{ fontFamily: customizations?.fonts?.body }}>
            {service.description}
          </p>
          {service.features && service.features.length > 0 && (
            <ul className="space-y-1">
              {service.features.map((feature, fIndex) => (
                <li key={fIndex} className="text-sm text-gray-600 flex items-center">
                  <span className="mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      ))}
    </div>
  );

  const renderList = () => (
    <div className="space-y-8">
      {servicesData.services.map((service, index) => (
        <motion.div
          key={index}
          className="grid grid-cols-12 gap-4 items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="col-span-1 text-3xl text-center">
            {service.number || service.icon}
          </div>
          <div className="col-span-11 lg:col-span-8">
            <h3 className="text-xl font-bold mb-1" style={{ fontFamily: customizations?.fonts?.heading }}>
              {service.title}
            </h3>
            <p className="text-gray-600" style={{ fontFamily: customizations?.fonts?.body }}>
              {service.description}
            </p>
            {service.duration && (
              <span className="text-sm text-gray-500 mt-1">{service.duration}</span>
            )}
          </div>
          {showPricing && (
            <div className="col-span-12 lg:col-span-3 text-right">
              <div className="text-xl font-bold" style={{ color: customizations?.colors?.primary }}>
                {service.price}
              </div>
              {service.deliverables && (
                <div className="text-sm text-gray-500">{service.deliverables}</div>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="py-16 px-6" style={sanitizedStyle}>
      <div className="max-w-6xl mx-auto">
        {servicesData.title && (
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: customizations?.fonts?.heading }}
            >
              {servicesData.title}
            </h2>
            {servicesData.subtitle && (
              <p 
                className="text-xl text-gray-600"
                style={{ fontFamily: customizations?.fonts?.body }}
              >
                {servicesData.subtitle}
              </p>
            )}
          </div>
        )}
        
        {layout === 'cards' || layout === 'cards-dark' || layout === 'elegant-cards' ? 
          renderCards() : renderList()}
      </div>
    </div>
  );
};

export default ServicesSection;
