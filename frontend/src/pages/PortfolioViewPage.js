import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPortfolioBySlug } from '../store/slices/portfolioSlice';
import { ClipLoader } from 'react-spinners';
import ComponentRenderer from '../components/editor/ComponentRenderer';
import NavBar from '../components/layout/NavBar';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const PortfolioViewPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  
  const { publicPortfolio, isLoading } = useSelector(state => state.portfolio);

  useEffect(() => {
    if (slug) {
      dispatch(getPortfolioBySlug(slug));
    }
  }, [slug, dispatch]);

  // Scroll to position hero section just under navbar on initial load
  useEffect(() => {
    if (publicPortfolio && !isLoading) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const heroElement = document.querySelector('[data-section-type="hero"]');
        if (heroElement) {
          heroElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [publicPortfolio, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <ClipLoader color="#3b82f6" size={50} />
          <p className="mt-4 text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!publicPortfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Portfolio Not Found</h2>
          <p className="text-gray-600 mb-6">
            The portfolio you're looking for doesn't exist or has been unpublished.
          </p>
          <a
            href="/"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  const components = (publicPortfolio.content?.sections || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0));
  const customizations = publicPortfolio.customizations || {
    colors: {
      primary: '#007bff',
      secondary: '#6c757d',
      background: '#ffffff',
      text: '#333333',
      accent: '#ffc107'
    },
    fonts: {
      heading: 'Inter',
      body: 'Open Sans'
    }
  };

  const seoSettings = publicPortfolio.seoSettings || {};
  const userName = publicPortfolio.userId ? 
    `${publicPortfolio.userId.firstName} ${publicPortfolio.userId.lastName}` : 
    'Portfolio';

  // Extract portfolio name from hero section
  const heroSection = components.find(c => c.type === 'hero');
  const portfolioName = heroSection?.content?.title || userName;

  return (
    <>
      <Helmet>
        <title>{seoSettings.metaTitle || `${publicPortfolio.title} - ${userName}`}</title>
        <meta 
          name="description" 
          content={seoSettings.metaDescription || `Portfolio website of ${userName}`} 
        />
        {seoSettings.keywords && (
          <meta name="keywords" content={seoSettings.keywords.join(', ')} />
        )}
        {seoSettings.ogImage && (
          <>
            <meta property="og:image" content={seoSettings.ogImage} />
            <meta property="og:title" content={seoSettings.metaTitle || publicPortfolio.title} />
            <meta property="og:description" content={seoSettings.metaDescription} />
          </>
        )}
      </Helmet>

      <NavBar portfolioName={portfolioName} />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
        style={{
          backgroundColor: customizations.colors?.background || '#ffffff',
          color: customizations.colors?.text || '#333333',
          fontFamily: customizations.fonts?.body || 'Inter'
        }}
      >
        {components.length > 0 ? (
          <div>
            {components.map((component, index) => (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Separator Line with Shadow (not before first section) */}
                {index > 0 && (
                  <div className="my-12 px-6">
                    <div className="max-w-7xl mx-auto">
                      <hr className="border-t border-gray-300 shadow-sm" />
                    </div>
                  </div>
                )}
                <div data-section-type={component.type}>
                  <ComponentRenderer
                    component={component}
                    isSelected={false}
                    isEditable={false}
                    customizations={customizations}
                  />
                </div>
              </motion.div>
            ))}
            {/* Footer(s) rendered at the end if present */}
            {components.find(c => c.type === 'footer') ? (
              components.filter(c => c.type === 'footer').map(c => (
                <ComponentRenderer key={`footer-${c.id}`} component={c} isSelected={false} isEditable={false} customizations={customizations} />
              ))
            ) : null}
          </div>
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">{publicPortfolio.title}</h1>
              <p className="text-gray-600">This portfolio is currently being updated.</p>
            </div>
          </div>
        )}
        
        {/* Default Footer - Always visible */}
        <footer className="bg-gray-900 text-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                All rights reserved © {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </footer>
      </motion.div>
    </>
  );
};

export default PortfolioViewPage;
