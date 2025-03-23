
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { corsHeaders } from "./utils/cors.ts";
import { AdoptionLocationsResponse } from "./types.ts";
import { LocationSearchParams, handleLocationSearch } from "./controllers/locationController.ts";
import { validateRequestParams } from "./utils/validators.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const params = await req.json();
    
    // Validate required parameters
    const validationError = validateRequestParams(params);
    if (validationError) {
      return new Response(
        JSON.stringify({ error: validationError }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Process the location search request
    const searchParams: LocationSearchParams = {
      lat: params.lat,
      lng: params.lng,
      radius: params.radius || 8000,
      type: params.type,
      minLocations: params.minLocations || 5
    };

    const result = await handleLocationSearch(searchParams);
    
    return new Response(
      JSON.stringify(result),
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
