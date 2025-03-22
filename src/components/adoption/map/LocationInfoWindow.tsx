
import { AdoptionLocation } from "@/data/adoptionLocations";
import { getLocationTypeLabel } from "../../../utils/location-utils";

interface LocationInfoWindowProps {
  location: AdoptionLocation;
  userLocation?: { lat: number; lng: number };
}

export function LocationInfoWindow({ location, userLocation }: LocationInfoWindowProps) {
  return (
    <div className="p-2 max-w-xs">
      <h3 className="font-semibold">{location.name}</h3>
      <p className="text-xs">{getLocationTypeLabel(location.type)}</p>
      <p className="text-xs mt-1">{location.address}</p>
      <p className="text-xs">{location.city}, {location.state} {location.zipCode}</p>
      <p className="text-xs mt-1">{location.phone}</p>
      {userLocation && (
        <p className="text-xs mt-1 font-medium">
          {location.distance.toFixed(1)} miles from you
        </p>
      )}
    </div>
  );
}
