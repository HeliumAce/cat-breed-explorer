
// Google Maps configuration

// Your API key should be here after the git integration
export const MAPS_API_KEY = 'AIzaSyBgvftUaflViUzJlLD9s5dquYo_8V2jWms';

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

// Map loading options
export const MAPS_LIBRARIES = ['places'];
