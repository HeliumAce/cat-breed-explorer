
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  id: string;
  name: string;
  type: LocationType;
  address: string;
  location: Coordinates;
  distance: number;
  open?: boolean;
  phone?: string | null;
  rating?: number | null;
  photos?: LocationPhoto[];
}

export interface LocationPhoto {
  reference: string;
  width: number;
  height: number;
}

export type LocationType = 'shelter' | 'humane' | 'store';

export interface AdoptionLocationsResponse {
  locations: Location[];
}

export interface GooglePlacesResult {
  place_id: string;
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
  };
  opening_hours?: {
    open_now: boolean;
  };
  formatted_phone_number?: string;
  rating?: number;
  photos?: Array<{
    photo_reference: string;
    width: number;
    height: number;
  }>;
}

export interface GooglePlacesResponse {
  results: GooglePlacesResult[];
  status: string;
}
