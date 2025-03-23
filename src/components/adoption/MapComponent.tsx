
import { useEffect, useRef, useState } from "react";
import { Coordinates, AdoptionLocation } from "@/types/adoption";
import { LoadingInline } from "@/components/Loading";
import { AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Define the Google Maps types
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface MapComponentProps {
  userLocation: Coordinates;
  locations: AdoptionLocation[];
  onLocationSelect: (location: AdoptionLocation) => void;
  selectedLocation: AdoptionLocation | null;
  isLoading: boolean;
}

export function MapComponent({ 
  userLocation, 
  locations,
  onLocationSelect,
  selectedLocation,
  isLoading
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [infoWindow, setInfoWindow] = useState<any>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [googleMapsLoading, setGoogleMapsLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Load Google Maps API dynamically
  useEffect(() => {
    async function loadGoogleMapsAPI() {
      try {
        setGoogleMapsLoading(true);
        
        // Check if Google Maps is already loaded
        if (window.google && window.google.maps) {
          console.log("Google Maps API is already loaded");
          setMapLoaded(true);
          setGoogleMapsLoading(false);
          return;
        }
        
        // Fetch API key from our Supabase Edge Function
        const { data, error } = await supabase.functions.invoke<{ apiKey: string }>('get-google-maps-key');
        
        if (error) {
          console.error("Error fetching Google Maps API key:", error);
          setMapError("Failed to load Google Maps API key. Please try again later.");
          setGoogleMapsLoading(false);
          return;
        }
        
        if (!data || !data.apiKey) {
          throw new Error("No API key returned from server");
        }
        
        // Define a callback function that will be called when the API is loaded
        window.initMap = () => {
          console.log("Google Maps API loaded successfully");
          setMapLoaded(true);
          setGoogleMapsLoading(false);
        };
        
        // Create and append the script element
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${data.apiKey}&libraries=places&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onerror = () => {
          console.error("Failed to load Google Maps API");
          setMapError("Failed to load Google Maps API. Please try again later.");
          setGoogleMapsLoading(false);
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
        setMapError("Failed to load Google Maps API. Please try again later.");
        setGoogleMapsLoading(false);
      }
    }
    
    loadGoogleMapsAPI();
  }, []);
  
  // Initialize Google Maps
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || map) return;
    
    try {
      console.log("Initializing Google Maps with user location:", userLocation);
      
      const mapOptions = {
        center: { lat: userLocation.lat, lng: userLocation.lng },
        zoom: 11,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      };
      
      const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);
      setMapError(null);
      
      // Create user location marker
      const userMarker = new window.google.maps.Marker({
        position: { lat: userLocation.lat, lng: userLocation.lng },
        map: newMap,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#4F46E5",
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 2
        },
        title: "Your Location"
      });
      
      // Create info window
      const newInfoWindow = new window.google.maps.InfoWindow();
      setInfoWindow(newInfoWindow);
      
      return () => {
        if (markers.length) {
          markers.forEach(marker => marker.setMap(null));
        }
        userMarker.setMap(null);
      };
    } catch (error) {
      console.error("Error initializing Google Maps:", error);
      setMapError("Failed to load the map. Please try refreshing the page.");
    }
  }, [userLocation, mapLoaded, map]);
  
  // Add location markers when locations change
  useEffect(() => {
    if (!map || !mapLoaded) return;
    
    try {
      console.log("Adding markers for locations:", locations);
      
      // Clear existing markers
      if (markers.length) {
        markers.forEach(marker => marker.setMap(null));
      }
      
      if (locations.length === 0) {
        // If no locations, just center on user location
        map.setCenter({ lat: userLocation.lat, lng: userLocation.lng });
        map.setZoom(11);
        setMarkers([]);
        return;
      }
      
      // Create markers for locations
      const newMarkers = locations.map(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.location.lat, lng: location.location.lng },
          map,
          title: location.name,
          icon: {
            url: getMarkerIconByType(location.type),
            scaledSize: new window.google.maps.Size(32, 32)
          }
        });
        
        marker.addListener("click", () => {
          onLocationSelect(location);
          infoWindow.setContent(
            `<div class="p-2">
              <h3 class="font-medium text-base">${location.name}</h3>
              <p class="text-sm text-muted-foreground">${location.address}</p>
              <p class="text-sm text-muted-foreground">${location.distance.toFixed(1)} km away</p>
            </div>`
          );
          infoWindow.open(map, marker);
        });
        
        return marker;
      });
      
      setMarkers(newMarkers);
      
      // Fit bounds to include all markers
      if (newMarkers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend({ lat: userLocation.lat, lng: userLocation.lng });
        locations.forEach(location => {
          bounds.extend({
            lat: location.location.lat,
            lng: location.location.lng
          });
        });
        map.fitBounds(bounds);
      }
    } catch (error) {
      console.error("Error adding location markers:", error);
      setMapError("Failed to display locations on the map.");
    }
  }, [locations, map, userLocation, infoWindow, onLocationSelect, mapLoaded]);
  
  // Update selected location
  useEffect(() => {
    if (!map || !selectedLocation || !infoWindow || !markers.length) return;
    
    try {
      const marker = markers.find(
        m => m.getTitle() === selectedLocation.name
      );
      
      if (marker) {
        map.panTo(marker.getPosition());
        infoWindow.setContent(
          `<div class="p-2">
            <h3 class="font-medium text-base">${selectedLocation.name}</h3>
            <p class="text-sm text-muted-foreground">${selectedLocation.address}</p>
            <p class="text-sm text-muted-foreground">${selectedLocation.distance.toFixed(1)} km away</p>
          </div>`
        );
        infoWindow.open(map, marker);
      }
    } catch (error) {
      console.error("Error updating selected location:", error);
    }
  }, [selectedLocation, map, infoWindow, markers]);
  
  const getMarkerIconByType = (type: string) => {
    switch (type) {
      case "shelter":
        return "/marker-shelter.png";
      case "humane":
        return "/marker-humane.png";
      case "store":
        return "/marker-store.png";
      default:
        return "/marker-default.png";
    }
  };
  
  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
          <LoadingInline />
        </div>
      )}
      
      {googleMapsLoading && !mapLoaded && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="text-center p-4">
            <LoadingInline />
            <p className="mt-2">Loading Google Maps...</p>
          </div>
        </div>
      )}
      
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="text-center p-4">
            <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
            <p className="text-red-600 font-medium">{mapError}</p>
          </div>
        </div>
      )}
      
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
