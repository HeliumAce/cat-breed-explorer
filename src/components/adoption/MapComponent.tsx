
import { useEffect, useRef, useState } from "react";
import { Coordinates, AdoptionLocation } from "@/types/adoption";
import { useGoogleMapsAPI } from "@/hooks/useGoogleMapsAPI";
import { useMapMarkers } from "@/hooks/useMapMarkers";
import { MapLoadingState } from "@/components/adoption/MapLoadingState";
import { createUserLocationMarker } from "@/utils/map-utils";

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
  
  // Use our custom hooks
  const { isLoading: googleMapsLoading, isLoaded: mapLoaded, error: apiError } = useGoogleMapsAPI();
  const { markers, infoWindow } = useMapMarkers(map, locations, userLocation, onLocationSelect);
  
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
      const userMarker = createUserLocationMarker(newMap, { 
        lat: userLocation.lat, 
        lng: userLocation.lng 
      });
      
      return () => {
        if (userMarker) {
          userMarker.setMap(null);
        }
      };
    } catch (error) {
      console.error("Error initializing Google Maps:", error);
      setMapError("Failed to load the map. Please try refreshing the page.");
    }
  }, [userLocation, mapLoaded, map]);
  
  // Update selected location
  useEffect(() => {
    if (!map || !selectedLocation || !infoWindow || !markers.length) return;
    
    try {
      const marker = markers.find(
        m => m.getTitle() === selectedLocation.name
      );
      
      if (marker) {
        map.panTo(marker.getPosition() as google.maps.LatLng);
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
  
  return (
    <div className="relative w-full h-full">
      <MapLoadingState 
        isLoading={isLoading}
        googleMapsLoading={googleMapsLoading}
        mapLoaded={mapLoaded}
        error={apiError || mapError}
      />
      
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
