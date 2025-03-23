
import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdoptionLocation } from "@/types/adoption";
import { MapComponent } from "@/components/adoption/MapComponent";
import { AddressSearch } from "@/components/adoption/AddressSearch";

interface AdoptionMapContainerProps {
  userLocation: { lat: number; lng: number } | null;
  locations: AdoptionLocation[];
  selectedLocation: AdoptionLocation | null;
  setSelectedLocation: (location: AdoptionLocation | null) => void;
  onAddressSelect: (address: string, location: { lat: number; lng: number }) => void;
  isMapCollapsed: boolean;
  toggleMapCollapse: () => void;
  isLoading: boolean;
}

export const AdoptionMapContainer = ({
  userLocation,
  locations,
  selectedLocation,
  setSelectedLocation,
  onAddressSelect,
  isMapCollapsed,
  toggleMapCollapse,
  isLoading
}: AdoptionMapContainerProps) => {
  return (
    <div className={`lg:col-span-${isMapCollapsed ? '0' : '2'} transition-all duration-300 ${
      isMapCollapsed ? 'hidden lg:hidden' : 'block'
    }`}>
      <div className="sticky top-20">
        <div className="bg-white rounded-lg border border-amber-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-amber-100">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-500" />
                Nearby Locations
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleMapCollapse}
                className="lg:hidden"
              >
                {isMapCollapsed ? 'Show Map' : 'Hide Map'}
              </Button>
            </div>
            
            <AddressSearch 
              onAddressSelect={onAddressSelect}
              placeholder="Search for an address or location..."
            />
          </div>
          
          <div className="h-[400px]">
            {userLocation ? (
              <MapComponent
                userLocation={userLocation}
                locations={locations}
                onLocationSelect={setSelectedLocation}
                selectedLocation={selectedLocation}
                isLoading={isLoading}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-50">
                <div className="text-center max-w-xs px-4">
                  <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    Please allow location access or enter your location to view nearby adoption centers
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
