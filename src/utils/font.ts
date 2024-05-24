import { Font } from "satori";

/**
 * Fetches font data asynchronously.
 *
 * @returns A Promise resolving to an array of Font objects.
 */
export const fetchFonts = async (): Promise<Font[]> => {
  // Array of fonts to fetch
  const fonts = [
    {
      name: "Roboto-Bold",
      url: "https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-bold-webfont.ttf",
      weight: 400,
      style: "normal",
    },
  ];

  // Array of font fetch promises
  const fontPromises = fonts.map(async (font) => {
    // Fetch font data
    const data = await fetch(font.url).then((res) => res.arrayBuffer());

    // Return Font object
    return {
      ...font,
      data,
    } as Font;
  });

  return Promise.all(fontPromises);
};
