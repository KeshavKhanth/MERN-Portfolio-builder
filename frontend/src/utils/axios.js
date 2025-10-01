import axios from 'axios';

// Create axios instance
const getBaseURL = () => {
  // In production, API calls should go to the same domain
  if (process.env.NODE_ENV === 'production') {
    return window.location.origin;
  }
  // In development, use the environment variable or localhost
  return process.env.REACT_APP_API_URL || 'http://0.0.0.0:5000';
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
