
import { useRef, useEffect, useState } from "react";
import { Coordinates, AdoptionLocation, LocationType } from "@/types/adoption";
import { LoadingInline } from "@/components/Loading";

interface MapComponentProps {
  userLocation: Coordinates | null;
  locations: AdoptionLocation[];
  onLocationSelect?: (location: AdoptionLocation) => void;
  selectedLocation?: AdoptionLocation | null;
  isLoading?: boolean;
}

export function MapComponent({ 
  userLocation, 
  locations, 
  onLocationSelect,
  selectedLocation,
  isLoading = false
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Load Google Maps script
  useEffect(() => {
    if (window.google?.maps) {
      setMapLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY || ''}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Initialize map when the script is loaded and user location is available
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || !userLocation) return;

    const newMap = new google.maps.Map(mapRef.current, {
      center: userLocation,
      zoom: 12,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    });

    // Add user location marker
    new google.maps.Marker({
      position: userLocation,
      map: newMap,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#4285F4",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2,
      },
      title: "Your Location",
    });

    setMap(newMap);
  }, [mapLoaded, userLocation]);

  // Update markers when locations change
  useEffect(() => {
    if (!map || !locations.length) return;

    // Clear old markers
    markers.forEach(marker => marker.setMap(null));
    
    // Create new markers
    const newMarkers = locations.map(location => {
      const iconUrl = getMarkerIconByType(location.type);
      
      const marker = new google.maps.Marker({
        position: location.location,
        map,
        title: location.name,
        icon: {
          url: iconUrl,
          scaledSize: new google.maps.Size(32, 32),
        }
      });

      // Add click event listener
      marker.addListener('click', () => {
        if (onLocationSelect) {
          onLocationSelect(location);
        }
      });

      return marker;
    });

    setMarkers(newMarkers);

    // Fit bounds to include all markers and user location
    if (userLocation && locations.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(userLocation);
      locations.forEach(location => {
        bounds.extend(location.location);
      });
      map.fitBounds(bounds);
    }
  }, [map, locations, onLocationSelect]);

  // Highlight selected location
  useEffect(() => {
    if (!map || !selectedLocation) return;
    
    markers.forEach(marker => {
      const position = marker.getPosition();
      if (position && 
          position.lat() === selectedLocation.location.lat && 
          position.lng() === selectedLocation.location.lng) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => {
          marker.setAnimation(null);
        }, 1500);
        
        map.panTo(position);
        map.setZoom(14);
      }
    });
  }, [selectedLocation, markers, map]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <LoadingInline />
        </div>
      )}
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ minHeight: "400px" }} 
      />
    </div>
  );
}

// Helper function to get marker icon based on location type
function getMarkerIconByType(type: LocationType): string {
  switch (type) {
    case 'shelter':
      // Placeholder for a shelter icon (house)
      return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ef4444' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/%3E%3Cpolyline points='9 22 9 12 15 12 15 22'/%3E%3C/svg%3E";
    case 'humane':
      // Placeholder for a humane society icon (heart)
      return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ec4899' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'/%3E%3C/svg%3E";
    case 'store':
      // Placeholder for a pet store icon (shopping bag)
      return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23f59e0b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'/%3E%3Cpath d='M3 6h18'/%3E%3Cpath d='M16 10a4 4 0 0 1-8 0'/%3E%3C/svg%3E";
    default:
      return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23f59e0b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'/%3E%3Ccircle cx='12' cy='10' r='3'/%3E%3C/svg%3E";
  }
}
