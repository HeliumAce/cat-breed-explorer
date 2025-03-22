
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { SearchBar } from "@/components/SearchBar";
import { BreedCard } from "@/components/BreedCard";
import { Loading, LoadingInline } from "@/components/Loading";
import { useBreeds } from "@/hooks/useBreeds";
import { Cat, PawPrint } from "lucide-react";
import { QuizButton } from "@/components/quiz/QuizButton";
import { AdoptButton } from "@/components/AdoptButton";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { breeds, isLoading, error } = useBreeds(searchTerm);
  const [loadingInitial, setLoadingInitial] = useState(true);

  // Simulate initial loading for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingInitial(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loadingInitial) {
    return <Loading />;
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white cat-paw-grid">
        <header className="relative overflow-hidden pt-16 pb-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center relative z-10"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center"
            >
              <div className="rounded-full bg-amber-100 p-3 mb-4">
                <Cat className="h-8 w-8 text-amber-600" />
              </div>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-4"
            >
              Cat Breed Explorer
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="max-w-md mx-auto text-lg text-muted-foreground mb-6"
            >
              Discover the perfect feline companion and learn how to bond with them.
            </motion.p>
            
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <QuizButton />
              <AdoptButton />
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-2"
          >
            <SearchBar onSearch={setSearchTerm} />
          </motion.div>
          
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-72 h-72 bg-amber-300 rounded-full opacity-10 blur-3xl" />
          <div className="absolute top-1/3 right-0 translate-x-1/2 w-96 h-96 bg-amber-200 rounded-full opacity-10 blur-3xl" />
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {isLoading && <LoadingInline />}
          
          {error && (
            <div className="text-center p-8">
              <p className="text-destructive">Failed to load cat breeds. Please try again later.</p>
            </div>
          )}
          
          {!isLoading && breeds.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <PawPrint className="h-12 w-12 text-muted mb-4" />
              <h3 className="text-lg font-medium text-foreground">No breeds found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your search</p>
            </div>
          )}
          
          {!isLoading && breeds.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-foreground">
                  {searchTerm ? `Results for "${searchTerm}"` : "All Breeds"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {breeds.length} {breeds.length === 1 ? "breed" : "breeds"}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {breeds.map((breed, index) => (
                  <BreedCard key={breed.id} breed={breed} index={index} />
                ))}
              </div>
            </>
          )}
        </main>
        
        <footer className="bg-white border-t border-amber-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-muted-foreground">
              Data provided by <a href="https://thecatapi.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 underline">TheCatAPI</a>
            </p>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Index;
