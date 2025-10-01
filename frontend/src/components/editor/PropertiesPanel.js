import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPalette,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaTrash,
  FaCog,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import { MdAnimation } from 'react-icons/md';

const PropertiesPanel = ({ section, component, onUpdate, onDelete, customizations }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [colorTarget, setColorTarget] = useState(null);

  // Support both section and component props for backward compatibility
  const item = section || component;
  if (!item) return null;

  const handleColorChange = (color) => {
    setSelectedColor(color);
    if (colorTarget) {
      onUpdate({
        props: {
          ...item.props,
          [colorTarget]: color
        }
      });
    }
  };

  const handleAlignmentChange = (alignment) => {
    onUpdate({
      props: {
        ...item.props,
        align: alignment
      }
    });
  };

  const handleSizeChange = (size) => {
    onUpdate({
      size: {
        ...item.size,
        ...size
      }
    });
  };

  const renderGeneralProperties = () => {
    return (
      <div className="space-y-4">
        {/* Component ID */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Section ID
          </label>
          <input
            type="text"
            value={item.id}
            readOnly
            className="w-full px-3 py-1 text-sm bg-gray-100 border border-gray-300 rounded"
          />
        </div>

        {/* Section Type */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Type
          </label>
          <div className="px-3 py-1 text-sm bg-gray-100 border border-gray-300 rounded capitalize">
            {item.type || 'empty'}
          </div>
        </div>

        {/* Section Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={item.name || 'Untitled Section'}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
          />
        </div>

        {/* Position */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Position
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-500">X</label>
              <input
                type="number"
                value={item.position?.x || 0}
                onChange={(e) => onUpdate({
                  position: {
                    ...item.position,
                    x: parseInt(e.target.value)
                  }
                })}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Y</label>
              <input
                type="number"
                value={item.position?.y || 0}
                onChange={(e) => onUpdate({
                  position: {
                    ...item.position,
                    y: parseInt(e.target.value)
                  }
                })}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Size */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Size
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-500">Width</label>
              <input
                type="text"
                value={item.size?.width || 'auto'}
                onChange={(e) => handleSizeChange({ width: e.target.value })}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Height</label>
              <input
                type="text"
                value={item.size?.height || 'auto'}
                onChange={(e) => handleSizeChange({ height: e.target.value })}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Layer Order */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Layer Order
          </label>
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-sm flex items-center justify-center gap-1">
              <FaArrowUp /> Bring Forward
            </button>
            <button className="flex-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-sm flex items-center justify-center gap-1">
              <FaArrowDown /> Send Back
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderStyleProperties = () => {
    return (
      <div className="space-y-4">
        {/* Text Alignment - for text/heading items */}
        {(item.type === 'text' || item.type === 'heading' || item.type === 'button') && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Alignment
            </label>
            <div className="flex gap-1">
              {['left', 'center', 'right', 'justify'].map((align) => (
                <button
                  key={align}
                  onClick={() => handleAlignmentChange(align)}
                  className={`
                    flex-1 p-2 rounded transition-colors
                    ${item.props?.align === align
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }
                  `}
                >
                  {align === 'left' && <FaAlignLeft />}
                  {align === 'center' && <FaAlignCenter />}
                  {align === 'right' && <FaAlignRight />}
                  {align === 'justify' && <FaAlignJustify />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Typography Settings */}
        {(item.type === 'text' || item.type === 'heading' || item.type === 'button') && (
          <>
            {/* Font Size */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Font Size
              </label>
              <select
                value={item.props?.fontSize || 'base'}
                onChange={(e) => onUpdate({
                  props: { ...item.props, fontSize: e.target.value }
                })}
                className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
              >
                <option value="xs">Extra Small (12px)</option>
                <option value="sm">Small (14px)</option>
                <option value="base">Base (16px)</option>
                <option value="lg">Large (18px)</option>
                <option value="xl">Extra Large (20px)</option>
                <option value="2xl">2X Large (24px)</option>
                <option value="3xl">3X Large (30px)</option>
                <option value="4xl">4X Large (36px)</option>
                <option value="5xl">5X Large (48px)</option>
              </select>
            </div>

            {/* Font Weight */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Font Weight
              </label>
              <select
                value={item.props?.fontWeight || 'normal'}
                onChange={(e) => onUpdate({
                  props: { ...item.props, fontWeight: e.target.value }
                })}
                className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
              >
                <option value="thin">Thin (100)</option>
                <option value="extralight">Extra Light (200)</option>
                <option value="light">Light (300)</option>
                <option value="normal">Normal (400)</option>
                <option value="medium">Medium (500)</option>
                <option value="semibold">Semibold (600)</option>
                <option value="bold">Bold (700)</option>
                <option value="extrabold">Extra Bold (800)</option>
                <option value="black">Black (900)</option>
              </select>
            </div>

            {/* Font Family */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Font Family
              </label>
              <select
                value={item.props?.fontFamily || 'default'}
                onChange={(e) => onUpdate({
                  props: { ...item.props, fontFamily: e.target.value }
                })}
                className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
              >
                <option value="default">Default</option>
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Poppins">Poppins</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Playfair Display">Playfair Display</option>
                <option value="Raleway">Raleway</option>
                <option value="Lato">Lato</option>
                <option value="Source Sans Pro">Source Sans Pro</option>
                <option value="monospace">Monospace</option>
              </select>
            </div>

            {/* Text Style Options */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Text Style
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => onUpdate({
                    props: { 
                      ...item.props, 
                      fontStyle: item.props?.fontStyle === 'italic' ? 'normal' : 'italic' 
                    }
                  })}
                  className={`px-3 py-1 border rounded text-sm ${
                    item.props?.fontStyle === 'italic' 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'bg-white border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <i>Italic</i>
                </button>
                <button
                  onClick={() => onUpdate({
                    props: { 
                      ...item.props, 
                      textDecoration: item.props?.textDecoration === 'underline' ? 'none' : 'underline' 
                    }
                  })}
                  className={`px-3 py-1 border rounded text-sm ${
                    item.props?.textDecoration === 'underline' 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'bg-white border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <u>Underline</u>
                </button>
                <button
                  onClick={() => onUpdate({
                    props: { 
                      ...item.props, 
                      textTransform: item.props?.textTransform === 'uppercase' ? 'none' : 'uppercase' 
                    }
                  })}
                  className={`px-3 py-1 border rounded text-sm ${
                    item.props?.textTransform === 'uppercase' 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'bg-white border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  AA
                </button>
              </div>
            </div>

            {/* Line Height */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Line Height
              </label>
              <select
                value={item.props?.lineHeight || 'normal'}
                onChange={(e) => onUpdate({
                  props: { ...item.props, lineHeight: e.target.value }
                })}
                className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
              >
                <option value="tight">Tight (1.25)</option>
                <option value="snug">Snug (1.375)</option>
                <option value="normal">Normal (1.5)</option>
                <option value="relaxed">Relaxed (1.625)</option>
                <option value="loose">Loose (2)</option>
              </select>
            </div>

            {/* Letter Spacing */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Letter Spacing
              </label>
              <select
                value={item.props?.letterSpacing || 'normal'}
                onChange={(e) => onUpdate({
                  props: { ...item.props, letterSpacing: e.target.value }
                })}
                className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
              >
                <option value="tighter">Tighter (-0.05em)</option>
                <option value="tight">Tight (-0.025em)</option>
                <option value="normal">Normal (0)</option>
                <option value="wide">Wide (0.025em)</option>
                <option value="wider">Wider (0.05em)</option>
                <option value="widest">Widest (0.1em)</option>
              </select>
            </div>
          </>
        )}

        {/* Colors */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Colors
          </label>
          <div className="space-y-2">
            {/* Text Color */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Text Color</span>
              <button
                onClick={() => {
                  setColorTarget('color');
                  setSelectedColor(item.props?.color || '#000000');
                  setShowColorPicker(!showColorPicker);
                }}
                className="w-8 h-8 rounded border-2 border-gray-300"
                style={{ backgroundColor: item.props?.color || '#000000' }}
              />
            </div>

            {/* Background Color */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Background</span>
              <button
                onClick={() => {
                  setColorTarget('backgroundColor');
                  setSelectedColor(item.props?.backgroundColor || '#ffffff');
                  setShowColorPicker(!showColorPicker);
                }}
                className="w-8 h-8 rounded border-2 border-gray-300"
                style={{ backgroundColor: item.props?.backgroundColor || '#ffffff' }}
              />
            </div>
          </div>
        </div>

        {/* Padding */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Padding
          </label>
          <select
            value={item.props?.padding || 'medium'}
            onChange={(e) => onUpdate({
              props: { ...item.props, padding: e.target.value }
            })}
            className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
          >
            <option value="none">None</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="xl">Extra Large</option>
          </select>
        </div>

        {/* Border Radius */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Border Radius
          </label>
          <select
            value={item.props?.rounded || 'none'}
            onChange={(e) => onUpdate({
              props: { ...item.props, rounded: e.target.value }
            })}
            className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
          >
            <option value="none">None</option>
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
            <option value="xl">Extra Large</option>
            <option value="full">Full</option>
          </select>
        </div>

        {/* Shadow */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Shadow
          </label>
          <select
            value={item.props?.shadow || 'none'}
            onChange={(e) => onUpdate({
              props: { ...item.props, shadow: e.target.value }
            })}
            className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
          >
            <option value="none">None</option>
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
            <option value="xl">Extra Large</option>
          </select>
        </div>
      </div>
    );
  };

  const renderAnimationProperties = () => {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Animation Type
          </label>
          <select
            value={item.props?.animation || 'none'}
            onChange={(e) => onUpdate({
              props: { ...item.props, animation: e.target.value }
            })}
            className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
          >
            <option value="none">None</option>
            <option value="fadeIn">Fade In</option>
            <option value="slideUp">Slide Up</option>
            <option value="slideDown">Slide Down</option>
            <option value="slideLeft">Slide Left</option>
            <option value="slideRight">Slide Right</option>
            <option value="zoomIn">Zoom In</option>
            <option value="bounce">Bounce</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Duration
          </label>
          <select
            value={item.props?.animationDuration || 'normal'}
            onChange={(e) => onUpdate({
              props: { ...item.props, animationDuration: e.target.value }
            })}
            className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
          >
            <option value="fast">Fast (0.3s)</option>
            <option value="normal">Normal (0.5s)</option>
            <option value="slow">Slow (1s)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Delay
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={item.props?.animationDelay || 0}
            onChange={(e) => onUpdate({
              props: { ...item.props, animationDelay: parseFloat(e.target.value) }
            })}
            className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Properties</h3>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('general')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'general'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FaCog className="inline mr-1" /> General
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'style'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FaPalette className="inline mr-1" /> Style
        </button>
        <button
          onClick={() => setActiveTab('animation')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'animation'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <MdAnimation className="inline mr-1" /> Animation
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'general' && renderGeneralProperties()}
        {activeTab === 'style' && renderStyleProperties()}
        {activeTab === 'animation' && renderAnimationProperties()}
      </div>

      {/* Color Picker Popup */}
      <AnimatePresence>
        {showColorPicker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 p-4 bg-white shadow-xl rounded-lg ml-2 z-50"
          >
            <HexColorPicker color={selectedColor} onChange={handleColorChange} />
            <button
              onClick={() => setShowColorPicker(false)}
              className="mt-2 w-full px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onDelete}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
        >
          <FaTrash /> Delete Section
        </button>
      </div>
    </div>
  );
};

export default PropertiesPanel;
