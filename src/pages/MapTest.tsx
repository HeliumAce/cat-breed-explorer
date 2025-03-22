
import React, { useState, useEffect } from "react";
import { PageTransition } from "@/components/PageTransition";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Map } from "lucide-react";
import { toast } from "sonner";
import { useGeolocation } from "@/hooks/use-geolocation";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "0.5rem",
};

// Define libraries correctly for the Maps API
const libraries: ["places"] = ["places"];

const MapTest = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [isKeySubmitted, setIsKeySubmitted] = useState<boolean>(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [loadRetries, setLoadRetries] = useState(0);
  const location = useGeolocation();
  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  });

  // Use geolocation if available, otherwise default to Los Angeles
  const center = location.latitude && location.longitude 
    ? { lat: location.latitude, lng: location.longitude }
    : { lat: 34.052235, lng: -118.243683 }; // Los Angeles

  useEffect(() => {
    // Log the status to help with debugging
    if (isKeySubmitted) {
      console.log("Map loading status:", { 
        isLoaded, 
        loadError, 
        mapState: map ? "Map instance created" : "No map instance", 
        windowGoogleStatus: window.google ? "Google object exists" : "No Google object",
        currentCenter: center,
        retryCount: loadRetries
      });
      
      if (loadError) {
        const errorMessage = loadError instanceof Error 
          ? loadError.message 
          : "Unknown error loading maps";
        
        console.error("Map load error:", errorMessage);
        toast.error("Failed to load Google Maps: " + errorMessage);
        setMapError(errorMessage);
      } else if (isLoaded) {
        toast.success("Google Maps API loaded successfully!");
        setMapError(null);
        
        // Check if the map instance is created after a short delay
        setTimeout(() => {
          if (!map && loadRetries < 3) {
            console.log("Map instance not created yet, forcing re-render");
            setLoadRetries(prev => prev + 1);
          }
        }, 2000);
      }
    }
  }, [isLoaded, loadError, isKeySubmitted, map, center, loadRetries]);

  const handleSubmitKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setIsKeySubmitted(true);
      setMapError(null);
      setLoadRetries(0);
      toast.info("Attempting to load Google Maps...");
      
      // Force clear previous Google Maps state
      if (window.google && window.google.maps) {
        console.log("Clearing previous Google Maps state");
        // This is a workaround to force reload the API
        // @ts-ignore - Intentionally modifying window.google for cleanup
        delete window.google.maps;
      }
    } else {
      toast.error("Please enter a valid API key");
    }
  };

  const onMapLoad = (mapInstance: google.maps.Map) => {
    console.log("Map instance loaded successfully", mapInstance);
    setMap(mapInstance);
    
    try {
      // Add a marker to show that the map is working
      new google.maps.Marker({
        position: center,
        map: mapInstance,
        title: "Your Location"
      });
      
      console.log("Marker added at", center);
    } catch (err) {
      console.error("Error adding marker:", err);
    }
  };

  const resetApiKey = () => {
    setIsKeySubmitted(false);
    setApiKey("");
    setMap(null);
    setMapError(null);
    setLoadRetries(0);
  };

  // Handle specific error cases or map initialization issues
  const renderErrorHelp = () => {
    if (!mapError) return null;
    
    let helpText = "Try checking:";
    
    if (mapError.includes("API key")) {
      helpText += " Is your API key valid and has the Maps JavaScript API enabled?";
    } else if (mapError.includes("library")) {
      helpText += " There might be an issue with the Places library. Try again without it.";
    } else if (mapError.includes("script")) {
      helpText += " The script failed to load. Check your network connection or try again later.";
    }
    
    return (
      <div className="mt-3 text-sm text-amber-700">
        {helpText}
      </div>
    );
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-8 space-x-2">
            <Map className="h-6 w-6" />
            <h1 className="text-3xl font-bold">Google Maps Test</h1>
          </div>

          {!isKeySubmitted ? (
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Google Maps API Key</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitKey} className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      This is a simple test page to verify your Google Maps API key is working correctly.
                      Your API key will only be stored in memory and not saved anywhere.
                    </p>
                    <Input
                      placeholder="Paste your Google Maps API key here"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button type="submit">Load Map</Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  {loadError ? (
                    <div className="bg-red-50 p-4 rounded-lg flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-red-800">Map failed to load</h3>
                        <p className="text-sm text-red-700 mt-1">
                          {mapError || "There was an error loading Google Maps with your API key. Please check that your key is correct and has the proper permissions."}
                        </p>
                        {renderErrorHelp()}
                      </div>
                    </div>
                  ) : !isLoaded ? (
                    <div className="h-[400px] flex items-center justify-center bg-slate-50 rounded-lg">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600 mx-auto mb-3"></div>
                        <p className="text-muted-foreground">Loading map...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={12}
                        onLoad={onMapLoad}
                        options={{
                          mapTypeControl: true,
                          streetViewControl: true,
                          fullscreenControl: true,
                        }}
                      >
                        <Marker position={center} />
                      </GoogleMap>
                      
                      {/* Overlay to check if map container is rendering */}
                      {!map && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-50/70 rounded-lg">
                          <p className="text-amber-700">Map container loaded but no map displayed. Check console for errors.</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={resetApiKey}>
                  Try Different API Key
                </Button>
                <Button 
                  variant="default" 
                  onClick={() => window.open("https://console.cloud.google.com/google/maps-apis/", "_blank")}
                >
                  Google Cloud Console
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default MapTest;
