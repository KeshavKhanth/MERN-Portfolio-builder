import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ComponentRenderer from '../editor/ComponentRenderer';
import thumbnailService from '../../services/thumbnailService';

const PortfolioThumbnail = React.memo(({ portfolio, width = 400, height = 300 }) => {
  const previewRef = useRef(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Memoize sorted sections to avoid recalculating on every render
  const sortedSections = useMemo(() => {
    if (!portfolio?.sections) return [];
    return [...portfolio.sections]
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .slice(0, 3); // Only take first 3 for thumbnail
  }, [portfolio?.sections]);

  useEffect(() => {
    // Debounce thumbnail generation to avoid excessive calls
    const timer = setTimeout(() => {
      generateThumbnail();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [portfolio?._id]); // Only regenerate when portfolio ID changes

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

    // Skip expensive thumbnail generation for now, use lightweight preview
    // This significantly improves performance
    return;
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
    return (
      <div className="bg-white">
        {sortedSections.map((section) => (
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
        {portfolio.sections.length > 3 && (
          <div className="text-center py-2 text-xs text-gray-400">
            +{portfolio.sections.length - 3} more sections
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
      {/* Visible preview - optimized to not use hidden element */}
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
});

PortfolioThumbnail.displayName = 'PortfolioThumbnail';

export default PortfolioThumbnail;
