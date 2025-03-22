
import { useState, useCallback, useRef } from "react";
import { AlertCircle, MapPin } from "lucide-react";
import { AdoptionLocation } from "@/data/adoptionLocations";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY, mapConfig } from "@/config/maps-config";
import { LocationInfoWindow } from "./LocationInfoWindow";

interface GoogleMapViewProps {
  locations: AdoptionLocation[];
  userLocation?: { lat: number; lng: number };
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem'
};

// Define libraries correctly as an array of strings
const libraries: ["places"] = ["places"];

export function GoogleMapView({ locations, userLocation }: GoogleMapViewProps) {
  const [selectedLocation, setSelectedLocation] = useState<AdoptionLocation | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    
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

  if (loadError) {
    return <MapLoadError />;
  }

  if (!isLoaded) {
    return <MapLoading />;
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={userLocation || mapConfig.defaultCenter}
      zoom={mapConfig.defaultZoom}
      onLoad={onMapLoad}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
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
          <LocationInfoWindow location={selectedLocation} userLocation={userLocation} />
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

function MapLoadError() {
  return (
    <div className="flex items-center justify-center h-full text-muted-foreground bg-amber-50 p-4 rounded-lg">
      <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
      <div className="flex flex-col">
        <span className="font-semibold">Error loading Google Maps</span>
        <span className="text-xs mt-1">
          {GOOGLE_MAPS_API_KEY 
            ? "Check your API key configuration or network connection." 
            : "No Google Maps API key provided. Set the VITE_GOOGLE_MAPS_API_KEY environment variable."}
        </span>
      </div>
    </div>
  );
}

function MapLoading() {
  return (
    <div className="flex items-center justify-center h-full text-muted-foreground bg-amber-50 p-4 rounded-lg">
      <MapPin className="w-5 h-5 mr-2" />
      <span>Loading maps...</span>
    </div>
  );
}

function getMarkerIcon(type: string) {
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
}
