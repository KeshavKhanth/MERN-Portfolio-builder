import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { getTemplates, getCategories, setFilters } from '../store/slices/templateSlice';
import { createPortfolio } from '../store/slices/portfolioSlice';
import toast from 'react-hot-toast';
import { 
  FaSearch, 
  FaFilter, 
  FaTimes
} from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import TemplatePreview from '../components/templates/TemplatePreview';
import { getAllTemplates } from '../templates';
import ComponentRenderer from '../components/editor/ComponentRenderer';

const TemplatesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { templates: backendTemplates, categories: backendCategories, isLoading } = useSelector(state => state.template);
  const { isAuthenticated } = useSelector(state => state.auth);
  
  // Get local templates
  const localTemplates = getAllTemplates();
  
  // Default categories for local templates
  const defaultCategories = [
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'developer', name: 'Developer' },
    { id: 'creative', name: 'Creative' },
    { id: 'business', name: 'Business' },
    { id: 'photography', name: 'Photography' }
  ];
  
  // Use backend categories if available, otherwise use defaults
  const categories = backendCategories?.length > 0 ? backendCategories : defaultCategories;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [portfolioName, setPortfolioName] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [pricingFilter, setPricingFilter] = useState('all');
  const [features, setFeatures] = useState({
    darkMode: false
  });

  useEffect(() => {
    // Try to get templates from backend, but also use local templates
    dispatch(getTemplates({})).catch(() => {
      console.log('Using local templates');
    });
    dispatch(getCategories()).catch(() => {
      console.log('Using default categories');
    });
  }, [dispatch]);



  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    dispatch(setFilters({ search: e.target.value }));
    dispatch(getTemplates({ search: e.target.value, category: selectedCategory === 'all' ? null : selectedCategory }));
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    dispatch(setFilters({ category: category === 'all' ? null : category }));
    dispatch(getTemplates({ 
      search: searchTerm, 
      category: category === 'all' ? null : category 
    }));
  };

  const handleUseTemplate = (template) => {
    if (!isAuthenticated) {
      toast.error('Please login to use templates');
      navigate('/login');
      return;
    }
    setSelectedTemplate(template);
    setPortfolioName(`My ${template.name} Portfolio`);
    setShowCreateModal(true);
  };

  const handlePreviewTemplate = (template) => {
    setPreviewTemplate(template);
    setShowPreviewModal(true);
  };

  const handleCreatePortfolio = async () => {
    if (!portfolioName.trim()) {
      toast.error('Please enter a portfolio name');
      return;
    }

    try {
      console.log('Creating portfolio with template:', selectedTemplate);
      
      // For local templates, create portfolio with template structure directly
      const portfolioData = {
        title: portfolioName,
        // Don't send templateId for local templates since they don't exist in backend
        content: {
          sections: selectedTemplate.sections || [],
          metadata: selectedTemplate.metadata || {}
        },
        customizations: selectedTemplate.customizations || {},
        // Add template info for reference
        templateInfo: {
          name: selectedTemplate.name,
          slug: selectedTemplate.slug || selectedTemplate.id,
          category: selectedTemplate.category
        }
      };
      
      console.log('Portfolio data:', portfolioData);
      
      const result = await dispatch(createPortfolio(portfolioData)).unwrap();
      
      toast.success('Portfolio created successfully!');
      navigate(`/editor/${result.data._id}`);
    } catch (error) {
      console.error('Portfolio creation error:', error);
      toast.error(`Failed to create portfolio: ${error.message || 'Unknown error'}`);
    }
  };

  // Combine backend and local templates, preferring local
  const allTemplates = localTemplates.length > 0 ? localTemplates : backendTemplates;
  
  // Apply filters and sorting
  const filteredTemplates = (() => {
    let filtered = allTemplates.filter(template => {
      // Category filter
      if (selectedCategory !== 'all' && template.category !== selectedCategory) {
        return false;
      }
      
      // Search filter
      if (searchTerm && !template.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Pricing filter
      if (pricingFilter !== 'all') {
        const isFree = template.price === 0 || template.price === 'free' || template.isFree;
        if (pricingFilter === 'free' && !isFree) {
          return false;
        }
        if (pricingFilter === 'premium' && isFree) {
          return false;
        }
      }
      
      // Features filter
      if (features.darkMode && !template.features?.darkMode) {
        return false;
      }
      
      return true;
    });
    
    // Apply sorting
    if (sortBy !== 'none') {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case '-rating':
            return (b.rating || 0) - (a.rating || 0);
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
    }
    
    return filtered;
  })();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Template
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start with a professionally designed template and customize it to match your unique style
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => handleCategoryFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Templates
              </button>
              {/* Removed filters */}
              {/* {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryFilter(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))} */}
            </div>

            {/* Filter Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
              >
                <FaFilter />
                Filters
              </button>
              
              {/* Clear Filters */}
              {(sortBy !== 'none' || pricingFilter !== 'all' || features.darkMode || selectedCategory !== 'all' || searchTerm) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSortBy('none');
                    setPricingFilter('all');
                    setFeatures({ darkMode: false });
                  }}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-2"
                >
                  <FaTimes />
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none">-</option>
                    <option value="-rating">Highest Rated</option>
                    <option value="name">Alphabetical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pricing
                  </label>
                  <select 
                    value={pricingFilter}
                    onChange={(e) => setPricingFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="free">Free Only</option>
                    <option value="premium">Premium Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  <div className="space-y-2">

                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={features.darkMode}
                        onChange={(e) => setFeatures(prev => ({...prev, darkMode: e.target.checked}))}
                        className="mr-2" 
                      />
                      <span className="text-sm">Dark Mode</span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Active Filters Summary */}
        {(sortBy !== 'none' || pricingFilter !== 'all' || features.darkMode || selectedCategory !== 'all' || searchTerm) && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-blue-800 mb-2">Active Filters:</h3>
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                      Search: "{searchTerm}"
                    </span>
                  )}
                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                      Category: {categories.find(c => c.id === selectedCategory)?.name}
                    </span>
                  )}
                  {sortBy !== 'none' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                      Sort: {sortBy === '-rating' ? 'Highest Rated' : sortBy === 'name' ? 'Alphabetical' : sortBy}
                    </span>
                  )}
                  {pricingFilter !== 'all' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                      Pricing: {pricingFilter === 'free' ? 'Free Only' : 'Premium Only'}
                    </span>
                  )}

                  {features.darkMode && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                      Dark Mode
                    </span>
                  )}
                </div>
              </div>
              <div className="text-sm text-blue-600">
                {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>
        )}

        {/* Templates Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#3b82f6" size={50} />
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No templates found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <TemplatePreview
                key={template._id || template.slug}
                template={template}
                onSelect={() => handleUseTemplate(template)}
                onPreview={() => handlePreviewTemplate(template)}
                isSelected={selectedTemplate?._id === template._id || selectedTemplate?.slug === template.slug}
              />
            ))}
          </div>
        )}

        {/* Full Page Preview Modal */}
        {showPreviewModal && previewTemplate && (
          <div className="fixed inset-0 z-50 bg-white">
            {/* Preview Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {previewTemplate.name} - Template Preview
                  </h3>
                  <span className="text-sm text-gray-500">
                    Full template preview • {previewTemplate.sections?.length || 0} sections
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setShowPreviewModal(false);
                      handleUseTemplate(previewTemplate);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Use This Template
                  </button>
                  <button
                    onClick={() => {
                      setShowPreviewModal(false);
                      setPreviewTemplate(null);
                    }}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaTimes className="text-xl" />
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Content */}
            <div className="overflow-y-auto" style={{ height: 'calc(100vh - 65px)' }}>
              <div 
                style={{
                  fontFamily: previewTemplate.customizations?.fonts?.body || 'Inter, sans-serif',
                  background: previewTemplate.customizations?.colors?.background || '#ffffff'
                }}
              >
                {/* Dynamic Navigation Bar */}
                {previewTemplate.sections && previewTemplate.sections.length > 1 && (
                  <nav className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4">
                      <div className="flex items-center justify-center py-3">
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                          {previewTemplate.sections.map((section, index) => {
                            // Generate section name from type or use a fallback
                            const getSectionName = (section) => {
                              if (section.type === 'hero') return 'Home';
                              if (section.type === 'about') return 'About';
                              if (section.type === 'skills') return 'Skills';
                              if (section.type === 'experience') return 'Experience';
                              if (section.type === 'projects' || section.type === 'portfolio') return 'Projects';
                              if (section.type === 'contact') return 'Contact';
                              if (section.type === 'testimonials') return 'Testimonials';
                              if (section.type === 'services') return 'Services';
                              if (section.type === 'blog') return 'Blog';
                              if (section.content?.heading) return section.content.heading;
                              if (section.props?.title) return section.props.title;
                              return `Section ${index + 1}`;
                            };

                            const sectionName = getSectionName(section);
                            const sectionId = `section-${section.id || index}`;

                            return (
                              <button
                                key={section.id || index}
                                onClick={() => {
                                  const element = document.getElementById(sectionId);
                                  if (element) {
                                    element.scrollIntoView({ 
                                      behavior: 'smooth',
                                      block: 'start'
                                    });
                                  }
                                }}
                                className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
                              >
                                {sectionName}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </nav>
                )}

                {/* Template Sections */}
                {previewTemplate.sections && previewTemplate.sections.map((section, index) => (
                  <div 
                    key={section.id || index} 
                    id={`section-${section.id || index}`}
                    className="relative"
                  >
                    <ComponentRenderer
                      component={section}
                      isEditing={false}
                      customizations={previewTemplate.customizations}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Create Portfolio Modal */}
        {showCreateModal && selectedTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Create New Portfolio
              </h3>
              <p className="text-gray-600 mb-4">
                You're about to create a new portfolio using the "{selectedTemplate.name}" template.
                <br />
                Please enter a name for your new portfolio.
              </p>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio Name
                </label>
                <input
                  type="text"
                  value={portfolioName}
                  onChange={(e) => setPortfolioName(e.target.value)}
                  placeholder="Enter portfolio name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setSelectedTemplate(null);
                    setPortfolioName('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleCreatePortfolio}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Create Portfolio
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatesPage;
