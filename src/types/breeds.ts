
export interface Weight {
  imperial: string;
  metric: string;
}

export interface Image {
  id: string;
  width: number;
  height: number;
  url: string;
}

export interface Breed {
  weight: Weight;
  id: string;
  name: string;
  cfa_url?: string;
  vetstreet_url?: string;
  vcahospitals_url?: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: number;
  lap?: number;
  alt_names?: string;
  adaptability?: number | null;
  affection_level?: number | null;
  child_friendly?: number | null;
  dog_friendly?: number | null;
  energy_level?: number | null;
  grooming?: number | null;
  health_issues: number;
  intelligence?: number | null;
  shedding_level?: number | null;
  social_needs?: number | null;
  stranger_friendly: number;
  vocalisation?: number | null;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url?: string;
  hypoallergenic: number;
  reference_image_id?: string;
  image?: Image;
}

export interface BreedWithImage extends Breed {
  image: Image;
}
