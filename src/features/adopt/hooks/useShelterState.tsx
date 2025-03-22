
import { useState } from "react";
import { SortOption, FilterOptions } from "@/types/shelters";

export function useShelterState() {
  const [selectedShelterId, setSelectedShelterId] = useState<string | null>(null);
  const [expandedListView, setExpandedListView] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("distance");
  const [filters, setFilters] = useState<FilterOptions>({
    openNow: false,
    acceptsCats: true, // Set this to true by default
    noKill: false,
  });

  const updateFilters = (filterKey: keyof FilterOptions) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey]
    }));
  };

  const toggleListView = () => {
    setExpandedListView(!expandedListView);
  };

  return {
    selectedShelterId,
    setSelectedShelterId,
    expandedListView,
    setExpandedListView,
    sortBy,
    setSortBy,
    filters,
    updateFilters,
    toggleListView
  };
}
