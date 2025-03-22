
import { useState } from "react";
import { SlidersHorizontal, ArrowDownAZ, ArrowUpDown, Home, Building, Store, Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface LocationFiltersProps {
  onSortChange: (sort: string) => void;
  onFilterChange: (filters: string[]) => void;
  onZipCodeChange: (zipCode: string) => void;
  hasUserLocation?: boolean;
}

export function LocationFilters({ 
  onSortChange, 
  onFilterChange, 
  onZipCodeChange,
  hasUserLocation = false
}: LocationFiltersProps) {
  const [activeSort, setActiveSort] = useState<string>("distance");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [zipCode, setZipCode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSortChange = (sort: string) => {
    setActiveSort(sort);
    onSortChange(sort);
  };

  const handleFilterToggle = (filter: string) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter];
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setZipCode(value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!zipCode && !address) {
      toast.error("Please enter a ZIP code or address");
      return;
    }
    
    setIsSearching(true);
    
    // In a real app, we would geocode the address or ZIP code here
    // For this demo, we'll just use the ZIP code as is
    if (zipCode) {
      onZipCodeChange(zipCode);
      toast.success(`Showing results for ${zipCode}`);
    } else if (address) {
      onZipCodeChange(address);
      toast.success(`Showing results for "${address}"`);
    }
    
    setIsSearching(false);
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Location input */}
      <div className="bg-white border border-amber-100 rounded-lg p-4 shadow-sm">
        <form onSubmit={handleSearch} className="space-y-3">
          <div>
            <Label htmlFor="location" className="text-sm font-medium mb-1.5 block">
              Your Location
            </Label>
            <div className="flex gap-2">
              <Input
                id="address"
                type="text"
                placeholder="Enter address or city"
                className="w-full"
                value={address}
                onChange={handleAddressChange}
              />
              <Button 
                type="submit" 
                size="sm" 
                className="shrink-0 bg-amber-500 hover:bg-amber-600"
                disabled={isSearching}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <Label htmlFor="zipCode" className="text-sm font-medium mb-1.5 block">
              ZIP Code
            </Label>
            <Input
              id="zipCode"
              type="text"
              placeholder="Enter ZIP code"
              className="w-full"
              value={zipCode}
              onChange={handleZipCodeChange}
            />
          </div>
          
          <div className="flex items-center gap-2 pt-1">
            {hasUserLocation && (
              <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Using your location
              </Badge>
            )}
            <p className="text-xs text-muted-foreground">
              {hasUserLocation 
                ? "We're showing adoption centers near your current location" 
                : "Enter your location to find nearby adoption centers"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
