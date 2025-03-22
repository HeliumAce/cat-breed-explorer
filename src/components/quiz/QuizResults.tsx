import { useState } from "react";
import { useQuiz } from "@/hooks/useQuiz";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Share, RefreshCw, List, ExternalLink, Heart } from "lucide-react";
import confetti from 'canvas-confetti';

interface QuizResultsProps {
  onReset: () => void;
  onClose: () => void;
}

export function QuizResults({ onReset, onClose }: QuizResultsProps) {
  const { breedMatches } = useQuiz();
  const [confettiTriggered, setConfettiTriggered] = useState(false);
  
  // Trigger confetti animation on first render
  if (!confettiTriggered) {
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 500);
    setConfettiTriggered(true);
  }

  const topMatches = breedMatches.slice(0, 3);
  const primaryMatch = topMatches[0];

  if (!primaryMatch) {
    return (
      <div className="text-center py-8">
        <p>No matches found. Please try again with different preferences.</p>
        <Button onClick={onReset} className="mt-4">Restart Quiz</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="inline-block bg-amber-100 p-3 rounded-full mb-4"
        >
          <Heart className="h-8 w-8 text-pink-500" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-2"
        >
          Your Purr-fect Match!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground mb-6"
        >
          Based on your personality & preferences
        </motion.p>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {/* Primary match */}
          <motion.div
            key={primaryMatch.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-5 shadow-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 rounded-bl-lg font-bold text-sm">
              {primaryMatch.matchPercentage}% Match
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-amber-100 flex-shrink-0">
                {primaryMatch.imageUrl ? (
                  <img 
                    src={primaryMatch.imageUrl} 
                    alt={primaryMatch.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-amber-100">
                    <span className="text-amber-500 text-4xl">🐱</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold mb-2">{primaryMatch.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{primaryMatch.description}</p>
                
                <div className="space-y-1 mb-4">
                  {primaryMatch.matchReasons.map((reason, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
                
                <Link to={`/breed/${primaryMatch.id}`}>
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
          
          {/* Other top matches */}
          {topMatches.slice(1).map((match, index) => (
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
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-amber-600">{match.matchPercentage}%</span>
                  <Link to={`/breed/${match.id}`}>
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
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap gap-3 justify-center pt-4"
      >
        <Button variant="outline" size="sm" className="gap-1" onClick={onReset}>
          <RefreshCw className="h-4 w-4" />
          Retake Quiz
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Share className="h-4 w-4" />
          Share Results
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <List className="h-4 w-4" />
          View All Matches
        </Button>
      </motion.div>
    </div>
  );
}
