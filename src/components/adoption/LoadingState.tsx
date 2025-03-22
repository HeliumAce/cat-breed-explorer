
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <Loader2 className="h-10 w-10 text-amber-500 animate-spin mb-4" />
      <p className="text-muted-foreground">Finding adoption locations near you...</p>
    </motion.div>
  );
}
