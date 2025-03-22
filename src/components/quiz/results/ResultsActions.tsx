
import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Share, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useQuiz } from "@/hooks/useQuiz";

interface ResultsActionsProps {
  onReset: () => void;
}

export function ResultsActions({ onReset }: ResultsActionsProps) {
  const { breedMatches } = useQuiz();
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      // Create a shareable message
      const topMatch = breedMatches[0];
      const shareText = `I took the cat breed personality quiz and got matched with a ${topMatch.name} (${topMatch.matchPercentage}% match)! Find your purr-fect match too!`;
      
      // Try to use the Web Share API if available
      if (navigator.share) {
        await navigator.share({
          title: 'My Cat Breed Match Results',
          text: shareText,
          url: window.location.href,
        });
        toast.success('Shared successfully!');
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareText);
        toast.success('Results copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing results:', error);
      toast.error('Unable to share results');
    } finally {
      setIsSharing(false);
    }
  };

  return (
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
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-1" 
        onClick={handleShare}
        disabled={isSharing || !breedMatches.length}
      >
        <Share className="h-4 w-4" />
        {isSharing ? 'Sharing...' : 'Share Results'}
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-1"
        disabled={!breedMatches.length}
      >
        <List className="h-4 w-4" />
        View All Matches
      </Button>
    </motion.div>
  );
}
