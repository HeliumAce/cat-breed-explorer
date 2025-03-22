
// A utility for consistently loading the Google Maps API
import { MAPS_API_KEY, MAPS_LIBRARIES } from '@/config/maps-config';

// Script ID to prevent duplicate loading
export const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-script';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Track loading state
let isLoading = false;
let isLoaded = false;
let loadError: Error | null = null;

// Load callbacks
const callbacks: Array<(error?: Error) => void> = [];

// Create a promise-based loader
export function loadGoogleMaps(): Promise<void> {
  return new Promise((resolve, reject) => {
    // If already loaded, resolve immediately
    if (isLoaded && window.google && window.google.maps) {
      return resolve();
    }
    
    // If there was an error, reject with the same error
    if (loadError) {
      return reject(loadError);
    }
    
    // Add to callbacks to execute when loading completes
    callbacks.push((error) => {
      if (error) reject(error);
      else resolve();
    });
    
    // If already loading, wait for the current load
    if (isLoading) {
      return;
    }
    
    // Start loading
    isLoading = true;
    
    // Check if script already exists
    const existingScript = document.getElementById(GOOGLE_MAPS_SCRIPT_ID) as HTMLScriptElement;
    
    if (existingScript) {
      // If script exists but Google isn't defined, wait for it
      const checkLoaded = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkLoaded);
          isLoaded = true;
          isLoading = false;
          callbacks.forEach(cb => cb());
          callbacks.length = 0;
        }
      }, 100);
      
      return;
    }
    
    // Create script element
    const script = document.createElement('script');
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=${MAPS_LIBRARIES.join(',')}&v=weekly`;
    
    // Handle load events
    script.onload = () => {
      isLoaded = true;
      isLoading = false;
      callbacks.forEach(cb => cb());
      callbacks.length = 0;
    };
    
    script.onerror = (err) => {
      const error = new Error('Failed to load Google Maps API');
      loadError = error;
      isLoading = false;
      callbacks.forEach(cb => cb(error));
      callbacks.length = 0;
    };
    
    // Add script to document
    document.head.appendChild(script);
  });
}

// Check if Maps is currently loaded
export function isGoogleMapsLoaded(): boolean {
  return isLoaded && !!window.google && !!window.google.maps;
}

// Global Google Maps typings
declare global {
  interface Window {
    google: typeof google;
  }
}
