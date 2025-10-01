// Utility functions for applying advanced styling to components

export const generateComponentStyles = (props, customizations = {}) => {
  const styles = {};
  const cssClasses = [];

  // Typography
  if (props.fontFamily && props.fontFamily !== 'default') {
    styles.fontFamily = props.fontFamily;
  }
  
  if (props.fontSize) {
    const sizeMap = {
      xs: '0.75rem',
      sm: '0.875rem', 
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem'
    };
    styles.fontSize = sizeMap[props.fontSize] || props.fontSize;
  }

  if (props.fontWeight) {
    const weightMap = {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    };
    styles.fontWeight = weightMap[props.fontWeight] || props.fontWeight;
  }

  if (props.lineHeight) {
    const lineHeightMap = {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    };
    styles.lineHeight = lineHeightMap[props.lineHeight] || props.lineHeight;
  }

  if (props.letterSpacing) {
    const spacingMap = {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    };
    styles.letterSpacing = spacingMap[props.letterSpacing] || props.letterSpacing;
  }

  if (props.wordSpacing) {
    const wordSpacingMap = {
      tight: '-0.05em',
      normal: 'normal',
      wide: '0.1em',
      wider: '0.2em'
    };
    styles.wordSpacing = wordSpacingMap[props.wordSpacing] || props.wordSpacing;
  }

  if (props.textAlign || props.align) {
    styles.textAlign = props.textAlign || props.align;
  }

  if (props.textTransform) {
    styles.textTransform = props.textTransform;
  }

  if (props.fontStyle) {
    styles.fontStyle = props.fontStyle;
  }

  if (props.textDecoration) {
    styles.textDecoration = props.textDecoration;
  }

  if (props.writingMode) {
    styles.writingMode = props.writingMode;
  }

  // Text effects
  if (props.textShadow && props.textShadow !== 'none') {
    const shadowMap = {
      sm: '1px 1px 2px rgba(0,0,0,0.1)',
      md: '2px 2px 4px rgba(0,0,0,0.15)', 
      lg: '4px 4px 8px rgba(0,0,0,0.2)',
      colored: `2px 2px 4px ${props.color || '#000000'}33`
    };
    styles.textShadow = shadowMap[props.textShadow] || props.textShadow;
  }

  // Text gradient
  if (props.textGradient?.enabled) {
    const gradientType = props.textGradient.type || 'linear';
    const angle = props.textGradient.angle || '45deg';
    const colors = props.textGradient.colors || [props.color || '#3b82f6', '#8b5cf6'];
    
    if (gradientType === 'linear') {
      styles.background = `linear-gradient(${angle}, ${colors.join(', ')})`;
    } else if (gradientType === 'radial') {
      styles.background = `radial-gradient(circle, ${colors.join(', ')})`;
    } else if (gradientType === 'conic') {
      styles.background = `conic-gradient(from ${angle}, ${colors.join(', ')})`;
    }
    
    styles.WebkitBackgroundClip = 'text';
    styles.WebkitTextFillColor = 'transparent';
    styles.backgroundClip = 'text';
  }

  // Colors
  if (props.color) {
    styles.color = props.color;
  }

  if (props.backgroundColor) {
    styles.backgroundColor = props.backgroundColor;
  }

  if (props.borderColor) {
    styles.borderColor = props.borderColor;
  }

  // Background effects
  if (props.backgroundGradient?.enabled) {
    const direction = props.backgroundGradient.direction || 'to-r';
    const colors = props.backgroundGradient.colors || [props.backgroundColor || '#ffffff', props.color || '#3b82f6'];
    const directionMap = {
      'to-r': 'to right',
      'to-l': 'to left', 
      'to-t': 'to top',
      'to-b': 'to bottom',
      'to-tr': 'to top right',
      'to-tl': 'to top left',
      'to-br': 'to bottom right',
      'to-bl': 'to bottom left'
    };
    styles.background = `linear-gradient(${directionMap[direction]}, ${colors.join(', ')})`;
  }

  // Spacing
  if (props.padding) {
    const paddingMap = {
      none: '0',
      small: '0.5rem',
      medium: '1rem',
      large: '1.5rem',
      xl: '2rem'
    };
    styles.padding = paddingMap[props.padding] || props.padding;
  }

  // Individual padding
  ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'].forEach(prop => {
    if (props[prop]) {
      styles[prop] = props[prop];
    }
  });

  // Individual margin
  ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'].forEach(prop => {
    if (props[prop]) {
      styles[prop] = props[prop];
    }
  });

  // Border
  if (props.borderWidth && props.borderWidth !== 'none') {
    styles.borderWidth = `${props.borderWidth}px`;
    styles.borderStyle = props.borderStyle || 'solid';
    styles.borderColor = props.borderColor || '#e5e7eb';
  }

  if (props.rounded) {
    const radiusMap = {
      none: '0',
      sm: '0.125rem',
      md: '0.375rem', 
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px'
    };
    styles.borderRadius = radiusMap[props.rounded] || props.rounded;
  }

  // Shadow
  if (props.shadow && props.shadow !== 'none') {
    const shadowMap = {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      colored: `0 4px 6px -1px ${props.color || '#3b82f6'}33`
    };
    styles.boxShadow = shadowMap[props.shadow] || props.shadow;
  }

  // Transform
  const transforms = [];
  
  if (props.rotate && props.rotate !== 0) {
    transforms.push(`rotate(${props.rotate}deg)`);
  }

  if (props.scale && props.scale !== 100) {
    transforms.push(`scale(${props.scale / 100})`);
  }

  if (props.scaleX && props.scaleX !== 1) {
    transforms.push(`scaleX(${props.scaleX})`);
  }

  if (props.scaleY && props.scaleY !== 1) {
    transforms.push(`scaleY(${props.scaleY})`);
  }

  if (transforms.length > 0) {
    styles.transform = transforms.join(' ');
  }

  // Filters
  if (props.filters) {
    const filterParts = [];
    
    Object.entries(props.filters).forEach(([filter, value]) => {
      if (value !== undefined && value !== 0 && value !== 100) {
        switch (filter) {
          case 'blur':
            if (value > 0) filterParts.push(`blur(${value}px)`);
            break;
          case 'brightness':
            if (value !== 100) filterParts.push(`brightness(${value}%)`);
            break;
          case 'contrast':
            if (value !== 100) filterParts.push(`contrast(${value}%)`);
            break;
          case 'saturate':
            if (value !== 100) filterParts.push(`saturate(${value}%)`);
            break;
          case 'hue-rotate':
            if (value > 0) filterParts.push(`hue-rotate(${value}deg)`);
            break;
          case 'grayscale':
            if (value > 0) filterParts.push(`grayscale(${value}%)`);
            break;
        }
      }
    });

    if (filterParts.length > 0) {
      styles.filter = filterParts.join(' ');
    }
  }

  // Backdrop filter
  if (props.backdropFilter && props.backdropFilter !== 'none') {
    const backdropMap = {
      'blur-sm': 'blur(4px)',
      'blur-md': 'blur(8px)',
      'blur-lg': 'blur(16px)',
      'brightness-50': 'brightness(0.5)',
      'brightness-150': 'brightness(1.5)',
      'contrast-150': 'contrast(1.5)',
      'grayscale': 'grayscale(100%)',
      'sepia': 'sepia(100%)'
    };
    styles.backdropFilter = backdropMap[props.backdropFilter] || props.backdropFilter;
  }

  // Layout properties
  if (props.display) {
    styles.display = props.display;
  }

  if (props.position) {
    styles.position = props.position;
  }

  if (props.zIndex !== undefined) {
    styles.zIndex = props.zIndex;
  }

  if (props.overflow) {
    styles.overflow = props.overflow;
  }

  // Opacity
  if (props.opacity !== undefined && props.opacity !== 100) {
    styles.opacity = props.opacity / 100;
  }

  // Custom CSS
  if (props.customCSS) {
    try {
      // Parse custom CSS string and merge with styles
      const customStyles = props.customCSS.split(';').reduce((acc, rule) => {
        const [property, value] = rule.split(':').map(s => s.trim());
        if (property && value) {
          // Convert kebab-case to camelCase
          const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          acc[camelProperty] = value;
        }
        return acc;
      }, {});
      
      Object.assign(styles, customStyles);
    } catch (error) {
      console.warn('Error parsing custom CSS:', error);
    }
  }

  // CSS Variables
  if (props.cssVariables) {
    Object.entries(props.cssVariables).forEach(([key, value]) => {
      if (key.startsWith('--') && value) {
        styles[key] = value;
      }
    });
  }

  return { styles, classes: cssClasses };
};

// Helper to generate CSS classes based on theme
export const generateThemeClasses = (customizations = {}) => {
  const classes = [];
  
  // Add theme-based classes
  if (customizations.colors?.primary) {
    classes.push('theme-primary');
  }
  
  if (customizations.fonts?.body) {
    classes.push(`font-${customizations.fonts.body.toLowerCase().replace(/\s+/g, '-')}`);
  }

  return classes;
};

// Helper to inject theme CSS variables
export const injectThemeVariables = (customizations = {}) => {
  const root = document.documentElement;
  
  // Inject color variables
  if (customizations.colors) {
    Object.entries(customizations.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }

  // Inject font variables
  if (customizations.fonts) {
    Object.entries(customizations.fonts).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value);
    });
  }

  // Inject typography variables
  if (customizations.typography) {
    Object.entries(customizations.typography).forEach(([key, value]) => {
      root.style.setProperty(`--typography-${key}`, value);
    });
  }

  // Inject spacing variables
  if (customizations.spacing) {
    Object.entries(customizations.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });
  }
};

export default {
  generateComponentStyles,
  generateThemeClasses,
  injectThemeVariables
};