
import { motion } from "framer-motion";
import { Heart, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BreedMatch } from "@/types/quiz";

interface PrimaryMatchProps {
  match: BreedMatch;
  onClose: () => void;
}

export function PrimaryMatch({ match, onClose }: PrimaryMatchProps) {
  return (
    <motion.div
      key={match.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-xl p-5 shadow-md relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 rounded-bl-lg font-bold text-sm">
        {match.matchPercentage}% Match
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-amber-100 flex-shrink-0">
          {match.imageUrl ? (
            <img 
              src={match.imageUrl} 
              alt={match.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-amber-100">
              <span className="text-amber-500 text-4xl">🐱</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-bold mb-2">{match.name}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{match.description}</p>
          
          <div className="space-y-1 mb-4">
            {match.matchReasons.map((reason, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
          
          <Link to={`/breeds/${match.id}`}>
            <Button 
              size="sm" 
              className="gap-1 bg-amber-500 hover:bg-amber-600"
              onClick={onClose}
            >
              Learn More
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
