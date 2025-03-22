
import { useState, useEffect } from "react";
import { useGeolocation } from "@/hooks/use-geolocation";
import { updateLocationDistances } from "@/utils/location-utils";
import { adoptionLocations } from "@/data/adoptionLocations";
import { toast } from "sonner";

export function useAdoptionLocations() {
  const [locationsData, setLocationsData] = useState(adoptionLocations);
  const [filteredLocations, setFilteredLocations] = useState(adoptionLocations);
  const [sortBy, setSortBy] = useState<string>("distance");
  const [filters, setFilters] = useState<string[]>([]);
  const [zipCode, setZipCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [locationPermissionAsked, setLocationPermissionAsked] = useState(false);
  const { latitude, longitude, error, loading } = useGeolocation();

  const userLocation = latitude && longitude 
    ? { lat: latitude, lng: longitude }
    : undefined;

  // Update location distances when user location changes
  useEffect(() => {
    if (latitude && longitude) {
      console.log("Applying user location to adoption locations:", latitude, longitude);
      
      const locationsWithDistances = updateLocationDistances(
        adoptionLocations,
        latitude,
        longitude
      );
      
      setLocationsData(locationsWithDistances);
      
      // Apply filters & sorting
      let result = [...locationsWithDistances];
      
      // Apply type filters
      if (filters.length > 0) {
        result = result.filter(location => filters.includes(location.type));
      }
      
      // Apply sorting
      if (sortBy === "distance") {
        // Auto-sort by distance when location is available
        result = result.sort((a, b) => a.distance - b.distance);
      } else if (sortBy === "name") {
        result = result.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === "type") {
        result = result.sort((a, b) => a.type.localeCompare(b.type));
      }
      
      setFilteredLocations(result);
      setIsLoading(false);
      
      toast.success("Showing locations near you!");
    }
  }, [latitude, longitude, filters, sortBy]);

  // Re-apply filters and sorting when they change
  useEffect(() => {
    // Skip if we don't have location data yet and are using distance sorting
    if (!userLocation && sortBy === "distance") {
      return;
    }
    
    setIsLoading(true);
    
    // Filter and sort locations based on user selections
    let result = [...locationsData];
    
    // Apply type filters
    if (filters.length > 0) {
      result = result.filter(location => filters.includes(location.type));
    }
    
    // Apply sorting
    switch (sortBy) {
      case "distance":
        result = result.sort((a, b) => a.distance - b.distance);
        break;
      case "name":
        result = result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "type":
        result = result.sort((a, b) => a.type.localeCompare(b.type));
        break;
      default:
        break;
    }
    
    setTimeout(() => {
      setFilteredLocations(result);
      setIsLoading(false);
    }, 300);
  }, [sortBy, filters, zipCode, locationsData, userLocation]);

  const handleRequestLocation = () => {
    setLocationPermissionAsked(true);
    // The useGeolocation hook will automatically try to get the location
    if (error) {
      toast.error("Could not access your location. Please check your browser settings.");
    }
  };

  const handleSkipLocationPermission = () => {
    setLocationPermissionAsked(true);
    toast.info("You can enter your ZIP code to find nearby locations");
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setSortBy("distance");
    setFilters([]);
    setZipCode("");
  };

  // Determine if we need to show loading state
  const showLoading = isLoading || (loading && !locationPermissionAsked);

  return {
    filteredLocations,
    locationPermissionAsked,
    userLocation,
    showLoading,
    hasError,
    filters,
    sortBy,
    zipCode,
    handleRequestLocation,
    handleSkipLocationPermission,
    handleRetry,
    handleReset,
    setSortBy,
    setFilters,
    setZipCode
  };
}
