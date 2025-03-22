
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Breed, BreedWithImage } from '@/types/breeds';

// Free API key - this is a public key
const API_KEY = 'live_sLpYuUXHjzXh0l1A3tpqYvmFdXF3MHrJeAYdRCMTd5XeKbfHrKYQDNn73O4z0';
const API_URL = 'https://api.thecatapi.com/v1';

// Fallback image map for specific breeds that have issues with their images
const FALLBACK_IMAGES: Record<string, string> = {
  'ebur': 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800', // European Burmese
  'jbob': 'https://cdn2.thecatapi.com/images/xoI_fJqy7.jpg', // Japanese Bobtail
  'mala': 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800', // Malayan
};

// Function to fetch all breeds
const fetchBreeds = async (): Promise<BreedWithImage[]> => {
  const response = await fetch(`${API_URL}/breeds`, {
    headers: {
      'x-api-key': API_KEY
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cat breeds');
  }

  const breeds: Breed[] = await response.json();
  
  // Fetch images for breeds without image data
  const breedsWithImages = await Promise.all(
    breeds.map(async (breed) => {
      // If breed already has an image, use it
      if (breed.image) {
        return breed as BreedWithImage;
      }
      
      // Check if we have a fallback image for this breed
      if (FALLBACK_IMAGES[breed.id]) {
        return {
          ...breed,
          image: {
            id: `fallback-${breed.id}`,
            url: FALLBACK_IMAGES[breed.id],
            width: 800,
            height: 600
          }
        };
      }
      
      // Try to fetch image using reference_image_id
      if (breed.reference_image_id) {
        try {
          const imageResponse = await fetch(`${API_URL}/images/${breed.reference_image_id}`, {
            headers: {
              'x-api-key': API_KEY
            }
          });
          
          if (imageResponse.ok) {
            const imageData = await imageResponse.json();
            return {
              ...breed,
              image: {
                id: imageData.id,
                url: imageData.url,
                width: imageData.width || 800,
                height: imageData.height || 600
              }
            };
          }
        } catch (error) {
          console.error(`Failed to fetch image for breed ${breed.name}`, error);
        }
      }
      
      // Fallback - use a generic cat image based on breed ID's first character
      // This creates some visual variety in fallback images
      const fallbackIndex = breed.id.charCodeAt(0) % 3;
      const fallbackImages = [
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800', // Orange cat
        'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800', // Tabby cat
        'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800', // Black cat
      ];
      
      return {
        ...breed,
        image: {
          id: 'fallback-generic',
          url: fallbackImages[fallbackIndex],
          width: 800,
          height: 600
        }
      };
    })
  );

  return breedsWithImages;
};

// Function to fetch a single breed by ID
const fetchBreedById = async (breedId: string): Promise<BreedWithImage> => {
  const response = await fetch(`${API_URL}/breeds/${breedId}`, {
    headers: {
      'x-api-key': API_KEY
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cat breed');
  }

  const breed: Breed = await response.json();
  
  // Check if we have a fallback image for this breed
  if (FALLBACK_IMAGES[breed.id]) {
    return {
      ...breed,
      image: {
        id: `fallback-${breed.id}`,
        url: FALLBACK_IMAGES[breed.id],
        width: 800,
        height: 600
      }
    };
  }
  
  // If the breed doesn't have an image, fetch it using the reference_image_id
  if (!breed.image && breed.reference_image_id) {
    try {
      const imageResponse = await fetch(`${API_URL}/images/${breed.reference_image_id}`, {
        headers: {
          'x-api-key': API_KEY
        }
      });
      
      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        return {
          ...breed,
          image: {
            id: imageData.id,
            url: imageData.url,
            width: imageData.width || 800,
            height: imageData.height || 600
          }
        };
      }
    } catch (error) {
      console.error(`Failed to fetch image for breed ${breed.name}`, error);
    }
  }
  
  // Return the breed with a fallback image if no image was found
  if (!breed.image) {
    // Fallback - use a generic cat image based on breed ID's first character
    const fallbackIndex = breed.id.charCodeAt(0) % 3;
    const fallbackImages = [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800', // Orange cat
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800', // Tabby cat
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800', // Black cat
    ];
    
    return {
      ...breed,
      image: {
        id: 'fallback-generic',
        url: fallbackImages[fallbackIndex],
        width: 800,
        height: 600
      }
    };
  }
  
  return breed as BreedWithImage;
};

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

// Generate fun facts based on breed characteristics
export function generateFunFacts(breed: BreedWithImage): string[] {
  const facts: string[] = [];
  
  if (breed.intelligence >= 4) {
    facts.push(`${breed.name}s are known for their exceptional intelligence, making them quick learners and problem solvers.`);
  }
  
  if (breed.affection_level >= 4) {
    facts.push(`The ${breed.name} is one of the most affectionate cat breeds, often forming strong bonds with their owners.`);
  }
  
  if (breed.energy_level >= 4) {
    facts.push(`With their high energy levels, ${breed.name}s remain playful well into adulthood.`);
  }
  
  if (breed.dog_friendly >= 4) {
    facts.push(`Unlike many cat breeds, the ${breed.name} tends to get along very well with dogs.`);
  }
  
  if (breed.vocalisation >= 4) {
    facts.push(`${breed.name}s are quite talkative and will often "chat" with their owners throughout the day.`);
  }
  
  if (breed.social_needs >= 4) {
    facts.push(`${breed.name}s thrive on social interaction and don't do well when left alone for long periods.`);
  }
  
  if (breed.grooming >= 4) {
    facts.push(`The ${breed.name}'s coat requires regular grooming to keep it in top condition.`);
  }
  
  if (breed.hypoallergenic === 1) {
    facts.push(`Good news for allergy sufferers: the ${breed.name} is considered hypoallergenic!`);
  }
  
  if (breed.rare === 1) {
    facts.push(`The ${breed.name} is considered a rare breed and may be difficult to find.`);
  }
  
  // Add origin fact
  if (breed.origin) {
    facts.push(`The ${breed.name} originated in ${breed.origin}, where it was ${breed.natural ? 'naturally developed' : 'specifically bred'} for its unique characteristics.`);
  }
  
  // Fill with generic facts if we don't have enough
  const genericFacts = [
    `The ${breed.name}'s average lifespan is ${breed.life_span} years when properly cared for.`,
    `${breed.name}s are recognized by major cat associations worldwide.`,
    `Each ${breed.name} has its own unique personality, despite sharing breed traits.`,
    `${breed.name}s have been beloved companions to humans for many generations.`
  ];
  
  // Add generic facts until we have at least 5
  while (facts.length < 5 && genericFacts.length > 0) {
    facts.push(genericFacts.shift()!);
  }
  
  return facts.slice(0, 5); // Return at most 5 facts
}

// Generate bonding tips based on breed characteristics
export function generateBondingTips(breed: BreedWithImage): string[] {
  const tips: string[] = [];
  
  if (breed.intelligence >= 4) {
    tips.push(`Engage your ${breed.name}'s sharp mind with puzzle toys and training sessions to prevent boredom.`);
  }
  
  if (breed.energy_level >= 4) {
    tips.push(`Schedule regular play sessions with interactive toys to help your energetic ${breed.name} burn off excess energy.`);
  } else if (breed.energy_level <= 2) {
    tips.push(`Your laid-back ${breed.name} will appreciate quiet bonding time - try gentle grooming sessions or reading together.`);
  }
  
  if (breed.affection_level >= 4) {
    tips.push(`Take advantage of your ${breed.name}'s affectionate nature with daily cuddle sessions to strengthen your bond.`);
  }
  
  if (breed.grooming >= 4) {
    tips.push(`Turn grooming into a bonding ritual - most ${breed.name}s learn to enjoy brushing when it's paired with treats and affection.`);
  }
  
  if (breed.social_needs >= 4) {
    tips.push(`Consider adopting a companion for your ${breed.name} if you're away from home frequently, as they crave social interaction.`);
  }
  
  if (breed.child_friendly >= 4) {
    tips.push(`Involve your children in caring for your ${breed.name} with supervised feeding and gentle play to foster a family bond.`);
  }
  
  if (breed.vocalisation >= 4) {
    tips.push(`Respond to your ${breed.name}'s vocalizations to encourage "conversation" - this builds trust and communication.`);
  }
  
  if (breed.stranger_friendly <= 2) {
    tips.push(`Respect your ${breed.name}'s cautious nature around strangers by providing safe hiding spots and never forcing interactions.`);
  }
  
  // Generic tips to fill out if needed
  const genericTips = [
    `Create a consistent daily routine to help your ${breed.name} feel secure and build trust.`,
    `Discover your ${breed.name}'s favorite treats and use them as rewards for positive behavior.`,
    `Set up comfortable viewing perches near windows to entertain your ${breed.name} when you're busy.`,
    `Learn to read your ${breed.name}'s body language to better understand their needs and preferences.`,
    `Respect your ${breed.name}'s boundaries - let them initiate contact sometimes to build a relationship based on mutual trust.`
  ];
  
  // Add generic tips until we have at least 5
  while (tips.length < 5 && genericTips.length > 0) {
    tips.push(genericTips.shift()!);
  }
  
  return tips.slice(0, 5); // Return at most 5 tips
}
