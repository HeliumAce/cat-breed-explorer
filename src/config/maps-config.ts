
// Google Maps configuration

export const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

if (!MAPS_API_KEY) {
  console.error('Google Maps API key is missing. Please check your .env file.');
}

// Map libraries to load
export const MAPS_LIBRARIES = ['places', 'geometry', 'visualization'];

// Default map options
export const DEFAULT_MAP_OPTIONS = {
  zoom: 10,
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: true,
  fullscreenControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
};
