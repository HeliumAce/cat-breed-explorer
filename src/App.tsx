
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Index from "@/pages/Index";
import BreedDetail from "@/pages/BreedDetail";
import AdoptionLocations from "@/pages/AdoptionLocations";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/sonner";
import { QuizProvider } from "@/providers/QuizProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <QuizProvider>
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/breeds/:breedId" element={<BreedDetail />} />
              <Route path="/adopt" element={<AdoptionLocations />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Toaster />
        </QuizProvider>
      </Router>
      <Analytics />
      <SpeedInsights />
    </QueryClientProvider>
  );
}

export default App;
