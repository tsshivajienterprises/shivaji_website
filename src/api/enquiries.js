import apiClient from './client.js';

export const enquiriesApi = {
  // Public: Submit enquiry
  create: async (data) => {
    return apiClient.post('/api/enquiries', data);
  },

  // Admin: Get all enquiries
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/api/admin/enquiries?${queryString}` : '/api/admin/enquiries';
    return apiClient.get(endpoint);
  },

  // Admin: Update enquiry status
  updateStatus: async (id, status) => {
    return apiClient.patch(`/api/admin/enquiries/${id}`, { status });
  },
};

export default enquiriesApi;
