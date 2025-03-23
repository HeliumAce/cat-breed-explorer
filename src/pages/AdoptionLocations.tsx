
import { useState } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { ArrowLeft, MapPin, AlertCircle, Cat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdoptionLocations } from "@/hooks/useAdoptionLocations";
import { MapComponent } from "@/components/adoption/MapComponent";
import { LocationList } from "@/components/adoption/LocationList";
import { LocationTypeFilter } from "@/components/adoption/LocationTypeFilter";
import { LocationPermissionRequest } from "@/components/adoption/LocationPermissionRequest";
import { AddressSearch } from "@/components/adoption/AddressSearch";
import { AdoptionLocation, LocationType } from "@/types/adoption";
import { LoadingInline } from "@/components/Loading";
import { motion } from "framer-motion";

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
    setManualAddress
  } = useAdoptionLocations({
    locationTypeFilter: typeFilter,
    minLocations: 5 // Ensure at least 5 locations are returned
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
        <header className="bg-white border-b border-amber-100 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to All Breeds
              </Link>
            </Button>
            
            <h1 className="text-xl font-semibold text-foreground">Adopt a Cat</h1>
            
            <div className="w-[100px]">
              {/* Spacer div for centering the title */}
            </div>
          </div>
        </header>
        
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
          
          <div className="flex flex-col gap-8">
            {/* Map Section */}
            <div className={`transition-all duration-300 ${isMapCollapsed ? 'hidden' : 'block'}`}>
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
                      >
                        {isMapCollapsed ? 'Show Map' : 'Hide Map'}
                      </Button>
                    </div>
                    
                    <AddressSearch 
                      onAddressSelect={handleAddressSelect}
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
            
            {/* Locations List Section */}
            <div className="transition-all duration-300">
              <div className="bg-white rounded-lg border border-amber-100 shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">Adoption Locations</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={toggleMapCollapse}
                  >
                    {isMapCollapsed ? 'Show Map' : 'Hide Map'}
                  </Button>
                </div>
                
                <LocationTypeFilter
                  onFilterChange={setTypeFilter}
                  currentFilter={typeFilter}
                />
                
                {isLoading && (
                  <div className="flex justify-center py-8">
                    <LoadingInline />
                  </div>
                )}
                
                {isError && (
                  <div className="text-center py-8">
                    <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
                    <h3 className="font-medium text-lg mb-1">Error Loading Locations</h3>
                    <p className="text-muted-foreground">
                      We couldn't load adoption locations. Please try again later.
                    </p>
                    <Button 
                      onClick={requestUserLocation} 
                      variant="outline"
                      className="mt-4"
                    >
                      Retry
                    </Button>
                  </div>
                )}
                
                {!isLoading && !isError && locations.length === 0 && (
                  <div className="text-center py-8">
                    <Cat className="h-10 w-10 text-amber-500 mx-auto mb-2" />
                    <h3 className="font-medium text-lg mb-1">No Locations Found</h3>
                    <p className="text-muted-foreground">
                      {typeFilter !== 'all' 
                        ? `We couldn't find any ${typeFilter === 'shelter' ? 'shelters' : typeFilter === 'humane' ? 'humane societies' : 'pet stores'} near you.`
                        : "We couldn't find any adoption locations near you."}
                    </p>
                    <p className="text-muted-foreground mt-1">
                      Try expanding your search or changing filters.
                    </p>
                  </div>
                )}
                
                {!isLoading && !isError && locations.length > 0 && (
                  <LocationList
                    locations={locations}
                    onSelectLocation={setSelectedLocation}
                    selectedLocation={selectedLocation}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default AdoptionLocations;
