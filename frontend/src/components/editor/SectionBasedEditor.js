import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  FaPlus, 
  FaArrowUp, 
  FaArrowDown, 
  FaCopy, 
  FaTrash
} from 'react-icons/fa';
import {
  addSection,
  updateSection,
  deleteSection,
  duplicateSection,
  reorderSections,
  selectSection,
  clearSelection
} from '../../store/slices/editorSlice';
import SectionRenderer from './SectionRenderer';
import ComponentPalette from './ComponentPalette';
import EditorToolbar from './EditorToolbar';
import PropertiesPanel from './PropertiesPanel';

const SectionBasedEditor = ({ portfolioId }) => {
  const dispatch = useDispatch();
  const { 
    sections, 
    selectedSection, 
    editMode, 
    zoom, 
    customizations 
  } = useSelector(state => state.editor);
  
  const [showPalette, setShowPalette] = useState(true);
  const [showProperties, setShowProperties] = useState(true);

  // Sort sections by order
  const sortedSections = [...sections].sort((a, b) => (a.order || 0) - (b.order || 0));

  // Drop zone component for new sections
  const DropZone = ({ index }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
      accept: ['component', 'section'],
      drop: (item, monitor) => {
        if (!monitor.didDrop()) {
          if (item.isNew) {
            // Adding new section from palette
            const newSection = {
              type: item.type,
              name: item.name,
              order: index,
              props: item.defaultProps || {},
              content: item.defaultContent || {},
              // Ensure no arrays or objects in style props
              style: typeof item.style === 'object' && !Array.isArray(item.style) ? item.style : {}
            };
            console.log('Adding new section:', newSection);
            dispatch(addSection(newSection));
            toast.success(`Added ${item.name} section`);
          } else if (item.sectionId) {
            // Reordering existing section
            dispatch(reorderSections({
              sectionId: item.sectionId,
              newIndex: index
            }));
          }
        }
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      })
    });

    return (
      <div 
        ref={drop}
        className={`
          transition-all duration-300 rounded-lg
          ${isOver && canDrop ? 'bg-blue-400 h-24 border-2 border-blue-500 border-dashed my-4' : ''}
          ${canDrop && !isOver ? 'bg-blue-200 h-4 my-2 opacity-50' : ''}
          ${!canDrop ? 'h-0' : ''}
        `}
      >
        {isOver && canDrop && (
          <div className="flex items-center justify-center h-full">
            <span className="text-blue-600 font-medium text-lg">Drop here to add section</span>
          </div>
        )}
      </div>
    );
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!editMode) return;

      // Delete selected section
      if (e.key === 'Delete' && selectedSection) {
        dispatch(deleteSection(selectedSection));
        toast.success('Section deleted');
      }

      // Duplicate section
      if ((e.ctrlKey || e.metaKey) && e.key === 'd' && selectedSection) {
        e.preventDefault();
        dispatch(duplicateSection(selectedSection));
        toast.success('Section duplicated');
      }

      // Clear selection
      if (e.key === 'Escape') {
        dispatch(clearSelection());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editMode, selectedSection, dispatch]);

  // Handle section operations
  const handleAddSection = (index) => {
    dispatch(addSection({
      type: 'empty',
      name: 'New Section',
      order: index + 1,
      props: {},
      content: {}
    }));
    toast.success('New section added');
  };

  const handleMoveSection = (sectionId, direction) => {
    const currentIndex = sortedSections.findIndex(s => s.id === sectionId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= sortedSections.length) return;

    dispatch(reorderSections({
      sectionId,
      newIndex
    }));
  };

  const handleSectionUpdate = (sectionId, updates) => {
    dispatch(updateSection({
      id: sectionId,
      updates
    }));
  };

  const handleSectionClick = (e, sectionId) => {
    e.stopPropagation();
    dispatch(selectSection(sectionId));
  };

  const handleCanvasClick = () => {
    dispatch(clearSelection());
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Toolbar */}
      <EditorToolbar
        portfolioId={portfolioId}
        onTogglePalette={() => setShowPalette(!showPalette)}
        onToggleProperties={() => setShowProperties(!showProperties)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Component Palette */}
        <AnimatePresence>
          {showPalette && (
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-80 bg-white shadow-xl z-20 overflow-y-auto border-r border-gray-200"
            >
              <ComponentPalette />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Canvas */}
        <div 
          className="flex-1 overflow-auto bg-gray-50"
          onClick={handleCanvasClick}
        >
          <div 
            className="mx-auto bg-white shadow-sm"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
              minHeight: '100vh'
            }}
          >
            {/* Empty State */}
            {sortedSections.length === 0 && (
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center p-12">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <FaPlus className="text-3xl text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Start Building Your Portfolio
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Drag components from the palette or click the button below to add your first section
                  </p>
                  <button
                    onClick={() => handleAddSection(0)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <FaPlus /> Add First Section
                  </button>
                </div>
              </div>
            )}

            {/* Sections */}
            <div>
              {sortedSections.map((section, index) => (
                <div key={section.id}>
                  {/* Drop Zone Before Section */}
                  <DropZone index={index} />
                  
                  {/* Removed redundant Add Section Button as DropZone already handles this */}

                  {/* Section Container */}
                  <div className="relative group">
                    {/* Section Controls (visible in edit mode) */}
                    {editMode && (
                      <div className={`
                        absolute left-2 top-4 z-30 flex flex-col gap-2 
                        opacity-0 group-hover:opacity-100 transition-opacity
                        ${selectedSection === section.id ? '!opacity-100' : ''}
                      `}>
                        <button
                          onClick={() => handleMoveSection(section.id, 'up')}
                          disabled={index === 0}
                          className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          title="Move Up"
                        >
                          <FaArrowUp className="text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleMoveSection(section.id, 'down')}
                          disabled={index === sortedSections.length - 1}
                          className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          title="Move Down"
                        >
                          <FaArrowDown className="text-gray-600" />
                        </button>
                        <button
                          onClick={() => dispatch(duplicateSection(section.id))}
                          className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-all"
                          title="Duplicate"
                        >
                          <FaCopy className="text-gray-600" />
                        </button>
                        <button
                          onClick={() => {
                            dispatch(deleteSection(section.id));
                            toast.success('Section deleted');
                          }}
                          className="p-2 bg-white rounded-lg shadow-md hover:bg-red-100 transition-all"
                          title="Delete"
                        >
                          <FaTrash className="text-red-600" />
                        </button>
                      </div>
                    )}

                    {/* Section Content */}
                    <div 
                      className={`
                        transition-all duration-200
                        ${selectedSection === section.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                        ${editMode ? 'hover:shadow-lg' : ''}
                      `}
                      onClick={(e) => handleSectionClick(e, section.id)}
                    >
                      <SectionRenderer
                        section={section}
                        isSelected={selectedSection === section.id}
                        isEditable={editMode}
                        onUpdate={(updates) => handleSectionUpdate(section.id, updates)}
                        customizations={customizations}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Drop Zone After All Sections */}
              <DropZone index={sortedSections.length} />
              
              {/* Bottom Add Section Button (Always Visible) */}
              {editMode && sortedSections.length > 0 && (
                <div className="p-8 bg-gradient-to-b from-white to-gray-50">
                  <div className="text-center">
                    <button
                      onClick={() => handleAddSection(sortedSections.length)}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-3"
                    >
                      <FaPlus className="text-xl" /> Add New Section
                    </button>
                    <p className="mt-3 text-sm text-gray-500">
                      Or drag components from the palette
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        <AnimatePresence>
          {showProperties && selectedSection && (
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-80 bg-white shadow-xl z-20 overflow-y-auto border-l border-gray-200"
            >
              <PropertiesPanel
                section={sortedSections.find(s => s.id === selectedSection)}
                onUpdate={(updates) => handleSectionUpdate(selectedSection, updates)}
                onDelete={() => {
                  dispatch(deleteSection(selectedSection));
                  toast.success('Section deleted');
                }}
                customizations={customizations}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SectionBasedEditor;
