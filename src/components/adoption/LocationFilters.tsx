
import { useState } from "react";
import { SlidersHorizontal, ArrowDownAZ, ArrowUpDown, Home, Building, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
    <div className="bg-white border border-amber-100 rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex flex-col space-y-4">
        {/* Location input */}
        <div>
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

        <Separator className="bg-amber-100" />

        {/* Sort options */}
        <div>
          <div className="flex items-center mb-2">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Sort By</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              className={cn(
                "text-xs h-8",
                activeSort === "distance" && "bg-amber-50 border-amber-200"
              )}
              onClick={() => handleSortChange("distance")}
            >
              <ArrowUpDown className="w-3 h-3 mr-1" />
              Distance
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className={cn(
                "text-xs h-8",
                activeSort === "name" && "bg-amber-50 border-amber-200"
              )}
              onClick={() => handleSortChange("name")}
            >
              <ArrowDownAZ className="w-3 h-3 mr-1" />
              Name
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className={cn(
                "text-xs h-8",
                activeSort === "type" && "bg-amber-50 border-amber-200"
              )}
              onClick={() => handleSortChange("type")}
            >
              <SlidersHorizontal className="w-3 h-3 mr-1" />
              Type
            </Button>
          </div>
        </div>

        <Separator className="bg-amber-100" />

        {/* Filter options */}
        <div>
          <div className="flex items-center mb-2">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Filter By</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge
              className={cn(
                "cursor-pointer py-1 px-3",
                activeFilters.includes("shelter") 
                  ? "bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-200"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200"
              )}
              onClick={() => handleFilterToggle("shelter")}
            >
              <Home className="w-3 h-3 mr-1" />
              Shelters
            </Badge>
            
            <Badge
              className={cn(
                "cursor-pointer py-1 px-3",
                activeFilters.includes("humane_society") 
                  ? "bg-green-100 hover:bg-green-200 text-green-800 border-green-200"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200"
              )}
              onClick={() => handleFilterToggle("humane_society")}
            >
              <Building className="w-3 h-3 mr-1" />
              Humane Societies
            </Badge>
            
            <Badge
              className={cn(
                "cursor-pointer py-1 px-3",
                activeFilters.includes("pet_store") 
                  ? "bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-200"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200"
              )}
              onClick={() => handleFilterToggle("pet_store")}
            >
              <Store className="w-3 h-3 mr-1" />
              Pet Stores
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
