import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFont, FaDownload, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';
import googleFontsLoader from '../../utils/googleFontsLoader';
import toast from 'react-hot-toast';

const FontManager = ({ isOpen, onClose, onFontSelect }) => {
  const [availableFonts, setAvailableFonts] = useState([]);
  const [loadedFonts, setLoadedFonts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingFonts, setLoadingFonts] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (isOpen) {
      // Get available fonts from the loader configuration
      const fontConfig = googleFontsLoader.getFontConfig();
      const fonts = Object.entries(fontConfig).map(([name, config]) => ({
        name,
        ...config,
        isLoaded: googleFontsLoader.isFontLoaded(name)
      }));
      
      setAvailableFonts(fonts);
      setLoadedFonts(googleFontsLoader.getLoadedFonts());
    }
  }, [isOpen]);

  // Font categories
  const categories = {
    all: 'All Fonts',
    'sans-serif': 'Sans Serif',
    serif: 'Serif',
    display: 'Display',
    monospace: 'Monospace'
  };

  // Categorize fonts
  const categorizeFonts = () => {
    const sansSerif = ['Inter', 'Roboto', 'Open Sans', 'Poppins', 'Montserrat', 'Raleway', 'Lato', 'Source Sans Pro', 'Nunito Sans', 'DM Sans', 'Space Grotesk', 'Work Sans'];
    const serif = ['Playfair Display', 'Merriweather', 'Cormorant Garamond', 'Crimson Text', 'Libre Baskerville', 'PT Serif'];
    const display = ['Oswald', 'Bebas Neue', 'Anton', 'Righteous', 'Fredoka One'];
    const monospace = ['JetBrains Mono', 'Fira Code', 'Source Code Pro', 'Roboto Mono', 'IBM Plex Mono'];

    return {
      'sans-serif': sansSerif,
      serif: serif,
      display: display,
      monospace: monospace
    };
  };

  // Filter fonts based on search and category
  const filteredFonts = availableFonts.filter(font => {
    const matchesSearch = font.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'all') {
      return matchesSearch;
    }
    
    const categorizedFonts = categorizeFonts();
    return matchesSearch && categorizedFonts[selectedCategory]?.includes(font.name);
  });

  // Load a font
  const handleLoadFont = async (fontName) => {
    setLoadingFonts(prev => new Set([...prev, fontName]));
    
    try {
      await googleFontsLoader.loadFont(fontName, [300, 400, 500, 600, 700]);
      setLoadedFonts(googleFontsLoader.getLoadedFonts());
      toast.success(`${fontName} loaded successfully!`);
    } catch (error) {
      toast.error(`Failed to load ${fontName}`);
    } finally {
      setLoadingFonts(prev => {
        const newSet = new Set(prev);
        newSet.delete(fontName);
        return newSet;
      });
    }
  };

  // Use a font (select it)
  const handleUseFont = (fontName) => {
    if (onFontSelect) {
      onFontSelect(fontName);
    }
    toast.success(`${fontName} selected!`);
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
              <FaFont className="text-blue-600" />
              Font Manager
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          {/* Search and Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search fonts..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Category Filters */}
            <div className="flex gap-2">
              {Object.entries(categories).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === key
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Font List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid gap-4">
              {filteredFonts.map((font) => (
                <div
                  key={font.name}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {font.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {font.variable && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                          Variable
                        </span>
                      )}
                      {googleFontsLoader.isFontLoaded(font.name) ? (
                        <div className="flex items-center gap-2">
                          <FaCheck className="text-green-600" />
                          <button
                            onClick={() => handleUseFont(font.name)}
                            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            Use Font
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleLoadFont(font.name)}
                          disabled={loadingFonts.has(font.name)}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center gap-2 disabled:opacity-50"
                        >
                          {loadingFonts.has(font.name) ? (
                            <>
                              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                              Loading...
                            </>
                          ) : (
                            <>
                              <FaDownload />
                              Load Font
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Font Preview */}
                  <div 
                    className="space-y-2"
                    style={{ 
                      fontFamily: googleFontsLoader.isFontLoaded(font.name) 
                        ? googleFontsLoader.getFontStack(font.name)
                        : 'sans-serif'
                    }}
                  >
                    <div className="text-2xl font-bold">
                      The quick brown fox jumps over the lazy dog
                    </div>
                    <div className="text-base">
                      ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 1234567890
                    </div>
                    <div className="text-sm text-gray-600">
                      Available weights: {font.weights.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredFonts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No fonts found matching your criteria</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-600">
              {loadedFonts.length} fonts loaded • {filteredFonts.length} fonts available
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FontManager;