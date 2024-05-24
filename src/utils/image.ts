import DefaultTemplate from "../components/default";
import { MdFile } from "@/types";
import satori, { SatoriOptions } from "satori";
import sharp from "sharp";

/**
 * Generates a PNG image from a React element using Satori rendering engine.
 *
 * @param {Object} file - The markdown file object containing the file path and title.
 * @param {Object} options - Additional options for satori.
 */
export const generateImage = async (file: MdFile, options: SatoriOptions) => {
  try {
    // Generate an HTML element using the default template with the file's title.
    const element = DefaultTemplate(file.title);

    // Render the React element into SVG using the Satori rendering engine.
    const svg = await satori(element, options);

    // Convert the SVG string to PNG Buffer using Sharp library
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
    console.log(pngBuffer);
  } catch (error) {
    // Log an error message if an exception occurs during the image generation process.
    console.error(`Error processing file ${file.path}:`, error);
  }
};
