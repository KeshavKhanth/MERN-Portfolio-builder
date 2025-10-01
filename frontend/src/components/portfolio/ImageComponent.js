import React, { useState, useEffect } from 'react';

const ImageComponent = ({ 
  content, 
  alt = 'Portfolio Image',
  objectFit = 'cover',
  rounded = true,
  width = '100%',
  height = 'auto',
  isEditing,
  onContentChange,
  customizations 
}) => {
  const [imageUrl, setImageUrl] = useState(content);
  const [showUrlInput, setShowUrlInput] = useState(false);

  useEffect(() => {
    setImageUrl(content);
  }, [content]);

  const handleUrlChange = () => {
    if (onContentChange && imageUrl !== content) {
      onContentChange(imageUrl);
    }
    setShowUrlInput(false);
  };

  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down'
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  return (
    <div className="relative group">
      <img
        src={imageUrl || 'https://via.placeholder.com/600x400'}
        alt={alt}
        className={`
          ${objectFitClasses[objectFit]}
          ${rounded ? roundedClasses.lg : ''}
        `}
        style={{ width, height }}
      />
      
      {isEditing && (
        <>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setShowUrlInput(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Change Image
            </button>
          </div>
          
          {showUrlInput && (
            <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center p-4">
              <div className="w-full max-w-md">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Enter image URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleUrlChange}
                    className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setImageUrl(content);
                      setShowUrlInput(false);
                    }}
                    className="flex-1 px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImageComponent;
