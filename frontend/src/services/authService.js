import axios from 'axios';

const API_URL = '/api/auth';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
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

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async login(email, password) {
    const response = await api.post(`${API_URL}/login`, { email, password });
    return response.data;
  },

  async register(userData) {
    const response = await api.post(`${API_URL}/register`, userData);
    return response.data;
  },

  async getProfile() {
    const response = await api.get(`${API_URL}/profile`);
    return response.data.user;
  },

  async updateProfile(profileData) {
    const response = await api.put(`${API_URL}/profile`, profileData);
    return response.data.user;
  }
};

export default api;