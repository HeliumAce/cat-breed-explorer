
import { Location, LocationType } from "../types.ts";

// Generate fallback locations around the user's position
export function getFallbackLocations(
  userLat: number, 
  userLng: number, 
  locationType?: LocationType
): Location[] {
  const allFallbackLocations = [
    // Shelters
    {
      id: "fallback-shelter-1",
      name: "Happy Paws Animal Shelter",
      type: "shelter" as LocationType,
      address: "123 Main Street, Anytown",
      location: { lat: userLat + 0.01, lng: userLng + 0.01 },
      distance: 1.2,
      open: true,
      phone: "555-123-4567",
      rating: 4.8
    },
    {
      id: "fallback-shelter-2",
      name: "Second Chance Cat Rescue",
      type: "shelter" as LocationType,
      address: "321 Oak Avenue, Parkside",
      location: { lat: userLat - 0.02, lng: userLng + 0.02 },
      distance: 2.8,
      open: true,
      phone: "555-456-7890",
      rating: 4.9
    },
    {
      id: "fallback-shelter-3",
      name: "Feline Friends Rescue",
      type: "shelter" as LocationType,
      address: "159 Cedar Lane, Northend",
      location: { lat: userLat + 0.015, lng: userLng - 0.025 },
      distance: 2.5,
      open: true,
      phone: "555-789-0123",
      rating: 4.5
    },
    {
      id: "fallback-shelter-4",
      name: "Whiskers Rescue Center",
      type: "shelter" as LocationType,
      address: "567 Pine Street, Eastside",
      location: { lat: userLat - 0.03, lng: userLng + 0.035 },
      distance: 3.3,
      open: true,
      phone: "555-234-5678",
      rating: 4.7
    },
    // Humane societies
    {
      id: "fallback-humane-1",
      name: "Coastal Humane Society",
      type: "humane" as LocationType,
      address: "456 Ocean Drive, Seaside",
      location: { lat: userLat - 0.01, lng: userLng - 0.02 },
      distance: 2.3,
      open: true,
      phone: "555-234-5678",
      rating: 4.6
    },
    {
      id: "fallback-humane-2",
      name: "Valley Humane Society",
      type: "humane" as LocationType,
      address: "654 Mountain Road, Hillcrest",
      location: { lat: userLat + 0.03, lng: userLng + 0.03 },
      distance: 3.4,
      open: true,
      phone: "555-567-8901",
      rating: 4.7
    },
    {
      id: "fallback-humane-3",
      name: "Metropolitan SPCA",
      type: "humane" as LocationType,
      address: "789 Broadway, Downtown",
      location: { lat: userLat + 0.02, lng: userLng - 0.03 },
      distance: 2.7,
      open: true,
      phone: "555-111-2222",
      rating: 4.8
    },
    // Pet stores
    {
      id: "fallback-store-1",
      name: "Pawsome Pet Supplies",
      type: "store" as LocationType,
      address: "789 Market Street, Downtown",
      location: { lat: userLat + 0.02, lng: userLng - 0.01 },
      distance: 1.9,
      open: false,
      phone: "555-345-6789",
      rating: 4.2
    },
    {
      id: "fallback-store-2",
      name: "Cat Corner Pet Shop",
      type: "store" as LocationType,
      address: "987 Pine Street, Westside",
      location: { lat: userLat - 0.03, lng: userLng - 0.03 },
      distance: 3.8,
      open: false,
      phone: "555-678-9012",
      rating: 4.0
    },
    {
      id: "fallback-store-3",
      name: "Meow & More Supplies",
      type: "store" as LocationType,
      address: "753 Elm Street, Eastside",
      location: { lat: userLat - 0.025, lng: userLng + 0.015 },
      distance: 2.9,
      open: true,
      phone: "555-890-1234",
      rating: 4.1
    }
  ];

  // Filter by type if requested
  if (locationType && locationType !== 'all') {
    return allFallbackLocations.filter(location => location.type === locationType);
  }
  
  return allFallbackLocations;
}
