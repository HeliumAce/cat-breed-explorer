
import { useEffect, useRef } from 'react';
import { Shelter } from '@/types/shelters';

interface ShelterMarkerProps {
  map: google.maps.Map;
  shelter: Shelter;
  isSelected: boolean;
  onClick: () => void;
}

const ShelterMarker = ({ map, shelter, isSelected, onClick }: ShelterMarkerProps) => {
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    if (!shelter.location) return;

    // Create marker if it doesn't exist
    if (!markerRef.current) {
      markerRef.current = new google.maps.Marker({
        position: {
          lat: shelter.location.lat,
          lng: shelter.location.lng
        },
        map,
        title: shelter.name,
        animation: isSelected ? google.maps.Animation.BOUNCE : undefined,
        icon: isSelected ? {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#FF5722',
          fillOpacity: 0.7,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        } : undefined
      });

      // Add click listener
      markerRef.current.addListener('click', onClick);
    } else {
      // Update marker properties
      markerRef.current.setPosition({
        lat: shelter.location.lat,
        lng: shelter.location.lng
      });
      
      // Update animation
      if (isSelected) {
        markerRef.current.setAnimation(google.maps.Animation.BOUNCE);
      } else {
        markerRef.current.setAnimation(null);
      }
    }

    // Clean up marker on unmount
    return () => {
      if (markerRef.current) {
        google.maps.event.clearListeners(markerRef.current, 'click');
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
    };
  }, [map, shelter, isSelected, onClick]);

  return null; // This is a non-visual component
};

export default ShelterMarker;
