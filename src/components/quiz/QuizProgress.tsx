
import { PawPrint } from "lucide-react";
import { motion } from "framer-motion";

interface QuizProgressProps {
  progress: number;
  currentStep: number;
  totalSteps: number;
}

export function QuizProgress({ progress, currentStep, totalSteps }: QuizProgressProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Question {currentStep} of {totalSteps}
        </span>
      </div>
      
      <div className="relative h-2 w-full bg-amber-100 rounded-full overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-amber-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          initial={{ left: 0 }}
          animate={{ left: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
        </motion.div>
      </div>
    </div>
  );
}
