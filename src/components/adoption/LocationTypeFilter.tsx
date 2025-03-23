
import { useState } from "react";
import { LocationType } from "@/types/adoption";
import { Home, Heart, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationTypeFilterProps {
  onFilterChange: (type: LocationType | 'all') => void;
  currentFilter: LocationType | 'all';
}

export function LocationTypeFilter({ onFilterChange, currentFilter }: LocationTypeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button
        size="sm"
        variant={currentFilter === 'all' ? "default" : "outline"}
        onClick={() => onFilterChange('all')}
        className={currentFilter === 'all' ? "bg-amber-500 hover:bg-amber-600" : ""}
      >
        All Locations
      </Button>
      
      <Button
        size="sm"
        variant={currentFilter === 'shelter' ? "default" : "outline"}
        onClick={() => onFilterChange('shelter')}
        className={currentFilter === 'shelter' ? "bg-red-500 hover:bg-red-600" : "text-red-500 hover:text-red-600"}
      >
        <Home className="h-4 w-4 mr-1" />
        Shelters
      </Button>
      
      <Button
        size="sm"
        variant={currentFilter === 'humane' ? "default" : "outline"}
        onClick={() => onFilterChange('humane')}
        className={currentFilter === 'humane' ? "bg-pink-500 hover:bg-pink-600" : "text-pink-500 hover:text-pink-600"}
      >
        <Heart className="h-4 w-4 mr-1" />
        Humane Societies
      </Button>
      
      <Button
        size="sm"
        variant={currentFilter === 'store' ? "default" : "outline"}
        onClick={() => onFilterChange('store')}
        className={currentFilter === 'store' ? "bg-amber-500 hover:bg-amber-600" : "text-amber-500 hover:text-amber-600"}
      >
        <ShoppingBag className="h-4 w-4 mr-1" />
        Pet Stores
      </Button>
    </div>
  );
}
