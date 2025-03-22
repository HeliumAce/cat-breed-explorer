
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="bg-red-50 p-4 rounded-full mb-4">
        <AlertTriangle className="h-10 w-10 text-red-500" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">Error Loading Locations</h3>
      
      <p className="text-muted-foreground max-w-md mb-6">
        We encountered a problem while trying to load adoption locations. Please try again later.
      </p>
      
      <Button onClick={onRetry} className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Try Again
      </Button>
    </motion.div>
  );
}
