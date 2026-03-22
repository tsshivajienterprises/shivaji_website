import { useState, useEffect } from 'react';
import { projectsApi } from '../api';

export const useProjects = (featured = false) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = featured 
          ? await projectsApi.getFeatured() 
          : await projectsApi.getAll();
        setProjects(response.projects || []);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [featured]);

  return { projects, loading, error };
};

export default useProjects;
