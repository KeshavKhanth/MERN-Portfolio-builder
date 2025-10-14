import React from 'react';

const Spacer = ({ content = 'medium', isEditing, onContentChange }) => {
  const heightClasses = {
    small: 'h-8',
    medium: 'h-16',
    large: 'h-24',
    xlarge: 'h-32'
  };

  const handleHeightChange = (e) => {
    const newHeight = e.target.value;
    if (onContentChange) {
      onContentChange(newHeight);
    }
  };

  return (
    <div className="w-full">
      {isEditing ? (
        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 rounded p-4">
          <div className="text-center">
            <span className="text-sm text-gray-600 mb-2 block">Spacer Height</span>
            <select
              value={content}
              onChange={handleHeightChange}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="small">Small (32px)</option>
              <option value="medium">Medium (64px)</option>
              <option value="large">Large (96px)</option>
              <option value="xlarge">Extra Large (128px)</option>
            </select>
          </div>
        </div>
      ) : (
        <div className={`w-full ${heightClasses[content] || heightClasses.medium}`}></div>
      )}
    </div>
  );
};

export default Spacer;