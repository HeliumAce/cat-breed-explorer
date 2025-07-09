# Task List: Supabase to Vercel Migration for Cat Breed Explorer

Based on PRD: `prd-supabase-to-vercel-migration.md`

## Relevant Files

- `api/google-maps-key.js` - Vercel API route to replace `get-google-maps-key` Supabase function ✅ CREATED
- `api/adoption-locations.js` - Vercel API route to replace `get-adoption-locations` Supabase function ✅ CREATED
- `src/hooks/useGoogleMapsAPI.ts` - Frontend hook that calls Google Maps API key endpoint
- `src/hooks/useAdoptionLocations.tsx` - Frontend hook that calls adoption locations endpoint
- `src/config/api-config.ts` - API configuration constants and base URLs
- `src/integrations/supabase/client.ts` - Supabase client (to be removed/updated)
- `supabase/functions/get-google-maps-key/index.ts` - Original Supabase function (reference for migration)
- `supabase/functions/get-adoption-locations/index.ts` - Original Supabase function (reference for migration)
- `.env.local` - Local development environment variables
- `.env.example` - Example environment variables file for documentation
- `vercel.json` - Vercel deployment configuration (optional)
- `package.json` - May need dependency updates for Vercel deployment

### Notes

- API routes in Vercel follow the `/api/*` convention and are automatically deployed as serverless functions
- Environment variables are configured in Vercel dashboard for production and `.env.local` for development
- Original Supabase function files serve as reference but will be removed after successful migration
- Use browser developer tools and network tab to verify API calls are working correctly

## Tasks

- [x] 1.0 Create Vercel API Routes to Replace Supabase Edge Functions
  - [x] 1.1 Analyze current `get-google-maps-key` Supabase function and extract core logic
  - [x] 1.2 Create `api/google-maps-key.js` with proper CORS headers and error handling
  - [x] 1.3 Analyze current `get-adoption-locations` Supabase function and extract core logic
  - [x] 1.4 Create `api/adoption-locations.js` with input validation and Google Places API integration
  - [x] 1.5 Test API routes locally using `vercel dev` command

- [ ] 2.0 Update Frontend Integration to Use New API Endpoints
  - [ ] 2.1 Update `src/config/api-config.ts` to include new Vercel API endpoints
  - [ ] 2.2 Modify `src/hooks/useGoogleMapsAPI.ts` to call `/api/google-maps-key` instead of Supabase function
  - [ ] 2.3 Modify `src/hooks/useAdoptionLocations.tsx` to call `/api/adoption-locations` instead of Supabase function
  - [ ] 2.4 Update error handling in hooks to match new API response format
  - [ ] 2.5 Test frontend integration locally to ensure all features work correctly

- [ ] 3.0 Implement Security Best Practices and Environment Configuration
  - [ ] 3.1 Create `.env.local` file with Google Maps API key for local development
  - [ ] 3.2 Create `.env.example` file documenting required environment variables
  - [ ] 3.3 Add rate limiting to API routes to prevent abuse
  - [ ] 3.4 Implement proper input validation and sanitization in API routes
  - [ ] 3.5 Add security headers (CORS, CSP, etc.) to API responses
  - [ ] 3.6 Verify no sensitive data is exposed in client-side code or error messages

- [ ] 4.0 Deploy to Vercel and Configure Production Environment
  - [ ] 4.1 Connect GitHub repository to Vercel account
  - [ ] 4.2 Configure production environment variables in Vercel dashboard
  - [ ] 4.3 Deploy application and verify deployment success
  - [ ] 4.4 Test production API endpoints and functionality
  - [ ] 4.5 Configure custom domain (optional) and SSL certificate
  - [ ] 4.6 Set up automatic deployments from main branch

- [ ] 5.0 Testing, Validation, and Cleanup
  - [ ] 5.1 Perform end-to-end testing of cat breed explorer functionality
  - [ ] 5.2 Test Google Maps integration and adoption locations feature
  - [ ] 5.3 Verify all API calls are using new Vercel endpoints
  - [ ] 5.4 Remove Supabase dependencies from `package.json`
  - [ ] 5.5 Delete or archive Supabase function files and configuration
  - [ ] 5.6 Update documentation with new deployment and maintenance instructions 