import apiClient from './client.js';

export const projectsApi = {
  // Public: Get all projects
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/api/projects?${queryString}` : '/api/projects';
    return apiClient.get(endpoint);
  },

  // Public: Get featured projects
  getFeatured: async () => {
    return apiClient.get('/api/projects/featured');
  },

  // Public: Get project by slug
  getBySlug: async (slug) => {
    return apiClient.get(`/api/projects/${slug}`);
  },

  // Admin: Create project
  create: async (formData) => {
    return apiClient.uploadFile('/api/admin/projects', formData.coverImage, {
      title: formData.title,
      category: formData.category,
      shortDescription: formData.shortDescription,
      fullDescription: formData.fullDescription,
      location: formData.location || '',
      isFeatured: formData.isFeatured || false,
      displayOrder: formData.displayOrder || 0,
    });
  },

  // Admin: Update project
  update: async (id, formData) => {
    if (formData.coverImage) {
      return apiClient.uploadFile(`/api/admin/projects/${id}`, formData.coverImage, {
        title: formData.title,
        category: formData.category,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        location: formData.location || '',
        isFeatured: formData.isFeatured || false,
        displayOrder: formData.displayOrder || 0,
      });
    } else {
      return apiClient.patch(`/api/admin/projects/${id}`, formData);
    }
  },

  // Admin: Delete project
  delete: async (id) => {
    return apiClient.delete(`/api/admin/projects/${id}`);
  },
};

export default projectsApi;
