export function parseImageArray(array: string[]): string {
  const img = array[0];
  if (img.startsWith('["') && img.endsWith('"')) {
    return img.slice(2);
  }
  if (img.endsWith('"]')) {
    return img.slice(2, -2);
  }
  return img;
}
