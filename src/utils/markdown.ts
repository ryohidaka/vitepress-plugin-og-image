/**
 * Removes the ".md" extension from the given file path and returns the resulting slug.
 *
 * @param path - The file path with a ".md" extension.
 * @returns The slug derived from the file path by removing the ".md" extension.
 */
export const getSlugByPath = (path: string): string => {
  // Replace the ".md" extension with an empty string and return the result
  return path.replace(".md", "");
};
