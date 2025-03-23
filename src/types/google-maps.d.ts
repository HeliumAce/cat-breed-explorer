
declare namespace google.maps {
  class Map {
    constructor(mapDiv: HTMLElement, opts?: MapOptions);
    setCenter(latLng: LatLng | LatLngLiteral): void;
    setZoom(zoom: number): void;
    panTo(latLng: LatLng | LatLngLiteral): void;
    fitBounds(bounds: LatLngBounds): void;
    panBy(x: number, y: number): void;
  }

  class Marker {
    constructor(opts?: MarkerOptions);
    setMap(map: Map | null): void;
    getPosition(): LatLng | null;
    getTitle(): string | undefined;
    setPosition(latLng: LatLng | LatLngLiteral): void;
    setAnimation(animation: Animation | null): void;
    addListener(eventName: string, handler: Function): MapsEventListener;
  }

  enum Animation {
    BOUNCE,
    DROP
  }

  class InfoWindow {
    constructor(opts?: InfoWindowOptions);
    open(map?: Map, anchor?: Marker): void;
    close(): void;
    setContent(content: string | Node): void;
  }

  class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  class LatLngBounds {
    constructor();
    extend(latLng: LatLng | LatLngLiteral): LatLngBounds;
  }

  interface MapOptions {
    center?: LatLng | LatLngLiteral;
    zoom?: number;
    mapTypeControl?: boolean;
    streetViewControl?: boolean;
    fullscreenControl?: boolean;
    styles?: MapTypeStyle[];
  }

  interface MapTypeStyle {
    featureType?: string;
    elementType?: string;
    stylers: object[];
  }

  interface MarkerOptions {
    position: LatLng | LatLngLiteral;
    map?: Map;
    title?: string;
    icon?: string | Icon | Symbol;
    label?: string | MarkerLabel;
    animation?: Animation;
  }

  interface Icon {
    url: string;
    scaledSize?: Size;
  }

  interface Symbol {
    path: SymbolPath | string;
    fillColor?: string;
    fillOpacity?: number;
    scale?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
  }

  enum SymbolPath {
    BACKWARD_CLOSED_ARROW,
    BACKWARD_OPEN_ARROW,
    CIRCLE,
    FORWARD_CLOSED_ARROW,
    FORWARD_OPEN_ARROW
  }

  interface MarkerLabel {
    text: string;
    color?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
  }

  interface InfoWindowOptions {
    content?: string | Node;
    maxWidth?: number;
    pixelOffset?: Size;
  }

  class Size {
    constructor(width: number, height: number, widthUnit?: string, heightUnit?: string);
    width: number;
    height: number;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface MapsEventListener {
    remove(): void;
  }

  namespace event {
    function clearInstanceListeners(instance: Object): void;
  }

  namespace places {
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
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}
