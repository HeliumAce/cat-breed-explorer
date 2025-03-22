
import React from "react";
import { PageTransition } from "@/components/PageTransition";
import { AdoptionHeader } from "@/components/adoption/AdoptionHeader";
import { AdoptionContent } from "@/components/adoption/AdoptionContent";
import { useAdoptionLocations } from "@/hooks/use-adoption-locations";

const AdoptionLocations = () => {
  const {
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
  } = useAdoptionLocations();
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <AdoptionHeader />

          {/* Main content */}
          <AdoptionContent
            filteredLocations={filteredLocations}
            locationPermissionAsked={locationPermissionAsked}
            userLocation={userLocation}
            showLoading={showLoading}
            hasError={hasError}
            filters={filters}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onFilterChange={setFilters}
            onZipCodeChange={setZipCode}
            onRequestLocation={handleRequestLocation}
            onSkipLocationPermission={handleSkipLocationPermission}
            onRetry={handleRetry}
            onReset={handleReset}
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default AdoptionLocations;
