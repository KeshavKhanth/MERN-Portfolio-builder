import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import ComponentRenderer from '../editor/ComponentRenderer';
import { motion } from 'framer-motion';

const DynamicTemplateThumbnail = ({ template, sections, customizations }) => {
  const previewRef = useRef(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate actual HTML preview from template sections
  const generatePreview = async () => {
    if (!previewRef.current) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 0.3,
        width: 400,
        height: 600,
        backgroundColor: customizations?.colors?.background || '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: true
      });
      
      const imageUrl = canvas.toDataURL('image/jpeg', 0.8);
      setThumbnail(imageUrl);
    } catch (error) {
      console.error('Error generating thumbnail:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    // Generate thumbnail after component mounts
    const timer = setTimeout(() => {
      generatePreview();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [sections, customizations]);

  // Render mini version of actual components
  const renderMiniPreview = () => {
    if (!sections || sections.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-400">
            <p className="text-lg font-medium">No sections</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {sections.slice(0, 3).map((section, index) => (
          <div
            key={section.id || index}
            className="relative"
            style={{
              transform: 'scale(0.8)',
              transformOrigin: 'top left',
            }}
          >
            <ComponentRenderer
              component={section}
              isEditing={false}
              customizations={customizations}
            />
          </div>
        ))}
        {sections.length > 3 && (
          <div className="text-center text-gray-500 text-sm py-2">
            +{sections.length - 3} more sections
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full h-full">
      {/* Hidden preview container for html2canvas */}
      <div
        ref={previewRef}
        className="absolute -left-[9999px] top-0 w-[400px] h-[600px] overflow-hidden"
        style={{
          fontFamily: customizations?.fonts?.body || 'Inter, sans-serif',
          background: customizations?.colors?.background || '#ffffff'
        }}
      >
        {renderMiniPreview()}
      </div>

      {/* Display thumbnail or loading state */}
      {isGenerating ? (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full"
          />
        </div>
      ) : thumbnail ? (
        <img 
          src={thumbnail} 
          alt="Template Preview" 
          className="w-full h-full object-cover"
        />
      ) : (
        <div 
          className="w-full h-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${customizations?.colors?.primary || '#6366f1'} 0%, ${customizations?.colors?.secondary || '#ec4899'} 100%)`
          }}
        >
          <div className="text-center text-white p-6">
            <h3 className="text-xl font-bold mb-2">{template?.name || 'Template'}</h3>
            <p className="text-sm opacity-90">{template?.description || 'Preview'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicTemplateThumbnail;
