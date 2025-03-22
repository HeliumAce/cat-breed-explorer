
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Home, Building, Store, Navigation, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { AdoptionLocation } from "@/data/adoptionLocations";

interface MapPlaceholderProps {
  locations: AdoptionLocation[];
  userLocation?: { lat: number; lng: number };
}

export function MapPlaceholder({ locations, userLocation }: MapPlaceholderProps) {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "shelter":
        return <Home className="w-5 h-5 text-blue-600" />;
      case "humane_society":
        return <Building className="w-5 h-5 text-green-600" />;
      case "pet_store":
        return <Store className="w-5 h-5 text-amber-600" />;
      default:
        return <MapPin className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="relative w-full">
      {/* Map toggle button for mobile */}
      {isMobile && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow-md"
          aria-label={isCollapsed ? "Expand map" : "Collapse map"}
        >
          {isCollapsed ? <ChevronDown /> : <ChevronUp />}
        </button>
      )}

      <div 
        className={cn(
          "relative bg-amber-50 rounded-lg border border-amber-100 shadow-inner overflow-hidden transition-all duration-300 ease-in-out",
          isCollapsed ? "h-16" : "h-[60vh]"
        )}
      >
        {isCollapsed ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <MapPin className="w-5 h-5 mr-2" />
            <span>Map view is collapsed. Tap to expand.</span>
          </div>
        ) : (
          <>
            {/* This is a placeholder for the Google Maps API */}
            <div className="absolute inset-0 bg-amber-50 p-4">
              <div className="h-full w-full bg-amber-100/50 rounded-lg relative overflow-hidden">
                {/* Grid lines to simulate a map */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={`col-${i}`} className="border-r border-amber-200/30" />
                  ))}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={`row-${i}`} className="border-b border-amber-200/30" />
                  ))}
                </div>
                
                {/* Stylized map features */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full bg-amber-200/20" />
                  <div className="absolute w-1/2 h-1/2 rounded-full bg-amber-200/30" />
                  <div className="absolute w-1/4 h-1/4 rounded-full bg-amber-200/40" />
                </div>
                
                {/* Location markers */}
                {locations.slice(0, 10).map((location, index) => {
                  // Calculate position based on latitude and longitude
                  // This is just for visualization - not actual mapping
                  const offsetX = ((location.longitude + 118.3) * 100) % 80;
                  const offsetY = ((location.latitude - 34) * 100) % 80;
                  
                  return (
                    <motion.div 
                      key={location.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      className="absolute p-1.5 bg-white rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/2"
                      style={{ 
                        left: `${10 + offsetX}%`, 
                        top: `${10 + offsetY}%`,
                      }}
                    >
                      {getMarkerIcon(location.type)}
                    </motion.div>
                  );
                })}
                
                {/* User location marker */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute left-1/2 top-1/2 p-2 bg-blue-500 rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/2"
                >
                  <Navigation className="w-4 h-4 text-white" />
                </motion.div>
                
                {/* Map attribution */}
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                  Map data placeholder
                </div>
              </div>
            </div>
            
            {/* Overlay indicating this is a placeholder */}
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/80 backdrop-blur-sm rounded-md shadow text-center text-sm">
              <p className="text-muted-foreground">
                This is a map placeholder. It will be replaced with Google Maps in the future.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
