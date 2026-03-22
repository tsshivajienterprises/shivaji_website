import apiClient from './client.js';

export const callbacksApi = {
  // Public: Submit callback request
  create: async (data) => {
    return apiClient.post('/api/callback-requests', data);
  },

  // Admin: Get all callbacks
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/api/admin/callbacks?${queryString}` : '/api/admin/callbacks';
    return apiClient.get(endpoint);
  },

  // Admin: Update callback status
  updateStatus: async (id, status) => {
    return apiClient.patch(`/api/admin/callbacks/${id}`, { status });
  },
};

export default callbacksApi;
