
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdoptionLocation, LocationType, AdoptionLocationsResponse } from "@/types/adoption";
import { toast } from "sonner";

interface UseAdoptionLocationsProps {
  defaultLocation?: { lat: number; lng: number };
  radius?: number;
  locationTypeFilter?: LocationType | 'all';
}

export function useAdoptionLocations({
  defaultLocation,
  radius = 5000,
  locationTypeFilter = 'all'
}: UseAdoptionLocationsProps = {}) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(defaultLocation || null);
  const [locationPermissionStatus, setLocationPermissionStatus] = useState<'loading' | 'granted' | 'denied' | 'prompt'>('loading');
  const [manualAddress, setManualAddress] = useState<string>('');

  // Try to get user location on first load
  useEffect(() => {
    checkLocationPermission();
    
    // If default location is not provided, try to get user's current location
    if (!defaultLocation) {
      getUserLocation();
    }
  }, [defaultLocation]);

  const checkLocationPermission = async () => {
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
      setLocationPermissionStatus(permissionStatus.state as 'granted' | 'denied' | 'prompt');
      
      // Listen for permission changes
      permissionStatus.onchange = () => {
        setLocationPermissionStatus(permissionStatus.state as 'granted' | 'denied' | 'prompt');
        if (permissionStatus.state === 'granted') {
          getUserLocation();
        }
      };
    } catch (error) {
      console.error("Error checking location permission:", error);
      setLocationPermissionStatus('prompt'); // Default to prompt if we can't determine
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      setLocationPermissionStatus('loading');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationPermissionStatus('granted');
        },
        (error) => {
          console.error("Error getting user location:", error);
          setLocationPermissionStatus(error.code === 1 ? 'denied' : 'prompt');
          toast.error("Unable to access your location. Please enter your location manually.");
        }
      );
    } else {
      setLocationPermissionStatus('denied');
      toast.error("Geolocation is not supported by your browser. Please enter your location manually.");
    }
  };

  const setLocationByAddress = async (address: string) => {
    // In a real implementation, we would geocode the address here
    // For now, we'll use a mock coordinate (downtown San Francisco)
    setUserLocation({ lat: 37.7749, lng: -122.4194 });
    setManualAddress(address);
    toast.success(`Location set to ${address}`);
  };

  // Query to fetch adoption locations
  const { 
    data, 
    isLoading, 
    isError, 
    error,
    refetch
  } = useQuery({
    queryKey: ['adoptionLocations', userLocation?.lat, userLocation?.lng, radius, locationTypeFilter],
    queryFn: async () => {
      if (!userLocation) {
        throw new Error("User location is required to fetch adoption locations");
      }

      const { data, error } = await supabase.functions.invoke<AdoptionLocationsResponse>('get-adoption-locations', {
        body: {
          lat: userLocation.lat,
          lng: userLocation.lng,
          radius,
          type: locationTypeFilter !== 'all' ? locationTypeFilter : undefined
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!userLocation, // Only run query if user location is available
  });

  // Filter locations by type if a filter is applied
  const locations = data?.locations || [];
  const filteredLocations = locationTypeFilter === 'all'
    ? locations
    : locations.filter(location => location.type === locationTypeFilter);

  return {
    locations: filteredLocations,
    userLocation,
    isLoading,
    isError,
    error,
    locationPermissionStatus,
    requestUserLocation: getUserLocation,
    setLocationByAddress,
    manualAddress,
    setManualAddress,
    refetch
  };
}
