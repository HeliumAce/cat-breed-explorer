
export interface AdoptionLocation {
  id: string;
  name: string;
  type: 'shelter' | 'humane_society' | 'pet_store';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  website?: string;
  email?: string;
  distance: number; // in miles
  latitude: number;
  longitude: number;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  imageUrl: string;
}

export const adoptionLocations: AdoptionLocation[] = [
  {
    id: "1",
    name: "Happy Paws Animal Shelter",
    type: "shelter",
    address: "123 Main Street",
    city: "Anytown",
    state: "CA",
    zipCode: "90210",
    phone: "(555) 123-4567",
    website: "happypaws.org",
    email: "info@happypaws.org",
    distance: 1.2,
    latitude: 34.052235,
    longitude: -118.243683,
    hours: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed"
    },
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=600&fit=crop"
  },
  {
    id: "2",
    name: "Whiskers Humane Society",
    type: "humane_society",
    address: "456 Oak Avenue",
    city: "Springfield",
    state: "CA",
    zipCode: "90211",
    phone: "(555) 987-6543",
    website: "whiskershs.org",
    email: "adopt@whiskershs.org",
    distance: 2.5,
    latitude: 34.059483,
    longitude: -118.278621,
    hours: {
      monday: "10:00 AM - 6:00 PM",
      tuesday: "10:00 AM - 6:00 PM",
      wednesday: "10:00 AM - 6:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 6:00 PM",
      saturday: "9:00 AM - 5:00 PM",
      sunday: "11:00 AM - 4:00 PM"
    },
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&h=600&fit=crop"
  },
  {
    id: "3",
    name: "Purr-fect Pets",
    type: "pet_store",
    address: "789 Elm Boulevard",
    city: "Riverside",
    state: "CA",
    zipCode: "90212",
    phone: "(555) 555-7890",
    website: "purrfectpets.com",
    distance: 3.7,
    latitude: 34.063896,
    longitude: -118.359044,
    hours: {
      monday: "8:00 AM - 9:00 PM",
      tuesday: "8:00 AM - 9:00 PM",
      wednesday: "8:00 AM - 9:00 PM",
      thursday: "8:00 AM - 9:00 PM",
      friday: "8:00 AM - 9:00 PM",
      saturday: "9:00 AM - 9:00 PM",
      sunday: "10:00 AM - 7:00 PM"
    },
    imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&h=600&fit=crop"
  },
  {
    id: "4",
    name: "Pawsome Friends Rescue",
    type: "shelter",
    address: "321 Pine Street",
    city: "Hillsdale",
    state: "CA",
    zipCode: "90213",
    phone: "(555) 234-5678",
    website: "pawsomefriends.org",
    email: "rescue@pawsomefriends.org",
    distance: 4.2,
    latitude: 34.044917,
    longitude: -118.267593,
    hours: {
      monday: "By appointment only",
      tuesday: "By appointment only",
      wednesday: "By appointment only",
      thursday: "By appointment only",
      friday: "By appointment only",
      saturday: "11:00 AM - 4:00 PM",
      sunday: "11:00 AM - 4:00 PM"
    },
    imageUrl: "https://images.unsplash.com/photo-1583795128727-6ec3642408f8?w=800&h=600&fit=crop"
  },
  {
    id: "5",
    name: "Feline Friends Alliance",
    type: "humane_society",
    address: "555 Maple Drive",
    city: "Glendale",
    state: "CA",
    zipCode: "90214",
    phone: "(555) 345-6789",
    website: "felinefriends.org",
    email: "info@felinefriends.org",
    distance: 5.8,
    latitude: 34.052235,
    longitude: -118.243683,
    hours: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 7:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed"
    },
    imageUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&h=600&fit=crop"
  },
  {
    id: "6",
    name: "Kitty Kingdom",
    type: "pet_store",
    address: "888 Birch Court",
    city: "Sherman Oaks",
    state: "CA",
    zipCode: "90215",
    phone: "(555) 456-7890",
    website: "kittykingdom.com",
    distance: 6.3,
    latitude: 34.090009,
    longitude: -118.361744,
    hours: {
      monday: "9:00 AM - 8:00 PM",
      tuesday: "9:00 AM - 8:00 PM",
      wednesday: "9:00 AM - 8:00 PM",
      thursday: "9:00 AM - 8:00 PM",
      friday: "9:00 AM - 9:00 PM",
      saturday: "9:00 AM - 9:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    imageUrl: "https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?w=800&h=600&fit=crop"
  },
  {
    id: "7",
    name: "Rescue Me Cat Sanctuary",
    type: "shelter",
    address: "234 Willow Avenue",
    city: "Beverly Hills",
    state: "CA",
    zipCode: "90216",
    phone: "(555) 567-8901",
    website: "rescuemecat.org",
    email: "help@rescuemecat.org",
    distance: 7.9,
    latitude: 34.073620,
    longitude: -118.400352,
    hours: {
      monday: "Closed",
      tuesday: "11:00 AM - 4:00 PM",
      wednesday: "11:00 AM - 4:00 PM",
      thursday: "11:00 AM - 4:00 PM",
      friday: "11:00 AM - 4:00 PM",
      saturday: "10:00 AM - 5:00 PM",
      sunday: "10:00 AM - 5:00 PM"
    },
    imageUrl: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=800&h=600&fit=crop"
  },
  {
    id: "8",
    name: "Cat Corner",
    type: "pet_store",
    address: "777 Cedar Lane",
    city: "Pasadena",
    state: "CA",
    zipCode: "90217",
    phone: "(555) 678-9012",
    website: "catcorner.com",
    distance: 8.4,
    latitude: 34.147785,
    longitude: -118.144516,
    hours: {
      monday: "10:00 AM - 7:00 PM",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 7:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "10:00 AM - 8:00 PM",
      sunday: "11:00 AM - 6:00 PM"
    },
    imageUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=600&fit=crop"
  },
  {
    id: "9",
    name: "Paws & Claws Humane Society",
    type: "humane_society",
    address: "444 Redwood Road",
    city: "Burbank",
    state: "CA",
    zipCode: "90218",
    phone: "(555) 789-0123",
    website: "pawsandclaws.org",
    email: "contact@pawsandclaws.org",
    distance: 9.1,
    latitude: 34.180840,
    longitude: -118.308968,
    hours: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "10:00 AM - 4:00 PM"
    },
    imageUrl: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&h=600&fit=crop"
  },
  {
    id: "10",
    name: "Meow Mansion",
    type: "shelter",
    address: "222 Spruce Street",
    city: "Santa Monica",
    state: "CA",
    zipCode: "90219",
    phone: "(555) 890-1234",
    website: "meowmansion.org",
    email: "info@meowmansion.org",
    distance: 10.5,
    latitude: 34.019454,
    longitude: -118.491191,
    hours: {
      monday: "10:00 AM - 6:00 PM",
      tuesday: "10:00 AM - 6:00 PM",
      wednesday: "10:00 AM - 6:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 6:00 PM",
      saturday: "9:00 AM - 5:00 PM",
      sunday: "9:00 AM - 5:00 PM"
    },
    imageUrl: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&h=600&fit=crop"
  },
  {
    id: "11",
    name: "Happy Tails Pet Store",
    type: "pet_store",
    address: "999 Aspen Circle",
    city: "Long Beach",
    state: "CA",
    zipCode: "90220",
    phone: "(555) 901-2345",
    website: "happytailspets.com",
    distance: 11.8,
    latitude: 33.768321,
    longitude: -118.195617,
    hours: {
      monday: "9:00 AM - 9:00 PM",
      tuesday: "9:00 AM - 9:00 PM",
      wednesday: "9:00 AM - 9:00 PM",
      thursday: "9:00 AM - 9:00 PM",
      friday: "9:00 AM - 9:00 PM",
      saturday: "9:00 AM - 9:00 PM",
      sunday: "10:00 AM - 7:00 PM"
    },
    imageUrl: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&h=600&fit=crop"
  },
  {
    id: "12",
    name: "Forever Homes Cat Rescue",
    type: "shelter",
    address: "111 Sequoia Way",
    city: "Culver City",
    state: "CA",
    zipCode: "90221",
    phone: "(555) 012-3456",
    website: "foreverhomescats.org",
    email: "rescue@foreverhomescats.org",
    distance: 12.3,
    latitude: 34.021122,
    longitude: -118.396466,
    hours: {
      monday: "By appointment only",
      tuesday: "By appointment only",
      wednesday: "1:00 PM - 6:00 PM",
      thursday: "1:00 PM - 6:00 PM",
      friday: "1:00 PM - 6:00 PM",
      saturday: "11:00 AM - 5:00 PM",
      sunday: "11:00 AM - 5:00 PM"
    },
    imageUrl: "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?w=800&h=600&fit=crop"
  },
  {
    id: "13",
    name: "Loving Hearts Animal Society",
    type: "humane_society",
    address: "333 Magnolia Boulevard",
    city: "Inglewood",
    state: "CA",
    zipCode: "90222",
    phone: "(555) 987-6543",
    website: "lovinghearts.org",
    email: "care@lovinghearts.org",
    distance: 13.7,
    latitude: 33.956976,
    longitude: -118.353417,
    hours: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed"
    },
    imageUrl: "https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=800&h=600&fit=crop"
  },
  {
    id: "14",
    name: "Feline Fantasies",
    type: "pet_store",
    address: "555 Cypress Street",
    city: "Torrance",
    state: "CA",
    zipCode: "90223",
    phone: "(555) 876-5432",
    website: "felinefantasies.com",
    distance: 14.2,
    latitude: 33.835293,
    longitude: -118.340628,
    hours: {
      monday: "10:00 AM - 7:00 PM",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 7:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "10:00 AM - 8:00 PM",
      sunday: "11:00 AM - 6:00 PM"
    },
    imageUrl: "https://images.unsplash.com/photo-1488740304459-45c4277e7daf?w=800&h=600&fit=crop"
  },
  {
    id: "15",
    name: "Cat Companions",
    type: "shelter",
    address: "777 Palm Avenue",
    city: "Marina Del Rey",
    state: "CA",
    zipCode: "90224",
    phone: "(555) 765-4321",
    website: "catcompanions.org",
    email: "adopt@catcompanions.org",
    distance: 15.6,
    latitude: 33.979173,
    longitude: -118.451346,
    hours: {
      monday: "Closed",
      tuesday: "12:00 PM - 6:00 PM",
      wednesday: "12:00 PM - 6:00 PM",
      thursday: "12:00 PM - 6:00 PM",
      friday: "12:00 PM - 6:00 PM",
      saturday: "10:00 AM - 5:00 PM",
      sunday: "10:00 AM - 5:00 PM"
    },
    imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800&h=600&fit=crop"
  }
];
