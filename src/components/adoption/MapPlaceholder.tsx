
import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Home, Building, Store, Navigation, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { AdoptionLocation } from "@/data/adoptionLocations";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "@/config/maps-config";

interface MapPlaceholderProps {
  locations: AdoptionLocation[];
  userLocation?: { lat: number; lng: number };
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem'
};

const defaultCenter = {
  lat: 34.052235,
  lng: -118.243683
};

// Define libraries correctly as Libraries type
const libraries = ["places"] as ("places" | "drawing" | "geometry" | "visualization")[];

export function MapPlaceholder({ locations, userLocation }: MapPlaceholderProps) {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [selectedLocation, setSelectedLocation] = useState<AdoptionLocation | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

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
        <div className="flex items-center justify-center h-full text-muted-foreground bg-amber-50 p-4 rounded-lg">
          <MapPin className="w-5 h-5 mr-2 text-red-500" />
          <span>Error loading maps. Please try again later.</span>
        </div>
      );
    }

    return isLoaded ? (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={userLocation || defaultCenter}
        zoom={10}
        onLoad={onMapLoad}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
        }}
      >
        {/* User location marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              scaledSize: new window.google.maps.Size(40, 40),
            }}
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
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    ) : (
      <div className="flex items-center justify-center h-full text-muted-foreground bg-amber-50 p-4 rounded-lg">
        <MapPin className="w-5 h-5 mr-2" />
        <span>Loading maps...</span>
      </div>
    );
  };

  return (
    <div className="relative w-full">
      {/* Map toggle button for mobile */}
      {isMobile && (
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
          isCollapsed ? "h-16" : "h-[60vh]"
        )}
      >
        {isCollapsed ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <MapPin className="w-5 h-5 mr-2" />
            <span>Map view is collapsed. Tap to expand.</span>
          </div>
        ) : (
          renderMap()
        )}
      </div>
    </div>
  );
}
