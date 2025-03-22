
import { Button } from "@/components/ui/button";
import { HeartHandshake } from "lucide-react";
import { useQuiz } from "@/hooks/useQuiz";
import { motion } from "framer-motion";

export function QuizButton() {
  const { openQuiz } = useQuiz();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button 
        onClick={openQuiz}
        className="bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-2 rounded-full px-4 py-2"
      >
        <HeartHandshake className="h-4 w-4" />
        <span>Find Your Purr-fect Match</span>
      </Button>
    </motion.div>
  );
}
