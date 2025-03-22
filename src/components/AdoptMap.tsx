
import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { Shelter } from '@/types/shelters';
import { LoadingInline } from '@/components/Loading';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MAPS_API_KEY, DEFAULT_MAP_OPTIONS, MAPS_LIBRARIES } from '@/config/maps-config';
import { useScript } from '@/hooks/useScript';

declare global {
  interface Window {
    google: typeof google;
  }
}

interface AdoptMapProps {
  userLocation: { lat: number; lng: number };
  shelters: Shelter[];
  selectedShelterId: string | null;
  onMarkerClick: (shelterId: string) => void;
}

export interface AdoptMapRef {
  panToMarker: (shelterId: string) => void;
  panToUserLocation: () => void;
}

const AdoptMap = forwardRef<AdoptMapRef, AdoptMapProps>(
  ({ userLocation, shelters, selectedShelterId, onMarkerClick }, ref) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const googleMapRef = useRef<google.maps.Map | null>(null);
    const markersRef = useRef<Record<string, google.maps.Marker>>({});
    const userMarkerRef = useRef<google.maps.Marker | null>(null);
    
    // Load the Google Maps script
    const mapsUrl = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=${MAPS_LIBRARIES.join(',')}`;
    const { loaded: mapsLoaded, error: mapsError } = useScript(mapsUrl);
    
    // Initialize the map once the script is loaded
    useEffect(() => {
      if (!mapsLoaded || !mapRef.current || !userLocation) {
        return;
      }
      
      try {
        // Create the map
        const map = new window.google.maps.Map(mapRef.current, {
          ...DEFAULT_MAP_OPTIONS,
          center: userLocation,
        });
        
        googleMapRef.current = map;
        
        // Add user location marker
        userMarkerRef.current = new window.google.maps.Marker({
          position: userLocation,
          map,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: '#4285F4',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
          title: 'Your Location'
        });
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to initialize Google Maps');
        setIsLoading(false);
      }
    }, [mapsLoaded, userLocation]);
    
    // Update user location marker when location changes
    useEffect(() => {
      if (googleMapRef.current && userMarkerRef.current && userLocation) {
        userMarkerRef.current.setPosition(userLocation);
      }
    }, [userLocation]);
    
    // Add or update shelter markers when shelters change
    useEffect(() => {
      if (!googleMapRef.current || !mapsLoaded || shelters.length === 0) {
        return;
      }
      
      // Clear existing markers
      Object.values(markersRef.current).forEach(marker => marker.setMap(null));
      markersRef.current = {};
      
      // Bounds to fit all markers
      const bounds = new window.google.maps.LatLngBounds();
      
      // Add user location to bounds
      if (userLocation) {
        bounds.extend(userLocation);
      }
      
      // Add shelter markers
      shelters.forEach(shelter => {
        const marker = new window.google.maps.Marker({
          position: shelter.location,
          map: googleMapRef.current,
          title: shelter.name,
          animation: selectedShelterId === shelter.id 
            ? window.google.maps.Animation.BOUNCE 
            : undefined,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
          }
        });
        
        // Add click listener
        marker.addListener('click', () => onMarkerClick(shelter.id));
        
        // Store marker reference
        markersRef.current[shelter.id] = marker;
        
        // Add to bounds
        bounds.extend(shelter.location);
      });
      
      // Fit map to show all markers
      if (shelters.length > 0) {
        googleMapRef.current.fitBounds(bounds);
        
        // Don't zoom in too far
        const listener = window.google.maps.event.addListener(googleMapRef.current, 'idle', () => {
          if (googleMapRef.current && googleMapRef.current.getZoom() > 15) {
            googleMapRef.current.setZoom(15);
          }
          window.google.maps.event.removeListener(listener);
        });
      }
    }, [shelters, selectedShelterId, onMarkerClick, mapsLoaded, userLocation]);
    
    // Update animation for selected shelter marker
    useEffect(() => {
      if (!mapsLoaded) return;
      
      Object.entries(markersRef.current).forEach(([id, marker]) => {
        if (id === selectedShelterId) {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        } else {
          marker.setAnimation(null);
        }
      });
    }, [selectedShelterId, mapsLoaded]);
    
    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      panToMarker: (shelterId: string) => {
        if (!googleMapRef.current || !markersRef.current[shelterId]) return;
        
        const marker = markersRef.current[shelterId];
        googleMapRef.current.panTo(marker.getPosition() as google.maps.LatLng);
        googleMapRef.current.setZoom(14);
      },
      panToUserLocation: () => {
        if (!googleMapRef.current || !userLocation) return;
        
        googleMapRef.current.panTo(userLocation);
        googleMapRef.current.setZoom(14);
      }
    }));
    
    // Show loading state
    if (isLoading && !mapsError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <LoadingInline text="Loading map..." />
        </div>
      );
    }
    
    // Show error state
    if (error || mapsError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error || "Failed to load Google Maps. Please check your API key."}
            </AlertDescription>
          </Alert>
        </div>
      );
    }
    
    return (
      <div className="w-full h-full relative">
        <div ref={mapRef} className="absolute inset-0" />
      </div>
    );
  }
);

AdoptMap.displayName = 'AdoptMap';

export default AdoptMap;
