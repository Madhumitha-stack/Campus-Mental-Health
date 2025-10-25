import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('mentalHealthUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('mentalHealthUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const userData = {
        id: '1',
        email: email,
        name: email.split('@')[0],
        avatar: '👤'
      };
      
      setUser(userData);
      localStorage.setItem('mentalHealthUser', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (userData) => {
    try {
      const newUser = {
        id: '1',
        email: userData.email,
        name: userData.name || userData.email.split('@')[0],
        avatar: '👤'
      };
      
      setUser(newUser);
      localStorage.setItem('mentalHealthUser', JSON.stringify(newUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mentalHealthUser');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return React.createElement(AuthContext.Provider, { value: value }, children);
}