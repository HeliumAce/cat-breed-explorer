
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function useLocationState() {
  const [userCoordinates, setUserCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [hasRequestedLocation, setHasRequestedLocation] = useState(false);

  // Request location on initial load
  useEffect(() => {
    // Only request once
    if (!hasRequestedLocation) {
      requestUserLocation();
      setHasRequestedLocation(true);
    }
  }, [hasRequestedLocation]);

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
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserCoordinates(newLocation);
        setIsLocating(false);
        toast.success("Using your current location");
      },
      (error) => {
        console.error("Error getting location:", error);
        let errorMessage;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access was denied. You can search for a location manually.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable. Please try searching manually.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get location timed out. Please try again.";
            break;
          default:
            errorMessage = "An unknown error occurred. Please try searching manually.";
            break;
        }
        setLocationError(errorMessage);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  return {
    userCoordinates,
    setUserCoordinates,
    isLocating,
    locationError,
    requestUserLocation
  };
}
