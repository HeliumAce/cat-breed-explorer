
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import AdoptMap, { AdoptMapRef } from "@/components/AdoptMap";
import { Shelter } from "@/types/shelters";

interface MapContainerProps {
  userCoordinates: { lat: number; lng: number } | null;
  shelters: Shelter[];
  selectedShelterId: string | null;
  onMarkerClick: (shelterId: string) => void;
  mapRef: React.RefObject<AdoptMapRef>;
}

const MapContainer = ({ 
  userCoordinates, 
  shelters, 
  selectedShelterId, 
  onMarkerClick,
  mapRef
}: MapContainerProps) => {
  const centerOnUserLocation = () => {
    if (mapRef.current) {
      mapRef.current.panToUserLocation();
    }
  };

  return (
    <div className="mb-6 rounded-lg overflow-hidden shadow-md relative">
      <div className="h-[300px] sm:h-[400px]">
        {!userCoordinates ? (
          <div className="flex h-full items-center justify-center bg-muted/20">
            <div className="text-center p-8">
              <MapPin className="w-10 h-10 text-muted mx-auto mb-4" />
              <p className="text-muted-foreground">
                Please provide your location to find nearby shelters
              </p>
            </div>
          </div>
        ) : (
          <AdoptMap
            ref={mapRef}
            userLocation={userCoordinates}
            shelters={shelters}
            selectedShelterId={selectedShelterId}
            onMarkerClick={onMarkerClick}
          />
        )}
      </div>
      
      {userCoordinates && (
        <Button 
          variant="secondary" 
          size="sm"
          onClick={centerOnUserLocation}
          className="absolute bottom-3 right-3 bg-white shadow-md hover:bg-gray-100"
        >
          <Navigation size={16} className="mr-2" /> Center on Me
        </Button>
      )}
    </div>
  );
};

export default MapContainer;
