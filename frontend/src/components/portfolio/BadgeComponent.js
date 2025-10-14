import React, { useState, useEffect } from 'react';

const BadgeComponent = ({ 
  content = '', 
  variant = 'primary',
  size = 'medium',
  rounded = 'full',
  isEditing,
  onContentChange,
  customizations 
}) => {
  const [editContent, setEditContent] = useState(content || '');

  useEffect(() => {
    setEditContent(content || '');
  }, [content]);

  const handleBlur = () => {
    if (onContentChange && editContent !== content) {
      onContentChange(editContent);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const variantClasses = {
    primary: 'bg-blue-100 text-blue-800 border-blue-300',
    success: 'bg-green-100 text-green-800 border-green-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    info: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    gray: 'bg-gray-100 text-gray-800 border-gray-300',
    purple: 'bg-purple-100 text-purple-800 border-purple-300'
  };

  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-1.5 text-base'
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  if (isEditing) {
    return (
      <div className="inline-block">
        <input
          type="text"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          className={`
            outline-none border-2 border-blue-400
            ${sizeClasses[size]}
            ${roundedClasses[rounded]}
            ${variantClasses[variant]}
          `}
          placeholder="Badge text..."
          autoFocus
        />
      </div>
    );
  }

  return (
    <span
      className={`
        inline-block font-medium border
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${roundedClasses[rounded]}
      `}
    >
      {editContent || 'Badge'}
    </span>
  );
};

export default BadgeComponent;
