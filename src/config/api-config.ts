
// Free API key - this is a public key
export const API_KEY = 'live_sLpYuUXHjzXh0l1A3tpqYvmFdXF3MHrJeAYdRCMTd5XeKbfHrKYQDNn73O4z0';
export const API_URL = 'https://api.thecatapi.com/v1';

// Fallback image map for specific breeds that have issues with their images
export const FALLBACK_IMAGES: Record<string, string> = {
  'ebur': 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800', // European Burmese
  'jbob': 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800', // Japanese Bobtail - Different image URL
  'mala': 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800', // Malayan
};

// Fallback generic images
export const FALLBACK_GENERIC_IMAGES = [
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800', // Orange cat
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800', // Tabby cat
  'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800', // Black cat
];
