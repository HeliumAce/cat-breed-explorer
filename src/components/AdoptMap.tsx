
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Shelter } from '@/types/shelters';
import { LoadingInline } from '@/components/Loading';
import { AlertCircle, MapPin } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Since we're not actually integrating with Google Maps API in this demo,
// we'll create a simulated map component that shows shelter positions

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

    // Simulate map loading
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }, []);

    // Calculate position on the map (simplified for demo)
    const calculatePosition = (lat: number, lng: number) => {
      // Normalize to our view area
      const mapWidth = 1000;
      const mapHeight = 500;
      
      // Get min/max coordinates to establish bounds
      const lats = [userLocation.lat, ...shelters.map(s => s.location.lat)];
      const lngs = [userLocation.lng, ...shelters.map(s => s.location.lng)];
      
      const minLat = Math.min(...lats) - 0.01;
      const maxLat = Math.max(...lats) + 0.01;
      const minLng = Math.min(...lngs) - 0.01;
      const maxLng = Math.max(...lngs) + 0.01;
      
      // Convert to x,y coordinates in our container
      const x = ((lng - minLng) / (maxLng - minLng)) * mapWidth;
      const y = ((maxLat - lat) / (maxLat - minLat)) * mapHeight;
      
      return { x, y };
    };

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      // Method that would pan to a specific marker in a real implementation
      panToMarker: (shelterId: string) => {
        const shelter = shelters.find(s => s.id === shelterId);
        if (shelter) {
          console.log(`Panning to shelter: ${shelter.name}`);
          // In a real implementation, this would use the Google Maps API to pan
        }
      },
      // Method to pan to user location
      panToUserLocation: () => {
        console.log(`Panning to user location: ${userLocation.lat}, ${userLocation.lng}`);
        // In a real implementation, this would use the Google Maps API to pan
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
        {/* Map simulation - in a real app this would be the Google Maps component */}
        <div className="absolute inset-0 bg-amber-50">
          {/* Mock Map Grid Lines */}
          <div className="w-full h-full grid grid-cols-8 grid-rows-4">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="border border-amber-100/50" />
            ))}
          </div>
          
          {/* User location marker */}
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
          
          {/* Shelter markers */}
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
        
        {/* Map attribution (would be required in a real Google Maps integration) */}
        <div className="absolute bottom-1 right-1 text-xs text-gray-500 bg-white/70 px-1 rounded">
          Map Simulation
        </div>
      </div>
    );
  }
);

AdoptMap.displayName = 'AdoptMap';

export default AdoptMap;
