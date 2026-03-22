import { useState, useEffect } from 'react';
import { settingsApi } from '../api';

export const useSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await settingsApi.getPublic();
        setSettings(response.settings || {});
        setError(null);
      } catch (err) {
        console.error('Failed to fetch settings:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error };
};

export default useSettings;
