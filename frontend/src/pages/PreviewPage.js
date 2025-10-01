import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPortfolio } from '../store/slices/portfolioSlice';
import { ClipLoader } from 'react-spinners';
import { FaArrowLeft, FaEdit, FaExternalLinkAlt } from 'react-icons/fa';
import ComponentRenderer from '../components/editor/ComponentRenderer';

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

  const components = currentPortfolio.content?.sections || [];
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
      <div 
        className="min-h-screen"
        style={{
          backgroundColor: customizations.colors.background,
          color: customizations.colors.text,
          fontFamily: customizations.fonts.body
        }}
      >
        {components.length > 0 ? (
          <div className="relative">
            {components.map((component) => (
              <ComponentRenderer
                key={component.id}
                component={component}
                isSelected={false}
                isEditable={false}
                customizations={customizations}
              />
            ))}
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
      </div>
    </div>
  );
};

export default PreviewPage;
