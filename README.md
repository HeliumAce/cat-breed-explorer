
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

- **Node.js** (v18.0.0 or later)
- **npm** or yarn package manager
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
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file (not .env.local - vercel dev reads .env)
   echo "GOOGLE_MAPS_API_KEY=your_api_key_here" > .env
   ```

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

- `vercel dev` - Start local development server with API routes (recommended)
- `npm run dev` - Start frontend-only development server  
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

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

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **[The Cat API](https://thecatapi.com/)** for providing comprehensive cat breed data
- **[Vercel](https://vercel.com/)** for free serverless hosting and deployment
- **[Google Maps Platform](https://developers.google.com/maps)** for mapping and location services
- **[shadcn/ui](https://ui.shadcn.com/)** for beautiful, accessible React components
- Cat enthusiasts everywhere for the inspiration
