import api from './authService';

const CHATBOT_API = '/api/chatbot';

export const chatbotService = {
  async sendMessage(message, context = {}) {
    try {
      const response = await api.post(`${CHATBOT_API}/message`, {
        message,
        context
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      throw error;
    }
  },

  async getConversationHistory() {
    try {
      const response = await api.get(`${CHATBOT_API}/history`);
      return response.data;
    } catch (error) {
      console.error('Error fetching conversation history:', error);
      throw error;
    }
  }
};