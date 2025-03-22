
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { AdoptionLocation } from "@/data/adoptionLocations";
import { Badge } from "@/components/ui/badge";
import { GoogleMapView } from "./GoogleMapView";

interface MapContainerProps {
  locations: AdoptionLocation[];
  userLocation?: { lat: number; lng: number };
}

export function MapContainer({ locations, userLocation }: MapContainerProps) {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

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
          <div 
            className="flex items-center justify-center h-full text-muted-foreground cursor-pointer"
            onClick={() => setIsCollapsed(false)}
          >
            <MapPin className="w-5 h-5 mr-2" />
            <span>Map view is collapsed. Tap to expand.</span>
            {userLocation && (
              <Badge className="ml-2 bg-green-100 text-green-800">Location active</Badge>
            )}
          </div>
        ) : (
          <GoogleMapView locations={locations} userLocation={userLocation} />
        )}
      </div>
    </div>
  );
}
