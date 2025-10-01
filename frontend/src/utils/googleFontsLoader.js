// Google Fonts loader utility

class GoogleFontsLoader {
  constructor() {
    this.loadedFonts = new Set();
    this.linkElement = null;
    this.initializeFontLoader();
  }

  initializeFontLoader() {
    // Create a link element for Google Fonts
    this.linkElement = document.createElement('link');
    this.linkElement.rel = 'stylesheet';
    this.linkElement.href = '';
    document.head.appendChild(this.linkElement);
  }

  // Font configurations with Google Fonts URLs
  getFontConfig() {
    return {
      // Sans Serif
      'Inter': { 
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true
      },
      'Roboto': { 
        weights: [100, 300, 400, 500, 700, 900],
        variable: false
      },
      'Open Sans': { 
        weights: [300, 400, 500, 600, 700, 800],
        variable: true
      },
      'Poppins': { 
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: false
      },
      'Montserrat': { 
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true
      },
      'Raleway': { 
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true
      },
      'Lato': { 
        weights: [100, 300, 400, 700, 900],
        variable: false
      },
      'Source Sans Pro': { 
        weights: [200, 300, 400, 600, 700, 900],
        variable: false
      },
      'Nunito Sans': { 
        weights: [200, 300, 400, 500, 600, 700, 800, 900],
        variable: true
      },
      'DM Sans': { 
        weights: [400, 500, 700],
        variable: true
      },
      'Space Grotesk': { 
        weights: [300, 400, 500, 600, 700],
        variable: true
      },
      'Work Sans': { 
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true
      },

      // Serif
      'Playfair Display': { 
        weights: [400, 500, 600, 700, 800, 900],
        variable: true
      },
      'Merriweather': { 
        weights: [300, 400, 700, 900],
        variable: false
      },
      'Cormorant Garamond': { 
        weights: [300, 400, 500, 600, 700],
        variable: false
      },
      'Crimson Text': { 
        weights: [400, 600, 700],
        variable: false
      },
      'Libre Baskerville': { 
        weights: [400, 700],
        variable: false
      },
      'PT Serif': { 
        weights: [400, 700],
        variable: false
      },

      // Display
      'Oswald': { 
        weights: [200, 300, 400, 500, 600, 700],
        variable: true
      },
      'Bebas Neue': { 
        weights: [400],
        variable: false
      },
      'Anton': { 
        weights: [400],
        variable: false
      },
      'Righteous': { 
        weights: [400],
        variable: false
      },
      'Fredoka One': { 
        weights: [400],
        variable: false
      },

      // Monospace
      'JetBrains Mono': { 
        weights: [100, 200, 300, 400, 500, 600, 700, 800],
        variable: true
      },
      'Fira Code': { 
        weights: [300, 400, 500, 600, 700],
        variable: true
      },
      'Source Code Pro': { 
        weights: [200, 300, 400, 500, 600, 700, 800, 900],
        variable: true
      },
      'Roboto Mono': { 
        weights: [100, 200, 300, 400, 500, 600, 700],
        variable: false
      },
      'IBM Plex Mono': { 
        weights: [100, 200, 300, 400, 500, 600, 700],
        variable: false
      }
    };
  }

  // Convert font name to Google Fonts family name
  formatFontName(fontName) {
    return fontName.replace(/\s+/g, '+');
  }

  // Load a single font
  async loadFont(fontName, weights = [400]) {
    if (this.loadedFonts.has(fontName) || fontName === 'default') {
      return Promise.resolve();
    }

    const fontConfig = this.getFontConfig()[fontName];
    if (!fontConfig) {
      console.warn(`Font "${fontName}" not found in configuration`);
      return Promise.resolve();
    }

    const formattedName = this.formatFontName(fontName);
    const weightsToLoad = weights.filter(w => fontConfig.weights.includes(w));
    
    if (weightsToLoad.length === 0) {
      weightsToLoad.push(400); // Default weight
    }

    // Build Google Fonts URL
    let fontUrl;
    if (fontConfig.variable) {
      // Use variable font if available
      const weightRange = `${Math.min(...weightsToLoad)}..${Math.max(...weightsToLoad)}`;
      fontUrl = `https://fonts.googleapis.com/css2?family=${formattedName}:wght@${weightRange}&display=swap`;
    } else {
      // Use specific weights
      const weightString = weightsToLoad.join(';');
      fontUrl = `https://fonts.googleapis.com/css2?family=${formattedName}:wght@${weightString}&display=swap`;
    }

    return new Promise((resolve, reject) => {
      // Create a new link element for this font
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontUrl;
      
      link.onload = () => {
        this.loadedFonts.add(fontName);
        console.log(`Loaded font: ${fontName}`);
        resolve();
      };
      
      link.onerror = () => {
        console.error(`Failed to load font: ${fontName}`);
        reject(new Error(`Failed to load font: ${fontName}`));
      };
      
      document.head.appendChild(link);
    });
  }

  // Load multiple fonts
  async loadFonts(fontNames, weights = [400]) {
    const fontPromises = fontNames.map(fontName => 
      this.loadFont(fontName, weights)
    );
    
    try {
      await Promise.all(fontPromises);
      console.log('All fonts loaded successfully');
    } catch (error) {
      console.error('Some fonts failed to load:', error);
    }
  }

  // Load fonts from customizations object
  async loadFromCustomizations(customizations) {
    if (!customizations?.fonts) return;

    const fontsToLoad = new Set();
    const weights = [300, 400, 500, 600, 700]; // Common weights

    Object.values(customizations.fonts).forEach(fontName => {
      if (fontName && fontName !== 'default') {
        fontsToLoad.add(fontName);
      }
    });

    if (fontsToLoad.size > 0) {
      await this.loadFonts(Array.from(fontsToLoad), weights);
    }
  }

  // Preload popular fonts
  async preloadPopularFonts() {
    const popularFonts = [
      'Inter',
      'Roboto', 
      'Open Sans',
      'Poppins',
      'Montserrat',
      'Playfair Display'
    ];

    await this.loadFonts(popularFonts, [400, 600, 700]);
  }

  // Check if font is loaded
  isFontLoaded(fontName) {
    return this.loadedFonts.has(fontName);
  }

  // Get loaded fonts
  getLoadedFonts() {
    return Array.from(this.loadedFonts);
  }

  // Clear loaded fonts (useful for testing)
  clearLoadedFonts() {
    this.loadedFonts.clear();
    // Remove all Google Fonts links
    const links = document.head.querySelectorAll('link[href*="fonts.googleapis.com"]');
    links.forEach(link => link.remove());
  }

  // Get font fallbacks for better rendering
  getFontStack(fontName) {
    const fontStacks = {
      // Sans Serif fallbacks
      'Inter': 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      'Roboto': 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      'Open Sans': '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      'Poppins': 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      
      // Serif fallbacks
      'Playfair Display': '"Playfair Display", Georgia, "Times New Roman", serif',
      'Merriweather': 'Merriweather, Georgia, "Times New Roman", serif',
      
      // Monospace fallbacks
      'JetBrains Mono': '"JetBrains Mono", "Fira Code", Consolas, "Liberation Mono", Menlo, Courier, monospace'
    };

    return fontStacks[fontName] || `"${fontName}", sans-serif`;
  }
}

// Create a singleton instance
const googleFontsLoader = new GoogleFontsLoader();

export default googleFontsLoader;