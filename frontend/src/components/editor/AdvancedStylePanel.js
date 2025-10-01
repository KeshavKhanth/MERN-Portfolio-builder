import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPalette,
  FaFont,
  FaRuler,
  FaLayerGroup,
  FaMagic,
  FaCode,
  FaCopy,
  FaSave,
  FaUndo,
  FaEyeDropper
} from 'react-icons/fa';
import { MdFilterList } from 'react-icons/md';

const AdvancedStylePanel = ({ item, onUpdate, onClose }) => {
  const [activeTab, setActiveTab] = useState('typography');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [customCSS, setCustomCSS] = useState(item.props?.customCSS || '');

  // Typography presets
  const typographyPresets = {
    heading: {
      fontSize: '2xl',
      fontWeight: 'bold',
      lineHeight: 'tight',
      letterSpacing: 'tight'
    },
    subheading: {
      fontSize: 'xl',
      fontWeight: 'semibold',
      lineHeight: 'snug',
      letterSpacing: 'normal'
    },
    body: {
      fontSize: 'base',
      fontWeight: 'normal',
      lineHeight: 'relaxed',
      letterSpacing: 'normal'
    },
    caption: {
      fontSize: 'sm',
      fontWeight: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'wide'
    },
    display: {
      fontSize: '4xl',
      fontWeight: 'black',
      lineHeight: 'none',
      letterSpacing: 'tighter'
    }
  };

  // Color palettes
  const colorPalettes = {
    brand: ['#3b82f6', '#1d4ed8', '#1e40af', '#1e3a8a'],
    warm: ['#f59e0b', '#d97706', '#b45309', '#92400e'],
    cool: ['#06b6d4', '#0891b2', '#0e7490', '#155e75'],
    nature: ['#10b981', '#059669', '#047857', '#065f46'],
    purple: ['#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6'],
    pink: ['#ec4899', '#db2777', '#be185d', '#9d174d'],
    grayscale: ['#6b7280', '#4b5563', '#374151', '#1f2937']
  };

  // Handle color picker
  const openColorPicker = (property, currentValue) => {
    setSelectedProperty(property);
    setCurrentColor(currentValue || '#000000');
    setShowColorPicker(true);
  };

  const applyColor = () => {
    if (selectedProperty) {
      onUpdate({
        props: {
          ...item.props,
          [selectedProperty]: currentColor
        }
      });
      setShowColorPicker(false);
      setSelectedProperty(null);
    }
  };

  // Apply typography preset
  const applyTypographyPreset = (presetKey) => {
    const preset = typographyPresets[presetKey];
    onUpdate({
      props: {
        ...item.props,
        ...preset
      }
    });
  };

  // Apply color palette
  const applyColorPalette = (palette, index) => {
    const color = colorPalettes[palette][index];
    onUpdate({
      props: {
        ...item.props,
        color: color
      }
    });
  };

  // Copy styles
  const copyStyles = () => {
    const styles = {
      typography: {
        fontFamily: item.props?.fontFamily,
        fontSize: item.props?.fontSize,
        fontWeight: item.props?.fontWeight,
        lineHeight: item.props?.lineHeight,
        letterSpacing: item.props?.letterSpacing
      },
      colors: {
        color: item.props?.color,
        backgroundColor: item.props?.backgroundColor,
        borderColor: item.props?.borderColor
      },
      effects: {
        shadow: item.props?.shadow,
        borderRadius: item.props?.rounded,
        opacity: item.props?.opacity
      }
    };
    
    navigator.clipboard.writeText(JSON.stringify(styles, null, 2));
  };

  // Reset styles
  const resetStyles = () => {
    onUpdate({
      props: {
        ...item.props,
        // Reset typography
        fontFamily: undefined,
        fontSize: undefined,
        fontWeight: undefined,
        lineHeight: undefined,
        letterSpacing: undefined,
        // Reset colors
        color: undefined,
        backgroundColor: undefined,
        borderColor: undefined,
        // Reset effects
        shadow: undefined,
        rounded: undefined,
        opacity: undefined,
        rotate: undefined,
        scale: undefined
      }
    });
  };

  const tabs = [
    { id: 'typography', name: 'Typography', icon: <FaFont /> },
    { id: 'colors', name: 'Colors', icon: <FaPalette /> },
    { id: 'spacing', name: 'Spacing', icon: <FaRuler /> },
    { id: 'effects', name: 'Effects', icon: <FaMagic /> },
    { id: 'layout', name: 'Layout', icon: <FaLayerGroup /> },
    { id: 'advanced', name: 'Advanced', icon: <FaCode /> }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <MdFilterList className="text-blue-600" />
            Advanced Styling
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={copyStyles}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Copy Styles"
            >
              <FaCopy />
            </button>
            <button
              onClick={resetStyles}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Reset Styles"
            >
              <FaUndo />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'typography' && (
            <div className="space-y-6">
              {/* Typography Presets */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Typography Presets</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(typographyPresets).map(([key, preset]) => (
                    <button
                      key={key}
                      onClick={() => applyTypographyPreset(key)}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors text-left"
                    >
                      <div className="font-semibold text-sm text-gray-700 mb-1 capitalize">
                        {key}
                      </div>
                      <div 
                        className="text-gray-900"
                        style={{
                          fontSize: preset.fontSize === 'xs' ? '12px' : 
                                   preset.fontSize === 'sm' ? '14px' :
                                   preset.fontSize === 'base' ? '16px' :
                                   preset.fontSize === 'lg' ? '18px' :
                                   preset.fontSize === 'xl' ? '20px' :
                                   preset.fontSize === '2xl' ? '24px' :
                                   preset.fontSize === '4xl' ? '36px' : '16px',
                          fontWeight: preset.fontWeight === 'normal' ? 400 :
                                     preset.fontWeight === 'semibold' ? 600 :
                                     preset.fontWeight === 'bold' ? 700 :
                                     preset.fontWeight === 'black' ? 900 : 400
                        }}
                      >
                        Sample Text
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Typography Controls */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Typography Controls</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Text Rendering
                    </label>
                    <select
                      value={item.props?.textRendering || 'auto'}
                      onChange={(e) => onUpdate({
                        props: { ...item.props, textRendering: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="auto">Auto</option>
                      <option value="optimizeSpeed">Optimize Speed</option>
                      <option value="optimizeLegibility">Optimize Legibility</option>
                      <option value="geometricPrecision">Geometric Precision</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Font Variant
                    </label>
                    <select
                      value={item.props?.fontVariant || 'normal'}
                      onChange={(e) => onUpdate({
                        props: { ...item.props, fontVariant: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="normal">Normal</option>
                      <option value="small-caps">Small Caps</option>
                      <option value="all-small-caps">All Small Caps</option>
                      <option value="petite-caps">Petite Caps</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'colors' && (
            <div className="space-y-6">
              {/* Color Palettes */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Color Palettes</h3>
                <div className="space-y-4">
                  {Object.entries(colorPalettes).map(([paletteKey, colors]) => (
                    <div key={paletteKey} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700 w-20 capitalize">
                        {paletteKey}
                      </span>
                      <div className="flex gap-2">
                        {colors.map((color, index) => (
                          <button
                            key={index}
                            onClick={() => applyColorPalette(paletteKey, index)}
                            className="w-8 h-8 rounded border-2 border-gray-300 hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Properties */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Color Properties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'color', label: 'Text Color' },
                    { key: 'backgroundColor', label: 'Background Color' },
                    { key: 'borderColor', label: 'Border Color' },
                    { key: 'accentColor', label: 'Accent Color' },
                    { key: 'shadowColor', label: 'Shadow Color' },
                    { key: 'outlineColor', label: 'Outline Color' }
                  ].map(({ key, label }) => (
                    <div key={key} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {label}
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openColorPicker(key, item.props?.[key])}
                          className="w-10 h-10 rounded border-2 border-gray-300 hover:shadow-md transition-shadow flex items-center justify-center"
                          style={{ backgroundColor: item.props?.[key] || '#ffffff' }}
                        >
                          <FaEyeDropper className="text-xs text-gray-500" />
                        </button>
                        <input
                          type="text"
                          value={item.props?.[key] || ''}
                          onChange={(e) => onUpdate({
                            props: { ...item.props, [key]: e.target.value }
                          })}
                          placeholder="#000000"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'spacing' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Spacing & Sizing</h3>
              <div className="grid grid-cols-2 gap-6">
                {/* Margin */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Margin</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['top', 'right', 'bottom', 'left'].map(side => (
                      <div key={side}>
                        <label className="text-xs text-gray-500 capitalize">{side}</label>
                        <input
                          type="text"
                          value={item.props?.[`margin${side.charAt(0).toUpperCase() + side.slice(1)}`] || ''}
                          onChange={(e) => onUpdate({
                            props: { 
                              ...item.props, 
                              [`margin${side.charAt(0).toUpperCase() + side.slice(1)}`]: e.target.value 
                            }
                          })}
                          placeholder="0"
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Padding */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Padding</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['top', 'right', 'bottom', 'left'].map(side => (
                      <div key={side}>
                        <label className="text-xs text-gray-500 capitalize">{side}</label>
                        <input
                          type="text"
                          value={item.props?.[`padding${side.charAt(0).toUpperCase() + side.slice(1)}`] || ''}
                          onChange={(e) => onUpdate({
                            props: { 
                              ...item.props, 
                              [`padding${side.charAt(0).toUpperCase() + side.slice(1)}`]: e.target.value 
                            }
                          })}
                          placeholder="0"
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'effects' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Visual Effects</h3>
              
              {/* Filters */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Filters</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: 'blur', label: 'Blur', unit: 'px', max: 20 },
                    { key: 'brightness', label: 'Brightness', unit: '%', max: 200 },
                    { key: 'contrast', label: 'Contrast', unit: '%', max: 200 },
                    { key: 'saturate', label: 'Saturation', unit: '%', max: 200 },
                    { key: 'hue-rotate', label: 'Hue Rotate', unit: 'deg', max: 360 },
                    { key: 'grayscale', label: 'Grayscale', unit: '%', max: 100 }
                  ].map(filter => (
                    <div key={filter.key}>
                      <label className="block text-sm text-gray-700 mb-1">{filter.label}</label>
                      <input
                        type="range"
                        min="0"
                        max={filter.max}
                        value={item.props?.filters?.[filter.key] || (filter.key === 'brightness' || filter.key === 'contrast' || filter.key === 'saturate' ? 100 : 0)}
                        onChange={(e) => onUpdate({
                          props: {
                            ...item.props,
                            filters: {
                              ...item.props?.filters,
                              [filter.key]: parseInt(e.target.value)
                            }
                          }
                        })}
                        className="w-full"
                      />
                      <span className="text-xs text-gray-500">
                        {item.props?.filters?.[filter.key] || (filter.key === 'brightness' || filter.key === 'contrast' || filter.key === 'saturate' ? 100 : 0)}{filter.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transform */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Transform</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Rotate (deg)</label>
                    <input
                      type="number"
                      min="-180"
                      max="180"
                      value={item.props?.rotate || 0}
                      onChange={(e) => onUpdate({
                        props: { ...item.props, rotate: parseInt(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Scale X</label>
                    <input
                      type="number"
                      min="0"
                      max="3"
                      step="0.1"
                      value={item.props?.scaleX || 1}
                      onChange={(e) => onUpdate({
                        props: { ...item.props, scaleX: parseFloat(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Scale Y</label>
                    <input
                      type="number"
                      min="0"
                      max="3"
                      step="0.1"
                      value={item.props?.scaleY || 1}
                      onChange={(e) => onUpdate({
                        props: { ...item.props, scaleY: parseFloat(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Layout Properties</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Display</h4>
                  <select
                    value={item.props?.display || 'block'}
                    onChange={(e) => onUpdate({
                      props: { ...item.props, display: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="block">Block</option>
                    <option value="inline">Inline</option>
                    <option value="inline-block">Inline Block</option>
                    <option value="flex">Flex</option>
                    <option value="grid">Grid</option>
                    <option value="none">None</option>
                  </select>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Position</h4>
                  <select
                    value={item.props?.position || 'static'}
                    onChange={(e) => onUpdate({
                      props: { ...item.props, position: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="static">Static</option>
                    <option value="relative">Relative</option>
                    <option value="absolute">Absolute</option>
                    <option value="fixed">Fixed</option>
                    <option value="sticky">Sticky</option>
                  </select>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Z-Index</h4>
                  <input
                    type="number"
                    value={item.props?.zIndex || 0}
                    onChange={(e) => onUpdate({
                      props: { ...item.props, zIndex: parseInt(e.target.value) }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Overflow</h4>
                  <select
                    value={item.props?.overflow || 'visible'}
                    onChange={(e) => onUpdate({
                      props: { ...item.props, overflow: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="visible">Visible</option>
                    <option value="hidden">Hidden</option>
                    <option value="scroll">Scroll</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'advanced' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Custom CSS</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom CSS Properties
                </label>
                <textarea
                  value={customCSS}
                  onChange={(e) => setCustomCSS(e.target.value)}
                  onBlur={() => onUpdate({
                    props: { ...item.props, customCSS }
                  })}
                  placeholder="Enter custom CSS properties..."
                  className="w-full h-40 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Example: color: red; background: linear-gradient(45deg, blue, purple);
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-3">CSS Variables</h4>
                <div className="space-y-2">
                  {Object.entries(item.props?.cssVariables || {}).map(([key, value], index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={key}
                        onChange={(e) => {
                          const newVars = { ...item.props?.cssVariables };
                          delete newVars[key];
                          newVars[e.target.value] = value;
                          onUpdate({
                            props: { 
                              ...item.props, 
                              cssVariables: newVars 
                            }
                          });
                        }}
                        placeholder="--variable-name"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                      />
                      <span>:</span>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => onUpdate({
                          props: {
                            ...item.props,
                            cssVariables: {
                              ...item.props?.cssVariables,
                              [key]: e.target.value
                            }
                          }
                        })}
                        placeholder="value"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                      />
                      <button
                        onClick={() => {
                          const newVars = { ...item.props?.cssVariables };
                          delete newVars[key];
                          onUpdate({
                            props: { ...item.props, cssVariables: newVars }
                          });
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => onUpdate({
                      props: {
                        ...item.props,
                        cssVariables: {
                          ...item.props?.cssVariables,
                          [`--custom-${Date.now()}`]: ''
                        }
                      }
                    })}
                    className="px-3 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    + Add CSS Variable
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Advanced styling options for fine-tuning your design
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                // Save and apply all changes
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaSave />
              Apply Changes
            </button>
          </div>
        </div>
      </motion.div>

      {/* Color Picker Modal */}
      <AnimatePresence>
        {showColorPicker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60"
            onClick={() => setShowColorPicker(false)}
          >
            <div
              className="bg-white rounded-xl p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Choose Color</h3>
              <HexColorPicker color={currentColor} onChange={setCurrentColor} />
              <div className="mt-4 flex items-center gap-3">
                <input
                  type="text"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono"
                />
                <button
                  onClick={applyColor}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply
                </button>
                <button
                  onClick={() => setShowColorPicker(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedStylePanel;