
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
    const { lat, lng, radius = 8000, type, minLocations = 5 } = await req.json();
    
    if (!lat || !lng) {
      return new Response(
        JSON.stringify({ error: 'Latitude and longitude are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log the request parameters for debugging
    console.log(`Fetching adoption locations near ${lat},${lng} with radius ${radius}m, type ${type || 'all'}, minLocations ${minLocations}`);

    // Generate location type-specific fallback data with more diverse options
    const fallbackLocations = [
      // Shelters - more of them
      {
        id: "fallback-shelter-1",
        name: "Happy Paws Animal Shelter",
        type: "shelter",
        address: "123 Main Street, Anytown",
        location: { lat: lat + 0.01, lng: lng + 0.01 },
        distance: 1.2,
        open: true,
        phone: "555-123-4567",
        rating: 4.8
      },
      {
        id: "fallback-shelter-2",
        name: "Second Chance Cat Rescue",
        type: "shelter",
        address: "321 Oak Avenue, Parkside",
        location: { lat: lat - 0.02, lng: lng + 0.02 },
        distance: 2.8,
        open: true,
        phone: "555-456-7890",
        rating: 4.9
      },
      {
        id: "fallback-shelter-3",
        name: "Feline Friends Rescue",
        type: "shelter",
        address: "159 Cedar Lane, Northend",
        location: { lat: lat + 0.015, lng: lng - 0.025 },
        distance: 2.5,
        open: true,
        phone: "555-789-0123",
        rating: 4.5
      },
      {
        id: "fallback-shelter-4",
        name: "Whiskers Rescue Center",
        type: "shelter",
        address: "567 Pine Street, Eastside",
        location: { lat: lat - 0.03, lng: lng + 0.035 },
        distance: 3.3,
        open: true,
        phone: "555-234-5678",
        rating: 4.7
      },
      // Humane societies - more of them
      {
        id: "fallback-humane-1",
        name: "Coastal Humane Society",
        type: "humane",
        address: "456 Ocean Drive, Seaside",
        location: { lat: lat - 0.01, lng: lng - 0.02 },
        distance: 2.3,
        open: true,
        phone: "555-234-5678",
        rating: 4.6
      },
      {
        id: "fallback-humane-2",
        name: "Valley Humane Society",
        type: "humane",
        address: "654 Mountain Road, Hillcrest",
        location: { lat: lat + 0.03, lng: lng + 0.03 },
        distance: 3.4,
        open: true,
        phone: "555-567-8901",
        rating: 4.7
      },
      {
        id: "fallback-humane-3",
        name: "Metropolitan SPCA",
        type: "humane",
        address: "789 Broadway, Downtown",
        location: { lat: lat + 0.02, lng: lng - 0.03 },
        distance: 2.7,
        open: true,
        phone: "555-111-2222",
        rating: 4.8
      },
      // Pet stores
      {
        id: "fallback-store-1",
        name: "Pawsome Pet Supplies",
        type: "store",
        address: "789 Market Street, Downtown",
        location: { lat: lat + 0.02, lng: lng - 0.01 },
        distance: 1.9,
        open: false,
        phone: "555-345-6789",
        rating: 4.2
      },
      {
        id: "fallback-store-2",
        name: "Cat Corner Pet Shop",
        type: "store",
        address: "987 Pine Street, Westside",
        location: { lat: lat - 0.03, lng: lng - 0.03 },
        distance: 3.8,
        open: false,
        phone: "555-678-9012",
        rating: 4.0
      },
      {
        id: "fallback-store-3",
        name: "Meow & More Supplies",
        type: "store",
        address: "753 Elm Street, Eastside",
        location: { lat: lat - 0.025, lng: lng + 0.015 },
        distance: 2.9,
        open: true,
        phone: "555-890-1234",
        rating: 4.1
      }
    ];

    // Try to get locations from Google Places API for different types
    let locations = [];
    try {
      // Define search keywords for different location types
      const locationTypes = [];
      if (type === 'shelter' || type === 'all') {
        locationTypes.push({
          type: 'shelter',
          keywords: 'animal shelter cat rescue'
        });
      }
      if (type === 'humane' || type === 'all') {
        locationTypes.push({
          type: 'humane',
          keywords: 'humane society spca aspca cat'
        });
      }
      if (type === 'store' || type === 'all') {
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
      console.log('Using fallback locations data');
    }

    // If we don't have enough locations from the API, use fallback data to supplement
    if (locations.length < minLocations) {
      console.log(`API returned only ${locations.length} locations, less than required ${minLocations}. Adding fallback data.`);
      
      // Start with the existing API results
      const finalLocations = [...locations];
      
      // Filter fallback locations by type if required
      let filteredFallbacks = fallbackLocations;
      if (type !== 'all' && type !== undefined) {
        filteredFallbacks = fallbackLocations.filter(location => location.type === type);
      }
      
      // Remove any fallbacks that have the same name as an API result to avoid duplicates
      const existingNames = new Set(locations.map(location => location.name.toLowerCase()));
      filteredFallbacks = filteredFallbacks.filter(
        location => !existingNames.has(location.name.toLowerCase())
      );
      
      // Add fallbacks until we reach the minimum or run out of fallbacks
      let i = 0;
      while (finalLocations.length < minLocations && i < filteredFallbacks.length) {
        finalLocations.push(filteredFallbacks[i]);
        i++;
      }
      
      // Use these as our final location set
      locations = finalLocations;
    }

    // Sort by distance
    locations = locations.sort((a, b) => a.distance - b.distance);
    
    // Return at least minLocations, but no more than 10 to avoid overwhelming the UI
    const limitedLocations = locations.slice(0, Math.max(minLocations, 10));

    return new Response(
      JSON.stringify({ locations: limitedLocations }),
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
