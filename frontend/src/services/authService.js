import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const authService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async signup(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }
};

export const chatbotService = {
  async sendMessage(message, userId) {
    const response = await api.post('/chatbot', { message, userId });
    return response.data;
  }
};

export const moodService = {
  async logMood(moodData, token) {
    const response = await api.post('/mood/log', moodData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async getMoodHistory(days = 7, token) {
    const response = await api.get(`/mood/history?days=${days}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};