
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import BreedDetail from "@/pages/BreedDetail";
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Toaster />
        </QuizProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
