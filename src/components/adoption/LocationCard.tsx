
import { Phone, Navigation, Clock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdoptionLocation } from "@/data/adoptionLocations";

interface LocationCardProps {
  location: AdoptionLocation;
  index: number;
}

export function LocationCard({ location, index }: LocationCardProps) {
  const getLocationTypeLabel = (type: string) => {
    switch (type) {
      case "shelter":
        return "Animal Shelter";
      case "humane_society":
        return "Humane Society";
      case "pet_store":
        return "Pet Store";
      default:
        return type;
    }
  };

  const getLocationTypeColor = (type: string) => {
    switch (type) {
      case "shelter":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "humane_society":
        return "bg-green-100 text-green-800 border-green-200";
      case "pet_store":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "";
    }
  };

  const getTodayHours = () => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const today = days[new Date().getDay()];
    return location.hours[today as keyof typeof location.hours];
  };

  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/[^\d]/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="overflow-hidden hover-lift">
        <div className="relative h-36 overflow-hidden">
          <img 
            src={location.imageUrl} 
            alt={location.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2">
            <Badge className={getLocationTypeColor(location.type)}>
              {getLocationTypeLabel(location.type)}
            </Badge>
          </div>
          <div className="absolute bottom-2 right-2">
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
              {location.distance.toFixed(1)} miles away
            </Badge>
          </div>
        </div>
        
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold">{location.name}</h3>
          <p className="text-sm text-muted-foreground">
            {location.address}, {location.city}, {location.state} {location.zipCode}
          </p>
        </CardHeader>
        
        <CardContent className="pb-2">
          <div className="flex items-start gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-muted-foreground">Today: {getTodayHours()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-2 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>{formatPhoneNumber(location.phone)}</span>
          </div>
          
          {location.website && (
            <div className="flex items-center gap-2 mt-2 text-sm">
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
              <a 
                href={`https://${location.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-600 hover:text-amber-700 hover:underline"
              >
                {location.website}
              </a>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-0 flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-amber-600"
            onClick={() => window.open(`https://maps.google.com/?q=${location.address}, ${location.city}, ${location.state} ${location.zipCode}`, '_blank')}
          >
            <Navigation className="w-4 h-4 mr-1" />
            Directions
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-amber-600"
            onClick={() => window.open(`tel:${location.phone.replace(/[^\d]/g, "")}`)}
          >
            <Phone className="w-4 h-4 mr-1" />
            Call
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
