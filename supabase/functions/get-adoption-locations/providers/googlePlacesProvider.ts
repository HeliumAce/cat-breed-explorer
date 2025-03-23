
import { calculateDistance } from "../utils/distance.ts";
import { Location, LocationType, GooglePlacesResponse, GooglePlacesResult } from "../types.ts";

const GOOGLE_MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY');

// Location type keywords for Google Places API
const LOCATION_TYPE_KEYWORDS = {
  'shelter': 'animal shelter cat rescue',
  'humane': 'humane society spca aspca cat',
  'store': 'pet store cat adoption'
};

export async function searchLocationsByType(
  userLat: number, 
  userLng: number, 
  radius: number, 
  locationType: LocationType
): Promise<Location[]> {
  try {
    const keywords = LOCATION_TYPE_KEYWORDS[locationType];
    const placesUrl = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
    placesUrl.searchParams.append('location', `${userLat},${userLng}`);
    placesUrl.searchParams.append('radius', radius.toString());
    placesUrl.searchParams.append('key', GOOGLE_MAPS_API_KEY || '');
    placesUrl.searchParams.append('keyword', keywords);

    console.log(`Requesting ${locationType} locations: ${placesUrl.toString().replace(GOOGLE_MAPS_API_KEY || '', 'API_KEY_REDACTED')}`);
    
    const response = await fetch(placesUrl.toString());
    if (!response.ok) {
      throw new Error(`Google Places API responded with status: ${response.status}`);
    }
    
    const data: GooglePlacesResponse = await response.json();
    console.log(`Found ${data.results?.length || 0} ${locationType} places, status: ${data.status}`);
    
    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.warn(`Google Places API returned status: ${data.status} for ${locationType}`);
      return [];
    }
    
    // Transform the Google Places results to our Location format
    return (data.results || []).map(place => transformPlaceToLocation(place, locationType, userLat, userLng));
  } catch (error) {
    console.error(`Error fetching ${locationType} locations from Google Places:`, error);
    return [];
  }
}

function transformPlaceToLocation(
  place: GooglePlacesResult, 
  locationType: LocationType, 
  userLat: number, 
  userLng: number
): Location {
  return {
    id: place.place_id,
    name: place.name,
    type: locationType,
    address: place.vicinity,
    location: {
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng
    },
    distance: calculateDistance(userLat, userLng, place.geometry.location.lat, place.geometry.location.lng),
    open: place.opening_hours?.open_now,
    phone: place.formatted_phone_number || null,
    rating: place.rating || null,
    photos: place.photos?.map(photo => ({
      reference: photo.photo_reference,
      width: photo.width,
      height: photo.height
    })) || []
  };
}
