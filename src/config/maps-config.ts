
// Google Maps configuration
export const MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY_HERE';

// Default map options
export const DEFAULT_MAP_OPTIONS = {
  zoom: 11,
  disableDefaultUI: true,
  zoomControl: true,
  fullscreenControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
};

// Map loading options
export const MAPS_LIBRARIES = ['places'];
