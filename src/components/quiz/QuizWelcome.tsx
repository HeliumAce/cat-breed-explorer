
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cat, HeartHandshake, Sparkles } from "lucide-react";

interface QuizWelcomeProps {
  onStart: () => void;
}

export function QuizWelcome({ onStart }: QuizWelcomeProps) {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 0.1 
        }}
        className="bg-amber-100 p-4 rounded-full mb-6"
      >
        <Cat className="h-12 w-12 text-amber-600" />
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl sm:text-4xl font-bold text-center mb-3"
      >
        The Great Cat-aptibility Quiz
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-muted-foreground text-center mb-8 max-w-md"
      >
        Let's find your feline soulmate in 9 lives... err, questions!
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4 max-w-md text-center mb-8"
      >
        <div className="flex items-center gap-3 bg-white/80 p-3 rounded-lg">
          <HeartHandshake className="h-6 w-6 text-pink-500 shrink-0" />
          <p className="text-sm">Answer honestly for the most accurate match</p>
        </div>
        <div className="flex items-center gap-3 bg-white/80 p-3 rounded-lg">
          <Sparkles className="h-6 w-6 text-amber-500 shrink-0" />
          <p className="text-sm">Discover breeds you might never have considered</p>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-full px-8"
          onClick={onStart}
        >
          Start the Quiz
        </Button>
      </motion.div>
    </div>
  );
}
