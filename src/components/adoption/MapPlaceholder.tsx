
import { AdoptionLocation } from "@/data/adoptionLocations";
import { MapContainer } from "./map/MapContainer";

interface MapPlaceholderProps {
  locations: AdoptionLocation[];
  userLocation?: { lat: number; lng: number };
}

export function MapPlaceholder({ locations, userLocation }: MapPlaceholderProps) {
  return <MapContainer locations={locations} userLocation={userLocation} />;
}
