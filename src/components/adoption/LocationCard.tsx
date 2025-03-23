
import { AdoptionLocation, LocationType } from "@/types/adoption";
import { motion } from "framer-motion";
import { Heart, Home, ShoppingBag, Phone, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LocationCardProps {
  location: AdoptionLocation;
  isSelected?: boolean;
  onSelect?: (location: AdoptionLocation) => void;
}

export function LocationCard({ location, isSelected = false, onSelect }: LocationCardProps) {
  const handleSelect = () => {
    if (onSelect) {
      onSelect(location);
    }
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (location.phone) {
      window.open(`tel:${location.phone}`);
    }
  };

  const handleDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { lat, lng } = location.location;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${location.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={handleSelect}
      className={`p-4 rounded-lg border ${
        isSelected 
          ? "border-amber-500 bg-amber-50" 
          : "border-amber-100 bg-white hover:border-amber-200"
      } cursor-pointer shadow-sm`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {getLocationTypeIcon(location.type)}
          <div>
            <h3 className="font-medium text-foreground">{location.name}</h3>
            <p className="text-sm text-muted-foreground">{location.address}</p>
          </div>
        </div>
        <Badge variant={location.open ? "default" : "secondary"} className={location.open ? "bg-green-500 hover:bg-green-600" : ""}>
          {location.open ? "Open" : "Closed"}
        </Badge>
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-amber-600">{location.distance} km</span> away
          </div>
          {location.rating && (
            <div className="text-sm text-muted-foreground mt-1">
              Rating: <span className="font-medium">{location.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-amber-600"
            onClick={handleCall}
            disabled={!location.phone}
          >
            <Phone className="h-4 w-4 mr-1" />
            Call
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="text-amber-600"
            onClick={handleDirections}
          >
            <Navigation className="h-4 w-4 mr-1" />
            Directions
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Helper function to get icon based on location type
function getLocationTypeIcon(type: LocationType) {
  switch (type) {
    case 'shelter':
      return <Home className="h-5 w-5 text-red-500" />;
    case 'humane':
      return <Heart className="h-5 w-5 text-pink-500" />;
    case 'store':
      return <ShoppingBag className="h-5 w-5 text-amber-500" />;
    default:
      return <ShoppingBag className="h-5 w-5 text-amber-500" />;
  }
}
