
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function ResultsHeader() {
  return (
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
  );
}
