import apiClient from './client.js';

export const galleryApi = {
  // Public: Get all gallery items
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/api/gallery?${queryString}` : '/api/gallery';
    return apiClient.get(endpoint);
  },

  // Admin: Create gallery item
  create: async (formData) => {
    return apiClient.uploadFile('/api/admin/gallery', formData.image, {
      title: formData.title,
      projectId: formData.projectId || '',
      displayOrder: formData.displayOrder || 0,
      isActive: formData.isActive !== undefined ? formData.isActive : true,
    });
  },

  // Admin: Update gallery item
  update: async (id, formData) => {
    if (formData.image) {
      return apiClient.uploadFile(`/api/admin/gallery/${id}`, formData.image, {
        title: formData.title,
        projectId: formData.projectId || '',
        displayOrder: formData.displayOrder || 0,
        isActive: formData.isActive !== undefined ? formData.isActive : true,
      });
    } else {
      return apiClient.patch(`/api/admin/gallery/${id}`, formData);
    }
  },

  // Admin: Delete gallery item
  delete: async (id) => {
    return apiClient.delete(`/api/admin/gallery/${id}`);
  },
};

export default galleryApi;
