/**
 * Simple In-Memory Rate Limiter for Vercel API Routes
 * Tracks requests per IP address with configurable limits and time windows
 * 
 * Usage:
 * const rateLimiter = new RateLimiter(requestsPerMinute);
 * const isAllowed = rateLimiter.checkLimit(clientIP);
 */

class RateLimiter {
  constructor(requestsPerMinute = 60) {
    this.requestsPerMinute = requestsPerMinute;
    this.requests = new Map(); // IP -> array of timestamps
    this.cleanupInterval = 60000; // Clean up every 60 seconds
    this.lastCleanup = Date.now();
  }

  /**
   * Check if a request from the given IP is allowed
   * @param {string} ip - Client IP address
   * @returns {Object} { allowed: boolean, remaining: number, resetTime: number }
   */
  checkLimit(ip) {
    const now = Date.now();
    const windowMs = 60000; // 1 minute window
    const windowStart = now - windowMs;

    // Clean up old entries periodically to prevent memory leaks
    if (now - this.lastCleanup > this.cleanupInterval) {
      this.cleanup(windowStart);
      this.lastCleanup = now;
    }

    // Get existing requests for this IP
    const ipRequests = this.requests.get(ip) || [];
    
    // Filter to only requests within the current window
    const recentRequests = ipRequests.filter(timestamp => timestamp > windowStart);
    
    // Check if under the limit
    const allowed = recentRequests.length < this.requestsPerMinute;
    
    if (allowed) {
      // Add this request timestamp
      recentRequests.push(now);
      this.requests.set(ip, recentRequests);
    }

    return {
      allowed,
      remaining: Math.max(0, this.requestsPerMinute - recentRequests.length - (allowed ? 0 : 1)),
      resetTime: Math.ceil((Math.min(...recentRequests) + windowMs) / 1000), // Unix timestamp
      limit: this.requestsPerMinute
    };
  }

  /**
   * Clean up old entries to prevent memory leaks
   * @param {number} cutoffTime - Remove entries older than this timestamp
   */
  cleanup(cutoffTime) {
    for (const [ip, timestamps] of this.requests.entries()) {
      const recentTimestamps = timestamps.filter(timestamp => timestamp > cutoffTime);
      if (recentTimestamps.length === 0) {
        this.requests.delete(ip);
      } else {
        this.requests.set(ip, recentTimestamps);
      }
    }
  }
}

/**
 * Extract client IP from Vercel request object
 * @param {Object} request - Vercel request object
 * @returns {string} Client IP address
 */
function getClientIP(request) {
  // Vercel provides the real IP in x-forwarded-for header
  const forwarded = request.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  // Fallback to other possible headers
  return request.headers['x-real-ip'] || 
         request.headers['cf-connecting-ip'] || 
         request.connection?.remoteAddress || 
         'unknown';
}

/**
 * Create rate limit response with proper headers
 * @param {Object} response - Vercel response object
 * @param {Object} limitInfo - Rate limit information
 * @returns {Object} Response with rate limit headers
 */
function createRateLimitResponse(response, limitInfo) {
  return response
    .setHeader('X-RateLimit-Limit', limitInfo.limit.toString())
    .setHeader('X-RateLimit-Remaining', limitInfo.remaining.toString())
    .setHeader('X-RateLimit-Reset', limitInfo.resetTime.toString())
    .setHeader('Retry-After', '60'); // Try again in 60 seconds
}

/**
 * Secure CORS Configuration for Enterprise Compliance
 * Restricts access to authorized domains only
 * Automatically handles Vercel preview deployments
 * @param {Object} request - Vercel request object
 * @returns {Object} Secure CORS headers
 */
function getSecureCorsHeaders(request) {
  // Production domains (always allowed)
  const allowedOrigins = [
    'https://www.catbreedexplorer.com',
    'https://catbreedexplorer.com'
  ];

  // Automatically add Vercel deployment URLs based on environment
  if (process.env.VERCEL_URL) {
    // Current deployment URL (works for all Vercel deployments)
    allowedOrigins.push(`https://${process.env.VERCEL_URL}`);
  }

  // Add project-specific Vercel domains
  const vercelProjectDomains = [
    'https://cat-breed-explorer.vercel.app', // Production Vercel domain
    'https://cat-breed-explorer-liams-projects-bf976fe6.vercel.app' // Your specific domain from screenshot
  ];
  allowedOrigins.push(...vercelProjectDomains);

  // Development and preview environments
  if (process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview') {
    // Local development
    allowedOrigins.push(
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173'
    );
  }

  // For preview deployments, also allow any Vercel preview URL pattern
  if (process.env.VERCEL_ENV === 'preview') {
    const origin = request.headers.origin;
    // Allow any cat-breed-explorer Vercel domain (preview deployments)
    if (origin && origin.includes('cat-breed-explorer') && origin.includes('vercel.app')) {
      allowedOrigins.push(origin);
    }
  }

  const origin = request.headers.origin;
  const isAllowedOrigin = allowedOrigins.includes(origin);
  
  // Special handling for Vercel preview deployments
  const isVercelPreview = origin && 
    origin.includes('cat-breed-explorer') && 
    origin.includes('vercel.app') && 
    (process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development');
  
  // Use the requesting origin if allowed or if it's a valid Vercel preview
  const allowedOrigin = (isAllowedOrigin || isVercelPreview) ? origin : allowedOrigins[0];

  // Debug CORS in development/preview environments
  debugCors(origin, allowedOrigin, allowedOrigins);

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-client-info, apikey',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400', // 24 hours cache for preflight
    'Vary': 'Origin', // Important for caching
    // Additional security headers for enterprise compliance
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };
}

/**
 * Debug CORS configuration (only in development/preview)
 * @param {string} origin - Request origin
 * @param {string} allowedOrigin - Resolved allowed origin
 * @param {Array} allowedOrigins - All allowed origins
 */
function debugCors(origin, allowedOrigin, allowedOrigins) {
  if (process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview') {
    console.log('🔍 CORS Debug:', {
      requestOrigin: origin,
      resolvedOrigin: allowedOrigin,
      vercelEnv: process.env.VERCEL_ENV,
      vercelUrl: process.env.VERCEL_URL,
      allowedOrigins: allowedOrigins.slice(0, 5) // Show first 5 to avoid log spam
    });
  }
}

/**
 * Apply secure CORS headers to response
 * @param {Object} response - Vercel response object
 * @param {Object} corsHeaders - CORS headers object
 * @returns {Object} Response with headers applied
 */
function applyCorsHeaders(response, corsHeaders) {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.setHeader(key, value);
  });
  return response;
}

export {
  RateLimiter,
  getClientIP,
  createRateLimitResponse,
  getSecureCorsHeaders,
  applyCorsHeaders,
  debugCors
}; 