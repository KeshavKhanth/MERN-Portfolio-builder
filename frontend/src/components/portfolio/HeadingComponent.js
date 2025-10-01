import React, { useState, useEffect } from 'react';

const HeadingComponent = ({ 
  content, 
  level = 'h2', 
  align = 'left', 
  color,
  backgroundColor,
  padding = 'medium',
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

  const levelClasses = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-semibold',
    h3: 'text-2xl font-medium',
    h4: 'text-xl font-medium',
    h5: 'text-lg font-medium',
    h6: 'text-base font-medium'
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const paddingClasses = {
    none: '',
    small: 'py-2',
    medium: 'py-4',
    large: 'py-6'
  };

  const style = {
    color: color || customizations?.colors?.text,
    backgroundColor: backgroundColor || 'transparent',
    fontFamily: customizations?.fonts?.heading
  };

  const HeadingTag = level;

  if (isEditing) {
    return (
      <input
        type="text"
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        onBlur={handleBlur}
        className={`
          w-full outline-none border-2 border-blue-400 px-2
          ${levelClasses[level]}
          ${alignClasses[align]}
          ${paddingClasses[padding]}
        `}
        style={style}
        autoFocus
      />
    );
  }

  return (
    <HeadingTag
      className={`
        ${levelClasses[level]}
        ${alignClasses[align]}
        ${paddingClasses[padding]}
      `}
      style={style}
    >
      {editContent}
    </HeadingTag>
  );
};

export default HeadingComponent;
