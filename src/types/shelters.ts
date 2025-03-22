
export interface Shelter {
  id: string;
  name: string;
  address: string;
  distance: number; // in km
  rating?: number;
  website?: string;
  phone?: string;
  isOpen?: boolean;
  photos?: string[];
  acceptsCats?: boolean;
  noKill?: boolean;
  location: {
    lat: number;
    lng: number;
  };
}

export type SortOption = 'distance' | 'rating' | 'alphabetical';

export interface FilterOptions {
  openNow: boolean;
  acceptsCats: boolean;
  noKill: boolean;
}

export interface Location {
  lat: number;
  lng: number;
}
