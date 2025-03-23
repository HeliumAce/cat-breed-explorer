
import { useEffect, useRef, useState } from "react";
import { Coordinates, AdoptionLocation } from "@/types/adoption";
import { LoadingInline } from "@/components/Loading";

// Define the Google Maps types
declare global {
  interface Window {
    google: any;
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
  
  // Initialize Google Maps
  useEffect(() => {
    if (!mapRef.current || !window.google || map) return;
    
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
  }, [userLocation, map]);
  
  // Add location markers when locations change
  useEffect(() => {
    if (!map || !locations.length || !window.google) return;
    
    // Clear existing markers
    if (markers.length) {
      markers.forEach(marker => marker.setMap(null));
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
            <p class="text-sm text-muted-foreground">${location.distance.toFixed(1)} miles away</p>
          </div>`
        );
        infoWindow.open(map, marker);
      });
      
      return marker;
    });
    
    setMarkers(newMarkers);
    
    // Fit bounds to include all markers
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend({ lat: userLocation.lat, lng: userLocation.lng });
    locations.forEach(location => {
      bounds.extend({
        lat: location.location.lat,
        lng: location.location.lng
      });
    });
    map.fitBounds(bounds);
  }, [locations, map, userLocation, infoWindow, onLocationSelect]);
  
  // Update selected location
  useEffect(() => {
    if (!map || !selectedLocation || !infoWindow || !markers.length) return;
    
    const marker = markers.find(
      m => m.getTitle() === selectedLocation.name
    );
    
    if (marker) {
      map.panTo(marker.getPosition());
      infoWindow.setContent(
        `<div class="p-2">
          <h3 class="font-medium text-base">${selectedLocation.name}</h3>
          <p class="text-sm text-muted-foreground">${selectedLocation.address}</p>
          <p class="text-sm text-muted-foreground">${selectedLocation.distance.toFixed(1)} miles away</p>
        </div>`
      );
      infoWindow.open(map, marker);
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
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
