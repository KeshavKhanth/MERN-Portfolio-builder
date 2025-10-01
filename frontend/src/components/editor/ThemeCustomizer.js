import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HexColorPicker } from 'react-colorful';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPalette,
  FaFont,
  FaAdjust,
  FaMoon,
  FaSun,
  FaUndo,
  FaSave,
  FaDownload,
  FaUpload,
  FaCopy,
  FaCheck
} from 'react-icons/fa';
import { MdColorLens, MdStyle } from 'react-icons/md';
import { updateCustomizations, updateColors, updateFonts } from '../../store/slices/editorSlice';
import googleFontsLoader from '../../utils/googleFontsLoader';
import { injectThemeVariables } from '../../utils/styleUtils';
import FontManager from './FontManager';
import toast from 'react-hot-toast';

// Predefined themes
const predefinedThemes = {
  light: {
    name: 'Light',
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      accent: '#10b981', 
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#111827',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    }
  },
  dark: {
    name: 'Dark',
    colors: {
      primary: '#60a5fa',
      secondary: '#9ca3af',
      accent: '#34d399',
      background: '#111827',
      surface: '#1f2937',
      text: '#f9fafb',
      textSecondary: '#d1d5db',
      border: '#374151',
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171'
    }
  },
  elegant: {
    name: 'Elegant',
    colors: {
      primary: '#8b5cf6',
      secondary: '#64748b',
      accent: '#f59e0b',
      background: '#fefefe',
      surface: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626'
    }
  },
  ocean: {
    name: 'Ocean',
    colors: {
      primary: '#0891b2',
      secondary: '#475569',
      accent: '#06b6d4',
      background: '#f0f9ff',
      surface: '#e0f2fe',
      text: '#0f172a',
      textSecondary: '#475569',
      border: '#bae6fd',
      success: '#0d9488',
      warning: '#ea580c',
      error: '#dc2626'
    }
  },
  sunset: {
    name: 'Sunset',
    colors: {
      primary: '#f97316',
      secondary: '#78716c',
      accent: '#eab308',
      background: '#fffbeb',
      surface: '#fef3c7',
      text: '#1c1917',
      textSecondary: '#78716c',
      border: '#fed7aa',
      success: '#16a34a',
      warning: '#ca8a04',
      error: '#dc2626'
    }
  },
  minimal: {
    name: 'Minimal',
    colors: {
      primary: '#000000',
      secondary: '#666666',
      accent: '#333333',
      background: '#ffffff',
      surface: '#fafafa',
      text: '#000000',
      textSecondary: '#666666',
      border: '#e0e0e0',
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336'
    }
  }
};

// Font combinations
const fontCombinations = {
  modern: {
    name: 'Modern',
    heading: 'Inter',
    body: 'Inter',
    display: 'Inter',
    mono: 'JetBrains Mono'
  },
  classic: {
    name: 'Classic',
    heading: 'Playfair Display',
    body: 'Source Sans Pro',
    display: 'Playfair Display',
    mono: 'Source Code Pro'
  },
  professional: {
    name: 'Professional',
    heading: 'Montserrat',
    body: 'Open Sans',
    display: 'Montserrat',
    mono: 'Roboto Mono'
  },
  creative: {
    name: 'Creative',
    heading: 'Poppins',
    body: 'Nunito Sans',
    display: 'Poppins',
    mono: 'Fira Code'
  },
  elegant: {
    name: 'Elegant',
    heading: 'Cormorant Garamond',
    body: 'Lato',
    display: 'Cormorant Garamond',
    mono: 'IBM Plex Mono'
  },
  tech: {
    name: 'Tech',
    heading: 'Space Grotesk',
    body: 'DM Sans',
    display: 'Space Grotesk',
    mono: 'JetBrains Mono'
  }
};

// Typography scales
const typographyScales = {
  small: {
    name: 'Small',
    baseSize: '14px',
    scale: 1.125,
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem'
    }
  },
  medium: {
    name: 'Medium',
    baseSize: '16px',
    scale: 1.25,
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem'
    }
  },
  large: {
    name: 'Large',
    baseSize: '18px',
    scale: 1.333,
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem'
    }
  }
};

