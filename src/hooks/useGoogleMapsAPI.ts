
import { useState, useEffect } from 'react';

export function useGoogleMapsAPI() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGoogleMapsAPI() {
      try {
        setIsLoading(true);
        
        // Check if Google Maps is already loaded
        if (window.google && window.google.maps) {
          console.log("Google Maps API is already loaded");
          setIsLoaded(true);
          setIsLoading(false);
          return;
        }
        
        // Fetch API key from our Vercel API route
        const response = await fetch('/api/google-maps-key');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !data.apiKey) {
          throw new Error("No API key returned from server");
        }
        
        // Define a callback function that will be called when the API is loaded
        window.initMap = () => {
          console.log("Google Maps API loaded successfully");
          setIsLoaded(true);
          setIsLoading(false);
        };
        
        // Create and append the script element
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${data.apiKey}&libraries=places&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onerror = () => {
          console.error("Failed to load Google Maps API");
          setError("Failed to load Google Maps API. Please try again later.");
          setIsLoading(false);
        };
        
        document.head.appendChild(script);
        
        // Clean up function
        return () => {
          if (window.initMap) {
            // @ts-ignore
            window.initMap = undefined;
          }
          
          // Only remove the script if it's still in the document
          if (script.parentNode) {
            document.head.removeChild(script);
          }
        };
      } catch (error) {
        console.error("Error loading Google Maps API:", error);
        setError("Failed to load Google Maps API. Please try again later.");
        setIsLoading(false);
      }
    }
    
    loadGoogleMapsAPI();
  }, []);

  return {
    isLoading,
    isLoaded,
    error
  };
}
