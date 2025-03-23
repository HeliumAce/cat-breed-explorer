
import { useState, useEffect, useCallback } from 'react';
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

  // Create marker with location info
  const createMarker = useCallback((location: AdoptionLocation, map: google.maps.Map) => {
    console.log(`Creating marker for ${location.name} at ${location.location.lat},${location.location.lng}`);
    
    try {
      // Get the appropriate icon based on location type
      const iconUrl = getMarkerIconByType(location.type);
      console.log(`Using icon: ${iconUrl} for location type: ${location.type}`);
      
      // Create the marker
      const marker = new window.google.maps.Marker({
        position: { 
          lat: location.location.lat, 
          lng: location.location.lng 
        },
        map,
        title: location.name,
        icon: {
          url: iconUrl,
          scaledSize: new window.google.maps.Size(32, 32)
        },
        animation: window.google.maps.Animation.DROP
      });
      
      // Add click event listener
      marker.addListener("click", () => {
        onLocationSelect(location);
        
        if (infoWindow) {
          infoWindow.setContent(
            `<div class="p-2">
              <h3 class="font-medium text-base">${location.name}</h3>
              <p class="text-sm text-muted-foreground">${location.address}</p>
              <p class="text-sm text-muted-foreground">${location.distance.toFixed(1)} km away</p>
              ${location.open !== undefined ? 
                `<p class="text-sm ${location.open ? 'text-green-600' : 'text-gray-500'}">
                  ${location.open ? 'Open now' : 'Closed'}
                </p>` : ''}
            </div>`
          );
          infoWindow.open(map, marker);
        }
      });
      
      return marker;
    } catch (error) {
      console.error(`Error creating marker for ${location.name}:`, error);
      return null;
    }
  }, [infoWindow, onLocationSelect]);

  // Add location markers when locations change
  useEffect(() => {
    if (!map || !window.google || !infoWindow) {
      console.log("Map, Google Maps API, or InfoWindow not available yet");
      return;
    }
    
    try {
      console.log("Adding markers for locations:", locations);
      
      // Clear existing markers
      if (markers.length) {
        console.log(`Clearing ${markers.length} existing markers`);
        markers.forEach(marker => marker.setMap(null));
      }
      
      if (locations.length === 0) {
        // If no locations, just center on user location
        console.log("No locations to display, centering on user location");
        map.setCenter({ lat: userLocation.lat, lng: userLocation.lng });
        map.setZoom(11);
        setMarkers([]);
        return;
      }
      
      // Create markers for locations
      const newMarkers = locations
        .map(location => createMarker(location, map))
        .filter((marker): marker is google.maps.Marker => marker !== null);
      
      console.log(`Created ${newMarkers.length} markers out of ${locations.length} locations`);
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
        console.log("Fitting map to bounds to show all markers");
        map.fitBounds(bounds);
        
        // Add some padding to avoid markers at the very edge
        try {
          map.panBy(0, -50);
        } catch (error) {
          console.warn("Unable to pan map:", error);
        }
      }
    } catch (error) {
      console.error("Error adding location markers:", error);
    }
  }, [locations, map, userLocation, infoWindow, createMarker, markers]);

  return {
    markers,
    infoWindow
  };
}
