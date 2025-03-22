
import { AlertCircle, MapPin } from "lucide-react";
import { AdoptionLocation } from "@/data/adoptionLocations";
import { getLocationTypeLabel } from "@/utils/location-utils";
import { Button } from "@/components/ui/button";
import { GOOGLE_MAPS_API_KEY } from "@/config/maps-config";

interface FallbackMapViewProps {
  locations: AdoptionLocation[];
  userLocation?: { lat: number; lng: number };
  error?: string;
}

export function FallbackMapView({ locations, userLocation, error }: FallbackMapViewProps) {
  // Find the closest location to the user if userLocation exists
  const closestLocation = userLocation 
    ? locations.sort((a, b) => a.distance - b.distance)[0]
    : null;

  return (
    <div className="flex flex-col h-full p-4 items-center justify-center bg-amber-50 rounded-lg border border-amber-100">
      <AlertCircle className="w-8 h-8 text-amber-500 mb-2" />
      
      <h3 className="text-lg font-semibold text-center">
        Unable to load interactive map
      </h3>
      
      <p className="text-sm text-muted-foreground text-center max-w-md mt-2">
        {!GOOGLE_MAPS_API_KEY ? (
          "No Google Maps API key provided. Please add your API key to the environment variables."
        ) : (
          error || "There was an issue loading Google Maps. Please try again later."
        )}
      </p>
      
      {closestLocation && (
        <div className="mt-4 p-3 bg-white rounded-lg border border-amber-100 w-full max-w-sm">
          <p className="text-sm font-medium">Closest location to you:</p>
          <h4 className="font-semibold">{closestLocation.name}</h4>
          <p className="text-xs">{getLocationTypeLabel(closestLocation.type)}</p>
          <p className="text-xs mt-1">{closestLocation.address}</p>
          <p className="text-xs">{closestLocation.city}, {closestLocation.state} {closestLocation.zipCode}</p>
          <p className="text-xs mt-1">{closestLocation.phone}</p>
          <p className="text-xs mt-1 font-medium">
            {closestLocation.distance.toFixed(1)} miles from you
          </p>
          
          <div className="mt-3 flex justify-end">
            <Button 
              size="sm" 
              variant="outline"
              className="text-xs"
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(closestLocation.name + ' ' + closestLocation.address + ' ' + closestLocation.city)}`, '_blank')}
            >
              <MapPin className="w-3 h-3 mr-1" />
              View on Google Maps
            </Button>
          </div>
        </div>
      )}
      
      {locations.length > 0 && !closestLocation && (
        <div className="mt-4 text-sm text-center max-w-md">
          <p>Please allow location access or enter your ZIP code to see the closest adoption centers.</p>
        </div>
      )}
    </div>
  );
}
