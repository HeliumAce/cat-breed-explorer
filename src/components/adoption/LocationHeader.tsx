
import { useState } from "react";
import { SlidersHorizontal, ArrowDownAZ, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface LocationHeaderProps {
  onSortChange: (sort: string) => void;
  onFilterChange: (filters: string[]) => void;
  activeFilters: string[];
}

export function LocationHeader({ onSortChange, onFilterChange, activeFilters }: LocationHeaderProps) {
  const [activeSort, setActiveSort] = useState<string>("distance");

  const handleSortChange = (sort: string) => {
    setActiveSort(sort);
    onSortChange(sort);
  };

  const handleFilterToggle = (filter: string) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter];
    
    onFilterChange(newFilters);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">Locations Near You</h2>
      
      <div className="flex gap-2">
        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              className={activeSort === "distance" ? "bg-amber-50" : ""}
              onClick={() => handleSortChange("distance")}
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Distance
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={activeSort === "name" ? "bg-amber-50" : ""}
              onClick={() => handleSortChange("name")}
            >
              <ArrowDownAZ className="w-4 h-4 mr-2" />
              Name
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={activeSort === "type" ? "bg-amber-50" : ""}
              onClick={() => handleSortChange("type")}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Type
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filter
              {activeFilters.length > 0 && (
                <Badge className="ml-1 bg-amber-100 text-amber-800 hover:bg-amber-200">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              className={activeFilters.includes("shelter") ? "bg-blue-50" : ""}
              onClick={() => handleFilterToggle("shelter")}
            >
              Animal Shelters
              {activeFilters.includes("shelter") && (
                <Badge className="ml-auto bg-blue-100 text-blue-800">✓</Badge>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={activeFilters.includes("humane_society") ? "bg-green-50" : ""}
              onClick={() => handleFilterToggle("humane_society")}
            >
              Humane Societies
              {activeFilters.includes("humane_society") && (
                <Badge className="ml-auto bg-green-100 text-green-800">✓</Badge>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={activeFilters.includes("pet_store") ? "bg-amber-50" : ""}
              onClick={() => handleFilterToggle("pet_store")}
            >
              Pet Stores
              {activeFilters.includes("pet_store") && (
                <Badge className="ml-auto bg-amber-100 text-amber-800">✓</Badge>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
