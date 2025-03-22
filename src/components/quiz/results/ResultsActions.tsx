
import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/hooks/useQuiz";

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
    </motion.div>
  );
}
