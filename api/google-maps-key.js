/**
 * Vercel API Route: Google Maps API Key Proxy
 * Replaces Supabase Edge Function: get-google-maps-key
 * 
 * Security: Returns Google Maps API key securely without exposing it in client-side code
 * Response Format: Maintains identical format for frontend compatibility
 */

export default function handler(request, response) {
  // CORS headers - identical to Supabase function
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return response.status(200).setHeader('Access-Control-Allow-Origin', '*')
                              .setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type')
                              .end();
  }

  try {
    // Get API key from environment variables
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    
    // Validate API key exists
    if (!GOOGLE_MAPS_API_KEY) {
      console.error("GOOGLE_MAPS_API_KEY is not set in environment variables");
      throw new Error("API key not configured");
    }

    // Return success response - identical format to Supabase function
    return response.status(200)
                   .setHeader('Access-Control-Allow-Origin', '*')
                   .setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type')
                   .setHeader('Content-Type', 'application/json')
                   .json({ apiKey: GOOGLE_MAPS_API_KEY });

  } catch (error) {
    // Log error securely (no sensitive data)
    console.error("Error returning Google Maps API key:", error.message);
    
    // Return error response - identical format to Supabase function
    return response.status(500)
                   .setHeader('Access-Control-Allow-Origin', '*')
                   .setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type')
                   .setHeader('Content-Type', 'application/json')
                   .json({ error: error.message });
  }
} 