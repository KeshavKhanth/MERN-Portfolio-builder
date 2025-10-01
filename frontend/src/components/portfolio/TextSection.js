import React, { useState } from 'react';

const TextSection = ({ 
  content = {}, 
  alignment = 'center',
  maxWidth = '800px',
  isEditing,
  onContentChange,
  customizations,
  style = {}
}) => {
  const [editContent, setEditContent] = useState({
    heading: content.heading || '',
    subheading: content.subheading || '',
    body: content.body || '',
    signature: content.signature || '',
    image: content.image || ''
  });

  const handleFieldChange = (field, value) => {
    const updated = { ...editContent, [field]: value };
    setEditContent(updated);
    if (onContentChange) {
      onContentChange(updated);
    }
  };

  // Sanitize style prop to remove invalid CSS properties
  const sanitizedStyle = style && typeof style === 'object' && !Array.isArray(style)
    ? Object.fromEntries(
        Object.entries(style).filter(([key]) => 
          !key.startsWith('&') && !key.includes('::') && !key.includes(':')
        )
      )
    : {};

  const containerStyle = {
    textAlign: alignment,
    maxWidth: maxWidth,
    margin: '0 auto',
    ...sanitizedStyle
  };

  if (isEditing) {
    return (
      <div style={containerStyle} className="space-y-4 p-6">
        <input
          type="text"
          value={editContent.heading}
          onChange={(e) => handleFieldChange('heading', e.target.value)}
          placeholder="Heading"
          className="w-full text-3xl font-bold border-b-2 border-gray-300 pb-2 outline-none"
          style={{ fontFamily: customizations?.fonts?.heading }}
        />
        {editContent.subheading !== undefined && (
          <input
            type="text"
            value={editContent.subheading}
            onChange={(e) => handleFieldChange('subheading', e.target.value)}
            placeholder="Subheading"
            className="w-full text-xl text-gray-600 border-b border-gray-200 pb-1 outline-none"
            style={{ fontFamily: customizations?.fonts?.subHeading }}
          />
        )}
        <textarea
          value={editContent.body}
          onChange={(e) => handleFieldChange('body', e.target.value)}
          placeholder="Body text"
          className="w-full min-h-[100px] text-base text-gray-700 border border-gray-200 rounded p-2 outline-none"
          style={{ fontFamily: customizations?.fonts?.body }}
        />
        {editContent.signature !== undefined && (
          <input
            type="text"
            value={editContent.signature}
            onChange={(e) => handleFieldChange('signature', e.target.value)}
            placeholder="Signature"
            className="w-full text-lg italic text-gray-600 border-b border-gray-200 pb-1 outline-none"
            style={{ fontFamily: customizations?.fonts?.accent }}
          />
        )}
        {editContent.image !== undefined && (
          <input
            type="text"
            value={editContent.image}
            onChange={(e) => handleFieldChange('image', e.target.value)}
            placeholder="Image URL"
            className="w-full text-sm text-gray-500 border border-gray-200 rounded p-1 outline-none"
          />
        )}
      </div>
    );
  }

  return (
    <div style={containerStyle} className="space-y-4">
      {editContent.heading && (
        <h2 
          className="text-3xl font-bold"
          style={{ 
            fontFamily: customizations?.fonts?.heading,
            color: customizations?.colors?.text 
          }}
        >
          {editContent.heading}
        </h2>
      )}
      {editContent.subheading && (
        <h3 
          className="text-xl text-gray-600"
          style={{ 
            fontFamily: customizations?.fonts?.subHeading,
            color: customizations?.colors?.muted 
          }}
        >
          {editContent.subheading}
        </h3>
      )}
      {editContent.image && (
        <div className="flex justify-center my-6">
          <img 
            src={editContent.image} 
            alt="Section" 
            className="rounded-lg max-w-xs"
            style={{ maxWidth: '200px' }}
          />
        </div>
      )}
      {editContent.body && (
        <div 
          className="text-base leading-relaxed whitespace-pre-wrap"
          style={{ 
            fontFamily: customizations?.fonts?.body,
            color: customizations?.colors?.text 
          }}
        >
          {editContent.body}
        </div>
      )}
      {editContent.signature && (
        <p 
          className="text-lg italic mt-4"
          style={{ 
            fontFamily: customizations?.fonts?.accent || "'Dancing Script', cursive",
            color: customizations?.colors?.primary 
          }}
        >
          {editContent.signature}
        </p>
      )}
    </div>
  );
};

export default TextSection;
