import { useBreedImage } from "@/hooks/useBreeds";

interface MatchImageProps {
  name: string;
  imageUrl?: string;
  referenceImageId?: string;
  className?: string;
  emojiSize?: string;
}

export function MatchImage({
  name,
  imageUrl,
  referenceImageId,
  className = "w-full h-full object-cover",
  emojiSize = "text-4xl",
}: MatchImageProps) {
  const shouldFetch = !imageUrl && !!referenceImageId;
  const { data: lazyImage } = useBreedImage(referenceImageId, shouldFetch);

  const resolvedUrl = imageUrl ?? lazyImage?.url;

  if (!resolvedUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-amber-100">
        <span className={`text-amber-500 ${emojiSize}`}>🐱</span>
      </div>
    );
  }

  return (
    <img
      src={resolvedUrl}
      alt={name}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}
