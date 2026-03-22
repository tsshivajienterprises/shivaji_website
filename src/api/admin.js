import apiClient from './client.js';

export const adminApi = {
  // Login
  login: async (email, password) => {
    const response = await apiClient.post('/api/admin/login', { email, password });
    if (response.token) {
      apiClient.setToken(response.token);
    }
    return response;
  },

  // Logout
  logout: () => {
    apiClient.setToken(null);
  },

  // Get current admin user
  getMe: async () => {
    return apiClient.get('/api/admin/me');
  },

  // Check if logged in
  isAuthenticated: () => {
    return !!apiClient.getToken();
  },
};

export default adminApi;
