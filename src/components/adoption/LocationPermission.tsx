
import { motion } from "framer-motion";
import { MapPin, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationPermissionProps {
  onRequestLocation: () => void;
  onSkip: () => void;
}

export function LocationPermission({ onRequestLocation, onSkip }: LocationPermissionProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-amber-100 rounded-lg p-6 shadow-md text-center max-w-md mx-auto mb-6"
    >
      <div className="bg-amber-50 p-3 rounded-full inline-flex mb-4">
        <MapPin className="h-6 w-6 text-amber-500" />
      </div>
      
      <h3 className="text-lg font-semibold mb-2">Share Your Location</h3>
      
      <p className="text-muted-foreground mb-4">
        To find cat adoption locations near you, we need access to your location. This helps us show the closest options.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={onRequestLocation} className="gap-2">
          <MapPin className="h-4 w-4" />
          Share Location
        </Button>
        
        <Button variant="outline" onClick={onSkip} className="gap-2">
          Skip
        </Button>
      </div>
      
      <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
        <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <p className="text-left">
          This is a UI demonstration. No actual location data will be collected or stored.
        </p>
      </div>
    </motion.div>
  );
}
