
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { BreedWithImage } from '@/types/breeds';
import { fetchBreeds, fetchBreedById } from '@/services/breed-service';
import { generateFunFacts, generateBondingTips } from '@/utils/breed-utils';

// Hook to fetch all breeds with optional search filtering
export function useBreeds(searchTerm: string = '') {
  const {
    data: breeds,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['breeds'],
    queryFn: fetchBreeds,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Filter breeds based on search term
  const filteredBreeds = breeds?.filter(breed => {
    if (!searchTerm) return true;
    
    const search = searchTerm.toLowerCase();
    return (
      breed.name.toLowerCase().includes(search) ||
      breed.temperament?.toLowerCase().includes(search) ||
      breed.origin?.toLowerCase().includes(search) ||
      breed.description?.toLowerCase().includes(search)
    );
  });

  useEffect(() => {
    if (error) {
      toast.error('Failed to load cat breeds. Please try again later.');
      console.error('Error fetching breeds:', error);
    }
  }, [error]);

  return {
    breeds: filteredBreeds || [],
    isLoading,
    error,
    refetch
  };
}

// Hook to fetch a single breed by ID
export function useBreedDetail(breedId: string) {
  const {
    data: breed,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['breed', breedId],
    queryFn: () => fetchBreedById(breedId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: !!breedId
  });

  useEffect(() => {
    if (error) {
      toast.error('Failed to load breed details. Please try again later.');
      console.error('Error fetching breed details:', error);
    }
  }, [error]);

  return {
    breed,
    isLoading,
    error,
    refetch
  };
}

// Re-export utility functions so they're available from the same import
export { generateFunFacts, generateBondingTips };
