
// Google Maps API Key
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

// Check if the API key is valid (not empty)
export const isValidGoogleMapsApiKey = GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY.length > 0;

// Additional configuration for Google Maps
export const mapConfig = {
  defaultCenter: {
    lat: 34.052235,
    lng: -118.243683
  },
  defaultZoom: 10,
  markerIcons: {
    shelter: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    humane_society: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    pet_store: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
    user: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
    default: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
  }
};
