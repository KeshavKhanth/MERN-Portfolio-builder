import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ComponentRenderer from '../editor/ComponentRenderer';
import thumbnailService from '../../services/thumbnailService';

const PortfolioThumbnail = ({ portfolio, width = 400, height = 300 }) => {
  const previewRef = useRef(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    generateThumbnail();
  }, [portfolio]);

  const generateThumbnail = async () => {
    if (!portfolio || !portfolio.sections) {
      // Use gradient thumbnail as fallback
      const gradientStyle = thumbnailService.generateGradientThumbnail(portfolio || {});
      setThumbnailUrl(null);
      return;
    }

    // Check for cached thumbnail first
    const cached = thumbnailService.getCachedThumbnail(portfolio._id);
    if (cached) {
      setThumbnailUrl(cached);
      return;
    }

    // Generate new thumbnail after a short delay to let content render
    setIsGenerating(true);
    setTimeout(async () => {
      if (previewRef.current) {
        const thumbnail = await thumbnailService.generateThumbnail(previewRef.current, {
          width,
          height,
          scale: 0.5
        });
        
        if (thumbnail) {
          setThumbnailUrl(thumbnail);
          thumbnailService.cacheThumbnail(portfolio._id, thumbnail);
        }
      }
      setIsGenerating(false);
    }, 500);
  };

  const renderPreviewContent = () => {
    if (!portfolio || !portfolio.sections) {
      return (
        <div 
          className="w-full h-full flex items-center justify-center"
          style={thumbnailService.generateGradientThumbnail(portfolio || {})}
        >
          <div className="text-center text-white">
            <h3 className="text-xl font-bold mb-2">{portfolio?.title || 'Portfolio'}</h3>
            <p className="text-sm opacity-90">{portfolio?.template || 'Custom'}</p>
          </div>
        </div>
      );
    }

    // Render actual portfolio sections in miniature
    const sortedSections = [...portfolio.sections].sort((a, b) => (a.order || 0) - (b.order || 0));
    
    return (
      <div className="bg-white">
        {sortedSections.slice(0, 3).map((section) => (
          <div 
            key={section.id || section._id} 
            className="relative"
            style={{
              minHeight: '100px',
              padding: '20px',
              borderBottom: '1px solid #e5e7eb'
            }}
          >
            {/* Simplified section rendering for thumbnail */}
            <div className="text-center">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">
                {section.name || section.type}
              </h4>
              {section.content?.title && (
                <p className="text-xs text-gray-600">{section.content.title}</p>
              )}
              {section.content?.description && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {section.content.description}
                </p>
              )}
            </div>
          </div>
        ))}
        {sortedSections.length > 3 && (
          <div className="text-center py-2 text-xs text-gray-400">
            +{sortedSections.length - 3} more sections
          </div>
        )}
      </div>
    );
  };

  if (thumbnailUrl) {
    return (
      <div 
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${thumbnailUrl})` }}
      />
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-50">
      {/* Hidden preview for thumbnail generation */}
      <div 
        ref={previewRef}
        className="absolute"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          left: '-9999px',
          top: '-9999px'
        }}
      >
        {renderPreviewContent()}
      </div>

      {/* Visible preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isGenerating ? 0.5 : 1 }}
        className="w-full h-full"
        style={{
          transform: 'scale(0.25)',
          transformOrigin: 'top left',
          width: `${width * 4}px`,
          height: `${height * 4}px`
        }}
      >
        {renderPreviewContent()}
      </motion.div>

      {isGenerating && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
          <div className="text-white text-xs">Generating preview...</div>
        </div>
      )}
    </div>
  );
};

export default PortfolioThumbnail;
