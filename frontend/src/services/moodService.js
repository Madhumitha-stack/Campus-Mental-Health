import api from './authService';

const MOOD_API = '/api/mood';

export const moodService = {
  async createMoodEntry(entryData) {
    try {
      const response = await api.post(`${MOOD_API}/entries`, entryData);
      return response.data;
    } catch (error) {
      console.error('Error creating mood entry:', error);
      throw error;
    }
  },

  async getMoodEntries(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await api.get(`${MOOD_API}/entries?${queryString}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching mood entries:', error);
      throw error;
    }
  },

  async getMoodStats() {
    try {
      const response = await api.get(`${MOOD_API}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching mood stats:', error);
      throw error;
    }
  },

  async deleteMoodEntry(entryId) {
    try {
      const response = await api.delete(`${MOOD_API}/entries/${entryId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting mood entry:', error);
      throw error;
    }
  }
};