
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

const AdoptionLocations = () => {
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

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter and sort locations based on user selections
    let result = [...adoptionLocations];
    
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
    
    // Display only the first 10 results
    setFilteredLocations(result.slice(0, 10));
  }, [sortBy, filters, zipCode]);

  const handleRequestLocation = () => {
    // This would normally request geolocation access
    // For this demo, we're just setting a flag that it was asked
    setLocationPermissionAsked(true);
  };

  const handleSkipLocationPermission = () => {
    setLocationPermissionAsked(true);
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
              
              {isLoading ? (
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
