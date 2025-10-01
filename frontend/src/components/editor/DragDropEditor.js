import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import ComponentRenderer from './ComponentRenderer';
import ComponentPalette from './ComponentPalette';
import PropertiesPanel from './PropertiesPanel';
import EditorToolbar from './EditorToolbar';
import { 
  addComponent, 
  moveComponent, 
  selectComponent, 
  clearSelection,
  updateComponent,
  deleteComponent,
  duplicateComponent
} from '../../store/slices/editorSlice';

const DragDropEditor = ({ portfolioId }) => {
  const dispatch = useDispatch();
  const { 
    components, 
    selectedComponent, 
    editMode, 
    showGrid, 
    zoom,
    customizations 
  } = useSelector(state => state.editor);
  
  const [showPalette, setShowPalette] = useState(true);
  const [showProperties, setShowProperties] = useState(true);

  // Canvas drop zone
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ['component', 'template-component'],
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const canvasRect = document.getElementById('editor-canvas').getBoundingClientRect();
      
      const position = {
        x: offset.x - canvasRect.left,
        y: offset.y - canvasRect.top
      };

      if (item.isNew) {
        // Adding new component from palette
        dispatch(addComponent({
          type: item.type,
          props: item.defaultProps || {},
          position,
          content: item.defaultContent || ''
        }));
      } else {
        // Moving existing component
        dispatch(moveComponent({
          id: item.id,
          position
        }));
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!editMode) return;

      // Delete selected component
      if (e.key === 'Delete' && selectedComponent) {
        dispatch(deleteComponent(selectedComponent));
      }

      // Duplicate component
      if ((e.ctrlKey || e.metaKey) && e.key === 'd' && selectedComponent) {
        e.preventDefault();
        dispatch(duplicateComponent(selectedComponent));
      }

      // Deselect
      if (e.key === 'Escape') {
        dispatch(clearSelection());
      }

      // Undo/Redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          dispatch({ type: 'editor/redo' });
        } else {
          dispatch({ type: 'editor/undo' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editMode, selectedComponent, dispatch]);

  const handleComponentClick = useCallback((e, componentId) => {
    if (!editMode) return;
    e.stopPropagation();
    dispatch(selectComponent(componentId));
  }, [editMode, dispatch]);

  const handleCanvasClick = useCallback((e) => {
    if (e.target.id === 'editor-canvas') {
      dispatch(clearSelection());
    }
  }, [dispatch]);

  const handleComponentUpdate = useCallback((id, updates) => {
    dispatch(updateComponent({ id, updates }));
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Component Palette */}
      <AnimatePresence>
        {showPalette && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-72 bg-white shadow-xl z-20 overflow-y-auto"
          >
            <ComponentPalette />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <EditorToolbar 
          portfolioId={portfolioId}
          onTogglePalette={() => setShowPalette(!showPalette)}
          onToggleProperties={() => setShowProperties(!showProperties)}
        />

        {/* Canvas */}
        <div className="flex-1 overflow-auto bg-gray-50 p-8">
          <div className="mx-auto" style={{ maxWidth: customizations.layout.containerWidth }}>
            <div
              id="editor-canvas"
              ref={drop}
              onClick={handleCanvasClick}
              className={`
                relative min-h-screen bg-white shadow-2xl rounded-lg
                ${showGrid && editMode ? 'canvas-grid' : ''}
                ${isOver ? 'ring-4 ring-blue-400 ring-opacity-50' : ''}
                ${canDrop ? 'cursor-copy' : ''}
              `}
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
                backgroundColor: customizations.colors.background,
                color: customizations.colors.text,
                fontFamily: customizations.fonts.body
              }}
            >
              {/* Render components */}
              <AnimatePresence>
                {components.map((component) => (
                  <ComponentRenderer
                    key={component.id}
                    component={component}
                    isSelected={selectedComponent === component.id}
                    isEditable={editMode}
                    onClick={(e) => handleComponentClick(e, component.id)}
                    onUpdate={(updates) => handleComponentUpdate(component.id, updates)}
                    customizations={customizations}
                  />
                ))}
              </AnimatePresence>

              {/* Empty state */}
              {components.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <h3 className="text-lg font-medium mb-2">Start Building Your Portfolio</h3>
                    <p className="text-sm">Drag components from the palette to get started</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Properties Panel */}
      <AnimatePresence>
        {showProperties && selectedComponent && (
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            className="w-80 bg-white shadow-xl z-20 overflow-y-auto"
          >
            <PropertiesPanel
              component={components.find(c => c.id === selectedComponent)}
              onUpdate={(updates) => handleComponentUpdate(selectedComponent, updates)}
              onDelete={() => dispatch(deleteComponent(selectedComponent))}
              customizations={customizations}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .canvas-grid {
          background-image: 
            linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, .02) 25%, rgba(0, 0, 0, .02) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, .02) 75%, rgba(0, 0, 0, .02) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, .02) 25%, rgba(0, 0, 0, .02) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, .02) 75%, rgba(0, 0, 0, .02) 76%, transparent 77%, transparent);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default DragDropEditor;
