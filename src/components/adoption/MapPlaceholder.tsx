import { AdoptionLocation } from "@/data/adoptionLocations";
import { MapContainer } from "./map/MapContainer";
import { isValidGoogleMapsApiKey } from "@/config/maps-config";
import { FallbackMapView } from "./map/FallbackMapView";

interface MapPlaceholderProps {
  locations: AdoptionLocation[];
  userLocation?: { lat: number; lng: number };
}

export function MapPlaceholder({ locations, userLocation }: MapPlaceholderProps) {
  // If we don't have a valid API key, show the fallback view immediately
  if (!isValidGoogleMapsApiKey) {
    return <FallbackMapView locations={locations} userLocation={userLocation} />;
  }
  
  // Otherwise, use the regular map container
  return <MapContainer locations={locations} userLocation={userLocation} />;
}
