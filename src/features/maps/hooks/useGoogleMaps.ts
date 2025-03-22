
import { useState, useEffect } from 'react';
import { loadGoogleMaps, isGoogleMapsLoaded } from '../utils/googleMapsLoader';

interface UseGoogleMapsReturn {
  isLoaded: boolean;
  isLoading: boolean;
  error: Error | null;
  loadMaps: () => Promise<void>;
}

export function useGoogleMaps(): UseGoogleMapsReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(isGoogleMapsLoaded());
  const [error, setError] = useState<Error | null>(null);

  const loadMaps = async () => {
    if (isLoaded) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      await loadGoogleMaps();
      setIsLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load Google Maps'));
      console.error('Error loading Google Maps:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Try to load maps on mount
  useEffect(() => {
    if (!isLoaded && !isLoading && !error) {
      loadMaps();
    }
  }, []);

  return {
    isLoaded,
    isLoading,
    error,
    loadMaps
  };
}
