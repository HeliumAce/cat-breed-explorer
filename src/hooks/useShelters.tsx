
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
      // In a production app, this would be an API call to Google Places API
      // For now, we'll simulate a fetch with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Load mock data
      const mockData = [...MOCK_SHELTERS];
      
      // Calculate distances (in a real app this would come from the API)
      const sheltersWithDistance = mockData.map(shelter => {
        // Basic distance calculation (this is just a simulation)
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
