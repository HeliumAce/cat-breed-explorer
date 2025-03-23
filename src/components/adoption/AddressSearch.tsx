
import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddressSearchProps {
  onAddressSelect: (address: string, location: { lat: number; lng: number }) => void;
  placeholder?: string;
}

export function AddressSearch({ onAddressSelect, placeholder = "Search for a location..." }: AddressSearchProps) {
  const [searchValue, setSearchValue] = useState("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!window.google || !inputRef.current) return;

    const options = {
      types: ['address', 'geocode'],
      componentRestrictions: { country: 'us' }
    };

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace();
      
      if (place && place.formatted_address && place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        
        setSearchValue(place.formatted_address);
        onAddressSelect(place.formatted_address, location);
      }
    });

    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onAddressSelect]);

  return (
    <div className="relative w-full">
      <div className="flex">
        <div className="relative flex-grow">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <Search className="h-4 w-4" />
          </div>
          <Input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={placeholder}
            className="pl-9 pr-4 py-2 h-10 w-full"
          />
        </div>
        <Button 
          type="button" 
          className="ml-2 bg-amber-500 hover:bg-amber-600"
          onClick={() => {
            if (autocompleteRef.current) {
              const place = autocompleteRef.current.getPlace();
              if (place && place.formatted_address && place.geometry && place.geometry.location) {
                onAddressSelect(place.formatted_address, {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng()
                });
              }
            }
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
}
