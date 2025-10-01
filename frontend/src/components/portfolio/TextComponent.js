import React, { useState, useEffect } from 'react';

const TextComponent = ({ 
  content, 
  align = 'left', 
  fontSize = 'base', 
  color,
  backgroundColor,
  padding = 'medium',
  rounded = 'none',
  shadow = 'none',
  isEditing,
  onContentChange,
  customizations 
}) => {
  const [editContent, setEditContent] = useState(content);

  useEffect(() => {
    setEditContent(content);
  }, [content]);

  const handleBlur = () => {
    if (onContentChange && editContent !== content) {
      onContentChange(editContent);
    }
  };

  const fontSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl'
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };

  const paddingClasses = {
    none: '',
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6',
    xl: 'p-8'
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const style = {
    color: color || customizations?.colors?.text,
    backgroundColor: backgroundColor || 'transparent',
    fontFamily: customizations?.fonts?.body
  };

  if (isEditing) {
    return (
      <textarea
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        onBlur={handleBlur}
        className={`
          w-full resize-none outline-none border-2 border-blue-400
          ${fontSizeClasses[fontSize]}
          ${alignClasses[align]}
          ${paddingClasses[padding]}
          ${roundedClasses[rounded]}
          ${shadowClasses[shadow]}
        `}
        style={style}
        autoFocus
      />
    );
  }

  return (
    <div
      className={`
        ${fontSizeClasses[fontSize]}
        ${alignClasses[align]}
        ${paddingClasses[padding]}
        ${roundedClasses[rounded]}
        ${shadowClasses[shadow]}
      `}
      style={style}
    >
      {editContent}
    </div>
  );
};

export default TextComponent;
