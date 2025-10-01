import React, { useState } from 'react';

const FooterSection = ({ 
  content = {}, 
  layout = 'minimal',
  isEditing,
  onContentChange,
  customizations,
  style = {}
}) => {
  const [footerData, setFooterData] = useState({
    text: content.text || '© 2025 Portfolio. All rights reserved.',
    links: content.links || []
  });

  const handleFieldChange = (field, value) => {
    const updated = { ...footerData, [field]: value };
    setFooterData(updated);
    if (onContentChange) {
      onContentChange(updated);
    }
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...footerData.links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    const updated = { ...footerData, links: updatedLinks };
    setFooterData(updated);
    if (onContentChange) {
      onContentChange(updated);
    }
  };

  const addLink = () => {
    const newLink = { text: 'Link', url: '#' };
    handleFieldChange('links', [...footerData.links, newLink]);
  };

  const removeLink = (index) => {
    const updatedLinks = footerData.links.filter((_, i) => i !== index);
    handleFieldChange('links', updatedLinks);
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
      <footer className="py-8 px-6" style={sanitizedStyle}>
        <div className="max-w-6xl mx-auto">
          <div className="space-y-4">
            <input
              type="text"
              value={footerData.text}
              onChange={(e) => handleFieldChange('text', e.target.value)}
              placeholder="Footer text"
              className="w-full text-center border border-gray-300 rounded px-3 py-2 bg-transparent"
            />
            
            <div className="space-y-2">
              <h4 className="text-sm font-bold">Footer Links:</h4>
              {footerData.links.map((link, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={link.text}
                    onChange={(e) => handleLinkChange(index, 'text', e.target.value)}
                    placeholder="Link text"
                    className="flex-1 border border-gray-300 rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                    placeholder="URL"
                    className="flex-1 border border-gray-300 rounded px-2 py-1"
                  />
                  <button
                    onClick={() => removeLink(index)}
                    className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={addLink}
                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
              >
                Add Link
              </button>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer 
      className="py-8 px-6"
      style={{
        backgroundColor: sanitizedStyle.background || customizations?.colors?.background || '#000000',
        color: sanitizedStyle.color || customizations?.colors?.text || '#FFFFFF',
        ...sanitizedStyle
      }}
    >
      <div className="max-w-6xl mx-auto">
        {layout === 'minimal' ? (
          <div className="text-center space-y-4">
            <div className="text-sm" style={{ fontFamily: customizations?.fonts?.body }}>
              {footerData.text}
            </div>
            {footerData.links && footerData.links.length > 0 && (
              <div className="flex justify-center gap-6">
                {footerData.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="hover:opacity-80 transition-opacity"
                    style={{ color: 'inherit' }}
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <p className="text-sm" style={{ fontFamily: customizations?.fonts?.body }}>
                {footerData.text}
              </p>
            </div>
            <div>
              {footerData.links && footerData.links.length > 0 && (
                <div className="flex flex-col space-y-2">
                  {footerData.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="hover:opacity-80 transition-opacity text-sm"
                      style={{ color: 'inherit' }}
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default FooterSection;
