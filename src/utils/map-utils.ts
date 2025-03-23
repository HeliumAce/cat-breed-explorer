
export const getMarkerIconByType = (type: string): string => {
  switch (type) {
    case "shelter":
      return "/marker-shelter.png";
    case "humane":
      return "/marker-humane.png";
    case "store":
      return "/marker-store.png";
    default:
      return "/marker-default.png";
  }
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
    title: "Your Location"
  });
};
