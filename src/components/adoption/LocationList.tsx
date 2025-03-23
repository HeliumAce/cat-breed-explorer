
import { AdoptionLocation } from "@/types/adoption";
import { LocationCard } from "./LocationCard";
import { motion } from "framer-motion";

interface LocationListProps {
  locations: AdoptionLocation[];
  onSelectLocation: (location: AdoptionLocation) => void;
  selectedLocation: AdoptionLocation | null;
}

export function LocationList({ 
  locations, 
  onSelectLocation,
  selectedLocation
}: LocationListProps) {
  return (
    <div className="space-y-4 divide-y divide-amber-100">
      {locations.map((location, index) => (
        <motion.div
          key={location.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="pt-4 first:pt-0"
        >
          <LocationCard 
            location={location}
            onSelect={onSelectLocation}
            isSelected={selectedLocation?.id === location.id}
          />
        </motion.div>
      ))}
    </div>
  );
}