const ThemeCustomizer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { customizations } = useSelector(state => state.editor);
  const [activeTab, setActiveTab] = useState('colors');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColorKey, setSelectedColorKey] = useState(null);
  const [tempColor, setTempColor] = useState('#000000');
  const [copied, setCopied] = useState(false);
  const [showFontManager, setShowFontManager] = useState(false);

  // Initialize fonts and theme variables when component mounts
  useEffect(() => {
    if (isOpen) {
      // Load current fonts from customizations
      googleFontsLoader.loadFromCustomizations(customizations);
      // Inject current theme variables
      injectThemeVariables(customizations);
    }
  }, [isOpen, customizations]);

  // Handle theme application
  const applyTheme = (themeKey) => {
    const theme = predefinedThemes[themeKey];
    if (theme) {
      dispatch(updateColors(theme.colors));
      // Inject CSS variables for real-time preview
      injectThemeVariables({ colors: theme.colors });
      toast.success(`${theme.name} theme applied!`);
    }
  };

  // Handle font combination application
  const applyFontCombination = async (fontKey) => {
    const fonts = fontCombinations[fontKey];
    if (fonts) {
      // Load fonts from Google Fonts
      const fontNames = Object.values(fonts).filter(font => font !== fonts.name);
      await googleFontsLoader.loadFonts(fontNames, [300, 400, 500, 600, 700]);
      
      dispatch(updateFonts(fonts));
      toast.success(`${fonts.name} fonts applied!`);
    }
  };

  // Handle individual color change
  const handleColorChange = (colorKey, color) => {
    dispatch(updateColors({ [colorKey]: color }));
  };

  // Color picker handlers
  const openColorPicker = (colorKey) => {
    setSelectedColorKey(colorKey);
    setTempColor(customizations.colors[colorKey] || '#000000');
    setShowColorPicker(true);
  };

  const applyColorChange = () => {
    if (selectedColorKey) {
      handleColorChange(selectedColorKey, tempColor);
      setShowColorPicker(false);
      setSelectedColorKey(null);
    }
  };

  // Export/Import theme
  const exportTheme = () => {
    const themeData = {
      colors: customizations.colors,
      fonts: customizations.fonts,
      typography: customizations.typography,
      spacing: customizations.spacing,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(themeData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportName = `theme-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
    
    toast.success('Theme exported successfully!');
  };

  const importTheme = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const themeData = JSON.parse(e.target.result);
          if (themeData.colors) {
            dispatch(updateColors(themeData.colors));
          }
          if (themeData.fonts) {
            dispatch(updateFonts(themeData.fonts));
          }
          if (themeData.typography || themeData.spacing) {
            dispatch(updateCustomizations({
              typography: themeData.typography,
              spacing: themeData.spacing
            }));
          }
          toast.success('Theme imported successfully!');
        } catch (error) {
          toast.error('Invalid theme file');
        }
      };
      reader.readAsText(file);
    }
  };

  // Copy theme to clipboard
  const copyThemeToClipboard = async () => {
    const themeData = {
      colors: customizations.colors,
      fonts: customizations.fonts
    };
    
    try {
      await navigator.clipboard.writeText(JSON.stringify(themeData, null, 2));
      setCopied(true);
      toast.success('Theme copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy theme');
    }
  };

  // Reset to default theme
  const resetTheme = () => {
    applyTheme('light');
    applyFontCombination('modern');
    toast.success('Theme reset to default!');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <MdColorLens className="text-blue-600" />
              Theme Customizer
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={copyThemeToClipboard}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Copy Theme"
              >
                {copied ? <FaCheck className="text-green-600" /> : <FaCopy />}
              </button>
              <button
                onClick={exportTheme}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Export Theme"
              >
                <FaDownload />
              </button>
              <label className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer" title="Import Theme">
                <FaUpload />
                <input
                  type="file"
                  accept=".json"
                  onChange={importTheme}
                  className="hidden"
                />
              </label>
              <button
                onClick={resetTheme}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Reset Theme"
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
          <div className="flex border-b border-gray-200">
            {[
              { id: 'colors', name: 'Colors', icon: <FaPalette /> },
              { id: 'fonts', name: 'Typography', icon: <FaFont /> },
              { id: 'themes', name: 'Presets', icon: <FaAdjust /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
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
            {activeTab === 'colors' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Palette</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(customizations.colors || {}).map(([key, color]) => (
                      <div key={key} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openColorPicker(key)}
                            className="w-12 h-12 rounded-lg border-2 border-gray-300 shadow-sm hover:shadow-md transition-shadow"
                            style={{ backgroundColor: color }}
                          />
                          <input
                            type="text"
                            value={color}
                            onChange={(e) => handleColorChange(key, e.target.value)}
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="#000000"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Harmony Suggestions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Color Adjustments</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                      onClick={() => applyTheme('light')}
                      className="p-3 rounded-lg border border-gray-300 hover:border-blue-500 transition-colors flex items-center gap-2"
                    >
                      <FaSun className="text-yellow-500" />
                      Light
                    </button>
                    <button
                      onClick={() => applyTheme('dark')}
                      className="p-3 rounded-lg border border-gray-300 hover:border-blue-500 transition-colors flex items-center gap-2"
                    >
                      <FaMoon className="text-purple-500" />
                      Dark
                    </button>
                    <button
                      onClick={() => applyTheme('elegant')}
                      className="p-3 rounded-lg border border-gray-300 hover:border-blue-500 transition-colors flex items-center gap-2"
                    >
                      <MdStyle className="text-purple-600" />
                      Elegant
                    </button>
                    <button
                      onClick={() => applyTheme('minimal')}
                      className="p-3 rounded-lg border border-gray-300 hover:border-blue-500 transition-colors flex items-center gap-2"
                    >
                      <FaAdjust className="text-gray-600" />
                      Minimal
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fonts' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Font Combinations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(fontCombinations).map(([key, combo]) => (
                      <div
                        key={key}
                        className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
                        onClick={() => applyFontCombination(key)}
                      >
                        <h4 className="font-bold text-lg mb-2" style={{ fontFamily: combo.heading }}>
                          {combo.name}
                        </h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><strong>Heading:</strong> {combo.heading}</p>
                          <p><strong>Body:</strong> {combo.body}</p>
                          <p className="mt-2" style={{ fontFamily: combo.body }}>
                            Sample text with this combination
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Individual Font Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(customizations.fonts || {}).map(([key, font]) => (
                      <div key={key} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 capitalize">
                          {key} Font
                        </label>
                        <select
                          value={font}
                          onChange={async (e) => {
                            const newFont = e.target.value;
                            if (newFont !== 'default') {
                              await googleFontsLoader.loadFont(newFont, [300, 400, 500, 600, 700]);
                            }
                            dispatch(updateFonts({ [key]: newFont }));
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Inter">Inter</option>
                          <option value="Roboto">Roboto</option>
                          <option value="Open Sans">Open Sans</option>
                          <option value="Poppins">Poppins</option>
                          <option value="Montserrat">Montserrat</option>
                          <option value="Playfair Display">Playfair Display</option>
                          <option value="Source Sans Pro">Source Sans Pro</option>
                          <option value="Lato">Lato</option>
                          <option value="Nunito Sans">Nunito Sans</option>
                          <option value="DM Sans">DM Sans</option>
                          <option value="Space Grotesk">Space Grotesk</option>
                          <option value="Cormorant Garamond">Cormorant Garamond</option>
                          <option value="JetBrains Mono">JetBrains Mono</option>
                          <option value="Fira Code">Fira Code</option>
                        </select>
                        <div 
                          className="text-sm text-gray-500" 
                          style={{ fontFamily: googleFontsLoader.getFontStack(font) }}
                        >
                          Preview: The quick brown fox jumps over the lazy dog
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Font Manager Button */}
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowFontManager(true)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg"
                  >
                    <FaFont />
                    Open Font Manager
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Typography Scale</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(typographyScales).map(([key, scale]) => (
                      <div
                        key={key}
                        className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
                        onClick={() => dispatch(updateCustomizations({
                          typography: { scale: key, ...scale }
                        }))}
                      >
                        <h4 className="font-bold mb-2">{scale.name}</h4>
                        <div className="space-y-1">
                          <div className="text-xs">Base: {scale.baseSize}</div>
                          <div className="text-xs">Scale: {scale.scale}</div>
                          <div className="text-xl font-bold mt-2">Aa</div>
                          <div className="text-sm">Sample Text</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'themes' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Predefined Themes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(predefinedThemes).map(([key, theme]) => (
                      <div
                        key={key}
                        className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-all hover:shadow-lg"
                        onClick={() => applyTheme(key)}
                      >
                        <h4 className="font-bold text-lg mb-3">{theme.name}</h4>
                        <div className="flex gap-2 mb-4">
                          {Object.entries(theme.colors).slice(0, 6).map(([colorKey, color]) => (
                            <div
                              key={colorKey}
                              className="w-8 h-8 rounded-full border border-gray-300"
                              style={{ backgroundColor: color }}
                              title={colorKey}
                            />
                          ))}
                        </div>
                        <div 
                          className="p-3 rounded text-sm"
                          style={{ 
                            backgroundColor: theme.colors.surface, 
                            color: theme.colors.text,
                            border: `1px solid ${theme.colors.border}`
                          }}
                        >
                          <div style={{ color: theme.colors.primary }} className="font-bold">
                            Primary Heading
                          </div>
                          <div style={{ color: theme.colors.textSecondary }}>
                            Secondary text with {theme.name.toLowerCase()} theme colors
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-600">
              Changes are applied in real-time
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
                  toast.success('Theme saved successfully!');
                  onClose();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <FaSave />
                Save Theme
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Color Picker Modal */}
      <AnimatePresence>
        {showColorPicker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setShowColorPicker(false)}
          >
            <div
              className="bg-white rounded-xl p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4 capitalize">
                Choose {selectedColorKey?.replace(/([A-Z])/g, ' $1').trim()} Color
              </h3>
              <HexColorPicker color={tempColor} onChange={setTempColor} />
              <div className="mt-4 flex items-center gap-3">
                <input
                  type="text"
                  value={tempColor}
                  onChange={(e) => setTempColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={applyColorChange}
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

      {/* Font Manager */}
      <FontManager
        isOpen={showFontManager}
        onClose={() => setShowFontManager(false)}
        onFontSelect={(fontName) => {
          // Apply the selected font to the current font property
          dispatch(updateFonts({ body: fontName }));
          setShowFontManager(false);
        }}
      />
    </AnimatePresence>
  );
};

export default ThemeCustomizer;