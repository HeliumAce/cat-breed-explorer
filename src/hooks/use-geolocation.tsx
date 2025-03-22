
import { useState, useEffect } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        loading: false,
      }));
      return;
    }

    const geoSuccess = (position: GeolocationPosition) => {
      console.log('Got geolocation:', position.coords.latitude, position.coords.longitude);
      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        loading: false,
      });
    };

    const geoError = (error: GeolocationPositionError) => {
      console.error('Geolocation error:', error.message);
      setState(prev => ({
        ...prev,
        error: error.message,
        loading: false,
      }));
    };

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    // Request location
    const watchId = navigator.geolocation.watchPosition(
      geoSuccess, 
      geoError, 
      geoOptions
    );

    // Cleanup
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return state;
};
