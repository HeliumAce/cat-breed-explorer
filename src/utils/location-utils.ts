/**
 * Utility functions for location-based operations
 */

/**
 * Calculates the distance between two points on Earth using the Haversine formula
 * 
 * @param lat1 Latitude of the first point in decimal degrees
 * @param lng1 Longitude of the first point in decimal degrees
 * @param lat2 Latitude of the second point in decimal degrees
 * @param lng2 Longitude of the second point in decimal degrees
 * @returns Distance in miles
 */
export function calculateDistance(
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): number {
  // Convert latitude and longitude from degrees to radians
  const radLat1 = (Math.PI * lat1) / 180;
  const radLon1 = (Math.PI * lng1) / 180;
  const radLat2 = (Math.PI * lat2) / 180;
  const radLon2 = (Math.PI * lng2) / 180;

  // Haversine formula
  const dLon = radLon2 - radLon1;
  const dLat = radLat2 - radLat1;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  // Earth's radius in miles
  const R = 3956;
  
  // Distance in miles
  return R * c;
}

/**
 * Updates location distances based on user's current location
 * 
 * @param locations Array of adoption locations
 * @param userLat User's latitude
 * @param userLng User's longitude
 * @returns Updated locations with calculated distances
 */
export function updateLocationDistances(
  locations: any[],
  userLat: number,
  userLng: number
) {
  if (!userLat || !userLng) return locations;

  console.log(`Updating distances for ${locations.length} locations using coordinates: ${userLat}, ${userLng}`);
  
  return locations.map((location) => {
    const distance = calculateDistance(
      userLat,
      userLng,
      location.latitude,
      location.longitude
    );

    return {
      ...location,
      distance: Number(distance.toFixed(1))
    };
  });
}

/**
 * Returns a human-readable label for a location type
 * 
 * @param type The location type 
 * @returns A human-readable label
 */
export function getLocationTypeLabel(type: string) {
  switch (type) {
    case "shelter":
      return "Animal Shelter";
    case "humane_society":
      return "Humane Society";
    case "pet_store":
      return "Pet Store";
    default:
      return type;
  }
}
