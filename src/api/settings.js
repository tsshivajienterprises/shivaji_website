import apiClient from './client.js';

export const settingsApi = {
  // Public: Get public settings
  getPublic: async () => {
    return apiClient.get('/api/settings/public');
  },

  // Admin: Get all settings
  getAll: async () => {
    return apiClient.get('/api/admin/settings');
  },

  // Admin: Update settings
  update: async (settings) => {
    return apiClient.patch('/api/admin/settings', { settings });
  },
};

export default settingsApi;
