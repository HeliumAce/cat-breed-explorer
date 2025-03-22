import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BreedMatch } from "@/types/quiz";

interface OtherMatchesProps {
  matches: BreedMatch[];
  onClose: () => void;
}

export function OtherMatches({ matches, onClose }: OtherMatchesProps) {
  return (
    <>
      {matches.map((match, index) => (
        <motion.div
          key={match.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          className="bg-white/70 rounded-lg p-4 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 rounded-md overflow-hidden bg-amber-100 flex-shrink-0">
                {match.imageUrl ? (
                  <img 
                    src={match.imageUrl} 
                    alt={match.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-amber-500 text-2xl">🐱</span>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="font-semibold">{match.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {match.matchReasons[0]}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Link to={`/breeds/${match.id}`}>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0"
                  onClick={onClose}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}
