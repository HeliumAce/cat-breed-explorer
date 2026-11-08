
# 😺 Cat Breed Explorer

![Cat Breed Explorer Banner](https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800)

An interactive web application that helps users discover cat breeds that match their lifestyle and preferences through a personalized quiz. Featuring adoption location mapping powered by Google Places API.

## 🚀 Features

- **Interactive Cat Breed Quiz**: Answer questions about your lifestyle, living space, and preferences to find your ideal feline companion
- **Comprehensive Breed Database**: Browse through detailed information on various cat breeds
- **Personalized Matching Algorithm**: Get breed recommendations tailored to your unique needs
- **Adoption Location Finder**: Interactive map showing nearby shelters, humane societies, and pet stores
- **Smart Location Search**: Finds adoption locations using Google Places API with intelligent filtering
- **Responsive Design**: Seamless experience across desktop and mobile devices
- **Rate-Limited API**: Built-in protection against abuse with proper HTTP headers

## 🛠️ Technologies Used

### Frontend
- **React**: Modern frontend library for building user interfaces
- **TypeScript**: Statically typed JavaScript for improved developer experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: High-quality React components built with Radix UI and Tailwind
- **Framer Motion**: Animation library for React
- **React Router**: For navigation and routing
- **React Query**: Data fetching and state management

### Backend & Infrastructure
- **Vercel**: Serverless deployment platform with automatic scaling
- **Vercel API Routes**: Serverless functions for secure API key management
- **Rate Limiting**: Custom in-memory rate limiting with cleanup
- **CORS Security**: Proper cross-origin resource sharing configuration

### External APIs
- **The Cat API**: Comprehensive cat breed information and images
- **Google Maps JavaScript API**: Interactive mapping and location services
- **Google Places API**: Location search and business information

## 🧠 Project Structure

```
cat-breed-explorer/
├── api/                      # Vercel API Routes (Serverless Functions)
│   ├── google-maps-key.js    # Secure Google Maps API key proxy
│   ├── adoption-locations.js # Google Places API integration
│   └── rate-limiter.js       # Shared rate limiting utilities
├── src/
│   ├── components/           # UI components
│   │   ├── adoption/         # Adoption location components
│   │   ├── quiz/             # Quiz-related components
│   │   └── ui/               # shadcn/ui components
│   ├── hooks/                # Custom React hooks
│   │   ├── useGoogleMapsAPI.ts     # Google Maps integration
│   │   ├── useAdoptionLocations.tsx # Adoption locations hook
│   │   └── useQuiz.tsx             # Quiz logic and state
│   ├── pages/                # Page components
│   ├── providers/            # Context providers
│   ├── services/             # API services
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Utility functions
├── public/                   # Static assets
└── DEPLOYMENT.md            # Comprehensive deployment guide
```

## 🏁 Getting Started

### Prerequisites

