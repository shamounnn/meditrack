import { useCallback, useEffect, useState } from 'react';
import { medicationService } from '../services/medicationService';

function useMedications(userId) {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!userId) {
      setMedications([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await medicationService.getUserMedications(userId);
      setMedications(data);
    } catch (err) {
      console.error('Error fetching medications:', err);
      setError(err.message || 'Failed to load medications');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { medications, loading, error, refresh };
}

export { useMedications };

