import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const API_URL = '/api/portfolios';

// Create portfolio
export const createPortfolio = createAsyncThunk(
  'portfolio/create',
  async (portfolioData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, portfolioData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user portfolios
export const getUserPortfolios = createAsyncThunk(
  'portfolio/getUserPortfolios',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single portfolio
export const getPortfolio = createAsyncThunk(
  'portfolio/getPortfolio',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update portfolio
export const updatePortfolio = createAsyncThunk(
  'portfolio/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/portfolios/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update portfolio');
    }
  }
);

// Save portfolio sections
export const savePortfolioSections = createAsyncThunk(
  'portfolio/saveSections',
  async ({ id, sections, customizations }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        content: { sections },
        customizations
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to save portfolio');
    }
  }
);

// Publish/Unpublish portfolio
export const togglePublish = createAsyncThunk(
  'portfolio/togglePublish',
  async (id, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}/publish`, {});
      return { id, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete portfolio
export const deletePortfolio = createAsyncThunk(
  'portfolio/delete',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Duplicate portfolio
export const duplicatePortfolio = createAsyncThunk(
  'portfolio/duplicate',
  async (id, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/duplicate`, {});
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get portfolio by slug (public)
export const getPortfolioBySlug = createAsyncThunk(
  'portfolio/getBySlug',
  async (slug, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/public/${slug}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  portfolios: [],
  currentPortfolio: null,
  publicPortfolio: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  totalCount: 0,
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    setCurrentPortfolio: (state, action) => {
      state.currentPortfolio = action.payload;
    },
    updatePortfolioContent: (state, action) => {
      if (state.currentPortfolio) {
        state.currentPortfolio.content = action.payload;
      }
    },
    updatePortfolioCustomizations: (state, action) => {
      if (state.currentPortfolio) {
        state.currentPortfolio.customizations = {
          ...state.currentPortfolio.customizations,
          ...action.payload
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Create portfolio
      .addCase(createPortfolio.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPortfolio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.portfolios.push(action.payload.data);
        state.currentPortfolio = action.payload.data;
      })
      .addCase(createPortfolio.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get user portfolios
      .addCase(getUserPortfolios.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserPortfolios.fulfilled, (state, action) => {
        state.isLoading = false;
        state.portfolios = action.payload.data;
        state.totalCount = action.payload.count;
      })
      .addCase(getUserPortfolios.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get single portfolio
      .addCase(getPortfolio.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPortfolio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPortfolio = action.payload.data;
      })
      .addCase(getPortfolio.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update portfolio
      .addCase(updatePortfolio.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePortfolio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentPortfolio = action.payload.data;
        const index = state.portfolios.findIndex(p => p._id === action.payload.data._id);
        if (index !== -1) {
          state.portfolios[index] = action.payload.data;
        }
      })
      .addCase(updatePortfolio.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Toggle publish
      .addCase(togglePublish.fulfilled, (state, action) => {
        const index = state.portfolios.findIndex(p => p._id === action.payload.id);
        if (index !== -1) {
          state.portfolios[index].isPublished = action.payload.data.data.isPublished;
          state.portfolios[index].publishedAt = action.payload.data.data.publishedAt;
        }
        if (state.currentPortfolio && state.currentPortfolio._id === action.payload.id) {
          state.currentPortfolio.isPublished = action.payload.data.data.isPublished;
          state.currentPortfolio.publishedAt = action.payload.data.data.publishedAt;
        }
      })
      // Delete portfolio
      .addCase(deletePortfolio.fulfilled, (state, action) => {
        state.portfolios = state.portfolios.filter(p => p._id !== action.payload);
        if (state.currentPortfolio && state.currentPortfolio._id === action.payload) {
          state.currentPortfolio = null;
        }
      })
      // Duplicate portfolio
      .addCase(duplicatePortfolio.fulfilled, (state, action) => {
        state.portfolios.push(action.payload.data);
      })
      // Get portfolio by slug
      .addCase(getPortfolioBySlug.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPortfolioBySlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publicPortfolio = action.payload.data;
      })
      .addCase(getPortfolioBySlug.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setCurrentPortfolio, updatePortfolioContent, updatePortfolioCustomizations } = portfolioSlice.actions;
export default portfolioSlice.reducer;
