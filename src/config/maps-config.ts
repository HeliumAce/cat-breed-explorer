
// Google Maps configuration

export const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

if (!MAPS_API_KEY) {
  console.error('Google Maps API key is missing. Please check your .env file.');
}

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

// Map loading options - explicitly specify all libraries we need
export const MAPS_LIBRARIES = ['places', 'geometry', 'visualization'];

// We'll use a script ID to prevent duplicate script loading
export const MAPS_SCRIPT_ID = 'google-maps-script';

// Create a Google Maps URL that works properly across different domains
export const getMapsUrl = () => {
  return `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=${MAPS_LIBRARIES.join(',')}&callback=initMap&v=weekly`;
};

// Define a global callback for Google Maps to use
if (typeof window !== 'undefined') {
  window.initMap = function() {
    // This is empty because we're handling initialization in the component
    console.log('Google Maps API loaded successfully');
    
    // Dispatch a custom event when maps is loaded
    window.dispatchEvent(new Event('google-maps-loaded'));
  };
}

// Add the type definition for the global initMap function
declare global {
  interface Window {
    google: typeof google;
    initMap: () => void;
  }
}
