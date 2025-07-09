
import { useEffect, useRef, useState } from "react";
import { Coordinates, AdoptionLocation } from "@/types/adoption";
import { useGoogleMapsAPI } from "@/hooks/useGoogleMapsAPI";
import { useMapMarkers } from "@/hooks/useMapMarkers";
import { MapLoadingState } from "@/components/adoption/MapLoadingState";
import { createUserLocationMarker } from "@/utils/map-utils";
import { MapPin } from "lucide-react";

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
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [userMarker, setUserMarker] = useState<google.maps.Marker | null>(null);
  
  // Use our custom hooks
  const { isLoading: googleMapsLoading, isLoaded: mapLoaded, error: apiError } = useGoogleMapsAPI();
  const { markers, infoWindow } = useMapMarkers(map, locations, userLocation, onLocationSelect);
  

  
  // Initialize Google Maps
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || map) return;
    
    try {
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
      const newUserMarker = createUserLocationMarker(newMap, { 
        lat: userLocation.lat, 
        lng: userLocation.lng 
      });
      
      setUserMarker(newUserMarker);
      
      // Add a "You are here" label to user location
      const userInfoWindow = new window.google.maps.InfoWindow({
        content: '<div class="p-1 text-xs font-medium">You are here</div>',
        pixelOffset: new window.google.maps.Size(0, -10),
        disableAutoPan: true
      });
      
      userInfoWindow.open(newMap, newUserMarker);
      
      // Close user info window after 5 seconds
      setTimeout(() => {
        userInfoWindow.close();
      }, 5000);
      
      return () => {
        if (userMarker) {
          userMarker.setMap(null);
        }
        userInfoWindow.close();
      };
    } catch (error) {
      console.error("Error initializing Google Maps:", error);
      setMapError("Failed to load the map. Please try refreshing the page.");
    }
  }, [userLocation, mapLoaded, map]);
  
  // Update user marker position when userLocation changes
  useEffect(() => {
    if (!map || !userMarker || !window.google) return;
    
    userMarker.setPosition({ 
      lat: userLocation.lat, 
      lng: userLocation.lng 
    });
    
    // Only center map on user if no locations are displayed
    if (locations.length === 0) {
      map.panTo({ lat: userLocation.lat, lng: userLocation.lng });
    }
  }, [userLocation, map, userMarker, locations.length]);
  
  // Update selected location
  useEffect(() => {
    if (!map || !selectedLocation || !infoWindow || !markers.length) return;
    
    try {
      const marker = markers.find(
        m => m.getTitle() === selectedLocation.name
      );
      
      if (marker) {
        // Pan to the marker with slight offset to center it
        map.panTo(marker.getPosition() as google.maps.LatLng);
        
        // Set info window content
        infoWindow.setContent(
          `<div class="p-2">
            <h3 class="font-medium text-base">${selectedLocation.name}</h3>
            <p class="text-sm text-muted-foreground">${selectedLocation.address}</p>
            <p class="text-sm text-muted-foreground">${selectedLocation.distance.toFixed(1)} km away</p>
            ${selectedLocation.open !== undefined ? 
              `<p class="text-sm ${selectedLocation.open ? 'text-green-600' : 'text-gray-500'}">
                ${selectedLocation.open ? 'Open now' : 'Closed'}
              </p>` : ''}
          </div>`
        );
        
        // Open info window on the marker
        infoWindow.open(map, marker);
        
        // Add slight bounce animation to the selected marker
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        
        // Stop bouncing after a short time
        setTimeout(() => {
          marker.setAnimation(null);
        }, 1500);
      }
    } catch (error) {
      console.error("Error updating selected location:", error);
    }
  }, [selectedLocation, map, infoWindow, markers]);
  

  
  // No locations placeholder
  const NoLocationsPlaceholder = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {!isLoading && locations.length === 0 && mapLoaded && (
        <div className="bg-white/90 p-4 rounded-lg shadow-md text-center max-w-xs">
          <MapPin className="h-8 w-8 text-amber-500 mx-auto mb-2" />
          <p className="font-medium text-sm">No adoption locations found</p>
          <p className="text-xs text-muted-foreground">Try changing your location or filters</p>
        </div>
      )}
    </div>
  );
  
  return (
    <div className="relative w-full h-full">
      <MapLoadingState 
        isLoading={isLoading}
        googleMapsLoading={googleMapsLoading}
        mapLoaded={mapLoaded}
        error={apiError || mapError}
      />
      
      <div ref={mapRef} className="w-full h-full" />
      
      <NoLocationsPlaceholder />
    </div>
  );
}
