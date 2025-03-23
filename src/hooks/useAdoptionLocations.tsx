
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdoptionLocation, LocationType, AdoptionLocationsResponse } from "@/types/adoption";
import { toast } from "sonner";

interface UseAdoptionLocationsProps {
  defaultLocation?: { lat: number; lng: number };
  radius?: number;
  locationTypeFilter?: LocationType | 'all';
  minLocations?: number;
}

export function useAdoptionLocations({
  defaultLocation,
  radius = 8000, // Increased radius to find more locations
  locationTypeFilter = 'all',
  minLocations = 5 // Ensure at least 5 locations
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
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newLocation);
          setLocationPermissionStatus('granted');
          toast.success("Location access granted");
        },
        (error) => {
          console.error("Error getting user location:", error);
          setLocationPermissionStatus(error.code === 1 ? 'denied' : 'prompt');
          
          // Set a default location if user denies permission (New York City)
          if (error.code === 1) {
            setUserLocation({ lat: 40.7128, lng: -74.0060 });
            toast.error("Location access denied. Using default location.");
          } else {
            toast.error("Unable to access your location. Please enter your location manually.");
          }
        }
      );
    } else {
      setLocationPermissionStatus('denied');
      // Set a default location if geolocation is not supported (New York City)
      setUserLocation({ lat: 40.7128, lng: -74.0060 });
      toast.error("Geolocation is not supported by your browser. Using default location.");
    }
  };

  const setLocationByAddress = async (address: string) => {
    // This would typically use a geocoding service
    // For now, we'll set a mock location (San Francisco)
    setUserLocation({ lat: 37.7749, lng: -122.4194 });
    setManualAddress(address);
    toast.success(`Location set to ${address}`);
  };

  // Direct function to set user location coordinates
  const setUserLocationCoordinates = (coordinates: { lat: number; lng: number }) => {
    setUserLocation(coordinates);
    setLocationPermissionStatus('granted');
    toast.success(`Location updated successfully`);
  };

  // Query to fetch adoption locations
  const { 
    data, 
    isLoading, 
    isError, 
    error,
    refetch
  } = useQuery({
    queryKey: ['adoptionLocations', userLocation?.lat, userLocation?.lng, radius, locationTypeFilter, minLocations],
    queryFn: async () => {
      console.log("Fetching adoption locations with params:", {
        lat: userLocation?.lat,
        lng: userLocation?.lng,
        radius,
        type: locationTypeFilter !== 'all' ? locationTypeFilter : undefined,
        minLocations
      });

      if (!userLocation) {
        throw new Error("User location is required to fetch adoption locations");
      }

      try {
        const { data, error } = await supabase.functions.invoke<AdoptionLocationsResponse>('get-adoption-locations', {
          body: {
            lat: userLocation.lat,
            lng: userLocation.lng,
            radius,
            type: locationTypeFilter !== 'all' ? locationTypeFilter : undefined,
            minLocations
          }
        });

        if (error) {
          console.error("Supabase function error:", error);
          throw new Error(error.message);
        }

        console.log("Received adoption locations:", data);
        return data || { locations: [] };
      } catch (err) {
        console.error("Error in useAdoptionLocations:", err);
        throw err;
      }
    },
    enabled: !!userLocation, // Only run query if user location is available
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Filter locations by type if a filter is applied
  const locations = data?.locations || [];
  const filteredLocations = locationTypeFilter === 'all'
    ? locations
    : locations.filter(location => location.type === locationTypeFilter);

  console.log("Filtered locations:", filteredLocations);

  return {
    locations: filteredLocations,
    userLocation,
    isLoading,
    isError,
    error,
    locationPermissionStatus,
    requestUserLocation: getUserLocation,
    setLocationByAddress,
    setUserLocationCoordinates,
    manualAddress,
    setManualAddress,
    refetch
  };
}
