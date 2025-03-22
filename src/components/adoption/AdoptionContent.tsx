
import React from "react";
import { motion } from "framer-motion";
import { MapPlaceholder } from "@/components/adoption/MapPlaceholder";
import { LocationCard } from "@/components/adoption/LocationCard";
import { LocationFilters } from "@/components/adoption/LocationFilters";
import { LocationHeader } from "@/components/adoption/LocationHeader";
import { EmptyState } from "@/components/adoption/EmptyState";
import { LoadingState } from "@/components/adoption/LoadingState";
import { ErrorState } from "@/components/adoption/ErrorState";
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
      
      {/* Location Input - Now ABOVE the map */}
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
          onSortChange={onSortChange}
          onFilterChange={onFilterChange}
          activeFilters={filters}
        />
        
        {showLoading ? (
          <LoadingState />
        ) : hasError ? (
          <ErrorState onRetry={onRetry} />
        ) : filteredLocations.length === 0 ? (
          <EmptyState onReset={onReset} />
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
  );
}
