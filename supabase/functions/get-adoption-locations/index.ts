
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
    const { lat, lng, radius = 5000, type } = await req.json();
    
    if (!lat || !lng) {
      return new Response(
        JSON.stringify({ error: 'Latitude and longitude are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log the request parameters for debugging
    console.log(`Fetching adoption locations near ${lat},${lng} with radius ${radius}m and type ${type || 'all'}`);

    // Build the Places API URL based on location type
    let placesUrl = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
    placesUrl.searchParams.append('location', `${lat},${lng}`);
    placesUrl.searchParams.append('radius', radius.toString());
    placesUrl.searchParams.append('key', GOOGLE_MAPS_API_KEY);
    
    // Add specific keywords based on the requested type
    if (type === 'shelter') {
      placesUrl.searchParams.append('keyword', 'animal shelter cat');
    } else if (type === 'humane') {
      placesUrl.searchParams.append('keyword', 'humane society cat');
    } else if (type === 'store') {
      placesUrl.searchParams.append('keyword', 'pet store cat');
    } else {
      // If no specific type, search for all related places
      placesUrl.searchParams.append('keyword', 'animal shelter humane society pet store cat adoption');
    }

    console.log(`Requesting: ${placesUrl.toString().replace(GOOGLE_MAPS_API_KEY, 'API_KEY_REDACTED')}`);
    
    const response = await fetch(placesUrl.toString());
    if (!response.ok) {
      throw new Error(`Google Places API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Found ${data.results?.length || 0} places, status: ${data.status}`);
    
    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      throw new Error(`Google Places API returned status: ${data.status}`);
    }
    
    // Transform the Google Places results to our AdoptionLocation format
    const locations = (data.results || []).map(place => {
      // Determine the location type based on name and types
      let locationType = 'store';
      const name = place.name.toLowerCase();
      
      if (name.includes('shelter') || name.includes('rescue') || place.types.includes('pet_store')) {
        locationType = 'shelter';
      } else if (name.includes('humane') || name.includes('spca')) {
        locationType = 'humane';
      }
      
      return {
        id: place.place_id,
        name: place.name,
        type: locationType,
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

    return new Response(
      JSON.stringify({ locations }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching adoption locations:', error);
    return new Response(
      JSON.stringify({ error: error.message, locations: [] }),
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
