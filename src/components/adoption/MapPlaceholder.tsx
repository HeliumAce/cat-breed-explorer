
import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, AlertCircle, ChevronUp, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { AdoptionLocation } from "@/data/adoptionLocations";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY, mapConfig } from "@/config/maps-config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MapPlaceholderProps {
  locations: AdoptionLocation[];
  userLocation?: { lat: number; lng: number };
  isMainFocus?: boolean;
  isLoading?: boolean;
  hasError?: boolean;
  onRetry?: () => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem'
};

// Define libraries correctly as an array of strings
const libraries: ["places"] = ["places"];

export function MapPlaceholder({ 
  locations, 
  userLocation, 
  isMainFocus = false,
  isLoading = false,
  hasError = false,
  onRetry 
}: MapPlaceholderProps) {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(isMobile && !isMainFocus);
  const [selectedLocation, setSelectedLocation] = useState<AdoptionLocation | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    // If this is the main focus, never collapse on mobile
    if (isMainFocus) {
      setIsCollapsed(false);
    }
  }, [isMainFocus]);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    console.log("Map loaded successfully");
    mapRef.current = map;
    setMapInstance(map);
    
    // If we have locations, fit bounds to show all markers
    if (locations.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      
      // Add user location to bounds if available
      if (userLocation) {
        bounds.extend(new google.maps.LatLng(userLocation.lat, userLocation.lng));
      }
      
      // Add all location markers to bounds
      locations.forEach(location => {
        bounds.extend(new google.maps.LatLng(location.latitude, location.longitude));
      });
      
      // Fit the map to the bounds
      map.fitBounds(bounds);
      
      // Don't zoom in too far
      if (map.getZoom() && map.getZoom()! > 15) {
        map.setZoom(15);
      }
    }
  }, [locations, userLocation]);

  // Handle map resize when collapsed state changes
  useEffect(() => {
    if (mapInstance && !isCollapsed) {
      window.google?.maps.event.trigger(mapInstance, 'resize');
      
      // Re-center the map if needed
      if (userLocation) {
        mapInstance.setCenter(userLocation);
      } else if (locations.length > 0) {
        mapInstance.setCenter({
          lat: locations[0].latitude, 
          lng: locations[0].longitude
        });
      } else {
        mapInstance.setCenter(mapConfig.defaultCenter);
      }
    }
  }, [isCollapsed, mapInstance, locations, userLocation]);

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "shelter":
        return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
      case "humane_society":
        return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
      case "pet_store":
        return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
      default:
        return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    }
  };

  const getLocationTypeLabel = (type: string) => {
    switch (type) {
      case "shelter":
        return "Animal Shelter";
      case "humane_society":
        return "Humane Society";
      case "pet_store":
        return "Pet Store";
      default:
        return type;
    }
  };

  const renderMap = () => {
    if (loadError) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-amber-50 p-4 rounded-lg">
          <AlertCircle className="w-8 h-8 mb-4 text-red-500" />
          <div className="flex flex-col items-center text-center">
            <span className="font-semibold text-lg mb-2">Error loading Google Maps</span>
            <span className="text-sm max-w-md">
              {GOOGLE_MAPS_API_KEY 
                ? "Check your API key configuration or network connection." 
                : "No Google Maps API key provided. Set the VITE_GOOGLE_MAPS_API_KEY environment variable."}
            </span>
            {onRetry && (
              <Button onClick={onRetry} variant="secondary" className="mt-4">
                Try Again
              </Button>
            )}
          </div>
        </div>
      );
    }

    if (!isLoaded || isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-amber-50 p-4 rounded-lg">
          <Loader2 className="w-8 h-8 mb-4 animate-spin text-amber-500" />
          <span className="font-medium">Loading map...</span>
        </div>
      );
    }

    if (hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-amber-50 p-4 rounded-lg">
          <AlertCircle className="w-8 h-8 mb-4 text-red-500" />
          <span className="font-medium mb-2">Error loading locations</span>
          {onRetry && (
            <Button onClick={onRetry} variant="secondary" className="mt-2">
              Try Again
            </Button>
          )}
        </div>
      );
    }

    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={userLocation || mapConfig.defaultCenter}
        zoom={mapConfig.defaultZoom}
        onLoad={onMapLoad}
        options={mapConfig.options}
      >
        {/* User location marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            title="Your Location"
          />
        )}

        {/* Location markers */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={{ lat: location.latitude, lng: location.longitude }}
            icon={{
              url: getMarkerIcon(location.type),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            onClick={() => setSelectedLocation(location)}
            title={location.name}
          />
        ))}

        {/* Info window for selected location */}
        {selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.latitude, lng: selectedLocation.longitude }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-semibold">{selectedLocation.name}</h3>
              <p className="text-xs">{getLocationTypeLabel(selectedLocation.type)}</p>
              <p className="text-xs mt-1">{selectedLocation.address}</p>
              <p className="text-xs">{selectedLocation.city}, {selectedLocation.state} {selectedLocation.zipCode}</p>
              <p className="text-xs mt-1">{selectedLocation.phone}</p>
              {userLocation && (
                <p className="text-xs mt-1 font-medium">
                  {selectedLocation.distance.toFixed(1)} miles from you
                </p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  };

  // For main focus map, calculate height based on viewport
  const mapHeight = isMainFocus 
    ? "h-[70vh]" // Taller when main focus
    : "h-[60vh]";

  return (
    <div className="relative w-full">
      {/* Map toggle button for mobile */}
      {isMobile && !isMainFocus && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow-md"
          aria-label={isCollapsed ? "Expand map" : "Collapse map"}
        >
          {isCollapsed ? <ChevronDown /> : <ChevronUp />}
        </button>
      )}

      <div 
        className={cn(
          "relative bg-amber-50 rounded-lg border border-amber-100 shadow-inner overflow-hidden transition-all duration-300 ease-in-out",
          isCollapsed ? "h-16" : mapHeight
        )}
      >
        {isCollapsed ? (
          <div 
            className="flex items-center justify-center h-full text-muted-foreground cursor-pointer"
            onClick={() => setIsCollapsed(false)}
          >
            <MapPin className="w-5 h-5 mr-2" />
            <span>Map view is collapsed. Tap to expand.</span>
            {userLocation && (
              <Badge className="ml-2 bg-green-100 text-green-800">Location active</Badge>
            )}
          </div>
        ) : (
          renderMap()
        )}
      </div>

      {/* Map Legend - Only show when map is expanded and is main focus */}
      {!isCollapsed && isMainFocus && (
        <div className="flex flex-wrap gap-2 justify-center mt-2 bg-white p-2 rounded-md shadow-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1.5"></div>
            <span className="text-xs text-muted-foreground">Animal Shelter</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1.5"></div>
            <span className="text-xs text-muted-foreground">Humane Society</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1.5"></div>
            <span className="text-xs text-muted-foreground">Pet Store</span>
          </div>
          {userLocation && (
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-700 border border-white mr-1.5"></div>
              <span className="text-xs text-muted-foreground">Your Location</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
