
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { MapPlaceholder } from "@/components/adoption/MapPlaceholder";
import { LocationCard } from "@/components/adoption/LocationCard";
import { LocationFilters } from "@/components/adoption/LocationFilters";
import { LocationHeader } from "@/components/adoption/LocationHeader";
import { EmptyState } from "@/components/adoption/EmptyState";
import { LoadingState } from "@/components/adoption/LoadingState";
import { ErrorState } from "@/components/adoption/ErrorState";
import { LocationPermission } from "@/components/adoption/LocationPermission";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { adoptionLocations } from "@/data/adoptionLocations";
import { useGeolocation } from "@/hooks/use-geolocation";
import { updateLocationDistances } from "@/utils/location-utils";
import { toast } from "sonner";

const AdoptionLocations = () => {
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
  }, [latitude, longitude]);

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
  }, [sortBy, filters, zipCode, locationsData]);

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

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-6">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mb-2">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Home
              </Button>
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-2">
                Adopt a Cat
              </h1>
              <p className="text-muted-foreground max-w-3xl">
                Find animal shelters, humane societies, and pet stores near you where you can adopt a cat.
              </p>
            </motion.div>
          </div>

          {/* Main content */}
          <div className="space-y-6">
            {/* Location permission request */}
            {!locationPermissionAsked && !userLocation && !loading && (
              <LocationPermission 
                onRequestLocation={handleRequestLocation}
                onSkip={handleSkipLocationPermission}
              />
            )}
            
            {/* Location Input - Now ABOVE the map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <LocationFilters 
                onSortChange={setSortBy}
                onFilterChange={setFilters}
                onZipCodeChange={setZipCode}
                hasUserLocation={!!userLocation}
              />
            </motion.div>
            
            {/* Map area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6"
            >
              <MapPlaceholder locations={filteredLocations} userLocation={userLocation} />
            </motion.div>
            
            {/* Locations list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Location list header with sort/filter buttons */}
              <LocationHeader 
                onSortChange={setSortBy}
                onFilterChange={setFilters}
                activeFilters={filters}
              />
              
              {showLoading ? (
                <LoadingState />
              ) : hasError ? (
                <ErrorState onRetry={handleRetry} />
              ) : filteredLocations.length === 0 ? (
                <EmptyState onReset={handleReset} />
              ) : (
                <div className="flex flex-col gap-4">
                  {filteredLocations.map((location, index) => (
                    <LocationCard 
                      key={location.id} 
                      location={location} 
                      index={index}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AdoptionLocations;
