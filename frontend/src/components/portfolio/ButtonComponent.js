import React, { useState, useEffect } from 'react';

const ButtonComponent = ({ 
  content,
  variant = 'primary',
  size = 'medium',
  rounded = true,
  href = '#',
  isEditing,
  onContentChange,
  onPropsChange,
  customizations 
}) => {
  const [buttonText, setButtonText] = useState(content);
  const [buttonLink, setButtonLink] = useState(href);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    setButtonText(content);
  }, [content]);

  const handleSave = () => {
    if (onContentChange) onContentChange(buttonText);
    if (onPropsChange) onPropsChange({ href: buttonLink });
    setShowEditModal(false);
  };

  const variantClasses = {
    primary: `bg-blue-600 text-white hover:bg-blue-700`,
    secondary: `bg-gray-600 text-white hover:bg-gray-700`,
    outline: `border-2 border-blue-600 text-blue-600 hover:bg-blue-50`,
    ghost: `text-blue-600 hover:bg-blue-50`
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  const baseClasses = `
    font-medium transition-colors duration-200
    ${rounded ? 'rounded-lg' : ''}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
  `;

  if (isEditing && showEditModal) {
    return (
      <div className="bg-white p-4 border-2 border-blue-400 rounded-lg">
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Button Text
          </label>
          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Button Link
          </label>
          <input
            type="text"
            value={buttonLink}
            onChange={(e) => setButtonLink(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={() => {
              setButtonText(content);
              setButtonLink(href);
              setShowEditModal(false);
            }}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  const ButtonTag = href && href !== '#' ? 'a' : 'button';
  const buttonProps = ButtonTag === 'a' ? { href: buttonLink } : {};

  return (
    <ButtonTag
      {...buttonProps}
      onClick={isEditing ? (e) => {
        e.preventDefault();
        setShowEditModal(true);
      } : undefined}
      className={baseClasses}
    >
      {buttonText}
    </ButtonTag>
  );
};

export default ButtonComponent;
