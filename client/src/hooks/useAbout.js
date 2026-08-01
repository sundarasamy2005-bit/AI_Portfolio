import { useState, useEffect } from 'react';
import { getAbout } from '../services/aboutService';
import { aboutData as fallbackAbout } from '../components/About/AboutData';

export const useAbout = () => {
  const [about, setAbout] = useState(fallbackAbout);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAbout()
      .then((data) => {
        if (data) setAbout(data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { about, loading, error };
};
