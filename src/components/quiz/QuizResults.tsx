
import { useState, useEffect } from "react";
import { useQuiz } from "@/hooks/useQuiz";
import { PrimaryMatch } from "./results/PrimaryMatch";
import { OtherMatches } from "./results/OtherMatches";
import { ResultsActions } from "./results/ResultsActions";

interface QuizResultsProps {
  onReset: () => void;
  onClose: () => void;
}

export function QuizResults({ onReset, onClose }: QuizResultsProps) {
  const { breedMatches } = useQuiz();
  const [confettiTriggered, setConfettiTriggered] = useState(false);
  
  // For debugging - log what results we have
  useEffect(() => {
    console.log("QuizResults rendering with matches:", breedMatches);
  }, [breedMatches]);
  
  // Trigger confetti animation on first render
  if (!confettiTriggered) {
    import('canvas-confetti').then((confetti) => {
      setTimeout(() => {
        confetti.default({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 500);
      setConfettiTriggered(true);
    });
  }

  // Only try to get matches when breedMatches is actually an array with items
  if (!breedMatches || !Array.isArray(breedMatches) || breedMatches.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No matches found. Please try again with different preferences.</p>
        <button onClick={onReset} className="mt-4">Restart Quiz</button>
      </div>
    );
  }

  // Get the primary match and other matches
  const primaryMatch = breedMatches[0];
  const otherMatches = breedMatches.slice(1, 4); // Get up to 3 additional matches

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Your Purr-fect Match!</h2>
        <p className="text-muted-foreground mb-6">
          Based on your personality & preferences
        </p>
      </div>

      <div className="space-y-6">
        <PrimaryMatch match={primaryMatch} onClose={onClose} />
        
        {otherMatches.length > 0 && (
          <h3 className="text-lg font-medium mt-6 mb-2">
            Other Possible Pals
          </h3>
        )}
        
        <OtherMatches matches={otherMatches} onClose={onClose} />
      </div>

      <ResultsActions onReset={onReset} />
    </div>
  );
}
