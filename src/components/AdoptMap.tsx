
import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { Shelter } from '@/types/shelters';
import { LoadingInline } from '@/components/Loading';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MAPS_API_KEY, 
  DEFAULT_MAP_OPTIONS, 
  getMapsUrl, 
  MAPS_SCRIPT_ID 
} from '@/config/maps-config';
import { useScript } from '@/hooks/useScript';

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
    const mapsUrl = getMapsUrl();
    const { loaded: mapsLoaded, error: mapsError } = useScript(mapsUrl, MAPS_SCRIPT_ID);
    
    // Initialize the map once the script is loaded
    useEffect(() => {
      if (!mapsLoaded || !mapRef.current || !userLocation) {
        return;
      }
      
      try {
        // Check if google variable exists and if map is already initialized
        if (!window.google || !window.google.maps) {
          console.log("Google Maps API not available yet");
          // Listen for the custom event that we dispatch in the initMap callback
          const handleMapsLoaded = () => {
            initializeMap();
          };
          
          window.addEventListener('google-maps-loaded', handleMapsLoaded);
          return () => {
            window.removeEventListener('google-maps-loaded', handleMapsLoaded);
          };
        } else {
          initializeMap();
        }
      } catch (err) {
        console.error('Error initializing map:', err);
        setError(`Failed to initialize Google Maps: ${err instanceof Error ? err.message : String(err)}`);
        setIsLoading(false);
      }
    }, [mapsLoaded, userLocation]);
    
    const initializeMap = () => {
      if (!mapRef.current || !userLocation || !window.google || !window.google.maps) return;
      
      console.log("Initializing map with center:", userLocation);
      
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
      
      // Add markers for shelters
      shelters.forEach(shelter => {
        if (shelter.coordinates) {
          const marker = new window.google.maps.Marker({
            position: {
              lat: shelter.coordinates.lat,
              lng: shelter.coordinates.lng
            },
            map,
            title: shelter.name
          });
          
          marker.addListener('click', () => {
            onMarkerClick(shelter.id);
          });
          
          markersRef.current[shelter.id] = marker;
        }
      });
      
      setIsLoading(false);
    };
    
    // Update shelter markers when shelters change
    useEffect(() => {
      if (!googleMapRef.current || !window.google || !shelters.length) return;
      
      // Clear existing shelter markers first
      Object.values(markersRef.current).forEach(marker => {
        marker.setMap(null);
      });
      markersRef.current = {};
      
      // Add markers for shelters
      shelters.forEach(shelter => {
        if (shelter.coordinates) {
          const marker = new window.google.maps.Marker({
            position: {
              lat: shelter.coordinates.lat,
              lng: shelter.coordinates.lng
            },
            map: googleMapRef.current,
            title: shelter.name
          });
          
          marker.addListener('click', () => {
            onMarkerClick(shelter.id);
          });
          
          markersRef.current[shelter.id] = marker;
        }
      });
    }, [shelters, onMarkerClick]);
    
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
              {error || mapsError?.message || "Failed to load Google Maps. Please check your API key."}
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
