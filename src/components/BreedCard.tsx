
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BreedWithImage } from "@/types/breeds";

interface BreedCardProps {
  breed: BreedWithImage;
  index: number;
}

export function BreedCard({ breed, index }: BreedCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link 
        to={`/breed/${breed.id}`} 
        className="block h-full focus-ring rounded-2xl"
      >
        <div className="relative overflow-hidden rounded-2xl bg-white border border-amber-100 shadow-sm hover-lift">
          <div className="relative aspect-square overflow-hidden">
            {!isLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                <span className="sr-only">Loading</span>
              </div>
            )}
            <motion.img
              src={breed.image?.url}
              alt={breed.name}
              onLoad={() => setIsLoaded(true)}
              className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.05] ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <ArrowRight className="text-white h-5 w-5 ml-auto" />
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-amber-700 transition-colors duration-300">
              {breed.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2 h-10">
              {breed.temperament}
            </p>
          </div>
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm py-1 px-2 text-xs font-medium text-amber-800 shadow-sm border border-amber-100">
              <span>{breed.origin}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
