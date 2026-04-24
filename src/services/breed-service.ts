
import { Breed, BreedWithImage, Image } from '@/types/breeds';
import { API_KEY, API_URL, FALLBACK_IMAGES, FALLBACK_GENERIC_IMAGES } from '@/config/api-config';

export const fetchBreeds = async (): Promise<Breed[]> => {
  const response = await fetch(`${API_URL}/breeds`, {
    headers: {
      'x-api-key': API_KEY
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cat breeds');
  }

  const breeds: Breed[] = await response.json();

  return breeds.map((breed) => {
    if (breed.image) return breed;
    if (FALLBACK_IMAGES[breed.id]) {
      return {
        ...breed,
        image: {
          id: `fallback-${breed.id}`,
          url: FALLBACK_IMAGES[breed.id],
          width: 800,
          height: 600,
        },
      };
    }
    return breed;
  });
};

export const fetchBreedImage = async (imageId: string): Promise<Image> => {
  const response = await fetch(`${API_URL}/images/${imageId}`, {
    headers: {
      'x-api-key': API_KEY
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch breed image');
  }

  const data = await response.json();
  return {
    id: data.id,
    url: data.url,
    width: data.width || 800,
    height: data.height || 600,
  };
};

export const getGenericFallbackImage = (breedId: string): Image => {
  const index = breedId.charCodeAt(0) % FALLBACK_GENERIC_IMAGES.length;
  return {
    id: 'fallback-generic',
    url: FALLBACK_GENERIC_IMAGES[index],
    width: 800,
    height: 600,
  };
};

// Function to fetch a single breed by ID
export const fetchBreedById = async (breedId: string): Promise<BreedWithImage> => {
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
    
    return {
      ...breed,
      image: {
        id: 'fallback-generic',
        url: FALLBACK_GENERIC_IMAGES[fallbackIndex],
        width: 800,
        height: 600
      }
    };
  }
  
  return breed as BreedWithImage;
};
