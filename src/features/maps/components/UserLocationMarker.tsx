
import { useEffect, useRef } from 'react';

interface UserLocationMarkerProps {
  map: google.maps.Map;
  position: google.maps.LatLngLiteral;
}

const UserLocationMarker = ({ map, position }: UserLocationMarkerProps) => {
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    // Create the marker if it doesn't exist
    if (!markerRef.current) {
      markerRef.current = new google.maps.Marker({
        map,
        position,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: '#4285F4',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
        title: 'Your Location'
      });
    } else {
      // Update position if marker exists
      markerRef.current.setPosition(position);
    }

    // Clean up marker on unmount
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
    };
  }, [map, position]);

  return null; // This is a non-visual component
};

export default UserLocationMarker;
