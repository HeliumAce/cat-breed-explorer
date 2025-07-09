/**
 * Vercel API Route: Adoption Locations Search
 * Replaces Supabase Edge Function: get-adoption-locations
 * 
 * Functionality: Multi-category search for pet adoption locations using Google Places API
 * Security: API key proxy with input validation and sanitized logging
 * Response Format: Maintains identical format for frontend compatibility
 */

export default async function handler(request, response) {
  // CORS headers - identical to Supabase function
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return response.status(200)
                   .setHeader('Access-Control-Allow-Origin', '*')
                   .setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type')
                   .end();
  }

  // Only allow POST requests for this endpoint
  if (request.method !== 'POST') {
    return response.status(405)
                   .setHeader('Access-Control-Allow-Origin', '*')
                   .setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type')
                   .setHeader('Content-Type', 'application/json')
                   .json({ error: 'Method not allowed. Use POST.', locations: [] });
  }

  try {
    // Parse request body with error handling for malformed JSON
    let requestBody;
    try {
      requestBody = request.body;
    } catch (error) {
      return response.status(400)
                     .setHeader('Access-Control-Allow-Origin', '*')
                     .setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type')
                     .setHeader('Content-Type', 'application/json')
                     .json({ error: 'Invalid JSON in request body', locations: [] });
    }

    const { lat, lng, radius = 8000, type } = requestBody;
    
    console.log("Request body:", requestBody);
    
    // Input validation
    if (!lat || !lng) {
      return response.status(400)
                     .setHeader('Access-Control-Allow-Origin', '*')
                     .setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type')
                     .setHeader('Content-Type', 'application/json')
                     .json({ error: 'Latitude and longitude are required', locations: [] });
    }

    // Validate API key
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    if (!GOOGLE_MAPS_API_KEY) {
      console.error('No Google Maps API key found in environment variables');
      return response.status(500)
                     .setHeader('Access-Control-Allow-Origin', '*')
                     .setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type')
                     .setHeader('Content-Type', 'application/json')
                     .json({ error: 'Google Maps API key is not configured', locations: [] });
    }

    // Log the request parameters for debugging
    console.log(`Fetching adoption locations near ${lat},${lng} with radius ${radius}m, type ${type || 'all'}`);

    // Search for adoption locations
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
        const placesUrl = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
        placesUrl.searchParams.append('location', `${lat},${lng}`);
        placesUrl.searchParams.append('radius', radius.toString());
        placesUrl.searchParams.append('key', GOOGLE_MAPS_API_KEY);
        placesUrl.searchParams.append('keyword', locationType.keywords);

        console.log(`Requesting ${locationType.type} locations: ${placesUrl.toString().replace(GOOGLE_MAPS_API_KEY, 'API_KEY_REDACTED')}`);
        
        const apiResponse = await fetch(placesUrl.toString());
        if (!apiResponse.ok) {
          throw new Error(`Google Places API responded with status: ${apiResponse.status}`);
        }
        
        const data = await apiResponse.json();
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
      return response.status(500)
                     .setHeader('Access-Control-Allow-Origin', '*')
                     .setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type')
                     .setHeader('Content-Type', 'application/json')
                     .json({ 
                       error: 'Failed to fetch adoption locations from Google Places API. ' + error.message,
                       locations: [] 
                     });
    }

    // If no locations were found
    if (locations.length === 0) {
      return response.status(200)
                     .setHeader('Access-Control-Allow-Origin', '*')
                     .setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type')
                     .setHeader('Content-Type', 'application/json')
                     .json({ 
                       message: 'No adoption locations found in your area. Try expanding your search radius or changing filters.',
                       locations: [] 
                     });
    }

    // Sort by distance
    locations = locations.sort((a, b) => a.distance - b.distance);
    
    // Return only the first 20 locations (increased from 5 to ensure more markers)
    const nearestLocations = locations.slice(0, 20);

    return response.status(200)
                   .setHeader('Access-Control-Allow-Origin', '*')
                   .setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type')
                   .setHeader('Content-Type', 'application/json')
                   .json({ locations: nearestLocations });

  } catch (error) {
    console.error('Error in get-adoption-locations edge function:', error);
    return response.status(500)
                   .setHeader('Access-Control-Allow-Origin', '*')
                   .setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type')
                   .setHeader('Content-Type', 'application/json')
                   .json({ 
                     error: 'An unexpected error occurred while fetching adoption locations: ' + error.message, 
                     locations: [] 
                   });
  }
}

/**
 * Helper function to calculate distance between two coordinates in kilometers
 * Uses the Haversine formula for accurate distance calculation
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
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

/**
 * Helper function to convert degrees to radians
 */
function deg2rad(deg) {
  return deg * (Math.PI/180);
} 