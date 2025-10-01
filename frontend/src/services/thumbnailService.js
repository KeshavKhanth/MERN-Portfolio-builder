import html2canvas from 'html2canvas';

class ThumbnailService {
  /**
   * Generate a thumbnail from a DOM element
   * @param {HTMLElement} element - The element to capture
   * @param {Object} options - Options for thumbnail generation
   * @returns {Promise<string>} - Base64 encoded thumbnail
   */
  async generateThumbnail(element, options = {}) {
    const defaultOptions = {
      width: 400,
      height: 300,
      quality: 0.8,
      scale: 0.5,
      backgroundColor: '#ffffff',
      ...options
    };

    try {
      // Use html2canvas to capture the element
      const canvas = await html2canvas(element, {
        width: defaultOptions.width,
        height: defaultOptions.height,
        scale: defaultOptions.scale,
        backgroundColor: defaultOptions.backgroundColor,
        logging: false,
        useCORS: true,
        allowTaint: true
      });

      // Convert to base64
      return canvas.toDataURL('image/jpeg', defaultOptions.quality);
    } catch (error) {
      console.error('Error generating thumbnail:', error);
      return null;
    }
  }

  /**
   * Generate a lightweight preview using DOM cloning (faster alternative)
   * @param {HTMLElement} element - The element to preview
   * @param {Object} options - Options for preview
   * @returns {string} - HTML string for preview
   */
  generateLightweightPreview(element, options = {}) {
    const defaultOptions = {
      maxWidth: 400,
      maxHeight: 300,
      simplify: true,
      ...options
    };

    try {
      // Clone the element
      const clone = element.cloneNode(true);
      
      // Simplify the clone for performance
      if (defaultOptions.simplify) {
        // Remove scripts
        const scripts = clone.querySelectorAll('script');
        scripts.forEach(script => script.remove());

        // Remove iframes
        const iframes = clone.querySelectorAll('iframe');
        iframes.forEach(iframe => iframe.remove());

        // Simplify images
        const images = clone.querySelectorAll('img');
        images.forEach(img => {
          img.loading = 'lazy';
          // Use smaller placeholder if original is large
          if (img.src && img.src.includes('unsplash')) {
            img.src = img.src.replace(/w=\d+/, 'w=400').replace(/h=\d+/, 'h=300');
          }
        });

        // Remove videos
        const videos = clone.querySelectorAll('video');
        videos.forEach(video => {
          const placeholder = document.createElement('div');
          placeholder.className = 'video-placeholder';
          placeholder.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            padding: 20px;
            border-radius: 8px;
          `;
          placeholder.innerHTML = '▶ Video Content';
          video.replaceWith(placeholder);
        });
      }

      // Apply size constraints
      clone.style.cssText = `
        max-width: ${defaultOptions.maxWidth}px;
        max-height: ${defaultOptions.maxHeight}px;
        overflow: hidden;
        transform: scale(0.25);
        transform-origin: top left;
      `;

      return clone.outerHTML;
    } catch (error) {
      console.error('Error generating preview:', error);
      return '<div>Preview unavailable</div>';
    }
  }

  /**
   * Generate a CSS-based gradient thumbnail (ultra-lightweight)
   * @param {Object} portfolio - Portfolio data
   * @returns {Object} - CSS styles for gradient thumbnail
   */
  generateGradientThumbnail(portfolio) {
    const colors = portfolio.customizations?.colors || {
      primary: '#6366f1',
      secondary: '#ec4899'
    };

    const gradients = [
      `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      `linear-gradient(45deg, ${colors.primary}dd 0%, ${colors.secondary}dd 50%, ${colors.primary}dd 100%)`,
      `radial-gradient(circle at top left, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      `linear-gradient(to right, ${colors.primary}cc 0%, transparent 50%), linear-gradient(to bottom, ${colors.secondary}cc 0%, transparent 50%)`
    ];

    // Use portfolio ID to consistently select a gradient
    const gradientIndex = (portfolio.id?.charCodeAt(0) || 0) % gradients.length;

    return {
      background: gradients[gradientIndex],
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    };
  }

  /**
   * Create a mini portfolio card preview
   * @param {Object} portfolio - Portfolio data
   * @returns {JSX.Element} - React component for preview
   */
  createMiniPreview(portfolio) {
    const { title, description, customizations } = portfolio;
    const colors = customizations?.colors || {};
    const fonts = customizations?.fonts || {};

    return `
      <div style="
        width: 100%;
        height: 100%;
        background: ${this.generateGradientThumbnail(portfolio).background};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        text-align: center;
        font-family: ${fonts.body || 'Inter, sans-serif'};
      ">
        <h3 style="
          color: white;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 10px;
          font-family: ${fonts.heading || 'Poppins, sans-serif'};
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        ">
          ${title || 'Portfolio'}
        </h3>
        <p style="
          color: rgba(255,255,255,0.9);
          font-size: 14px;
          line-height: 1.5;
          max-width: 80%;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        ">
          ${description || 'Professional Portfolio'}
        </p>
        <div style="
          position: absolute;
          bottom: 20px;
          display: flex;
          gap: 8px;
        ">
          ${this.generateMiniSectionDots(portfolio)}
        </div>
      </div>
    `;
  }

  /**
   * Generate mini dots representing sections
   * @param {Object} portfolio - Portfolio data
   * @returns {string} - HTML string for dots
   */
  generateMiniSectionDots(portfolio) {
    const sections = portfolio.sections || [];
    const maxDots = 5;
    const dotsToShow = Math.min(sections.length, maxDots);
    
    let dots = '';
    for (let i = 0; i < dotsToShow; i++) {
      dots += `
        <div style="
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.6);
          transition: all 0.3s;
        "></div>
      `;
    }
    
    if (sections.length > maxDots) {
      dots += `
        <div style="
          color: rgba(255,255,255,0.6);
          font-size: 12px;
          margin-left: 4px;
        ">+${sections.length - maxDots}</div>
      `;
    }
    
    return dots;
  }

  /**
   * Cache thumbnail in localStorage
   * @param {string} portfolioId - Portfolio ID
   * @param {string} thumbnail - Thumbnail data
   */
  cacheThumbnail(portfolioId, thumbnail) {
    try {
      const cache = JSON.parse(localStorage.getItem('portfolio-thumbnails') || '{}');
      cache[portfolioId] = {
        data: thumbnail,
        timestamp: Date.now()
      };
      
      // Limit cache size (keep only 20 most recent)
      const entries = Object.entries(cache);
      if (entries.length > 20) {
        entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
        const newCache = Object.fromEntries(entries.slice(0, 20));
        localStorage.setItem('portfolio-thumbnails', JSON.stringify(newCache));
      } else {
        localStorage.setItem('portfolio-thumbnails', JSON.stringify(cache));
      }
    } catch (error) {
      console.error('Error caching thumbnail:', error);
    }
  }

  /**
   * Get cached thumbnail
   * @param {string} portfolioId - Portfolio ID
   * @returns {string|null} - Cached thumbnail or null
   */
  getCachedThumbnail(portfolioId) {
    try {
      const cache = JSON.parse(localStorage.getItem('portfolio-thumbnails') || '{}');
      const cached = cache[portfolioId];
      
      if (cached) {
        // Check if cache is still valid (1 hour)
        const isValid = Date.now() - cached.timestamp < 3600000;
        return isValid ? cached.data : null;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting cached thumbnail:', error);
      return null;
    }
  }
}

export default new ThumbnailService();
