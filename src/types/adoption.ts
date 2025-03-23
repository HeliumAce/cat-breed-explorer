
export type LocationType = 'shelter' | 'humane' | 'store';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface AdoptionLocation {
  id: string;
  name: string;
  type: LocationType;
  address: string;
  location: Coordinates;
  distance: number;
  open?: boolean;
  phone?: string | null;
  rating?: number;
  photos?: Array<{
    reference: string;
    width: number;
    height: number;
  }>;
}

export interface AdoptionLocationsResponse {
  locations: AdoptionLocation[];
}
