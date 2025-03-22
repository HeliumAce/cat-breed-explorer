
import React from "react";
import { motion } from "framer-motion";
import { MapPlaceholder } from "@/components/adoption/MapPlaceholder";
import { LocationFilters } from "@/components/adoption/LocationFilters";
import { LocationPermission } from "@/components/adoption/LocationPermission";

interface AdoptionContentProps {
  filteredLocations: any[];
  locationPermissionAsked: boolean;
  userLocation?: { lat: number; lng: number };
  showLoading: boolean;
  hasError: boolean;
  filters: string[];
  sortBy: string;
  onSortChange: (sort: string) => void;
  onFilterChange: (filters: string[]) => void;
  onZipCodeChange: (zipCode: string) => void;
  onRequestLocation: () => void;
  onSkipLocationPermission: () => void;
  onRetry: () => void;
  onReset: () => void;
}

export function AdoptionContent({
  filteredLocations,
  locationPermissionAsked,
  userLocation,
  showLoading,
  hasError,
  filters,
  sortBy,
  onSortChange,
  onFilterChange,
  onZipCodeChange,
  onRequestLocation,
  onSkipLocationPermission,
  onRetry,
  onReset
}: AdoptionContentProps) {
  return (
    <div className="space-y-6">
      {/* Location permission request */}
      {!locationPermissionAsked && !userLocation && (
        <LocationPermission 
          onRequestLocation={onRequestLocation}
          onSkip={onSkipLocationPermission}
        />
      )}
      
      {/* Location Input - ABOVE the map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <LocationFilters 
          onSortChange={onSortChange}
          onFilterChange={onFilterChange}
          onZipCodeChange={onZipCodeChange}
          hasUserLocation={!!userLocation}
        />
      </motion.div>
      
      {/* Map area - Now full height and the main focus */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-6"
      >
        <MapPlaceholder 
          locations={filteredLocations} 
          userLocation={userLocation} 
          isMainFocus={true}
          isLoading={showLoading}
          hasError={hasError}
          onRetry={onRetry}
        />
      </motion.div>
    </div>
  );
}
