import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPortfolio } from '../store/slices/portfolioSlice';
import { loadPortfolio } from '../store/slices/editorSlice';
import SectionBasedEditor from '../components/editor/SectionBasedEditor';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
// Import template data
import { getTemplate } from '../templates';

const EditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentPortfolio, isLoading } = useSelector(state => state.portfolio);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        const result = await dispatch(getPortfolio(id)).unwrap();
        const portfolioData = result.data || result;
        
        // Check if portfolio has sections or needs template initialization
        let sections = portfolioData.content?.sections || portfolioData.sections;
        let customizations = portfolioData.customizations;
        
        // Determine template based on portfolio metadata
        let templateSlug = 'modern-minimalist'; // default
        
        // Check various ways the template might be stored
        if (portfolioData.templateInfo?.slug) {
          templateSlug = portfolioData.templateInfo.slug;
        } else if (portfolioData.template) {
          templateSlug = portfolioData.template;
        } else if (portfolioData.templateId) {
          // For backend templates, we might need to fetch or map the ID
          templateSlug = portfolioData.templateId;
        }
        
        console.log('Loading template:', templateSlug, 'from portfolio data:', portfolioData);
        console.log('Portfolio templateInfo:', portfolioData.templateInfo);
        
        const template = getTemplate(templateSlug);
        console.log('Loaded template:', template.name, 'with customizations:', template.customizations);
        
        // If no sections exist, load from template
        if (!sections || sections.length === 0) {
          sections = template.sections;
        }
        
        // Always ensure we have proper template customizations
        // Merge stored customizations with template defaults, prioritizing stored values
        customizations = {
          ...template.customizations,
          ...customizations
        };
        
        // Load portfolio data into editor
        dispatch(loadPortfolio({
          sections,
          customizations
        }));
      } catch (error) {
        console.error('Failed to load portfolio:', error);
        toast.error('Failed to load portfolio');
        navigate('/dashboard');
      }
    };

    if (id) {
      loadPortfolioData();
    }
  }, [id, dispatch, navigate]);

  // Check if user owns the portfolio
  useEffect(() => {
    if (currentPortfolio && user) {
      if (currentPortfolio.userId !== user.id && 
          currentPortfolio.userId?._id !== user.id) {
        toast.error('You do not have permission to edit this portfolio');
        navigate('/dashboard');
      }
    }
  }, [currentPortfolio, user, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <ClipLoader color="#3b82f6" size={50} />
          <p className="mt-4 text-gray-600">Loading portfolio editor...</p>
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

  return (
    <div className="h-screen overflow-hidden">
      <SectionBasedEditor portfolioId={id} />
    </div>
  );
};

export default EditorPage;
