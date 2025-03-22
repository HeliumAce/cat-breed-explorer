
import { useRef } from "react";
import { PageTransition } from "@/components/PageTransition";
import { useShelters } from "@/hooks/useShelters";
import { useAddressAutocomplete } from "@/hooks/useAddressAutocomplete";
import { toast } from "sonner";

// Import refactored components and hooks
import AdoptHeader from "@/features/adopt/components/AdoptHeader";
import LocationSearch from "@/features/adopt/components/LocationSearch";
import MapContainer from "@/features/adopt/components/MapContainer";
import { useLocationState } from "@/features/adopt/hooks/useLocationState";
import { useShelterState } from "@/features/adopt/hooks/useShelterState";
import ShelterList from "@/components/ShelterList";
import { GoogleMapRef } from "@/features/maps/components/GoogleMap";

const AdoptCat = () => {
  const {
    userCoordinates,
    setUserCoordinates,
    isLocating,
    locationError,
    requestUserLocation
  } = useLocationState();
  
  const {
    selectedShelterId,
    setSelectedShelterId,
    expandedListView,
    setExpandedListView,
    sortBy,
    setSortBy,
    filters,
    updateFilters
  } = useShelterState();

  const { 
    shelters, 
    isLoading, 
    error, 
    fetchShelters 
  } = useShelters();

  const mapRef = useRef<GoogleMapRef>(null);

  // Use the address autocomplete hook
  const { inputRef, inputValue, setInputValue, isLoaded: isAutocompleteLoaded } = 
    useAddressAutocomplete({
      onPlaceSelect: (address, location) => {
        setUserCoordinates(location);
        fetchShelters(location);
        toast.success(`Found location: ${address}`);
      }
    });

  const handleSearchButtonClick = () => {
    if (inputRef.current && inputRef.current.value && !isAutocompleteLoaded) {
      // Fallback if Google Autocomplete isn't loaded
      toast.info("Please select a location from the dropdown as you type");
    }
  };

  const handleShelterSelect = (shelterId: string) => {
    setSelectedShelterId(shelterId);
    // Pan the map to the selected shelter
    if (mapRef.current) {
      mapRef.current.panToMarker(shelterId);
    }
  };

  const handleMarkerClick = (shelterId: string) => {
    setSelectedShelterId(shelterId);
    if (window.innerWidth < 768) {
      setExpandedListView(true);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white cat-paw-grid">
        <AdoptHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <LocationSearch 
            isLocating={isLocating}
            locationError={locationError}
            onRequestLocation={requestUserLocation}
            inputRef={inputRef}
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSearchButtonClick={handleSearchButtonClick}
            isAutocompleteLoaded={isAutocompleteLoaded}
          />

          <MapContainer 
            userCoordinates={userCoordinates}
            shelters={shelters}
            selectedShelterId={selectedShelterId}
            onMarkerClick={handleMarkerClick}
            mapRef={mapRef}
          />

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {userCoordinates ? (
              <ShelterList
                shelters={shelters}
                isLoading={isLoading}
                error={error}
                selectedShelterId={selectedShelterId}
                onShelterSelect={handleShelterSelect}
                sortBy={sortBy}
                onSortChange={setSortBy}
                filters={filters}
                onFilterChange={updateFilters}
              />
            ) : (
              <div className="flex h-64 items-center justify-center">
                <p className="text-muted-foreground">
                  Provide your location to see nearby shelters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AdoptCat;
