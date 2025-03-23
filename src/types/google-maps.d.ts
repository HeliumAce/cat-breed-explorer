
declare namespace google.maps.places {
  class Autocomplete {
    constructor(
      inputField: HTMLInputElement,
      opts?: google.maps.places.AutocompleteOptions
    );
    addListener(eventName: string, handler: Function): google.maps.MapsEventListener;
    getPlace(): google.maps.places.PlaceResult;
  }

  interface AutocompleteOptions {
    bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
    componentRestrictions?: google.maps.places.ComponentRestrictions;
    fields?: string[];
    types?: string[];
  }

  interface ComponentRestrictions {
    country: string | string[];
  }

  interface PlaceResult {
    formatted_address?: string;
    geometry?: {
      location: google.maps.LatLng;
      viewport?: google.maps.LatLngBounds;
    };
    name?: string;
    photos?: google.maps.places.PhotoOptions[];
    place_id?: string;
  }

  interface PhotoOptions {
    height: number;
    html_attributions: string[];
    width: number;
    getUrl(opts: { maxHeight?: number; maxWidth?: number }): string;
  }
}

declare namespace google.maps {
  class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  interface MapsEventListener {
    remove(): void;
  }

  namespace event {
    function clearInstanceListeners(instance: Object): void;
  }
}
