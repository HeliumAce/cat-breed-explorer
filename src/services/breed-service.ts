
import { Breed, BreedWithImage } from '@/types/breeds';
import { API_KEY, API_URL, FALLBACK_IMAGES, FALLBACK_GENERIC_IMAGES } from '@/config/api-config';

// Function to fetch all breeds
export const fetchBreeds = async (): Promise<BreedWithImage[]> => {
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
      
      return {
        ...breed,
        image: {
          id: 'fallback-generic',
          url: FALLBACK_GENERIC_IMAGES[fallbackIndex],
          width: 800,
          height: 600
        }
      };
    })
  );

  return breedsWithImages;
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
