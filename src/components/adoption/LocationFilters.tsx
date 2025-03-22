
import { useState } from "react";
import { SlidersHorizontal, ArrowDownAZ, ArrowUpDown, Home, Building, Store } from "lucide-react";
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

  return (
    <div className="flex flex-col space-y-4">
      {/* Location input */}
      <div className="bg-white border border-amber-100 rounded-lg p-4 shadow-sm">
        <Label htmlFor="location" className="text-sm font-medium mb-1.5 block">
          Your Location
        </Label>
        <Input
          id="location"
          type="text"
          placeholder="Enter ZIP code or city"
          className="w-full"
          value={zipCode}
          onChange={handleZipCodeChange}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Enter your location to find nearby adoption centers
        </p>
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
