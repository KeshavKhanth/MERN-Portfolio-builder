import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  FaSave,
  FaEye,
  FaUndo,
  FaRedo,
  FaDesktop,
  FaTabletAlt,
  FaMobileAlt,
  FaCog,
  FaArrowLeft,
  FaDownload,
  FaShareAlt,
  FaEdit,
  FaLink,
  FaExternalLinkAlt,
  FaCopy,
  FaPalette
} from 'react-icons/fa';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { MdWidgets } from 'react-icons/md';
import { 
  toggleEditMode,
  toggleGrid,
  setZoom,
  undo,
  redo
} from '../../store/slices/editorSlice';
import { savePortfolioSections, togglePublish } from '../../store/slices/portfolioSlice';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import ThemeCustomizer from './ThemeCustomizer';

const EditorToolbar = ({ portfolioId, onTogglePalette, onToggleProperties }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [devicePreview, setDevicePreview] = useState('desktop');
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);
  
  const {
    editMode,
    showGrid,
    zoom,
    sections,
    customizations,
    historyIndex,
    history
  } = useSelector(state => state.editor);
  
  const { currentPortfolio } = useSelector(state => state.portfolio);

  // Save handler
  const handleSave = async () => {
    if (!portfolioId) {
      toast.error('No portfolio ID found');
      return;
    }
    
    setIsSaving(true);
    try {
      await dispatch(savePortfolioSections({
        id: portfolioId,
        sections,
        customizations
      })).unwrap();
      
      toast.success('Portfolio saved successfully!');
    } catch (error) {
      toast.error('Failed to save portfolio');
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Publish handler
  const handlePublish = async () => {
    if (!portfolioId) {
      toast.error('No portfolio ID found');
      return;
    }
    
    setIsPublishing(true);
    try {
      await dispatch(togglePublish(portfolioId)).unwrap();
      const isNowPublished = !currentPortfolio?.isPublished;
      
      if (isNowPublished) {
        setShowPublishModal(true);
        toast.success('Portfolio published successfully!');
      } else {
        toast.success('Portfolio unpublished');
      }
    } catch (error) {
      toast.error('Failed to update publish status');
      console.error('Publish error:', error);
    } finally {
      setIsPublishing(false);
    }
  };
  
  // Copy portfolio URL
  const copyPortfolioURL = () => {
    const url = `${window.location.origin}/portfolio/${currentPortfolio?.slug || portfolioId}`;
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard!');
  };

  // Preview handler - opens in new tab
  const handlePreview = () => {
    // First save the current state
    handleSave().then(() => {
      window.open(`/preview/${portfolioId}`, '_blank');
    });
  };

  // Export handler
  const handleExport = () => {
    // Create a JSON export of the portfolio
    const exportData = {
      sections,
      customizations,
      metadata: {
        exportDate: new Date().toISOString(),
        portfolioTitle: currentPortfolio?.title || 'Untitled Portfolio'
      }
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportName = `portfolio-${portfolioId}-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
    
    toast.success('Portfolio exported successfully!');
  };

  // Zoom controls
  const zoomOptions = [
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
    { value: 125, label: '125%' },
    { value: 150, label: '150%' }
  ];

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Back to Dashboard */}
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Back to Dashboard"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>

          <div className="h-8 w-px bg-gray-300" />

          {/* Portfolio Title */}
          <div>
            <h1 className="text-sm font-semibold text-gray-900">
              {currentPortfolio?.title || 'Untitled Portfolio'}
            </h1>
            <span className="text-xs text-gray-500">
              {currentPortfolio?.isPublished ? 'Published' : 'Draft'}
            </span>
          </div>

          <div className="h-8 w-px bg-gray-300" />

          {/* Palette Toggle */}
          <button
            onClick={onTogglePalette}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Toggle Component Palette"
          >
            <MdWidgets className="text-gray-600" />
          </button>

          {/* Theme Customizer Toggle */}
          <button
            onClick={() => setShowThemeCustomizer(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Theme Customizer"
          >
            <FaPalette className="text-gray-600" />
          </button>

          {/* Properties Toggle */}
          {/* <button
            onClick={onToggleProperties}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Toggle Properties Panel"
          >
            <FaCog className="text-gray-600" />
          </button> */}
        </div>

        {/* Center Section */}
        <div className="flex items-center space-x-2">
          {/* Undo/Redo */}
          <button
            onClick={() => dispatch(undo())}
            disabled={!canUndo}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Undo (Ctrl+Z)"
          >
            <FaUndo className="text-gray-600 text-sm" />
          </button>
          
          <button
            onClick={() => dispatch(redo())}
            disabled={!canRedo}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Redo (Ctrl+Shift+Z)"
          >
            <FaRedo className="text-gray-600 text-sm" />
          </button>

          <div className="h-8 w-px bg-gray-300" />

          {/* Device Preview */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setDevicePreview('desktop')}
              className={`p-1.5 rounded ${devicePreview === 'desktop' ? 'bg-white shadow-sm' : ''}`}
              title="Desktop View"
            >
              <FaDesktop className={`text-sm ${devicePreview === 'desktop' ? 'text-blue-600' : 'text-gray-600'}`} />
            </button>
            <button
              onClick={() => setDevicePreview('tablet')}
              className={`p-1.5 rounded ${devicePreview === 'tablet' ? 'bg-white shadow-sm' : ''}`}
              title="Tablet View"
            >
              <FaTabletAlt className={`text-sm ${devicePreview === 'tablet' ? 'text-blue-600' : 'text-gray-600'}`} />
            </button>
            <button
              onClick={() => setDevicePreview('mobile')}
              className={`p-1.5 rounded ${devicePreview === 'mobile' ? 'bg-white shadow-sm' : ''}`}
              title="Mobile View"
            >
              <FaMobileAlt className={`text-sm ${devicePreview === 'mobile' ? 'text-blue-600' : 'text-gray-600'}`} />
            </button>
          </div>

          <div className="h-8 w-px bg-gray-300" />

          {/* Grid Toggle */}
          {/* <button
            onClick={() => dispatch(toggleGrid())}
            className={`p-2 rounded-lg transition-colors ${showGrid ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-600'}`}
            title="Toggle Grid"
          >
            <BsGrid3X3Gap />
          </button> */}

          {/* Edit Mode Toggle */}
          <button
            onClick={() => dispatch(toggleEditMode())}
            className={`p-2 rounded-lg transition-colors ${editMode ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-600'}`}
            title="Toggle Edit Mode"
          >
            {editMode ? <FaEdit /> : <FaEye />}
          </button>

          <div className="h-8 w-px bg-gray-300" />

          {/* Zoom Control */}
          <select
            value={zoom}
            onChange={(e) => dispatch(setZoom(parseInt(e.target.value)))}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Zoom Level"
          >
            {zoomOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Preview Button */}
          <button
            onClick={handlePreview}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            title="Preview Portfolio in New Tab"
          >
            <FaEye className="text-sm" />
            View Preview
          </button>
          
          {/* View Live Button (only if published) */}
          {currentPortfolio?.isPublished && (
            <button
              onClick={() => window.open(`/portfolio/${currentPortfolio?.slug || portfolioId}`, '_blank')}
              className="px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 border border-green-300 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-2"
              title="View Live Portfolio"
            >
              <FaExternalLinkAlt className="text-sm" />
              View Live
            </button>
          )}

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            title="Export Portfolio"
          >
            <FaDownload className="text-sm" />
            Export
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            title="Save Portfolio"
          >
            {isSaving ? (
              <>
                <ClipLoader color="#ffffff" size={14} />
                Saving...
              </>
            ) : (
              <>
                <FaSave className="text-sm" />
                Save
              </>
            )}
          </button>

          {/* Publish/Get URL Button */}
          {currentPortfolio?.isPublished ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPublishModal(true)}
                className="px-4 py-1.5 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                title="Get Portfolio URL"
              >
                <FaLink className="text-sm" />
                Get URL
              </button>
              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="px-3 py-1.5 text-sm font-medium bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Unpublish Portfolio"
              >
                {isPublishing ? <ClipLoader color="currentColor" size={14} /> : 'Unpublish'}
              </button>
            </div>
          ) : (
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="px-4 py-1.5 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              title="Publish Portfolio"
            >
              {isPublishing ? (
                <>
                  <ClipLoader color="currentColor" size={14} />
                  Publishing...
                </>
              ) : (
                <>
                  <FaShareAlt className="text-sm" />
                  Publish & Get URL
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Optional: Auto-save indicator */}
      {sections.length > 0 && (
        <div className="absolute top-1 right-1">
          <span className="text-xs text-gray-400">
            {isSaving ? 'Saving...' : 'All changes saved'}
          </span>
        </div>
      )}
      
      {/* Publish URL Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
            <h3 className="text-xl font-bold mb-4">🎉 Portfolio Published!</h3>
            <p className="text-gray-600 mb-4">
              Your portfolio is now live! Share it with the world using the URL below:
            </p>
            
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={`${window.location.origin}/portfolio/${currentPortfolio?.slug || portfolioId}`}
                  readOnly
                  className="flex-1 bg-transparent text-sm font-mono text-gray-800 outline-none"
                />
                <button
                  onClick={copyPortfolioURL}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                >
                  <FaCopy className="text-sm" />
                  Copy
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <button
                onClick={() => window.open(`/portfolio/${currentPortfolio?.slug || portfolioId}`, '_blank')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <FaExternalLinkAlt />
                View Live Portfolio
              </button>
              
              <button
                onClick={() => setShowPublishModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Theme Customizer Modal */}
      <ThemeCustomizer
        isOpen={showThemeCustomizer}
        onClose={() => setShowThemeCustomizer(false)}
      />
    </div>
  );
};

export default EditorToolbar;
