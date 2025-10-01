import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaEye,
  FaStar,
  FaCheck,
  FaMagic,
  FaLayerGroup,
  FaPalette,
  FaMobileAlt,
  FaRocket
} from 'react-icons/fa';
import DynamicTemplateThumbnail from './DynamicTemplateThumbnail';

const TemplatePreview = ({ template, onSelect, onPreview, isSelected }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Enhanced template data with real details from template files
  const defaultTemplates = {
    'modern-minimalist': {
      name: template.name || 'Modern Minimalist',
      description: template.description || 'Clean and elegant design with focus on content',
      features: ['Minimal Design', 'Typography Focus', 'Clean Layout', 'Mobile Optimized'],
      colors: template.customizations?.colors ? [
        template.customizations.colors.primary,
        template.customizations.colors.secondary,
        template.customizations.colors.accent,
        template.customizations.colors.background
      ].filter(Boolean) : ['#000000', '#FFFFFF', '#666666', '#F0F0F0'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      sections: template.sections?.length || 5,
      rating: 4.8
    },
    'creative-dark': {
      name: template.name || 'Creative Dark',
      description: template.description || 'Bold dark theme perfect for creative professionals',
      features: ['Dark Mode', 'Animated Sections', 'Creative Layout', 'Portfolio Grid'],
      colors: template.customizations?.colors ? [
        template.customizations.colors.primary,
        template.customizations.colors.secondary,
        template.customizations.colors.accent,
        template.customizations.colors.background
      ].filter(Boolean) : ['#1a1a1a', '#ffffff', '#ff6b6b', '#4ecdc4'],
      gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d3561 100%)',
      sections: template.sections?.length || 7,
      rating: 4.9
    },
    'professional-corporate': {
      name: template.name || 'Professional Corporate',
      description: template.description || 'Professional design ideal for business and consultants',
      features: ['Corporate Style', 'Experience Timeline', 'Client Testimonials', 'Services Section'],
      colors: template.customizations?.colors ? [
        template.customizations.colors.primary,
        template.customizations.colors.secondary,
        template.customizations.colors.accent,
        template.customizations.colors.background
      ].filter(Boolean) : ['#2c3e50', '#3498db', '#ecf0f1', '#e74c3c'],
      gradient: 'linear-gradient(135deg, #3498db 0%, #2c3e50 100%)',
      sections: template.sections?.length || 8,
      rating: 4.7
    },
    'modern-creative': {
      name: template.name || 'Modern Creative',
      description: template.description || 'Vibrant and creative design with stunning animations',
      features: ['Gradient Design', 'Modern Animations', 'Creative Sections', 'Social Integration'],
      colors: template.customizations?.colors ? [
        template.customizations.colors.primary,
        template.customizations.colors.secondary,
        template.customizations.colors.accent,
        template.customizations.colors.background
      ].filter(Boolean) : ['#6366f1', '#ec4899', '#f59e0b', '#ffffff'],
      gradient: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
      sections: template.sections?.length || 7,
      rating: 5.0
    },
    'tattoo-artist': {
      name: template.name || 'Ink Master',
      description: template.description || 'Dark, edgy portfolio perfect for tattoo artists',
      features: ['Dark Theme', 'Edgy Design', 'Gallery Focus', 'Booking System'],
      colors: template.customizations?.colors ? [
        template.customizations.colors.primary,
        template.customizations.colors.secondary,
        template.customizations.colors.accent,
        template.customizations.colors.background
      ].filter(Boolean) : ['#DC2626', '#000000', '#F59E0B', '#0A0A0A'],
      gradient: 'linear-gradient(135deg, #DC2626 0%, #000000 100%)',
      sections: template.sections?.length || 8,
      rating: 4.8
    },
    'photographer-minimal': {
      name: template.name || 'Visual Stories',
      description: template.description || 'Minimalist portfolio for photographers',
      features: ['Full Screen Gallery', 'Minimal UI', 'Focus on Photos', 'Clean Typography'],
      colors: template.customizations?.colors ? [
        template.customizations.colors.primary,
        template.customizations.colors.secondary,
        template.customizations.colors.accent,
        template.customizations.colors.background
      ].filter(Boolean) : ['#000000', '#FFFFFF', '#F97316', '#FAFAFA'],
      gradient: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)',
      sections: template.sections?.length || 9,
      rating: 4.9
    },
    'designer-bio': {
      name: template.name || 'Creative Designer',
      description: template.description || 'Elegant portfolio with sophisticated typography',
      features: ['Elegant Design', 'Soft Colors', 'Creative Layout', 'Process Timeline'],
      colors: template.customizations?.colors ? [
        template.customizations.colors.primary,
        template.customizations.colors.secondary,
        template.customizations.colors.accent,
        template.customizations.colors.background
      ].filter(Boolean) : ['#E8B4B8', '#67595E', '#EED6D3', '#FFF8F3'],
      gradient: 'linear-gradient(135deg, #E8B4B8 0%, #FFF8F3 100%)',
      sections: template.sections?.length || 9,
      rating: 5.0
    },
    'default': {
      name: template.name || 'Simple Start',
      description: template.description || 'Basic template to get you started quickly',
      features: ['Simple Layout', 'Easy to Customize', 'All Essential Sections', 'Responsive'],
      colors: template.customizations?.colors ? [
        template.customizations.colors.primary,
        template.customizations.colors.secondary,
        template.customizations.colors.accent,
        template.customizations.colors.background
      ].filter(Boolean) : ['#3b82f6', '#1f2937', '#ffffff', '#f3f4f6'],
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
      sections: template.sections?.length || 4,
      rating: 4.5
    }
  };

  const templateData = defaultTemplates[template.slug] || defaultTemplates['default'];

  const handlePreviewClick = () => {
    if (onPreview) {
      onPreview(template);
    } else {
      setShowDetails(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`relative bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer group ${
        isSelected ? 'ring-4 ring-blue-500 ring-offset-2' : ''
      }`}
      onClick={() => onSelect(template)}
    >
      {/* Dynamic Template Preview */}
      <div className="relative h-56 overflow-hidden">
        {template.sections && template.sections.length > 0 ? (
          <DynamicTemplateThumbnail 
            template={template}
            sections={template.sections}
            customizations={template.customizations}
          />
        ) : templateData.preview ? (
          <img 
            src={templateData.preview} 
            alt={templateData.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ background: templateData.gradient }}
          >
            <div className="text-center text-white">
              <FaMagic className="text-4xl mb-3 mx-auto opacity-80" />
              <h3 className="text-xl font-bold">{templateData.name}</h3>
              <p className="text-sm opacity-80 mt-1">Template Preview</p>
            </div>
          </div>
        )}

        {/* Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePreviewClick();
            }}
            className="px-4 py-2 bg-white/90 backdrop-blur text-gray-900 rounded-lg font-medium hover:bg-white transition-colors flex items-center gap-2"
          >
            <FaEye /> Quick Preview
          </button>
        </motion.div>

        {/* Selected Badge */}
        {isSelected && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full">
            <FaCheck className="text-sm" />
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur text-white px-3 py-1 rounded-full flex items-center gap-1">
          <FaStar className="text-yellow-400 text-sm" />
          <span className="text-sm font-medium">{templateData.rating}</span>
        </div>
      </div>

      {/* Template Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {templateData.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {templateData.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {templateData.features.slice(0, 3).map((feature, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <FaLayerGroup className="text-xs" />
              <span>{templateData.sections} sections</span>
            </div>
            <div className="flex items-center gap-1">
              <FaMobileAlt className="text-xs" />
              <span>Responsive</span>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="flex items-center gap-1 mt-4">
          <FaPalette className="text-xs text-gray-400" />
          <div className="flex gap-1">
            {templateData.colors.map((color, index) => (
              <div
                key={index}
                className="w-5 h-5 rounded-full border border-gray-200"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          {/* Preview Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePreviewClick();
            }}
            className="flex-1 py-2 px-3 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-all duration-200 flex items-center justify-center gap-1"
          >
            <FaEye className="text-sm" />
            Preview
          </button>
          
          {/* Select Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(template);
            }}
            className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-1 ${
              isSelected
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isSelected ? (
              <>
                <FaCheck className="text-sm" />
                Selected
              </>
            ) : (
              <>
                <FaRocket className="text-sm" />
                Use Template
              </>
            )}
          </button>
        </div>
      </div>

      {/* Detailed Preview Modal (can be expanded) */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={(e) => {
            e.stopPropagation();
            setShowDetails(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{templateData.name} - Preview</h2>
              
              {/* Full Preview Image */}
              {templateData.preview ? (
                <img 
                  src={templateData.preview} 
                  alt={templateData.name}
                  className="w-full rounded-lg mb-6"
                />
              ) : (
                <div 
                  className="w-full h-96 rounded-lg mb-6 flex items-center justify-center"
                  style={{ background: templateData.gradient }}
                >
                  <div className="text-center text-white">
                    <FaMagic className="text-6xl mb-4 mx-auto opacity-80" />
                    <h3 className="text-3xl font-bold mb-2">{templateData.name}</h3>
                    <p className="text-lg opacity-80">Full Template Preview</p>
                  </div>
                </div>
              )}

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {templateData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FaCheck className="text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    onSelect(template);
                    setShowDetails(false);
                  }}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Use This Template
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TemplatePreview;
