
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { AlertCircle, Loader2, Search } from "lucide-react";

interface AddressSearchProps {
  onAddressSelect: (address: string, location: { lat: number, lng: number }) => void;
  placeholder?: string;
}

export function AddressSearch({ onAddressSelect, placeholder = "Enter an address..." }: AddressSearchProps) {
  const [address, setAddress] = useState("");
  const [placesLoaded, setPlacesLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedAddress = useDebounce(address, 300);
  
  // Check if Google Maps API and Places library are loaded
  useEffect(() => {
    const checkPlacesLoaded = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setPlacesLoaded(true);
        return true;
      }
      return false;
    };
    
    // Check immediately if already loaded
    if (checkPlacesLoaded()) {
      return;
    }
    
    // Otherwise set up an interval to check
    const intervalId = setInterval(() => {
      if (checkPlacesLoaded()) {
        clearInterval(intervalId);
      }
    }, 300);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Initialize Places Autocomplete once the API is loaded
  useEffect(() => {
    if (!placesLoaded || !inputRef.current || autocompleteRef.current) return;
    
    try {
      const options = {
        fields: ["formatted_address", "geometry", "name"],
        types: ["geocode", "establishment"]
      };
      
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );
      
      // Listen for place selection
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current!.getPlace();
        
        if (!place.geometry || !place.geometry.location) {
          console.error("No location data available for this address");
          setError("Could not find location data for this address. Please try a different one.");
          return;
        }
        
        const addressText = place.formatted_address || place.name || address;
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        
        onAddressSelect(addressText, location);
      });
      
      setError(null);
    } catch (error) {
      console.error("Error initializing Places Autocomplete:", error);
      setError("Could not initialize address search. Please try again later.");
    }
    
    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [placesLoaded, onAddressSelect, address]);
  
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    if (error) setError(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address.trim()) {
      setError("Please enter an address");
      return;
    }
    
    if (!placesLoaded) {
      setError("Maps service is still loading. Please wait a moment.");
      return;
    }
    
    // If we have a place from autocomplete, it will be handled by the place_changed event listener
    // This is for when user types but doesn't select from dropdown
    if (autocompleteRef.current) {
      // Trigger the place_changed event by programmatically requesting place details
      // This is a manual fallback for direct form submission
      const service = new google.maps.places.PlacesService(document.createElement('div'));
      service.findPlaceFromQuery({
        query: address,
        fields: ['formatted_address', 'geometry', 'name']
      }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0]) {
          const place = results[0];
          if (place.geometry && place.geometry.location) {
            const addressText = place.formatted_address || place.name || address;
            const location = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            };
            onAddressSelect(addressText, location);
          }
        } else {
          setError("Could not find this location. Please try a different address.");
        }
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative flex gap-2">
      <div className="relative flex-1">
        <Input
          ref={inputRef}
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder={placeholder}
          className="w-full pr-8"
          disabled={!placesLoaded}
        />
        
        {!placesLoaded && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>
      
      <Button 
        type="submit" 
        disabled={!placesLoaded || address.trim() === ''}
        className="shrink-0"
        size="icon"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
      
      {error && (
        <div className="text-sm text-red-500 mt-1 absolute top-full left-0 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          <span>{error}</span>
        </div>
      )}
    </form>
  );
}
