import { useEffect, useState } from 'react';

function useApi(callback, deps = [], options = { immediate: true }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(options.immediate);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!options.immediate) {
      return;
    }

    let mounted = true;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const result = await callback();
        if (mounted) {
          setData(result);
        }
      } catch (err) {
        if (mounted) {
          setError(err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, deps);

  return { data, loading, error, setData, setLoading, setError };
}

export { useApi };

