import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  getUserPortfolios, 
  deletePortfolio, 
  duplicatePortfolio,
  togglePublish 
} from '../store/slices/portfolioSlice';
import toast from 'react-hot-toast';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCopy,
  FaEye,
  FaShareAlt,
  FaChartLine,
  FaClock,
  FaGlobe,
  FaSearch,
  FaThLarge,
  FaList
} from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector(state => state.auth);
  const { portfolios, isLoading } = useSelector(state => state.portfolio);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(getUserPortfolios());
  }, [dispatch]);

  const filteredPortfolios = portfolios.filter(portfolio =>
    portfolio.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (portfolioId) => {
    navigate(`/editor/${portfolioId}`);
  };

  const handlePreview = (portfolioId) => {
    navigate(`/preview/${portfolioId}`);
  };

  const handleDelete = async () => {
    if (selectedPortfolio) {
      try {
        await dispatch(deletePortfolio(selectedPortfolio._id)).unwrap();
        toast.success('Portfolio deleted successfully');
        setShowDeleteModal(false);
        setSelectedPortfolio(null);
      } catch (error) {
        toast.error('Failed to delete portfolio');
      }
    }
  };

  const handleDuplicate = async (portfolio) => {
    try {
      await dispatch(duplicatePortfolio(portfolio._id)).unwrap();
      toast.success('Portfolio duplicated successfully');
    } catch (error) {
      toast.error('Failed to duplicate portfolio');
    }
  };

  const handleTogglePublish = async (portfolio) => {
    try {
      await dispatch(togglePublish(portfolio._id)).unwrap();
      toast.success(portfolio.isPublished ? 'Portfolio unpublished' : 'Portfolio published successfully');
    } catch (error) {
      toast.error('Failed to update publish status');
    }
  };

  const stats = [
    { 
      icon: <FaThLarge />, 
      label: 'Total Portfolios', 
      value: portfolios.length,
      color: 'blue'
    },
    { 
      icon: <FaGlobe />, 
      label: 'Published', 
      value: portfolios.filter(p => p.isPublished).length,
      color: 'green'
    },
    { 
      icon: <FaChartLine />, 
      label: 'Total Views', 
      value: portfolios.reduce((sum, p) => sum + (p.views || 0), 0),
      color: 'purple'
    },
    { 
      icon: <FaClock />, 
      label: 'Last Updated', 
      value: portfolios.length > 0 
        ? new Date(Math.max(...portfolios.map(p => new Date(p.updatedAt)))).toLocaleDateString()
        : 'N/A',
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your portfolios and track their performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}>
                  {stat.icon}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search portfolios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FaThLarge />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FaList />
                </button>
              </div>
            </div>
            <Link
              to="/templates"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <FaPlus className="mr-2" />
              Create New Portfolio
            </Link>
          </div>
        </div>

        {/* Portfolios Grid/List */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#3b82f6" size={50} />
          </div>
        ) : filteredPortfolios.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaThLarge className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? 'No portfolios found' : 'No portfolios yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms' 
                  : 'Create your first portfolio to get started'}
              </p>
              {!searchTerm && (
                <Link
                  to="/templates"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <FaPlus className="mr-2" />
                  Create Your First Portfolio
                </Link>
              )}
            </div>
          </motion.div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredPortfolios.map((portfolio, index) => (
              <motion.div
                key={portfolio._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 ${
                  viewMode === 'list' ? 'flex items-center p-4' : ''
                }`}
              >
                {viewMode === 'grid' ? (
                  <>
                    {/* Portfolio Thumbnail */}
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 relative">
                      <div className="absolute top-4 right-4">
                        {portfolio.isPublished ? (
                          <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded">
                            Published
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                            Draft
                          </span>
                        )}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl text-gray-400 opacity-20">
                          <FaThLarge />
                        </div>
                      </div>
                    </div>
                    
                    {/* Portfolio Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {portfolio.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <FaClock className="mr-1" />
                        Updated {new Date(portfolio.updatedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span className="flex items-center">
                          <FaEye className="mr-1" />
                          {portfolio.views || 0} views
                        </span>
                        {portfolio.isPublished && portfolio.slug && (
                          <a
                            href={`/portfolio/${portfolio.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            View Live
                          </a>
                        )}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(portfolio._id)}
                          className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                        >
                          <FaEdit className="inline mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handlePreview(portfolio._id)}
                          className="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded hover:bg-gray-200 transition-colors"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDuplicate(portfolio)}
                          className="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded hover:bg-gray-200 transition-colors"
                        >
                          <FaCopy />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPortfolio(portfolio);
                            setShowDeleteModal(true);
                          }}
                          className="px-3 py-2 bg-gray-100 text-red-600 text-sm font-medium rounded hover:bg-red-50 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  // List View
                  <>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {portfolio.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>Updated {new Date(portfolio.updatedAt).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{portfolio.views || 0} views</span>
                            <span>•</span>
                            <span className={portfolio.isPublished ? 'text-green-600' : 'text-gray-600'}>
                              {portfolio.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(portfolio._id)}
                            className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleTogglePublish(portfolio)}
                            className="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded hover:bg-gray-200 transition-colors"
                          >
                            <FaShareAlt />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedPortfolio(portfolio);
                              setShowDeleteModal(true);
                            }}
                            className="px-3 py-2 bg-gray-100 text-red-600 text-sm font-medium rounded hover:bg-red-50 transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Delete Portfolio
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{selectedPortfolio?.title}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedPortfolio(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
