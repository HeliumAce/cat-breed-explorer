
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
        // Create marker with custom icon based on type
        const marker = new window.google.maps.Marker({
          position: { lat: location.location.lat, lng: location.location.lng },
          map,
          title: location.name,
          icon: {
            url: getMarkerIconByType(location.type),
            scaledSize: new window.google.maps.Size(32, 32)
          },
          animation: window.google.maps.Animation.DROP
        });
        
        // Add click event listener to marker
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
      
      // Fit bounds to include all markers and user location
      if (newMarkers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        // Add user location to bounds
        bounds.extend({ lat: userLocation.lat, lng: userLocation.lng });
        // Add all location markers to bounds
        locations.forEach(location => {
          bounds.extend({
            lat: location.location.lat,
            lng: location.location.lng
          });
        });
        // Fit the map to show all markers
        map.fitBounds(bounds);
        
        // This was causing an error because panBy wasn't defined in our type definition
        // Now we've added it to the type definition
        try {
          // Add some padding to avoid markers at the very edge
          map.panBy(0, -50);
        } catch (error) {
          console.warn("Unable to pan map:", error);
        }
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
