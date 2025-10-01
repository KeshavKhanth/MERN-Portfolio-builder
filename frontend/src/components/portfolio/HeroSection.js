import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ 
  content = {},
  layout = 'center',
  overlay = true,
  height = 'screen',
  isEditing,
  onContentChange,
  customizations 
}) => {
  const [heroData, setHeroData] = useState({
    title: content.title || 'Your Name',
    subtitle: content.subtitle || 'Professional Title',
    description: content.description || 'A brief introduction about yourself',
    backgroundImage: content.backgroundImage || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920',
    ctaButton: content.ctaButton || {
      text: 'View My Work',
      link: '#portfolio'
    }
  });

  useEffect(() => {
    if (content) {
      setHeroData(prevData => ({
        ...prevData,
        ...content
      }));
    }
  }, [content]);

  const handleFieldChange = (field, value) => {
    const updated = { ...heroData, [field]: value };
    if (onContentChange) {
      onContentChange(updated);
    }
  };

  const heightClasses = {
    screen: 'min-h-screen',
    large: 'min-h-[80vh]',
    medium: 'min-h-[60vh]',
    small: 'min-h-[40vh]'
  };

  const layoutClasses = {
    center: 'justify-center items-center text-center',
    left: 'justify-center items-start text-left',
    right: 'justify-center items-end text-right'
  };

  return (
    <div 
      className={`relative flex ${heightClasses[height]} ${layoutClasses[layout]} overflow-hidden`}
      style={{
        backgroundImage: heroData.backgroundImage ? `url(${heroData.backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: heroData.backgroundImage ? 'transparent' : '#1f2937'
      }}
    >
      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      )}

      {/* Content */}
      <div className="relative z-10 px-6 py-12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {isEditing ? (
            <input
              type="text"
              value={heroData.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              className="text-4xl md:text-6xl font-bold mb-4 bg-transparent text-white border-b-2 border-white outline-none w-full text-center"
              placeholder="Your Name"
            />
          ) : (
            <h1 
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: customizations?.fonts?.heading }}
            >
              {heroData.title}
            </h1>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isEditing ? (
            <input
              type="text"
              value={heroData.subtitle}
              onChange={(e) => handleFieldChange('subtitle', e.target.value)}
              className="text-xl md:text-2xl mb-6 bg-transparent text-gray-200 border-b border-gray-400 outline-none w-full text-center"
              placeholder="Professional Title"
            />
          ) : (
            <h2 className="text-xl md:text-2xl text-gray-200 mb-6">
              {heroData.subtitle}
            </h2>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {isEditing ? (
            <textarea
              value={heroData.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              className="text-lg mb-8 bg-transparent text-gray-300 border border-gray-400 rounded p-2 outline-none w-full text-center resize-none"
              placeholder="Brief introduction"
              rows="3"
            />
          ) : (
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              {heroData.description}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex gap-4 justify-center"
        >
          {heroData.ctaButton && (
            isEditing ? (
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={heroData.ctaButton?.text || ''}
                  onChange={(e) => handleFieldChange('ctaButton', { ...heroData.ctaButton, text: e.target.value })}
                  className="px-4 py-2 bg-white text-black rounded"
                  placeholder="Button Text"
                />
                <input
                  type="text"
                  value={heroData.ctaButton?.link || ''}
                  onChange={(e) => handleFieldChange('ctaButton', { ...heroData.ctaButton, link: e.target.value })}
                  className="px-4 py-2 bg-white text-black rounded"
                  placeholder="Button Link"
                />
              </div>
            ) : (
              <a
                href={heroData.ctaButton?.link || '#'}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                {heroData.ctaButton?.text || 'Get Started'}
              </a>
            )
          )}
        </motion.div>

        {isEditing && (
          <div className="mt-8 p-4 bg-white bg-opacity-90 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Image URL
            </label>
            <input
              type="text"
              value={heroData.backgroundImage || ''}
              onChange={(e) => handleFieldChange('backgroundImage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter image URL"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
