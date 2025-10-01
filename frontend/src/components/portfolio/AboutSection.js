import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AboutSection = ({ 
  content = {},
  layout = 'side-by-side',
  imagePosition = 'left',
  isEditing,
  onContentChange,
  customizations 
}) => {
  const [aboutData, setAboutData] = useState({
    title: content.title || 'About Me',
    bio: content.bio || 'Write your professional biography here. Share your journey, passion, and what drives you in your career.',
    image: content.image || 'https://via.placeholder.com/400x400',
    highlights: content.highlights || [
      'Years of Experience',
      'Passionate Professional',
      'Problem Solver'
    ]
  });

  useEffect(() => {
    if (content) {
      setAboutData(prevData => ({
        ...prevData,
        ...content
      }));
    }
  }, [content]);

  const handleFieldChange = (field, value) => {
    const updated = { ...aboutData, [field]: value };
    if (onContentChange) {
      onContentChange(updated);
    }
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...aboutData.highlights];
    newHighlights[index] = value;
    handleFieldChange('highlights', newHighlights);
  };

  const addHighlight = () => {
    handleFieldChange('highlights', [...aboutData.highlights, 'New Highlight']);
  };

  const removeHighlight = (index) => {
    const newHighlights = aboutData.highlights.filter((_, i) => i !== index);
    handleFieldChange('highlights', newHighlights);
  };

  const renderContent = () => (
    <div className="space-y-6">
      {isEditing ? (
        <input
          type="text"
          value={aboutData.title}
          onChange={(e) => handleFieldChange('title', e.target.value)}
          className="text-3xl font-bold border-b-2 border-gray-300 outline-none w-full"
          style={{ color: customizations?.colors?.text }}
        />
      ) : (
        <h2 
          className="text-3xl font-bold"
          style={{ 
            color: customizations?.colors?.text,
            fontFamily: customizations?.fonts?.heading 
          }}
        >
          {aboutData.title}
        </h2>
      )}

      {isEditing ? (
        <textarea
          value={aboutData.bio}
          onChange={(e) => handleFieldChange('bio', e.target.value)}
          className="text-lg leading-relaxed border border-gray-300 rounded p-2 outline-none w-full resize-none"
          rows="6"
          style={{ color: customizations?.colors?.text }}
        />
      ) : (
        <p 
          className="text-lg leading-relaxed"
          style={{ 
            color: customizations?.colors?.text,
            fontFamily: customizations?.fonts?.body 
          }}
        >
          {aboutData.bio}
        </p>
      )}

      <div className="space-y-3">
        <h3 className="text-xl font-semibold mb-3">Key Highlights</h3>
        <ul className="space-y-2">
          {aboutData.highlights.map((highlight, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center"
            >
              <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {isEditing ? (
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                    className="flex-1 border-b border-gray-300 outline-none"
                  />
                  <button
                    onClick={() => removeHighlight(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <span>{highlight}</span>
              )}
            </motion.li>
          ))}
        </ul>
        {isEditing && (
          <button
            onClick={addHighlight}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Highlight
          </button>
        )}
      </div>
    </div>
  );

  const renderImage = () => (
    <div className="relative">
      <motion.img
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        src={aboutData.image}
        alt="About"
        className="rounded-lg shadow-xl w-full h-auto"
      />
      {isEditing && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="text"
            value={aboutData.image}
            onChange={(e) => handleFieldChange('image', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter image URL"
          />
        </div>
      )}
    </div>
  );

  if (layout === 'side-by-side') {
    return (
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`grid md:grid-cols-2 gap-12 items-center ${imagePosition === 'right' ? '' : 'md:flex-row-reverse'}`}>
            {imagePosition === 'left' ? (
              <>
                {renderImage()}
                {renderContent()}
              </>
            ) : (
              <>
                {renderContent()}
                {renderImage()}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Stacked layout
  return (
    <div className="py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {renderImage()}
        {renderContent()}
      </div>
    </div>
  );
};

export default AboutSection;
