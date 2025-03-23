
import { Button } from "@/components/ui/button";
import { AdoptionLocation, LocationType } from "@/types/adoption";
import { LocationTypeFilter } from "@/components/adoption/LocationTypeFilter";
import { LocationList } from "@/components/adoption/LocationList";
import { LoadingInline } from "@/components/Loading";
import { AlertCircle, Cat } from "lucide-react";

interface AdoptionLocationsSidebarProps {
  locations: AdoptionLocation[];
  isMapCollapsed: boolean;
  toggleMapCollapse: () => void;
  typeFilter: LocationType | 'all';
  onFilterChange: (type: LocationType | 'all') => void;
  selectedLocation: AdoptionLocation | null;
  setSelectedLocation: (location: AdoptionLocation | null) => void;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

export const AdoptionLocationsSidebar = ({
  locations,
  isMapCollapsed,
  toggleMapCollapse,
  typeFilter,
  onFilterChange,
  selectedLocation,
  setSelectedLocation,
  isLoading,
  isError,
  onRetry
}: AdoptionLocationsSidebarProps) => {
  return (
    <div className={`lg:col-span-${isMapCollapsed ? '3' : '1'} transition-all duration-300`}>
      <div className="bg-white rounded-lg border border-amber-100 shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Adoption Locations</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleMapCollapse}
            className="hidden lg:block"
          >
            {isMapCollapsed ? 'Show Map' : 'Hide Map'}
          </Button>
        </div>
        
        <LocationTypeFilter
          onFilterChange={onFilterChange}
          currentFilter={typeFilter}
        />
        
        {isLoading && (
          <div className="flex justify-center py-8">
            <LoadingInline />
          </div>
        )}
        
        {isError && (
          <div className="text-center py-8">
            <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
            <h3 className="font-medium text-lg mb-1">Error Loading Locations</h3>
            <p className="text-muted-foreground">
              We couldn't load adoption locations. Please try again later.
            </p>
            <Button 
              onClick={onRetry} 
              variant="outline"
              className="mt-4"
            >
              Retry
            </Button>
          </div>
        )}
        
        {!isLoading && !isError && locations.length === 0 && (
          <div className="text-center py-8">
            <Cat className="h-10 w-10 text-amber-500 mx-auto mb-2" />
            <h3 className="font-medium text-lg mb-1">No Locations Found</h3>
            <p className="text-muted-foreground">
              {typeFilter !== 'all' 
                ? `We couldn't find any ${typeFilter === 'shelter' ? 'shelters' : typeFilter === 'humane' ? 'humane societies' : 'pet stores'} near you.`
                : "We couldn't find any adoption locations near you."}
            </p>
            <p className="text-muted-foreground mt-1">
              Try expanding your search or changing filters.
            </p>
          </div>
        )}
        
        {!isLoading && !isError && locations.length > 0 && (
          <LocationList
            locations={locations}
            onSelectLocation={setSelectedLocation}
            selectedLocation={selectedLocation}
          />
        )}
      </div>
    </div>
  );
};
