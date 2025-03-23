
import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { useAdoptionLocations } from "@/hooks/useAdoptionLocations";
import { AdoptionLocation, LocationType } from "@/types/adoption";
import { LocationPermissionRequest } from "@/components/adoption/LocationPermissionRequest";
import { AdoptionHeader } from "@/components/adoption/AdoptionHeader";
import { AdoptionMapContainer } from "@/components/adoption/AdoptionMapContainer";
import { AdoptionLocationsSidebar } from "@/components/adoption/AdoptionLocationsSidebar";

const AdoptionLocations = () => {
  const [selectedLocation, setSelectedLocation] = useState<AdoptionLocation | null>(null);
  const [typeFilter, setTypeFilter] = useState<LocationType | 'all'>('all');
  const [isMapCollapsed, setIsMapCollapsed] = useState(false);
  
  const {
    locations,
    userLocation,
    isLoading,
    isError,
    locationPermissionStatus,
    requestUserLocation,
    setLocationByAddress,
    setUserLocationCoordinates,
    manualAddress,
    setManualAddress,
    refetch
  } = useAdoptionLocations({
    locationTypeFilter: typeFilter
  });

  const toggleMapCollapse = () => {
    setIsMapCollapsed(!isMapCollapsed);
  };

  const handleAddressSelect = (address: string, location: { lat: number; lng: number }) => {
    setManualAddress(address);
    setUserLocationCoordinates(location);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white cat-paw-grid">
        <AdoptionHeader />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {locationPermissionStatus !== 'granted' && (
            <LocationPermissionRequest
              status={locationPermissionStatus}
              onRequestLocation={requestUserLocation}
              onManualLocation={setLocationByAddress}
              manualAddress={manualAddress}
              setManualAddress={setManualAddress}
            />
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <AdoptionMapContainer 
              userLocation={userLocation}
              locations={locations}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              onAddressSelect={handleAddressSelect}
              isMapCollapsed={isMapCollapsed}
              toggleMapCollapse={toggleMapCollapse}
              isLoading={isLoading}
            />
            
            <AdoptionLocationsSidebar 
              locations={locations}
              isMapCollapsed={isMapCollapsed}
              toggleMapCollapse={toggleMapCollapse}
              typeFilter={typeFilter}
              onFilterChange={setTypeFilter}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              isLoading={isLoading}
              isError={isError}
              onRetry={requestUserLocation}
            />
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default AdoptionLocations;
