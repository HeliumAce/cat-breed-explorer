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

export {
  RateLimiter,
  getClientIP,
  createRateLimitResponse
}; 