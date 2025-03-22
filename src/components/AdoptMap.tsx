import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { Shelter } from '@/types/shelters';
import { LoadingInline } from '@/components/Loading';
import { AlertCircle, MapPin } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MAPS_API_KEY, DEFAULT_MAP_OPTIONS, MAPS_LIBRARIES } from '@/config/maps-config';

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

const AdoptMap = forwardRef<any, AdoptMapProps>(
  ({ userLocation, shelters, selectedShelterId, onMarkerClick }, ref) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const googleMapRef = useRef<google.maps.Map | null>(null);
    const markersRef = useRef<Record<string, google.maps.Marker>>({});

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
      
      if (!MAPS_API_KEY || MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
        setError('Google Maps API key not configured');
        setIsLoading(false);
        return;
      }

      if (window.google && mapRef.current && userLocation) {
        try {
          const map = new window.google.maps.Map(mapRef.current, {
            ...DEFAULT_MAP_OPTIONS,
            center: userLocation,
          });
          
          googleMapRef.current = map;
          
          new window.google.maps.Marker({
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
      }
    }, [userLocation]);

    useEffect(() => {
      if (googleMapRef.current && shelters.length > 0) {
        Object.values(markersRef.current).forEach(marker => marker.setMap(null));
        markersRef.current = {};
        
        shelters.forEach(shelter => {
          const marker = new window.google.maps.Marker({
            position: shelter.location,
            map: googleMapRef.current,
            title: shelter.name,
            animation: selectedShelterId === shelter.id 
              ? window.google.maps.Animation.BOUNCE 
              : undefined
          });
          
          marker.addListener('click', () => onMarkerClick(shelter.id));
          markersRef.current[shelter.id] = marker;
        });
      }
    }, [shelters, selectedShelterId, onMarkerClick]);

    const calculatePosition = (lat: number, lng: number, shelters: Shelter[] = [], userLocation: { lat: number; lng: number } | null = null) => {
      const mapWidth = 1000;
      const mapHeight = 500;
      
      const lats = [
        ...(userLocation ? [userLocation.lat] : []),
        ...(shelters.length > 0 ? shelters.map(s => s.location.lat) : [lat]),
      ];
      
      const lngs = [
        ...(userLocation ? [userLocation.lng] : []),
        ...(shelters.length > 0 ? shelters.map(s => s.location.lng) : [lng]),
      ];
      
      const minLat = Math.min(...lats) - 0.01;
      const maxLat = Math.max(...lats) + 0.01;
      const minLng = Math.min(...lngs) - 0.01;
      const maxLng = Math.max(...lngs) + 0.01;
      
      const x = ((lng - minLng) / (maxLng - minLng)) * mapWidth;
      const y = ((maxLat - lat) / (maxLat - minLat)) * mapHeight;
      
      return { x, y };
    };

    useImperativeHandle(ref, () => ({
      panToMarker: (shelterId: string) => {
        const shelter = shelters.find(s => s.id === shelterId);
        if (shelter) {
          console.log(`Panning to shelter: ${shelter.name}`);
        }
      },
      panToUserLocation: () => {
        console.log(`Panning to user location: ${userLocation.lat}, ${userLocation.lng}`);
      }
    }));

    if (isLoading) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <LoadingInline text="Loading map..." />
        </div>
      );
    }

    if (error) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      );
    }

    return (
      <div className="w-full h-full relative bg-amber-50 overflow-hidden">
        <div ref={mapRef} className="absolute inset-0">
          <div className="w-full h-full grid grid-cols-8 grid-rows-4">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="border border-amber-100/50" />
            ))}
          </div>
          
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              left: calculatePosition(userLocation.lat, userLocation.lng).x, 
              top: calculatePosition(userLocation.lat, userLocation.lng).y 
            }}
          >
            <div className="h-4 w-4 bg-blue-500 rounded-full animate-pulse border-2 border-white shadow-lg" />
            <div className="mt-1 bg-white rounded px-2 py-0.5 text-xs shadow-md">
              You
            </div>
          </div>
          
          {shelters.map(shelter => {
            const { x, y } = calculatePosition(shelter.location.lat, shelter.location.lng);
            const isSelected = selectedShelterId === shelter.id;
            
            return (
              <div
                key={shelter.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200"
                style={{ left: x, top: y }}
                onClick={() => onMarkerClick(shelter.id)}
              >
                <div className={`
                  flex items-center justify-center h-6 w-6 rounded-full 
                  ${isSelected ? 'bg-amber-600' : 'bg-amber-500'} 
                  ${isSelected ? 'scale-125' : 'hover:scale-110'}
                  text-white shadow-md transition-all duration-200
                `}>
                  <MapPin size={15} />
                </div>
                {isSelected && (
                  <div className="mt-1 bg-white rounded px-2 py-1 text-xs shadow-md whitespace-nowrap">
                    {shelter.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="absolute bottom-1 right-1 text-xs text-gray-500 bg-white/70 px-1 rounded">
          Map Simulation
          {!MAPS_API_KEY || MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY_HERE' ? 
            " (API key needed)" : ""}
        </div>
      </div>
    );
  }
);

AdoptMap.displayName = 'AdoptMap';

export default AdoptMap;
