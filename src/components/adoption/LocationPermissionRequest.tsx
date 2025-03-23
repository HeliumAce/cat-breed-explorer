
import { MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface LocationPermissionRequestProps {
  status: 'loading' | 'granted' | 'denied' | 'prompt';
  onRequestLocation: () => void;
  onManualLocation: (address: string) => void;
  manualAddress: string;
  setManualAddress: (address: string) => void;
}

export function LocationPermissionRequest({
  status,
  onRequestLocation,
  onManualLocation,
  manualAddress,
  setManualAddress
}: LocationPermissionRequestProps) {
  const [showManualInput, setShowManualInput] = useState(status === 'denied');

  const handleSubmitAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualAddress.trim()) {
      onManualLocation(manualAddress);
    }
  };

  if (status === 'granted') {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-amber-100 rounded-lg p-4 shadow-sm mb-6"
    >
      {status === 'loading' ? (
        <div className="flex items-center justify-center p-4">
          <div className="animate-pulse flex gap-2 items-center">
            <MapPin className="h-5 w-5 text-amber-500" />
            <span>Getting your location...</span>
          </div>
        </div>
      ) : (
        <div>
          {!showManualInput ? (
            <div className="text-center">
              <MapPin className="h-12 w-12 text-amber-500 mx-auto mb-2" />
              <h3 className="text-lg font-medium mb-2">Allow Location Access</h3>
              <p className="text-muted-foreground mb-4">
                We need your location to find nearby adoption centers
              </p>
              <div className="flex justify-center gap-3">
                <Button
                  onClick={onRequestLocation}
                  className="bg-amber-500 hover:bg-amber-600"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Allow Location
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowManualInput(true)}
                >
                  Enter Manually
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-medium">Enter Your Location</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (status !== 'denied') {
                      setShowManualInput(false);
                    }
                  }}
                  disabled={status === 'denied'}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <form onSubmit={handleSubmitAddress} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter city, zip code, or address"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
                  Search
                </Button>
              </form>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
