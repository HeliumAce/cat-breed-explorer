
import { Breed, BreedWithImage, Image } from '@/types/breeds';
import { withLocalBreedTraits } from '@/data/breed-ratings';
import { API_KEY, API_URL } from '@/config/api-config';
import { hasBreedImage } from '@/utils/breed-images';

const USE_PROXY = !import.meta.env.DEV;

const breedsListEndpoint = () => (USE_PROXY ? '/api/breeds' : `${API_URL}/breeds`);
const breedByIdEndpoint = (id: string) =>
  USE_PROXY ? `/api/breeds?id=${encodeURIComponent(id)}` : `${API_URL}/breeds/${encodeURIComponent(id)}`;
const breedImageEndpoint = (id: string) =>
  USE_PROXY ? `/api/breed-image?id=${encodeURIComponent(id)}` : `${API_URL}/images/${encodeURIComponent(id)}`;

const requestInit = (): RequestInit =>
  USE_PROXY ? {} : { headers: { 'x-api-key': API_KEY } };

export const fetchBreeds = async (): Promise<BreedWithImage[]> => {
  const response = await fetch(breedsListEndpoint(), requestInit());

  if (!response.ok) {
    throw new Error('Failed to fetch cat breeds');
  }

  const breeds: Breed[] = await response.json();

  const resolvedBreeds = await Promise.all(breeds.map(withLocalBreedTraits).map(resolveBreedImage));
  return resolvedBreeds.filter(hasBreedImage);
};

export const fetchBreedImage = async (imageId: string): Promise<Image> => {
  const response = await fetch(breedImageEndpoint(imageId), requestInit());

  if (!response.ok) {
    throw new Error('Failed to fetch breed image');
  }

  const data = await response.json();
  if (typeof data.url !== 'string' || !data.url.trim()) {
    throw new Error('Breed image has no URL');
  }
  return {
    id: data.id,
    url: data.url,
    width: data.width || 800,
    height: data.height || 600,
  };
};

async function resolveBreedImage(breed: Breed): Promise<Breed> {
  if (hasBreedImage(breed)) return breed;

  if (breed.reference_image_id?.trim()) {
    try {
      const image = await fetchBreedImage(breed.reference_image_id);
      return { ...breed, image };
    } catch {
      // A failed reference lookup leaves this breed out until a later API refresh.
    }
  }

  return { ...breed, image: undefined };
}

// Function to fetch a single breed by ID
export const fetchBreedById = async (breedId: string): Promise<Breed> => {
  const response = await fetch(breedByIdEndpoint(breedId), requestInit());

  if (!response.ok) {
    throw new Error('Failed to fetch cat breed');
  }

  return resolveBreedImage(withLocalBreedTraits(await response.json()));
};