- **Node.js 24 LTS** (run `nvm use`; minimum supported version: 22.12.0)
- **npm** package manager; use the committed `package-lock.json`
- **Google Maps API Key** with Places API enabled
- **Vercel CLI** (for local development): `npm i -g vercel`

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cat-breed-explorer
   ```

2. **Install dependencies**
   ```bash
   nvm use
   npm ci
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file for local development
   echo "CLIENT_GOOGLE_MAPS_API_KEY=your_client_key_here" > .env
   echo "SERVER_GOOGLE_MAPS_API_KEY=your_server_key_here" >> .env
   echo "VITE_CAT_API_KEY=your_cat_api_key_here" >> .env
   ```
   
   **Note:** The CORS configuration automatically handles Vercel preview deployments using built-in environment variables. No manual domain updates needed for preview branches!

4. **Start the development server**
   ```bash
   # Use Vercel dev for local development (includes API routes)
   vercel dev
   
   # Or for frontend-only development
   npm run dev
   ```

5. **Open your browser**
   ```bash
   # Vercel dev typically runs on:
   http://localhost:3000
   
   # npm run dev typically runs on:
   http://localhost:5173
   ```

### 🚀 Production Deployment

For complete deployment instructions, see **[DEPLOYMENT.md](DEPLOYMENT.md)**

**Quick Deploy to Vercel:**
1. Push your code to GitHub
2. Connect repository to Vercel
3. Add `GOOGLE_MAPS_API_KEY` environment variable
4. Deploy automatically!

## 🎮 Using the Application

1. **Starting the Quiz**:
   - Click on the "Take the Quiz" button on the homepage
   - Answer each question based on your preferences
   - View your personalized breed matches

2. **Browsing Breeds**:
   - Explore all cat breeds from the homepage
   - Click on any breed card to view detailed information
   - Use the search functionality to find specific breeds

3. **Finding Adoption Locations**:
   - Click "Adopt a Cat" from any breed page
   - Allow location access or enter your address
   - Browse nearby shelters, humane societies, and pet stores
   - Filter by location type (All Locations, Shelters, Humane Societies, Pet Stores)
   - View locations on an interactive map

## 🔄 Quiz Logic

The quiz uses a sophisticated matching algorithm that:
- Assigns different weights to each question based on importance
- Calculates compatibility scores with each breed
- Considers factors like energy level, affection, grooming needs, etc.
- Presents breeds ordered by match percentage

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones

## 🧪 Development

### Available Scripts

- `npm test` - Run breed-data, image-availability, rating-display, quiz-matching, and lint-parser regression tests
- `npm run typecheck` - Check TypeScript types
- `npm audit` - Check production and development dependencies for known vulnerabilities
- `vercel dev` - Start local development server with API routes (recommended)
- `npm run dev` - Start frontend-only development server  
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Dependency security

Use Node 24 and `npm ci` locally and in deployments. npm's lockfile is the source of truth; the obsolete Bun lockfile has been removed.

The minimatch override is limited to `@typescript-eslint/typescript-estree`. Its current release still requests minimatch 10, which is affected by [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). Keep the override until typescript-eslint depends on minimatch 11.0.1 or later. The parser compatibility tests exercise its project-service glob matching.

### Breed ratings

TheCatAPI continues to supply breed information and images. `src/data/breed-ratings.ts` contains 106 local trait reviews for the 107-entry catalogue checked on November 7, 2026. After cross-referencing the curated content, source profiles and API labels, 86 entries have complete numerical ratings and 20 have partial or unavailable ratings. Each of the ten values is either an explicit 1–5 editorial estimate or `null` for insufficient evidence. Each entry records sources, rationales and its evidence basis. These are our assessments, not scores published or endorsed by the linked organisations. No additional data service is called at runtime. See the [trait consistency audit](docs/breed-traits-audit.md) for decisions and the complete cross-reference.

Kellas Cat (`kell`) has no pet ratings and is excluded from quiz recommendations, as agreed: the API identifies it as a wild-domestic hybrid rather than a domestic breed. Its catalogue visibility follows the same API-image rule as every other entry. The two Chausie IDs (`chau`, `chas`) share ratings and labels and occupy one quiz recommendation slot. Documented coat or colour variants share behavioural assessments; coat-care differences need their own rationale, and hair length alone does not establish shedding amount. Domestic coat-length categories, polydactyl cats and sparsely documented types have unavailable personality scores where a uniform temperament cannot be supported. A neutral three is not a substitute for missing evidence.

The list and detail service calls use `withLocalBreedTraits` to merge the same ratings and explicitly authored `temperamentLabels` by ID. Labels have a source, section and review summary alongside the numerical rationales. They are not generated from score thresholds or copied from the API temperament string, which sometimes contains grooming instructions or malformed data. Entries without supported labels omit the chips. Adaptability uses stars. The other nine traits use a Low–High bar: larger values mean more of the named trait, such as more grooming effort, more shedding, or a greater need for company. Unknown ratings show the existing unavailable state.

Catalogue visibility is driven by TheCatAPI image data. The shared breed service uses an embedded image URL or resolves `reference_image_id`; entries without a resolved image URL are excluded from the list and quiz. Failed reference lookups exclude only the affected entry until a later data refresh. There are no stock-photo substitutions or breed-specific image exclusions. Breeds automatically appear or disappear as their API image data changes on subsequent fetches, subject to the existing browser and server caches. Direct detail links still show breed information when no image is supplied, with the photo area omitted.

Quiz matching requires both a complete local trait review and a complete enriched input, plus an API image. It retains the Kellas exclusion and Chausie alias handling; upstream numbers cannot bypass an incomplete review. The November 7 API snapshot has 66 image-available entries, of which 64 are currently eligible for comparison. Results disclose the actual comparison count. Identical answers produce identical results; the match score is a weighted compatibility score, not a probability or a guarantee about an individual cat. New unknown API IDs remain unrated and unlabelled until researched and explicitly added. `tests/fixtures/breed-catalogue.json` records the checked ID/name inventory so tests can catch coverage gaps without network access; update that snapshot when reviewing catalogue changes.

### Curated breed content

`src/data/breed-content.ts` contains 97 authored profiles covering 98 catalogue IDs through the existing Chausie alias, reviewed on November 7, 2026. Aim for five authored fun facts and five bonding tips per breed, assessing the two sections independently. Select four or three when the sources do not support five distinct, useful items, and record the reason internally in `coverageNotes`. Do not split claims or repeat activities to meet the target. Each item has sources, and a review date covers the entry. Facts paraphrase the cited profiles; bonding tips are editorial activities informed by those profiles, rather than instructions endorsed by the sources. Source-section references support manual verification. The `relatedTraits` fields identify attributes to cross-reference in consistency reviews; no numerical ratings generate this copy. Suggesting an enrichment activity does not itself establish a high intelligence or energy score.

Eight researched IDs remain in `breedContentReviewGaps`: Burmoir, Caracat, Cyprus, Genetta, Malayan, Ojos Azules, Pantherette and Safari. Their internal review records explain identity ambiguity, insufficient independent evidence or specialist husbandry needs, with research links. Kellas retains its existing exclusion. These decisions account for the full 107-entry catalogue snapshot without treating every API label as a distinct, documented pet breed. Related-breed and mixed-population evidence is recorded explicitly; coat colour, hair length and extra toes do not establish separate personalities.

Detail pages display the available curated items with source links. Evidence gaps and unreviewed IDs, including new API breeds, retain their API overview and any supported trait values but omit unsupported content and labels. Partial entries show only their available content. Fixed sentence generators and generic padding have been removed. Content and trait records remain in separate files and are reviewed together.

When extending coverage, research each API ID, add its sources and authored items or an explicit evidence-gap record, record the review date, and review the associated ratings, labels and aliases together. Automated tests check complete snapshot review coverage, catalogue identity, source references, editorial metadata, label/score compatibility, variant behaviour, every curated detail page and alias, and missing or partial content. They do not establish factual accuracy. The initial content-versus-traits audit is complete; repeat it when evidence changes. Live catalogue-change detection remains follow-up work.

### Development Workflow

1. **Feature Development**:
   ```bash
   # Create feature branch
   git checkout -b feature/your-feature-name
   
   # Start development server with API routes
   vercel dev
   
   # Make your changes with hot-reload
   ```

2. **Testing API Routes**:
   ```bash
   # Test Google Maps API key endpoint
   curl http://localhost:3000/api/google-maps-key
   
   # Test adoption locations endpoint
   curl -X POST http://localhost:3000/api/adoption-locations \
        -H "Content-Type: application/json" \
        -d '{"lat":37.7749,"lng":-122.4194,"radius":5000}'
   ```

3. **Production Verification**:
   ```bash
   # Verify production build works
   npm run build
   
   # Push to GitHub (triggers automatic Vercel deployment)
   git push origin feature/your-feature-name
   ```

### Architecture Guidelines

- **API Routes**: Place new serverless functions in `/api/` directory
- **Rate Limiting**: Use shared rate limiter for any new API endpoints
- **Environment Variables**: Store sensitive data in Vercel dashboard
- **Error Handling**: Implement proper CORS and error responses
- **Security**: Never expose API keys in client-side code
- **CORS Security**: Automatic preview deployment handling - no manual domain updates needed
- **Enterprise Compliance**: All endpoints include security headers for corporate environments

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **[The Cat API](https://thecatapi.com/)** for providing comprehensive cat breed data
- **[Vercel](https://vercel.com/)** for free serverless hosting and deployment
- **[Google Maps Platform](https://developers.google.com/maps)** for mapping and location services
- **[shadcn/ui](https://ui.shadcn.com/)** for beautiful, accessible React components
- Cat enthusiasts everywhere for the inspiration
