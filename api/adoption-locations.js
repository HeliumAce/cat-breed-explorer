/**
 * Functionality: Multi-category search for pet adoption locations using Google Places API
 * Security: API key proxy with input validation and sanitized logging
 * Rate Limiting: 20 requests per minute per IP address (conservative due to external API calls)
 * Response Format: Maintains identical format for frontend compatibility
 * CORS Security: Enterprise-grade origin restrictions and security headers
 */

import { RateLimiter, getClientIP, createRateLimitResponse, getSecureCorsHeaders, applyCorsHeaders } from './rate-limiter.js';

// Create rate limiter instance: 20 requests per minute for resource-intensive endpoint
const rateLimiter = new RateLimiter(20);

export default async function handler(request, response) {
  // ✅ SECURE CORS CONFIGURATION - Enterprise compliant
  const corsHeaders = getSecureCorsHeaders(request);
  
  // Apply CORS headers to response
  applyCorsHeaders(response, corsHeaders);

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Rate limiting check
  const clientIP = getClientIP(request);
  const rateLimitResult = rateLimiter.checkLimit(clientIP);
  
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(response, rateLimitResult)
      .status(429)
      .json({ 
        error: 'Rate limit exceeded. Please try again later.',
        retryAfter: 60,
        locations: []
      });
  }

  // Only allow POST requests for this endpoint
  if (request.method !== 'POST') {
    return response.status(405).json({ 
      error: 'Method not allowed. Use POST.',
      allowedMethods: ['POST', 'OPTIONS'],
      locations: [] 
    });
  }

  try {
    // Parse request body with error handling for malformed JSON
    let requestBody;
    try {
      requestBody = request.body;
    } catch (error) {
      return response.status(400).json({ 
        error: 'Invalid JSON in request body', 
        locations: [] 
      });
    }

    const { lat, lng, radius = 8000, type } = requestBody;
    
    // Enhanced input validation with security checks
    if (!lat || !lng || typeof lat !== 'number' || typeof lng !== 'number') {
      return response.status(400).json({ 
        error: 'Valid latitude and longitude numbers are required', 
        locations: [] 
      });
    }

    // Validate coordinate ranges to prevent injection attacks
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return response.status(400).json({ 
        error: 'Coordinates out of valid range', 
        locations: [] 
      });
    }

    // Validate radius to prevent abuse
    if (typeof radius !== 'number' || radius < 100 || radius > 50000) {
      return response.status(400).json({ 
        error: 'Radius must be a number between 100 and 50000 meters', 
        locations: [] 
      });
    }

    // Validate type parameter if provided
    const validTypes = ['shelter', 'humane', 'store'];
    if (type && !validTypes.includes(type)) {
      return response.status(400).json({ 
        error: 'Invalid location type. Must be one of: shelter, humane, store', 
        locations: [] 
      });
    }

    // Validate API key
    const SERVER_GOOGLE_MAPS_API_KEY = process.env.SERVER_GOOGLE_MAPS_API_KEY;
    if (!SERVER_GOOGLE_MAPS_API_KEY) {
      console.error('SERVER_GOOGLE_MAPS_API_KEY is not set in environment variables');
      return response.status(500).json({ 
        error: 'Google Maps server API key is not configured. Please set SERVER_GOOGLE_MAPS_API_KEY in your environment.', 
        locations: [] 
      });
    }

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
        placesUrl.searchParams.append('key', SERVER_GOOGLE_MAPS_API_KEY);
        placesUrl.searchParams.append('keyword', locationType.keywords);
        
        const apiResponse = await fetch(placesUrl.toString());
        if (!apiResponse.ok) {
          throw new Error(`Google Places API responded with status: ${apiResponse.status}`);
        }
        
        const data = await apiResponse.json();
        
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

      // Deduplicate locations by place_id, keeping the most relevant type
      const typePreference = { 'shelter': 1, 'humane': 2, 'store': 3 };
      const locationMap = new Map();
      
      for (const location of locations) {
        const existingLocation = locationMap.get(location.id);
        if (!existingLocation || typePreference[location.type] < typePreference[existingLocation.type]) {
          locationMap.set(location.id, location);
        }
      }
      
      locations = Array.from(locationMap.values());
      
    } catch (error) {
      console.error('Error fetching from Google Places API:', error);
      return response.status(500).json({ 
        error: 'Failed to fetch adoption locations. Please try again later.',
        locations: [] 
      });
    }

    // If no locations were found
    if (locations.length === 0) {
      return response.status(200).json({ 
        message: 'No adoption locations found in your area. Try expanding your search radius or changing filters.',
        locations: [] 
      });
    }

    // Sort by distance
    locations = locations.sort((a, b) => a.distance - b.distance);
    
    // Return only the first 20 locations (increased from 5 to ensure more markers)
    const nearestLocations = locations.slice(0, 20);

    return createRateLimitResponse(response, rateLimitResult)
                   .status(200)
                   .json({ locations: nearestLocations });

  } catch (error) {
    console.error('Error in get-adoption-locations edge function:', error);
    return response.status(500).json({ 
      error: 'An unexpected error occurred while fetching adoption locations.', 
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