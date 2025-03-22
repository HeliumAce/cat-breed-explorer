
import { Shelter } from '@/types/shelters';

// Mock data for shelters
export const MOCK_SHELTERS: Shelter[] = [
  {
    id: 'shelter-1',
    name: 'Happy Paws Animal Shelter',
    address: '123 Main St, Anytown, CA 94103',
    distance: 0, // Will be calculated
    rating: 4.7,
    website: 'https://example.com/happypaws',
    phone: '(555) 123-4567',
    isOpen: true,
    photos: [
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800',
      'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800'
    ],
    acceptsCats: true,
    noKill: true,
    location: {
      lat: 37.773972,
      lng: -122.431297
    }
  },
  {
    id: 'shelter-2',
    name: 'Feline Friends Rescue',
    address: '456 Oak Ave, Somewhere, CA 94110',
    distance: 0, // Will be calculated
    rating: 4.9,
    website: 'https://example.com/felinefriends',
    phone: '(555) 987-6543',
    isOpen: true,
    photos: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      'https://images.unsplash.com/photo-1520315342629-6ea920342047?w=800'
    ],
    acceptsCats: true,
    noKill: true,
    location: {
      lat: 37.765231,
      lng: -122.419861
    }
  },
  {
    id: 'shelter-3',
    name: 'Whiskers Haven',
    address: '789 Pine St, Elsewhere, CA 94133',
    distance: 0, // Will be calculated
    rating: 4.5,
    website: 'https://example.com/whiskers',
    phone: '(555) 333-2222',
    isOpen: false,
    photos: [
      'https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?w=800'
    ],
    acceptsCats: true,
    noKill: false,
    location: {
      lat: 37.785234,
      lng: -122.408611
    }
  },
  {
    id: 'shelter-4',
    name: 'City Animal Shelter',
    address: '101 Municipal Way, Cityville, CA 94102',
    distance: 0, // Will be calculated
    rating: 3.8,
    website: 'https://example.com/cityshelter',
    phone: '(555) 444-5555',
    isOpen: true,
    photos: [
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800'
    ],
    acceptsCats: true,
    noKill: false,
    location: {
      lat: 37.781208,
      lng: -122.417861
    }
  },
  {
    id: 'shelter-5',
    name: 'Purr-fect Match Adoption Center',
    address: '202 Cat Lane, Meowville, CA 94117',
    distance: 0, // Will be calculated
    rating: 4.6,
    website: 'https://example.com/purrfectmatch',
    phone: '(555) 777-8888',
    isOpen: true,
    photos: [
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800',
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800'
    ],
    acceptsCats: true,
    noKill: true,
    location: {
      lat: 37.772396,
      lng: -122.438576
    }
  },
  {
    id: 'shelter-6',
    name: 'Coastal Pet Rescue',
    address: '303 Beach Rd, Coastaltown, CA 94121',
    distance: 0, // Will be calculated
    rating: 4.4,
    website: 'https://example.com/coastalrescue',
    phone: '(555) 111-2222',
    isOpen: false,
    photos: [
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800'
    ],
    acceptsCats: true,
    noKill: true,
    location: {
      lat: 37.775271,
      lng: -122.511169
    }
  },
  {
    id: 'shelter-7',
    name: 'Downtown Animal Haven',
    address: '505 Market St, Downtown, CA 94105',
    distance: 0, // Will be calculated
    rating: 4.2,
    website: 'https://example.com/animalhaven',
    phone: '(555) 999-8888',
    isOpen: true,
    photos: [
      'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800'
    ],
    acceptsCats: false,
    noKill: false,
    location: {
      lat: 37.789608,
      lng: -122.399708
    }
  },
  {
    id: 'shelter-8',
    name: 'Little Paws Rescue',
    address: '606 Cherry Ave, Fruitvale, CA 94601',
    distance: 0, // Will be calculated
    rating: 4.8,
    website: 'https://example.com/littlepaws',
    phone: '(555) 777-6666',
    isOpen: true,
    photos: [
      'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=800'
    ],
    acceptsCats: true,
    noKill: true,
    location: {
      lat: 37.775001,
      lng: -122.222642
    }
  }
];
