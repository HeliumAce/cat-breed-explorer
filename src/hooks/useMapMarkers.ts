
import { useState, useEffect } from 'react';
import { AdoptionLocation } from '@/types/adoption';
import { getMarkerIconByType } from '@/utils/map-utils';

export function useMapMarkers(
  map: google.maps.Map | null,
  locations: AdoptionLocation[],
  userLocation: { lat: number; lng: number },
  onLocationSelect: (location: AdoptionLocation) => void
) {
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  // Initialize InfoWindow
  useEffect(() => {
    if (!map || !window.google) return;
    
    const newInfoWindow = new window.google.maps.InfoWindow();
    setInfoWindow(newInfoWindow);
    
    return () => {
      newInfoWindow.close();
    };
  }, [map]);

  // Add location markers when locations change
  useEffect(() => {
    if (!map || !window.google || !infoWindow) return;
    
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
    }
  }, [locations, map, userLocation, infoWindow, onLocationSelect]);

  return {
    markers,
    infoWindow
  };
}
