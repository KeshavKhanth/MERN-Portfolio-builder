import { createSlice } from '@reduxjs/toolkit';

// Helper function to add to history
const addToHistory = (state) => {
  state.history = state.history.slice(0, state.historyIndex + 1);
  state.history.push({
    sections: JSON.parse(JSON.stringify(state.sections))
  });
  state.historyIndex++;
};

const initialState = {
  sections: [],
  selectedSection: null,
  isDragging: false,
  editMode: true,
  showGrid: false,
  zoom: 100,
  customizations: {
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      accent: '#10b981',
      background: '#ffffff',
      text: '#111827',
      muted: '#9ca3af'
    },
    fonts: {
      heading: 'Inter',
      body: 'Open Sans'
    },
    layout: {
      containerWidth: '100%',
      sectionSpacing: '0px'
    },
    animations: {
      enabled: true,
      type: 'fade'
    }
  },
  history: [],
  historyIndex: -1
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    // Add section
    addSection: (state, action) => {
      const newSection = {
        id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        order: state.sections.length + 1,
        type: 'empty',
        name: 'New Section',
        props: {},
        content: {},
        ...action.payload
      };
      
      // Adjust order if inserting between sections
      if (action.payload.order && action.payload.order <= state.sections.length) {
        state.sections.forEach(section => {
          if (section.order >= action.payload.order) {
            section.order += 1;
          }
        });
        newSection.order = action.payload.order;
      }
      
      state.sections.push(newSection);
      state.selectedSection = newSection.id;
      addToHistory(state);
    },

    // Update section
    updateSection: (state, action) => {
      const { id, updates } = action.payload;
      const section = state.sections.find(s => s.id === id);
      if (section) {
        Object.assign(section, updates);
        addToHistory(state);
      }
    },

    // Delete section
    deleteSection: (state, action) => {
      const deletedSection = state.sections.find(s => s.id === action.payload);
      if (deletedSection) {
        state.sections = state.sections.filter(s => s.id !== action.payload);
        
        // Adjust orders
        state.sections.forEach(s => {
          if (s.order > deletedSection.order) {
            s.order -= 1;
          }
        });
        
        if (state.selectedSection === action.payload) {
          state.selectedSection = null;
        }
        addToHistory(state);
      }
    },

    // Duplicate section
    duplicateSection: (state, action) => {
      const original = state.sections.find(s => s.id === action.payload);
      if (original) {
        const newOrder = original.order + 1;
        
        // Adjust orders for sections after the original
        state.sections.forEach(s => {
          if (s.order >= newOrder) {
            s.order += 1;
          }
        });
        
        const duplicate = {
          ...JSON.parse(JSON.stringify(original)),
          id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          order: newOrder,
          name: `${original.name || 'Section'} (Copy)`
        };
        
        state.sections.push(duplicate);
        state.selectedSection = duplicate.id;
        addToHistory(state);
      }
    },

    // Move/reorder sections
    reorderSections: (state, action) => {
      const { sectionId, newIndex, newOrder } = action.payload;
      
      if (newOrder !== undefined) {
        const section = state.sections.find(s => s.id === sectionId);
        if (section) {
          const oldOrder = section.order;
          
          state.sections.forEach(s => {
            if (s.id === sectionId) {
              s.order = newOrder;
            } else if (oldOrder < newOrder && s.order > oldOrder && s.order <= newOrder) {
              s.order -= 1;
            } else if (oldOrder > newOrder && s.order < oldOrder && s.order >= newOrder) {
              s.order += 1;
            }
          });
        }
      } else if (newIndex !== undefined) {
        const sortedSections = [...state.sections].sort((a, b) => a.order - b.order);
        const sectionIndex = sortedSections.findIndex(s => s.id === sectionId);
        
        if (sectionIndex !== -1 && newIndex >= 0 && newIndex < sortedSections.length) {
          const [section] = sortedSections.splice(sectionIndex, 1);
          sortedSections.splice(newIndex, 0, section);
          
          sortedSections.forEach((s, idx) => {
            const actualSection = state.sections.find(sec => sec.id === s.id);
            if (actualSection) {
              actualSection.order = idx + 1;
            }
          });
        }
      }
      
      addToHistory(state);
    },

    // Select section
    selectSection: (state, action) => {
      state.selectedSection = action.payload;
    },

    // Deselect section
    deselectSection: (state) => {
      state.selectedSection = null;
    },

    // Clear selection
    clearSelection: (state) => {
      state.selectedSection = null;
    },

    // Toggle edit mode
    toggleEditMode: (state) => {
      state.editMode = !state.editMode;
    },

    // Set edit mode
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },

    // Toggle grid
    toggleGrid: (state) => {
      state.showGrid = !state.showGrid;
    },

    // Set zoom
    setZoom: (state, action) => {
      state.zoom = Math.max(25, Math.min(200, action.payload));
    },

    // Update customizations
    updateCustomizations: (state, action) => {
      state.customizations = {
        ...state.customizations,
        ...action.payload
      };
    },

    // Update colors
    updateColors: (state, action) => {
      state.customizations.colors = {
        ...state.customizations.colors,
        ...action.payload
      };
    },

    // Update fonts
    updateFonts: (state, action) => {
      state.customizations.fonts = {
        ...state.customizations.fonts,
        ...action.payload
      };
    },

    // Load portfolio
    loadPortfolio: (state, action) => {
      const { sections, content, customizations } = action.payload;
      
      if (sections && Array.isArray(sections)) {
        state.sections = sections.map((section, index) => ({
          ...section,
          order: section.order || index + 1,
          id: section.id || `section-${Date.now()}-${index}`
        }));
      } else if (content) {
        if (Array.isArray(content)) {
          state.sections = content.map((item, index) => ({
            ...item,
            order: item.order || index + 1,
            id: item.id || `section-${Date.now()}-${index}`
          }));
        } else if (content.sections) {
          state.sections = content.sections.map((section, index) => ({
            ...section,
            order: section.order || index + 1,
            id: section.id || `section-${Date.now()}-${index}`
          }));
        }
      }
      
      if (customizations) {
        state.customizations = {
          ...state.customizations,
          ...customizations
        };
      }
      
      state.selectedSection = null;
      state.history = [];
      state.historyIndex = -1;
    },

    // Undo
    undo: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex--;
        const previousState = state.history[state.historyIndex];
        state.sections = previousState.sections;
        state.selectedSection = null;
      }
    },

    // Redo
    redo: (state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        const nextState = state.history[state.historyIndex];
        state.sections = nextState.sections;
        state.selectedSection = null;
      }
    },

    // Clear canvas
    clearCanvas: (state) => {
      state.sections = [];
      state.selectedSection = null;
      addToHistory(state);
    },

    // Reset editor
    resetEditor: () => initialState,

    // Legacy compatibility - map old actions to new ones
    addComponent: (state, action) => {
      editorSlice.caseReducers.addSection(state, action);
    },
    updateComponent: (state, action) => {
      editorSlice.caseReducers.updateSection(state, action);
    },
    deleteComponent: (state, action) => {
      editorSlice.caseReducers.deleteSection(state, action);
    },
    selectComponent: (state, action) => {
      editorSlice.caseReducers.selectSection(state, action);
    }
  }
});

export const {
  addSection,
  updateSection,
  deleteSection,
  duplicateSection,
  reorderSections,
  selectSection,
  deselectSection,
  clearSelection,
  toggleEditMode,
  setEditMode,
  toggleGrid,
  setZoom,
  updateCustomizations,
  updateColors,
  updateFonts,
  loadPortfolio,
  undo,
  redo,
  clearCanvas,
  resetEditor,
  // Legacy exports
  addComponent,
  updateComponent,
  deleteComponent,
  selectComponent
} = editorSlice.actions;

export default editorSlice.reducer;
