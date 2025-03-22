
// Google Maps API Key
// Replace this with your actual Google Maps API key
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

// Additional configuration for Google Maps
export const mapConfig = {
  defaultCenter: {
    lat: 34.052235,
    lng: -118.243683
  },
  defaultZoom: 10,
  // Map style options
  options: {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    zoomControl: true,
  }
};
