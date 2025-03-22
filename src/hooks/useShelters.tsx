
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Shelter, Location } from '@/types/shelters';
import { MOCK_SHELTERS } from '@/data/mock-shelters';

export function useShelters() {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastFetchedLocation, setLastFetchedLocation] = useState<Location | null>(null);

  // Function to fetch shelters based on location
  const fetchShelters = async (location: Location) => {
    // Skip if we're already fetching from this location
    if (
      lastFetchedLocation &&
      lastFetchedLocation.lat === location.lat &&
      lastFetchedLocation.lng === location.lng &&
      shelters.length > 0
    ) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Check if Google Maps is loaded
      if (window.google && window.google.maps) {
        // Create Google Places Service
        const placesService = new window.google.maps.places.PlacesService(
          document.createElement('div')
        );

        // Define search requests - one for each type of place we want to find
        const requests = [
          {
            location: new window.google.maps.LatLng(location.lat, location.lng),
            radius: 10000, // 10km radius
            type: 'pet_store' as const
          },
          {
            location: new window.google.maps.LatLng(location.lat, location.lng),
            radius: 10000,
            keyword: 'animal shelter'
          },
          {
            location: new window.google.maps.LatLng(location.lat, location.lng),
            radius: 10000,
            keyword: 'humane society'
          }
        ];

        // Combine results from all requests
        const allPlaces: google.maps.places.PlaceResult[] = [];

        // Execute all requests in sequence
        for (const request of requests) {
          try {
            const places = await new Promise<google.maps.places.PlaceResult[]>((resolve, reject) => {
              placesService.nearbySearch(
                request,
                (results, status) => {
                  if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                    resolve(results);
                  } else {
                    // Don't reject, just return empty array for this particular search
                    resolve([]);
                  }
                }
              );
            });
            
            allPlaces.push(...places);
          } catch (err) {
            console.error('Error in places search:', err);
            // Continue with other searches even if one fails
          }
        }

        // Filter out duplicates by place_id
        const uniquePlaces = allPlaces.filter((place, index, self) => 
          place.place_id && index === self.findIndex(p => p.place_id === place.place_id)
        );

        // Convert Google Places results to our Shelter format
        const sheltersData: Shelter[] = uniquePlaces.map(place => {
          // Calculate distance (using haversine formula for more accuracy)
          const placeLocation = place.geometry?.location;
          let distance = 0;
          
          if (placeLocation) {
            const lat1 = location.lat;
            const lon1 = location.lng;
            const lat2 = placeLocation.lat();
            const lon2 = placeLocation.lng();
            
            // Haversine formula
            const R = 6371; // Radius of the Earth in km
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = 
              Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            distance = R * c;
          }

          // Determine if it's likely a shelter that accepts cats
          const acceptsCats = 
            place.types?.includes('pet_store') || 
            (place.name?.toLowerCase().includes('cat') || place.name?.toLowerCase().includes('animal'));
            
          // Determine if it's likely a no-kill shelter
          const noKill = place.name?.toLowerCase().includes('humane') || place.name?.toLowerCase().includes('no-kill');
          
          return {
            id: place.place_id || `place-${Math.random().toString(36).substring(2, 11)}`,
            name: place.name || 'Unknown Place',
            address: place.vicinity || 'Address unavailable',
            distance: parseFloat(distance.toFixed(1)),
            rating: place.rating,
            isOpen: place.opening_hours?.isOpen() || false,
            location: {
              lat: place.geometry?.location.lat() || 0,
              lng: place.geometry?.location.lng() || 0
            },
            acceptsCats,
            noKill
          };
        });
        
        // Sort by distance
        const sortedShelters = sheltersData.sort((a, b) => a.distance - b.distance);
        
        setShelters(sortedShelters);
        setLastFetchedLocation(location);
        
        if (sortedShelters.length === 0) {
          toast.info("No shelters found nearby. Try a different location or increasing the search radius.");
        }
        
      } else {
        // Google Maps not loaded, use mock data as fallback
        console.log('Google Maps not loaded, using mock data');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Load mock data
        const mockData = [...MOCK_SHELTERS];
        
        // Calculate distances (in a real app this would come from the API)
        const sheltersWithDistance = mockData.map(shelter => {
          // Basic distance calculation
          const latDiff = shelter.location.lat - location.lat;
          const lngDiff = shelter.location.lng - location.lng;
          const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111; // rough km calculation
          
          return {
            ...shelter,
            distance: parseFloat(distance.toFixed(1))
          };
        });
        
        // Sort by distance
        const sortedShelters = sheltersWithDistance.sort((a, b) => a.distance - b.distance);
        
        setShelters(sortedShelters);
        setLastFetchedLocation(location);
      }
    } catch (err) {
      console.error('Error fetching shelters:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch shelters'));
      toast.error('Failed to load shelters. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Cache results in localStorage when we have them
  useEffect(() => {
    if (shelters.length > 0 && lastFetchedLocation) {
      try {
        localStorage.setItem('cachedShelters', JSON.stringify(shelters));
        localStorage.setItem('cachedShelterLocation', JSON.stringify(lastFetchedLocation));
        localStorage.setItem('sheltersCacheTime', Date.now().toString());
      } catch (err) {
        console.error('Error caching shelter data:', err);
      }
    }
  }, [shelters, lastFetchedLocation]);

  // Try to load cached results on first load
  useEffect(() => {
    try {
      const cachedSheltersString = localStorage.getItem('cachedShelters');
      const cachedLocationString = localStorage.getItem('cachedShelterLocation');
      const cacheTimeString = localStorage.getItem('sheltersCacheTime');
      
      if (cachedSheltersString && cachedLocationString && cacheTimeString) {
        const cacheTime = parseInt(cacheTimeString, 10);
        const cachedShelters = JSON.parse(cachedSheltersString) as Shelter[];
        const cachedLocation = JSON.parse(cachedLocationString) as Location;
        
        // Only use cache if it's less than 1 hour old
        const ONE_HOUR = 60 * 60 * 1000;
        if (Date.now() - cacheTime < ONE_HOUR) {
          setShelters(cachedShelters);
          setLastFetchedLocation(cachedLocation);
        }
      }
    } catch (err) {
      console.error('Error loading cached shelter data:', err);
      // Clear potentially corrupt cache
      localStorage.removeItem('cachedShelters');
      localStorage.removeItem('cachedShelterLocation');
      localStorage.removeItem('sheltersCacheTime');
    }
  }, []);

  return {
    shelters,
    isLoading,
    error,
    fetchShelters
  };
}
