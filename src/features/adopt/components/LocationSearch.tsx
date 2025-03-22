
import { ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Search, AlertCircle, Locate } from "lucide-react";
import { LoadingInline } from "@/components/Loading";
import { Location } from "@/types/shelters";
import { toast } from "sonner";

interface LocationSearchProps {
  isLocating: boolean;
  locationError: string | null;
  onRequestLocation: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  inputValue: string;
  setInputValue: (value: string) => void;
  onSearchButtonClick: () => void;
  isAutocompleteLoaded: boolean;
}

const LocationSearch = ({
  isLocating,
  locationError,
  onRequestLocation,
  inputRef,
  inputValue,
  setInputValue,
  onSearchButtonClick,
  isAutocompleteLoaded
}: LocationSearchProps) => {
  return (
    <Card className="p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="w-full sm:w-auto flex-1">
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              placeholder="Enter city or address..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLocating}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSearchButtonClick();
                }
              }}
            />
            <Button
              onClick={onSearchButtonClick}
              disabled={!inputValue.trim() || isLocating}
            >
              <Search size={16} className="mr-2" /> Search
            </Button>
          </div>
          {locationError && (
            <Alert variant="default" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{locationError}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={onRequestLocation}
            disabled={isLocating}
          >
            <Locate size={16} className="mr-2" /> Use My Location
          </Button>
        </div>
      </div>

      {isLocating && (
        <div className="mt-4">
          <LoadingInline text="Locating..." />
        </div>
      )}
    </Card>
  );
};

export default LocationSearch;
