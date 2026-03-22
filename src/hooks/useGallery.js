import { useState, useEffect } from 'react';
import { galleryApi } from '../api';

export const useGallery = (projectId = null) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const params = projectId ? { projectId } : {};
        const response = await galleryApi.getAll(params);
        setItems(response.items || []);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch gallery:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [projectId]);

  return { items, loading, error };
};

export default useGallery;
