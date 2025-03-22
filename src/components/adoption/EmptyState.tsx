
import { motion } from "framer-motion";
import { SearchX, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="bg-amber-50 p-4 rounded-full mb-4">
        <SearchX className="h-10 w-10 text-amber-500" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">No Locations Found</h3>
      
      <p className="text-muted-foreground max-w-md mb-6">
        We couldn't find any cat adoption locations with your current filters. Try adjusting your filters or search terms.
      </p>
      
      <Button variant="outline" onClick={onReset} className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Reset Filters
      </Button>
    </motion.div>
  );
}
