// Mock authentication service
export const authService = {
  async login(email, password) {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          resolve({
            id: '1',
            email,
            name: email.split('@')[0],
            avatar: '👤'
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  async signup(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email && userData.password) {
          resolve({
            id: '1',
            email: userData.email,
            name: userData.name || userData.email.split('@')[0],
            avatar: '👤'
          });
        } else {
          reject(new Error('Registration failed'));
        }
      }, 1000);
    });
  }
};