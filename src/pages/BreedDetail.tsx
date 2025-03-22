
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { Loading } from "@/components/Loading";
import { useBreedDetail, generateFunFacts, generateBondingTips } from "@/hooks/useBreeds";
import { ArrowLeft, HeartIcon, InfoIcon, ZapIcon, Star, AlertCircle } from "lucide-react";

const BreedDetail = () => {
  const { breedId } = useParams<{ breedId: string }>();
  const navigate = useNavigate();
  const { breed, isLoading, error } = useBreedDetail(breedId || "");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [funFacts, setFunFacts] = useState<string[]>([]);
  const [bondingTips, setBondingTips] = useState<string[]>([]);
  
  useEffect(() => {
    if (breed) {
      setFunFacts(generateFunFacts(breed));
      setBondingTips(generateBondingTips(breed));
    }
  }, [breed]);
  
  if (isLoading) {
    return <Loading />;
  }
  
  if (error || !breed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Breed Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find the cat breed you're looking for.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full font-medium bg-amber-100 text-amber-900 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to All Breeds
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white cat-paw-grid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate("/")}
            className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-amber-700 focus-ring rounded-full px-3 py-1 -ml-3"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back to All Breeds
          </motion.button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center mb-2">
                  <div className="text-xs font-medium uppercase tracking-wider text-amber-700 bg-amber-100 rounded-full px-2.5 py-1">
                    {breed.origin}
                  </div>
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{breed.name}</h1>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  {breed.temperament.split(", ").map((trait) => (
                    <div 
                      key={trait}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white border border-amber-100 text-amber-800 shadow-sm"
                    >
                      {trait}
                    </div>
                  ))}
                </div>
                
                <div className="prose prose-amber max-w-none mb-8">
                  <p className="text-muted-foreground">{breed.description}</p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white rounded-xl p-4 border border-amber-100 shadow-sm">
                    <div className="text-amber-600 font-medium mb-1">Lifespan</div>
                    <div className="text-foreground font-semibold">{breed.life_span} years</div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-amber-100 shadow-sm">
                    <div className="text-amber-600 font-medium mb-1">Weight</div>
                    <div className="text-foreground font-semibold">{breed.weight.metric} kg</div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-amber-100 shadow-sm">
                    <div className="text-amber-600 font-medium mb-1">Adaptability</div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${
                            i < breed.adaptability 
                              ? "text-amber-500 fill-amber-500" 
                              : "text-muted"
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <InfoIcon className="h-5 w-5 text-amber-600" />
                    <h2 className="text-xl font-semibold text-foreground">Fun Facts</h2>
                  </div>
                  
                  <ul className="space-y-3">
                    {funFacts.map((fact, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                        className="flex gap-3"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
                          <span className="text-amber-800 text-xs font-medium">{index + 1}</span>
                        </div>
                        <p className="text-muted-foreground">{fact}</p>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <HeartIcon className="h-5 w-5 text-amber-600" />
                    <h2 className="text-xl font-semibold text-foreground">Bonding Tips</h2>
                  </div>
                  
                  <ul className="space-y-3">
                    {bondingTips.map((tip, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                        className="flex gap-3"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
                          <ZapIcon className="h-3 w-3 text-amber-800" />
                        </div>
                        <p className="text-muted-foreground">{tip}</p>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </div>
            
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="sticky top-8"
              >
                <div className="relative rounded-2xl overflow-hidden bg-white border border-amber-100 shadow-lg">
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                      <span className="sr-only">Loading</span>
                    </div>
                  )}
                  <img
                    src={breed.image?.url}
                    alt={breed.name}
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full aspect-square object-cover ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-amber-100 shadow-sm">
                    <div className="text-amber-600 font-medium mb-1">Affection</div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${
                            i < breed.affection_level 
                              ? "text-amber-500 fill-amber-500" 
                              : "text-muted"
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-amber-100 shadow-sm">
                    <div className="text-amber-600 font-medium mb-1">Energy</div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${
                            i < breed.energy_level 
                              ? "text-amber-500 fill-amber-500" 
                              : "text-muted"
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-amber-100 shadow-sm">
                    <div className="text-amber-600 font-medium mb-1">Intelligence</div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${
                            i < breed.intelligence 
                              ? "text-amber-500 fill-amber-500" 
                              : "text-muted"
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-amber-100 shadow-sm">
                    <div className="text-amber-600 font-medium mb-1">Child Friendly</div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${
                            i < breed.child_friendly 
                              ? "text-amber-500 fill-amber-500" 
                              : "text-muted"
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                {breed.wikipedia_url && (
                  <div className="mt-6">
                    <a
                      href={breed.wikipedia_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-4 py-2 rounded-lg bg-white border border-amber-200 text-amber-800 font-medium hover:bg-amber-50 transition-colors focus-ring"
                    >
                      Learn more on Wikipedia
                    </a>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
        
        <footer className="bg-white border-t border-amber-100 py-8 mt-12">
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

export default BreedDetail;
