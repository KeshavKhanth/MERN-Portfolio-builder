import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/templates';

// Get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get all templates
export const getTemplates = createAsyncThunk(
  'template/getAll',
  async ({ category, isPremium, search, sort }, thunkAPI) => {
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (isPremium !== undefined) params.append('isPremium', isPremium);
      if (search) params.append('search', search);
      if (sort) params.append('sort', sort);
      
      const response = await axios.get(`${API_URL}?${params}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single template
export const getTemplate = createAsyncThunk(
  'template/getOne',
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

// Get template categories
export const getCategories = createAsyncThunk(
  'template/getCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Rate template
export const rateTemplate = createAsyncThunk(
  'template/rate',
  async ({ id, rating }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/rate`, { rating }, {
        headers: getAuthHeader()
      });
      return { id, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  templates: [],
  currentTemplate: null,
  categories: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  filters: {
    category: null,
    isPremium: null,
    search: '',
    sort: '-popularity'
  }
};

export const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
    },
    clearFilters: (state) => {
      state.filters = {
        category: null,
        isPremium: null,
        search: '',
        sort: '-popularity'
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Get templates
      .addCase(getTemplates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTemplates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.templates = action.payload.data;
      })
      .addCase(getTemplates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get single template
      .addCase(getTemplate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTemplate = action.payload.data;
      })
      .addCase(getTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get categories
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data;
      })
      // Rate template
      .addCase(rateTemplate.fulfilled, (state, action) => {
        const index = state.templates.findIndex(t => t._id === action.payload.id);
        if (index !== -1) {
          state.templates[index].rating = action.payload.data.data;
        }
        if (state.currentTemplate && state.currentTemplate._id === action.payload.id) {
          state.currentTemplate.rating = action.payload.data.data;
        }
      });
  },
});

export const { reset, setFilters, clearFilters } = templateSlice.actions;
export default templateSlice.reducer;
