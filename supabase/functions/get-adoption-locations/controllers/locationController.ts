
import { Location, LocationType, AdoptionLocationsResponse } from "../types.ts";
import { searchLocationsByType } from "../providers/googlePlacesProvider.ts";
import { getFallbackLocations } from "../providers/fallbackProvider.ts";

export interface LocationSearchParams {
  lat: number;
  lng: number;
  radius: number;
  type?: LocationType | 'all';
  minLocations: number;
}

export async function handleLocationSearch(params: LocationSearchParams): Promise<AdoptionLocationsResponse> {
  const { lat, lng, radius, type, minLocations } = params;
  
  console.log(`Fetching adoption locations near ${lat},${lng} with radius ${radius}m, type ${type || 'all'}, minLocations ${minLocations}`);
  
  // Determine which location types to search for
  const locationTypes: LocationType[] = [];
  if (type === 'shelter' || type === 'all') {
    locationTypes.push('shelter');
  }
  if (type === 'humane' || type === 'all') {
    locationTypes.push('humane');
  }
  if (type === 'store' || type === 'all') {
    locationTypes.push('store');
  }

  // Search for each location type and collect results
  let allLocations: Location[] = [];
  
  try {
    // Search Google Places API for each location type
    for (const locationType of locationTypes) {
      const typeLocations = await searchLocationsByType(lat, lng, radius, locationType);
      allLocations = [...allLocations, ...typeLocations];
    }
  } catch (error) {
    console.error('Error fetching from Google Places API:', error);
    console.log('Using fallback locations data');
  }

  // If we don't have enough locations from the API, use fallback data to supplement
  if (allLocations.length < minLocations) {
    console.log(`API returned only ${allLocations.length} locations, less than required ${minLocations}. Adding fallback data.`);
    
    // Filter fallback locations by type if required
    let fallbackLocations = getFallbackLocations(lat, lng, type !== 'all' ? type as LocationType : undefined);
    
    // Remove any fallbacks that have the same name as an API result to avoid duplicates
    const existingNames = new Set(allLocations.map(location => location.name.toLowerCase()));
    fallbackLocations = fallbackLocations.filter(
      location => !existingNames.has(location.name.toLowerCase())
    );
    
    // Add fallbacks until we reach the minimum or run out of fallbacks
    let i = 0;
    while (allLocations.length < minLocations && i < fallbackLocations.length) {
      allLocations.push(fallbackLocations[i]);
      i++;
    }
  }

  // Sort by distance
  allLocations = allLocations.sort((a, b) => a.distance - b.distance);
  
  // Return at least minLocations, but no more than 10 to avoid overwhelming the UI
  const limitedLocations = allLocations.slice(0, Math.max(minLocations, 10));

  return { locations: limitedLocations };
}
