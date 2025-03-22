
import { motion } from "framer-motion";
import { RefreshCw, Share, List } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultsActionsProps {
  onReset: () => void;
}

export function ResultsActions({ onReset }: ResultsActionsProps) {
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
      <Button variant="outline" size="sm" className="gap-1">
        <Share className="h-4 w-4" />
        Share Results
      </Button>
      <Button variant="outline" size="sm" className="gap-1">
        <List className="h-4 w-4" />
        View All Matches
      </Button>
    </motion.div>
  );
}
