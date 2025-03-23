

export const getMarkerIconByType = (type: string): google.maps.Symbol => {
  console.log(`Getting icon for location type: ${type}`);
  
  // Create a standard symbol with color based on location type
  const symbol: google.maps.Symbol = {
    path: window.google.maps.SymbolPath.CIRCLE,
    scale: 10,
    fillOpacity: 1,
    strokeWeight: 2,
    strokeColor: "#FFFFFF"
  };
  
  // Set color based on location type
  switch (type) {
    case "shelter":
      symbol.fillColor = "#4CAF50"; // Green for shelters
      break;
    case "humane":
      symbol.fillColor = "#2196F3"; // Blue for humane societies
      break;
    case "store":
      symbol.fillColor = "#FF9800"; // Orange for stores
      break;
    default:
      symbol.fillColor = "#9E9E9E"; // Gray for unknown types
  }
  
  return symbol;
};

export const createUserLocationMarker = (map: google.maps.Map, position: google.maps.LatLngLiteral): google.maps.Marker => {
  return new window.google.maps.Marker({
    position,
    map,
    icon: {
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 8,
      fillColor: "#4F46E5",
      fillOpacity: 1,
      strokeColor: "#FFFFFF",
      strokeWeight: 2
    },
    title: "Your Location",
    zIndex: 999 // Ensure user marker is on top
  });
};

