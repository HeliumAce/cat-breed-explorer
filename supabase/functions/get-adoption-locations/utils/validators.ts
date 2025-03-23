
export function validateRequestParams(params: any): string | null {
  if (!params.lat || !params.lng) {
    return 'Latitude and longitude are required';
  }
  return null;
}
