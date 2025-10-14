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
      text: 'Download Resume',
      link: '#',
      download: false
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
      className={`relative flex ${heightClasses[height]} items-center overflow-hidden`}
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

      {/* Two-column layout: profile image (left) + content (right) */}
      <div className="relative z-10 px-6 py-12 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Profile image */}
          <div className="flex justify-center lg:justify-start">
            {isEditing ? (
              <div className="w-60 h-60 lg:w-[70vh] lg:h-[70vh] rounded-full overflow-hidden bg-gray-200 flex items-center justify-center lg:translate-x-[1cm]">
                <input
                  type="text"
                  value={heroData.profileImage || ''}
                  onChange={(e) => handleFieldChange('profileImage', e.target.value)}
                  placeholder="Profile image URL"
                  className="w-full px-2 py-1 text-sm"
                />
              </div>
            ) : (
              <img src={heroData.profileImage || 'https://via.placeholder.com/600'} alt={heroData.title} className="w-60 h-60 lg:w-[70vh] lg:h-[70vh] rounded-full object-cover shadow-lg lg:translate-x-[1cm]" />
            )}
          </div>

          {/* Right: Text content */}
          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {isEditing ? (
                <input
                  type="text"
                  value={heroData.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  className="text-2xl md:text-4xl font-bold mb-2 bg-transparent text-white border-b-2 border-white outline-none w-full text-left"
                  placeholder="Your Name"
                />
              ) : (
                <h1 className="text-2xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: customizations?.fonts?.heading }}>{heroData.title}</h1>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              {isEditing ? (
                <input type="text" value={heroData.subtitle} onChange={(e) => handleFieldChange('subtitle', e.target.value)} className="text-2xl md:text-4xl mb-4 bg-transparent text-gray-200 border-b border-gray-400 outline-none w-full text-left" placeholder="Professional Title" />
              ) : (
                <h2 className="text-2xl md:text-4xl text-gray-200 mb-4">{heroData.subtitle}</h2>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
              {isEditing ? (
                <textarea value={heroData.description} onChange={(e) => handleFieldChange('description', e.target.value)} className="text-base mb-6 bg-transparent text-gray-300 border border-gray-400 rounded p-2 outline-none w-full text-left resize-none" placeholder="Brief introduction" rows="4" />
              ) : (
                <p className="text-base text-gray-300 mb-6 max-w-xl">{heroData.description}</p>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }} className="flex gap-4 justify-center lg:justify-start">
              {heroData.ctaButton && (
                isEditing ? (
                  <div className="flex gap-2 items-center">
                    <input type="text" value={heroData.ctaButton?.text || ''} onChange={(e) => handleFieldChange('ctaButton', { ...heroData.ctaButton, text: e.target.value })} className="px-4 py-2 bg-white text-black rounded" placeholder="Button Text" />
                    <input type="text" value={heroData.ctaButton?.link || ''} onChange={(e) => handleFieldChange('ctaButton', { ...heroData.ctaButton, link: e.target.value })} className="px-4 py-2 bg-white text-black rounded" placeholder="Button Link (e.g. /files/resume.pdf)" />
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={!!heroData.ctaButton?.download} onChange={(e) => handleFieldChange('ctaButton', { ...heroData.ctaButton, download: e.target.checked })} />
                      <span>Downloadable</span>
                    </label>
                  </div>
                ) : (
                  (() => {
                    const href = heroData.ctaButton?.link || '#'
                    const isFile = /\.(pdf|docx?|zip|txt|rtf)$/i.test(href)
                    const shouldDownload = heroData.ctaButton?.download || isFile
                    const primaryColor = customizations?.colors?.primary || '#3b82f6';
                    return (
                      <a
                        href={href}
                        className="px-6 py-2 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200"
                        style={{ backgroundColor: primaryColor }}
                        {...(shouldDownload ? { download: true } : {})}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {heroData.ctaButton?.text || 'Download'}
                      </a>
                    )
                  })()
                )
              )}
            </motion.div>
          </div>
        </div>

        {isEditing && (
          <div className="mt-8 p-4 bg-white bg-opacity-90 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
            <input type="text" value={heroData.backgroundImage || ''} onChange={(e) => handleFieldChange('backgroundImage', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Enter image URL" />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
