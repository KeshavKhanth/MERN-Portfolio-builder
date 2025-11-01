import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaFont,
  FaAdjust,
  FaUndo,
  FaSave
} from 'react-icons/fa';
import { MdColorLens } from 'react-icons/md';
import { updateCustomizations, updateFonts } from '../../store/slices/editorSlice';
import googleFontsLoader from '../../utils/googleFontsLoader';
import { injectThemeVariables } from '../../utils/styleUtils';
import FontManager from './FontManager';
import toast from 'react-hot-toast';

// Predefined themes (keeping only for presets tab)
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
  const [activeTab, setActiveTab] = useState('fonts');
  const [typographyMode, setTypographyMode] = useState('selected');
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

  // Handle theme application (from presets)
  const applyTheme = (themeKey) => {
    const theme = predefinedThemes[themeKey];
    if (theme) {
      dispatch(updateCustomizations({ colors: theme.colors }));
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

  // Handle "Apply All" mode for typography
  const handleApplyAllFont = async (fontName) => {
    if (fontName !== 'default') {
      await googleFontsLoader.loadFont(fontName, [300, 400, 500, 600, 700]);
    }
    dispatch(updateFonts({
      heading: fontName,
      body: fontName,
      display: fontName,
      mono: fontName
    }));
    toast.success('Font applied to all text elements!');
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
            {activeTab === 'fonts' && (
              <div className="space-y-6">
                {/* Typography Mode Toggle */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Font Application Mode</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setTypographyMode('selected')}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                        typographyMode === 'selected'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      Selected Field
                    </button>
                    <button
                      onClick={() => setTypographyMode('all')}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                        typographyMode === 'all'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      Apply All
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {typographyMode === 'selected' 
                      ? 'Choose fonts individually for each text element'
                      : 'Apply one font to all text elements at once'}
                  </p>
                </div>

                {typographyMode === 'all' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Fonts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['Inter', 'Roboto', 'Open Sans', 'Poppins', 'Montserrat', 'Playfair Display', 'Source Sans Pro', 'Lato', 'Nunito Sans', 'DM Sans', 'Space Grotesk', 'Cormorant Garamond', 'JetBrains Mono', 'Fira Code'].map((fontName) => (
                        <div
                          key={fontName}
                          className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
                          onClick={async () => {
                            await handleApplyAllFont(fontName);
                          }}
                        >
                          <h4 className="font-bold text-lg mb-2" style={{ fontFamily: fontName }}>
                            {fontName}
                          </h4>
                          <p className="text-sm text-gray-600" style={{ fontFamily: fontName }}>
                            Sample text with this font
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {typographyMode === 'selected' && (
                  <>
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
                  </>
                )}
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
          <div className="flex items-center justify-end p-6 border-t border-gray-200 bg-gray-50">
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