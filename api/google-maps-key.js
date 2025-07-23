/**
 * Vercel API Route: Google Maps API Key Proxy
 * Replaces Supabase Edge Function: get-google-maps-key
 * 
 * Security: Returns Google Maps API key securely without exposing it in client-side code
 * Rate Limiting: 60 requests per minute per IP address
 * Response Format: Maintains identical format for frontend compatibility
 * CORS Security: Enterprise-grade origin restrictions and security headers
 */

import { RateLimiter, getClientIP, createRateLimitResponse, getSecureCorsHeaders, applyCorsHeaders } from './rate-limiter.js';

// Create rate limiter instance: 60 requests per minute for API key endpoint
const rateLimiter = new RateLimiter(60);

export default function handler(request, response) {
  // ✅ SECURE CORS CONFIGURATION - Enterprise compliant
  const corsHeaders = getSecureCorsHeaders(request);
  
  // Apply CORS headers to response
  applyCorsHeaders(response, corsHeaders);

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Only allow GET requests for this endpoint (enhanced security)
  if (request.method !== 'GET') {
    return response.status(405).json({ 
      error: 'Method not allowed. Use GET.',
      allowedMethods: ['GET', 'OPTIONS']
    });
  }

  // Rate limiting check
  const clientIP = getClientIP(request);
  const rateLimitResult = rateLimiter.checkLimit(clientIP);
  
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(response, rateLimitResult)
      .status(429)
      .json({ 
        error: 'Rate limit exceeded. Please try again later.',
        retryAfter: 60
      });
  }

  try {
    // Get API key from environment variables
    const CLIENT_GOOGLE_MAPS_API_KEY = process.env.CLIENT_GOOGLE_MAPS_API_KEY;
    
    // Validate API key exists
    if (!CLIENT_GOOGLE_MAPS_API_KEY) {
      console.error("CLIENT_GOOGLE_MAPS_API_KEY is not set in environment variables");
      return response.status(500).json({ 
        error: 'Google Maps client API key is not configured. Please set CLIENT_GOOGLE_MAPS_API_KEY in your environment.' 
      });
    }

    // Return success response with rate limit headers
    return createRateLimitResponse(response, rateLimitResult)
                   .status(200)
                   .json({ apiKey: CLIENT_GOOGLE_MAPS_API_KEY });

  } catch (error) {
    // Log error securely (no sensitive data)
    console.error("Error returning Google Maps API key:", error.message);
    
    // Return sanitized error response
    return response.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
} 