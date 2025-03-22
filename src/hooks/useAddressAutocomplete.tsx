
import { useState, useEffect, useRef } from 'react';

interface UseAddressAutocompleteProps {
  onPlaceSelect: (address: string, location: { lat: number; lng: number }) => void;
}

export function useAddressAutocomplete({ onPlaceSelect }: UseAddressAutocompleteProps) {
  const [inputValue, setInputValue] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Check if Google Maps API is loaded
    if (window.google && window.google.maps && window.google.maps.places && inputRef.current) {
      // Initialize the autocomplete
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['geocode', 'establishment'],
        fields: ['geometry', 'formatted_address']
      });

      // Add listener for place selection
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        
        if (place && place.geometry && place.geometry.location) {
          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
          
          const address = place.formatted_address || inputValue;
          setInputValue(address);
          
          // Call the callback
          onPlaceSelect(address, location);
        }
      });
      
      setIsLoaded(true);
    }
  }, [onPlaceSelect]);

  return {
    inputRef,
    inputValue,
    setInputValue,
    isLoaded
  };
}
