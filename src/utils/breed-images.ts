import { Breed, BreedWithImage } from '@/types/breeds';

export function hasBreedImage(breed: Breed): breed is BreedWithImage {
  return typeof breed.image?.url === 'string' && breed.image.url.trim().length > 0;
}
