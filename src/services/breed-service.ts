
import { Breed, BreedWithImage, Image } from '@/types/breeds';
import { API_KEY, API_URL, FALLBACK_IMAGES, FALLBACK_GENERIC_IMAGES } from '@/config/api-config';

const USE_PROXY = !import.meta.env.DEV;

const breedsListEndpoint = () => (USE_PROXY ? '/api/breeds' : `${API_URL}/breeds`);
const breedByIdEndpoint = (id: string) =>
  USE_PROXY ? `/api/breeds?id=${encodeURIComponent(id)}` : `${API_URL}/breeds/${encodeURIComponent(id)}`;
const breedImageEndpoint = (id: string) =>
  USE_PROXY ? `/api/breed-image?id=${encodeURIComponent(id)}` : `${API_URL}/images/${encodeURIComponent(id)}`;

const requestInit = (): RequestInit =>
  USE_PROXY ? {} : { headers: { 'x-api-key': API_KEY } };

export const fetchBreeds = async (): Promise<Breed[]> => {
  const response = await fetch(breedsListEndpoint(), requestInit());

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
  const response = await fetch(breedImageEndpoint(imageId), requestInit());

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
  const response = await fetch(breedByIdEndpoint(breedId), requestInit());

  if (!response.ok) {
    throw new Error('Failed to fetch cat breed');
  }

  const breed: Breed = await response.json();

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

  if (!breed.image && breed.reference_image_id) {
    try {
      const imageData = await fetchBreedImage(breed.reference_image_id);
      return { ...breed, image: imageData };
    } catch (error) {
      console.error(`Failed to fetch image for breed ${breed.name}`, error);
    }
  }

  if (!breed.image) {
    return { ...breed, image: getGenericFallbackImage(breed.id) };
  }

  return breed as BreedWithImage;
};
