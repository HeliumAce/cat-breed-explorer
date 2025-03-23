
import { LoadingInline } from "@/components/Loading";
import { AlertCircle } from "lucide-react";

interface MapLoadingStateProps {
  isLoading: boolean;
  googleMapsLoading: boolean;
  mapLoaded: boolean;
  error: string | null;
}

export function MapLoadingState({ 
  isLoading, 
  googleMapsLoading, 
  mapLoaded, 
  error 
}: MapLoadingStateProps) {
  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
        <LoadingInline />
      </div>
    );
  }
  
  if (googleMapsLoading && !mapLoaded && !isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
        <div className="text-center p-4">
          <LoadingInline />
          <p className="mt-2">Loading Google Maps...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
        <div className="text-center p-4">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }
  
  return null;
}
