
import { useState } from "react";
import { SlidersHorizontal, ArrowDownAZ, ArrowUpDown, Home, Building, Store, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LocationFiltersProps {
  onSortChange: (sort: string) => void;
  onFilterChange: (filters: string[]) => void;
  onZipCodeChange: (zipCode: string) => void;
}

export function LocationFilters({ onSortChange, onFilterChange, onZipCodeChange }: LocationFiltersProps) {
  const [activeSort, setActiveSort] = useState<string>("distance");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [zipCode, setZipCode] = useState<string>("");
  const [address, setAddress] = useState<string>("");

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
    onZipCodeChange(value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically geocode the address to coordinates
    // Then use those coordinates to filter locations by distance
    onZipCodeChange(zipCode || address);
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
              <Button type="submit" size="sm" className="shrink-0 bg-amber-500 hover:bg-amber-600">
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
          
          <p className="text-xs text-muted-foreground mt-1">
            Enter your location to find nearby adoption centers, or allow browser location access
          </p>
        </form>
      </div>
      
      {/* Sort and Filter buttons - These will be moved to the list header */}
      <div className="hidden">
        {/* These controls will be moved to LocationHeader component */}
        <Button onClick={() => handleSortChange("distance")}>Distance</Button>
        <Button onClick={() => handleFilterToggle("shelter")}>Shelters</Button>
      </div>
    </div>
  );
}
