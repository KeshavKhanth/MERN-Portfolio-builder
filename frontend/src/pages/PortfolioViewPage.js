import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPortfolioBySlug } from '../store/slices/portfolioSlice';
import { ClipLoader } from 'react-spinners';
import ComponentRenderer from '../components/editor/ComponentRenderer';
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

  const components = publicPortfolio.content?.sections || [];
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

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
        style={{
          backgroundColor: customizations.colors.background,
          color: customizations.colors.text,
          fontFamily: customizations.fonts.body
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
                <ComponentRenderer
                  component={component}
                  isSelected={false}
                  isEditable={false}
                  customizations={customizations}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">{publicPortfolio.title}</h1>
              <p className="text-gray-600">This portfolio is currently being updated.</p>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default PortfolioViewPage;
