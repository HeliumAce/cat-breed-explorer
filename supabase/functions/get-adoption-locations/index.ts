
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const GOOGLE_MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    const { lat, lng, radius = 8000, type } = requestBody;
    
    console.log("Request body:", requestBody);
    
    if (!lat || !lng) {
      return new Response(
        JSON.stringify({ error: 'Latitude and longitude are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!GOOGLE_MAPS_API_KEY) {
      console.error('No Google Maps API key found in environment variables');
      return new Response(
        JSON.stringify({ error: 'Google Maps API key is not configured', locations: [] }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log the request parameters for debugging
    console.log(`Fetching adoption locations near ${lat},${lng} with radius ${radius}m, type ${type || 'all'}`);

    // Try to get locations from Google Places API for different types
    let locations = [];
    try {
      // Define search keywords for different location types
      const locationTypes = [];
      if (type === 'shelter' || type === undefined) {
        locationTypes.push({
          type: 'shelter',
          keywords: 'animal shelter cat rescue'
        });
      }
      if (type === 'humane' || type === undefined) {
        locationTypes.push({
          type: 'humane',
          keywords: 'humane society spca aspca cat'
        });
      }
      if (type === 'store' || type === undefined) {
        locationTypes.push({
          type: 'store',
          keywords: 'pet store cat adoption'
        });
      }

      // Search for each location type and combine results
      for (const locationType of locationTypes) {
        let placesUrl = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
        placesUrl.searchParams.append('location', `${lat},${lng}`);
        placesUrl.searchParams.append('radius', radius.toString());
        placesUrl.searchParams.append('key', GOOGLE_MAPS_API_KEY);
        placesUrl.searchParams.append('keyword', locationType.keywords);

        console.log(`Requesting ${locationType.type} locations: ${placesUrl.toString().replace(GOOGLE_MAPS_API_KEY, 'API_KEY_REDACTED')}`);
        
        const response = await fetch(placesUrl.toString());
        if (!response.ok) {
          throw new Error(`Google Places API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`Found ${data.results?.length || 0} ${locationType.type} places, status: ${data.status}`);
        
        if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
          console.warn(`Google Places API returned status: ${data.status} for ${locationType.type}`);
          continue;
        }
        
        // Transform the Google Places results to our AdoptionLocation format
        const typeResults = (data.results || []).map(place => {
          return {
            id: place.place_id,
            name: place.name,
            type: locationType.type, // Set the type based on our search
            address: place.vicinity,
            location: {
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng
            },
            distance: calculateDistance(lat, lng, place.geometry.location.lat, place.geometry.location.lng),
            open: place.opening_hours?.open_now,
            phone: place.formatted_phone_number || null,
            rating: place.rating || null,
            photos: place.photos?.map(photo => ({
              reference: photo.photo_reference,
              width: photo.width,
              height: photo.height
            })) || []
          };
        });
        
        locations = [...locations, ...typeResults];
      }
    } catch (error) {
      console.error('Error fetching from Google Places API:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to fetch adoption locations from Google Places API. ' + error.message,
          locations: [] 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If no locations were found
    if (locations.length === 0) {
      return new Response(
        JSON.stringify({ 
          message: 'No adoption locations found in your area. Try expanding your search radius or changing filters.',
          locations: [] 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sort by distance
    locations = locations.sort((a, b) => a.distance - b.distance);
    
    // Return only the 5 nearest locations
    const nearestLocations = locations.slice(0, 5);

    return new Response(
      JSON.stringify({ locations: nearestLocations }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in get-adoption-locations edge function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred while fetching adoption locations: ' + error.message, 
        locations: [] 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Helper function to calculate distance between two coordinates in kilometers
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function deg2rad(deg: number): number {
  return deg * (Math.PI/180);
}
