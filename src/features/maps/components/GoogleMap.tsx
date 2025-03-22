
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useGoogleMaps } from '../hooks/useGoogleMaps';
import { LoadingInline } from '@/components/Loading';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DEFAULT_MAP_OPTIONS } from '@/config/maps-config';
import UserLocationMarker from './UserLocationMarker';
import ShelterMarker from './ShelterMarker';
import { Shelter } from '@/types/shelters';

export interface GoogleMapRef {
  panToMarker: (shelterId: string) => void;
  panToUserLocation: () => void;
}

interface GoogleMapProps {
  userLocation: google.maps.LatLngLiteral;
  shelters: Shelter[];
  selectedShelterId: string | null;
  onMarkerClick: (shelterId: string) => void;
}

const GoogleMap = forwardRef<GoogleMapRef, GoogleMapProps>(
  ({ userLocation, shelters, selectedShelterId, onMarkerClick }, ref) => {
    const { isLoaded, isLoading, error } = useGoogleMaps();
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<google.maps.Map | null>(null);
    const [mapIsReady, setMapIsReady] = useState(false);

    // Initialize map when Google Maps is loaded
    useEffect(() => {
      if (!isLoaded || !mapContainerRef.current) return;
      
      try {
        const map = new google.maps.Map(mapContainerRef.current, {
          ...DEFAULT_MAP_OPTIONS,
          center: userLocation,
        });
        
        mapRef.current = map;
        setMapIsReady(true);
      } catch (err) {
        console.error('Error initializing Google Maps:', err);
      }
    }, [isLoaded, userLocation]);

    // Update map center when user location changes
    useEffect(() => {
      if (mapRef.current && mapIsReady) {
        mapRef.current.setCenter(userLocation);
      }
    }, [userLocation, mapIsReady]);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      panToMarker: (shelterId: string) => {
        if (!mapRef.current || !mapIsReady) return;
        
        const shelter = shelters.find(s => s.id === shelterId);
        if (shelter && shelter.location) {
          mapRef.current.panTo({
            lat: shelter.location.lat,
            lng: shelter.location.lng
          });
          mapRef.current.setZoom(14);
        }
      },
      panToUserLocation: () => {
        if (!mapRef.current || !mapIsReady) return;
        
        mapRef.current.panTo(userLocation);
        mapRef.current.setZoom(14);
      }
    }), [shelters, mapIsReady]);

    // Render loading state
    if (isLoading || !isLoaded) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <LoadingInline text="Loading map..." />
        </div>
      );
    }

    // Render error state
    if (error) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load Google Maps: {error.message}
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return (
      <div className="w-full h-full relative">
        <div ref={mapContainerRef} className="absolute inset-0" />
        
        {mapIsReady && mapRef.current && (
          <>
            <UserLocationMarker 
              map={mapRef.current} 
              position={userLocation} 
            />
            
            {shelters.map(shelter => (
              shelter.location && (
                <ShelterMarker
                  key={shelter.id}
                  map={mapRef.current!}
                  shelter={shelter}
                  isSelected={selectedShelterId === shelter.id}
                  onClick={() => onMarkerClick(shelter.id)}
                />
              )
            ))}
          </>
        )}
      </div>
    );
  }
);

GoogleMap.displayName = 'GoogleMap';

export default GoogleMap;
