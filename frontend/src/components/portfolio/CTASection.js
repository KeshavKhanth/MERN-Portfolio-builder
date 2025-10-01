import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CTASection = ({ 
  content = {}, 
  layout = 'centered',
  isEditing,
  onContentChange,
  customizations,
  style = {}
}) => {
  const [ctaData, setCtaData] = useState({
    heading: content.heading || 'Ready to Get Started?',
    subheading: content.subheading || 'Let\'s work together',
    button: content.button || {
      text: 'Contact Me',
      link: '#contact',
      style: ''
    }
  });

  const handleFieldChange = (field, value) => {
    const updated = { ...ctaData, [field]: value };
    setCtaData(updated);
    if (onContentChange) {
      onContentChange(updated);
    }
  };

  const handleButtonChange = (field, value) => {
    const updated = {
      ...ctaData,
      button: { ...ctaData.button, [field]: value }
    };
    setCtaData(updated);
    if (onContentChange) {
      onContentChange(updated);
    }
  };

  const defaultButtonStyle = `px-8 py-3 bg-${customizations?.colors?.primary || 'blue-600'} 
    text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300`;

  // Sanitize style prop
  const sanitizedStyle = style && typeof style === 'object' && !Array.isArray(style)
    ? Object.fromEntries(
        Object.entries(style).filter(([key]) => 
          !key.startsWith('&') && !key.includes('::') && !key.includes(':')
        )
      )
    : {};

  const containerStyle = {
    ...sanitizedStyle,
    backgroundColor: sanitizedStyle.background || 'transparent'
  };

  if (isEditing) {
    return (
      <div className="py-16 px-6" style={containerStyle}>
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <input
            type="text"
            value={ctaData.heading}
            onChange={(e) => handleFieldChange('heading', e.target.value)}
            placeholder="CTA Heading"
            className="w-full text-3xl font-bold text-center border-b-2 border-gray-300 pb-2 outline-none bg-transparent"
            style={{ fontFamily: customizations?.fonts?.heading }}
          />
          <input
            type="text"
            value={ctaData.subheading}
            onChange={(e) => handleFieldChange('subheading', e.target.value)}
            placeholder="CTA Subheading"
            className="w-full text-xl text-gray-600 text-center border-b border-gray-200 pb-1 outline-none bg-transparent"
            style={{ fontFamily: customizations?.fonts?.body }}
          />
          <div className="flex justify-center items-center gap-4 pt-4">
            <input
              type="text"
              value={ctaData.button.text}
              onChange={(e) => handleButtonChange('text', e.target.value)}
              placeholder="Button Text"
              className="px-4 py-2 border border-gray-300 rounded outline-none"
            />
            <input
              type="text"
              value={ctaData.button.link}
              onChange={(e) => handleButtonChange('link', e.target.value)}
              placeholder="Button Link"
              className="px-4 py-2 border border-gray-300 rounded outline-none"
            />
          </div>
          <input
            type="text"
            value={ctaData.button.style || ''}
            onChange={(e) => handleButtonChange('style', e.target.value)}
            placeholder="Custom button CSS classes (optional)"
            className="w-full text-sm text-gray-500 border border-gray-200 rounded p-2 outline-none"
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="py-16 px-6"
      style={containerStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {ctaData.heading && (
          <h2 
            className="text-4xl font-bold"
            style={{ 
              fontFamily: customizations?.fonts?.heading,
              color: customizations?.colors?.text || '#1F2937'
            }}
          >
            {ctaData.heading}
          </h2>
        )}
        {ctaData.subheading && (
          <p 
            className="text-xl text-gray-600"
            style={{ 
              fontFamily: customizations?.fonts?.body,
              color: customizations?.colors?.muted || '#6B7280'
            }}
          >
            {ctaData.subheading}
          </p>
        )}
        {ctaData.button && (
          <div className="pt-4">
            <a
              href={ctaData.button.link}
              className={ctaData.button.style || defaultButtonStyle}
              style={{
                fontFamily: customizations?.fonts?.body
              }}
            >
              {ctaData.button.text}
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CTASection;
