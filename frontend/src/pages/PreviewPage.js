import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPortfolio } from '../store/slices/portfolioSlice';
import { ClipLoader } from 'react-spinners';
import { FaArrowLeft, FaEdit, FaExternalLinkAlt } from 'react-icons/fa';
import ComponentRenderer from '../components/editor/ComponentRenderer';
import NavBar from '../components/layout/NavBar';

const PreviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentPortfolio, isLoading } = useSelector(state => state.portfolio);

  useEffect(() => {
    if (id) {
      dispatch(getPortfolio(id));
    }
  }, [id, dispatch]);

  // Scroll to position hero section just under navbar on initial load
  useEffect(() => {
    if (currentPortfolio && !isLoading) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const heroElement = document.querySelector('[data-section-type="hero"]');
        if (heroElement) {
          heroElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [currentPortfolio, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <ClipLoader color="#3b82f6" size={50} />
          <p className="mt-4 text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (!currentPortfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Portfolio not found</h2>
          <p className="text-gray-600 mb-4">The portfolio you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const components = (currentPortfolio.content?.sections || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0));
  const customizations = currentPortfolio.customizations || {
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

  // Extract portfolio name from hero section
  const heroSection = components.find(c => c.type === 'hero');
  const portfolioName = heroSection?.content?.title || currentPortfolio.title || 'Portfolio';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Preview Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Back to Dashboard"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Preview: {currentPortfolio.title}
                </h1>
                <p className="text-sm text-gray-500">
                  {currentPortfolio.isPublished ? 'Published' : 'Draft'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {currentPortfolio.isPublished && currentPortfolio.slug && (
                <a
                  href={`/portfolio/${currentPortfolio.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                >
                  <FaExternalLinkAlt /> View Live
                </a>
              )}
              <button
                onClick={() => navigate(`/editor/${id}`)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <FaEdit /> Edit Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <NavBar portfolioName={portfolioName} />
      <div
        className="min-h-screen"
        style={{
          backgroundColor: customizations.colors?.background || '#ffffff',
          color: customizations.colors?.text || '#333333',
          fontFamily: customizations.fonts?.body || 'Inter'
        }}
      >
        {components.length > 0 ? (
          <div className="relative">
            {components.map((component, index) => (
              <div key={component.id} data-section-type={component.type}>
                {/* Separator Line with Shadow (not before first section) */}
                {index > 0 && (
                  <div className="my-12 px-6">
                    <div className="max-w-7xl mx-auto">
                      <hr className="border-t border-gray-300 shadow-sm" />
                    </div>
                  </div>
                )}
                <ComponentRenderer
                  component={component}
                  isSelected={false}
                  isEditable={false}
                  customizations={customizations}
                />
              </div>
            ))}
            {/* Render footer if present separately at the bottom */}
            {components.find(c => c.type === 'footer') ? (
              components.filter(c => c.type === 'footer').map(c => (
                <ComponentRenderer key={`footer-${c.id}`} component={c} isSelected={false} isEditable={false} customizations={customizations} />
              ))
            ) : null}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEdit className="text-4xl text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                No content yet
              </h2>
              <p className="text-gray-600 mb-6">
                Start building your portfolio in the editor
              </p>
              <button
                onClick={() => navigate(`/editor/${id}`)}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
              >
                Open Editor
              </button>
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
      </div>
    </div>
  );
};

export default PreviewPage;
