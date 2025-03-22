
import React, { useState, useEffect } from "react";
import { PageTransition } from "@/components/PageTransition";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Map } from "lucide-react";
import { toast } from "sonner";

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
  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  });

  // Center on Los Angeles by default
  const center = {
    lat: 34.052235,
    lng: -118.243683,
  };

  useEffect(() => {
    // Log the status to help with debugging
    if (isKeySubmitted) {
      console.log("Map loading status:", { isLoaded, loadError });
      
      if (loadError) {
        toast.error("Failed to load Google Maps with the provided API key.");
      } else if (isLoaded) {
        toast.success("Google Maps API loaded successfully!");
      }
    }
  }, [isLoaded, loadError, isKeySubmitted]);

  const handleSubmitKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setIsKeySubmitted(true);
      toast.info("Attempting to load Google Maps...");
    } else {
      toast.error("Please enter a valid API key");
    }
  };

  const onMapLoad = (mapInstance: google.maps.Map) => {
    console.log("Map loaded successfully");
    setMap(mapInstance);
    
    // Add a marker to show that the map is working
    new google.maps.Marker({
      position: center,
      map: mapInstance,
      title: "Los Angeles"
    });
  };

  const resetApiKey = () => {
    setIsKeySubmitted(false);
    setApiKey("");
    setMap(null);
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
                          {loadError.message || "There was an error loading Google Maps with your API key. Please check that your key is correct and has the proper permissions."}
                        </p>
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
