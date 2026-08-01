import { useState, useEffect } from 'react';

export const useFirestore = (serviceFn, fallbackData = []) => {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await serviceFn();
        if (!cancelled) {
          if (result && (Array.isArray(result) ? result.length > 0 : true)) {
            setData(result);
          }
        }
      } catch (err) {
        if (!cancelled) setError(err);
        console.error('Firestore fetch error:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
};
