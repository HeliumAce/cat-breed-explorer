
import { useState, useCallback, useRef } from "react";
import { AlertCircle, MapPin } from "lucide-react";
import { AdoptionLocation } from "@/data/adoptionLocations";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY, mapConfig, isValidGoogleMapsApiKey } from "@/config/maps-config";
import { LocationInfoWindow } from "./LocationInfoWindow";
import { FallbackMapView } from "./FallbackMapView";

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
  
  // Only attempt to load the API if we have a valid key
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

  // If no valid API key, show a message about adding an API key
  if (!isValidGoogleMapsApiKey) {
    return (
      <FallbackMapView 
        locations={locations} 
        userLocation={userLocation} 
        error="No Google Maps API key provided. Please add your API key to the environment variables."
      />
    );
  }

  // If there's a load error, show the fallback view with the error
  if (loadError) {
    console.error("Google Maps load error:", loadError);
    return (
      <FallbackMapView 
        locations={locations} 
        userLocation={userLocation} 
        error="Failed to load Google Maps. Please check your API key and network connection."
      />
    );
  }

  // If still loading, show the loading state
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
            url: mapConfig.markerIcons.user,
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

function MapLoading() {
  return (
    <div className="flex items-center justify-center h-full text-muted-foreground bg-amber-50 p-4 rounded-lg">
      <MapPin className="w-5 h-5 mr-2" />
      <span>Loading maps...</span>
    </div>
  );
}

function getMarkerIcon(type: string) {
  return mapConfig.markerIcons[type as keyof typeof mapConfig.markerIcons] || mapConfig.markerIcons.default;
}
