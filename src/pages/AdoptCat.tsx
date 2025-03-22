import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoadingInline } from "@/components/Loading";
import { Input } from "@/components/ui/input";
import AdoptMap from "@/components/AdoptMap";
import { ApiKeyManager } from "@/components/ApiKeyManager";
import ShelterList from "@/components/ShelterList";
import {
  MapPin,
  Search,
  X,
  AlertCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useShelters } from "@/hooks/useShelters";
import { cn } from "@/lib/utils";
import { FilterOptions, SortOption } from "@/types/shelters";

const AdoptCat = () => {
  const [manualLocation, setManualLocation] = useState("");
  const [userCoordinates, setUserCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [expandedListView, setExpandedListView] = useState(false);
  const [selectedShelterId, setSelectedShelterId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("distance");
  const [filters, setFilters] = useState<FilterOptions>({
    openNow: false,
    acceptsCats: false,
    noKill: false,
  });

  const { 
    shelters, 
    isLoading, 
    error, 
    fetchShelters 
  } = useShelters();

  const mapRef = useRef(null);

  useEffect(() => {
    requestUserLocation();
  }, []);

  const requestUserLocation = () => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocating(false);
        fetchShelters({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
        let errorMessage;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission was denied";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get location timed out";
            break;
          default:
            errorMessage = "An unknown error occurred";
            break;
        }
        setLocationError(errorMessage);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const handleManualLocationSearch = () => {
    if (manualLocation.trim()) {
      setIsLocating(true);
      setTimeout(() => {
        const simulatedCoords = {
          lat: 37.7749,
          lng: -122.4194,
        };
        setUserCoordinates(simulatedCoords);
        fetchShelters(simulatedCoords);
        setIsLocating(false);
      }, 1000);
    }
  };

  const handleShelterSelect = (shelterId: string) => {
    setSelectedShelterId(shelterId);
  };

  const handleMarkerClick = (shelterId: string) => {
    setSelectedShelterId(shelterId);
    if (window.innerWidth < 768) {
      setExpandedListView(true);
    }
  };

  const updateFilters = (filterKey: keyof FilterOptions) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey]
    }));
  };

  const toggleListView = () => {
    setExpandedListView(!expandedListView);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white cat-paw-grid">
        <header className="relative pt-8 pb-6 px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight text-foreground mb-2"
          >
            Find a Shelter to Adopt a Cat
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl mx-auto text-base text-muted-foreground mb-6"
          >
            Discover local animal shelters, humane societies, and adoption centers where you can find your perfect feline companion.
          </motion.p>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <Card className="p-4 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="w-full sm:w-auto flex-1">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter city or address..."
                    value={manualLocation}
                    onChange={(e) => setManualLocation(e.target.value)}
                    disabled={isLocating}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleManualLocationSearch();
                      }
                    }}
                  />
                  <Button
                    onClick={handleManualLocationSearch}
                    disabled={!manualLocation.trim() || isLocating}
                  >
                    <Search size={16} className="mr-2" /> Search
                  </Button>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={requestUserLocation}
                  disabled={isLocating}
                >
                  <MapPin size={16} className="mr-2" /> Use My Location
                </Button>
              </div>
            </div>

            {isLocating && (
              <div className="mt-4">
                <LoadingInline text="Locating..." />
              </div>
            )}

            {locationError && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{locationError}</AlertDescription>
              </Alert>
            )}
          </Card>

          <div className="mb-6 rounded-lg overflow-hidden shadow-md">
            <div className="h-[300px] sm:h-[400px]">
              {!userCoordinates ? (
                <div className="flex h-full items-center justify-center bg-muted/20">
                  <div className="text-center p-8">
                    <MapPin className="w-10 h-10 text-muted mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Please provide your location to find nearby shelters
                    </p>
                  </div>
                </div>
              ) : (
                <AdoptMap
                  ref={mapRef}
                  userLocation={userCoordinates}
                  shelters={shelters}
                  selectedShelterId={selectedShelterId}
                  onMarkerClick={handleMarkerClick}
                />
              )}
            </div>
          </div>

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

        {/* Add the API key manager component */}
        <ApiKeyManager />
      </div>
    </PageTransition>
  );
};

export default AdoptCat;
