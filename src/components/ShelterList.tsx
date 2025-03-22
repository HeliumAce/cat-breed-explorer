
import { useMemo } from 'react';
import { Shelter, SortOption, FilterOptions } from '@/types/shelters';
import { Button } from '@/components/ui/button';
import { LoadingInline } from '@/components/Loading';
import { Card } from '@/components/ui/card';
import {
  MapPin,
  Phone,
  Globe,
  Star,
  Clock,
  Share2,
  ExternalLink,
  Filter,
  SortAsc,
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ShelterListProps {
  shelters: Shelter[];
  isLoading: boolean;
  error: Error | null;
  selectedShelterId: string | null;
  onShelterSelect: (id: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  filters: FilterOptions;
  onFilterChange: (filterKey: keyof FilterOptions) => void;
}

const ShelterList = ({
  shelters,
  isLoading,
  error,
  selectedShelterId,
  onShelterSelect,
  sortBy,
  onSortChange,
  filters,
  onFilterChange,
}: ShelterListProps) => {

  // Apply sorting and filtering
  const processedShelters = useMemo(() => {
    let result = [...shelters];

    // Apply filters
    if (filters.openNow) {
      result = result.filter(shelter => shelter.isOpen);
    }
    if (filters.acceptsCats) {
      result = result.filter(shelter => shelter.acceptsCats);
    }
    if (filters.noKill) {
      result = result.filter(shelter => shelter.noKill);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return result;
  }, [shelters, sortBy, filters]);

  // Format distance for display
  const formatDistance = (distance: number) => {
    return distance < 1 
      ? `${(distance * 1000).toFixed(0)} m` 
      : `${distance.toFixed(1)} km`;
  };

  // Handle phone call
  const handleCall = (phone?: string) => {
    if (phone) {
      window.location.href = `tel:${phone.replace(/\D/g, '')}`;
    }
  };

  // Handle get directions
  const handleGetDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };

  // Handle share shelter
  const handleShare = (shelter: Shelter) => {
    if (navigator.share) {
      navigator.share({
        title: shelter.name,
        text: `Check out ${shelter.name} for adopting a cat!`,
        url: shelter.website || `https://maps.google.com/?q=${encodeURIComponent(shelter.address)}`,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(
        `${shelter.name}\n${shelter.address}\n${shelter.phone || ''}\n${shelter.website || ''}`
      ).then(() => {
        alert('Shelter information copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Filters and sorting header */}
      <div className="p-4 border-b flex justify-between items-center">
        <div className="text-lg font-medium">
          {processedShelters.length} {processedShelters.length === 1 ? 'Shelter' : 'Shelters'} Found
        </div>

        <div className="flex items-center space-x-2">
          {/* Filter dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter size={14} className="mr-1" /> Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox 
                    id="open-now" 
                    checked={filters.openNow}
                    onCheckedChange={() => onFilterChange('openNow')}
                  />
                  <Label htmlFor="open-now">Open Now</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox 
                    id="accepts-cats" 
                    checked={filters.acceptsCats}
                    onCheckedChange={() => onFilterChange('acceptsCats')}
                  />
                  <Label htmlFor="accepts-cats">Accepts Cats</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="no-kill" 
                    checked={filters.noKill}
                    onCheckedChange={() => onFilterChange('noKill')}
                  />
                  <Label htmlFor="no-kill">No-Kill Shelter</Label>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SortAsc size={14} className="mr-1" /> Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onSortChange('distance')}>
                Distance {sortBy === 'distance' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSortChange('rating')}>
                Rating {sortBy === 'rating' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSortChange('alphabetical')}>
                Alphabetical {sortBy === 'alphabetical' && '✓'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* List content */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <LoadingInline text="Loading shelters..." />
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-destructive">Failed to load shelters. Please try again.</p>
          </div>
        ) : processedShelters.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No shelters found with the current filters.</p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {processedShelters.map(shelter => (
              <Card
                key={shelter.id}
                className={cn(
                  "p-4 hover:bg-amber-50/50 transition-colors cursor-pointer",
                  selectedShelterId === shelter.id && "bg-amber-50 border-amber-200"
                )}
                onClick={() => onShelterSelect(shelter.id)}
              >
                {/* Shelter header */}
                <div className="flex justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-lg">{shelter.name}</h3>
                    <div className="flex items-center text-muted-foreground text-sm mt-1">
                      {shelter.rating && (
                        <div className="flex items-center mr-3">
                          <Star size={14} className="text-amber-500 mr-1 fill-amber-500" />
                          <span>{shelter.rating}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{shelter.isOpen ? 'Open Now' : 'Closed'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-amber-600">{formatDistance(shelter.distance)}</div>
                  </div>
                </div>

                {/* Shelter details */}
                <div className="text-sm space-y-1.5 mb-3">
                  <div className="flex items-start">
                    <MapPin size={14} className="mr-2 mt-0.5 text-muted-foreground shrink-0" />
                    <span>{shelter.address}</span>
                  </div>
                  {shelter.phone && (
                    <div className="flex items-center">
                      <Phone size={14} className="mr-2 text-muted-foreground shrink-0" />
                      <span>{shelter.phone}</span>
                    </div>
                  )}
                  {shelter.website && (
                    <div className="flex items-center">
                      <Globe size={14} className="mr-2 text-muted-foreground shrink-0" />
                      <a 
                        href={shelter.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-amber-600 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {shelter.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                      </a>
                    </div>
                  )}
                </div>

                {/* Tags/features */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {shelter.acceptsCats && (
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      Accepts Cats
                    </span>
                  )}
                  {shelter.noKill && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      No-Kill Shelter
                    </span>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGetDirections(shelter.address);
                    }}
                  >
                    Get Directions
                  </Button>
                  
                  {shelter.phone && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCall(shelter.phone);
                      }}
                    >
                      <Phone size={14} className="mr-1" /> Call
                    </Button>
                  )}
                  
                  {shelter.website && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(shelter.website, '_blank');
                      }}
                    >
                      <ExternalLink size={14} className="mr-1" /> Visit
                    </Button>
                  )}
                  
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(shelter);
                    }}
                  >
                    <Share2 size={14} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShelterList;
