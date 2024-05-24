import DefaultTemplate from "../components/default";
import { MdFile } from "@/types";
import fs from "fs";
import path from "path";
import { ReactNode } from "react";
import satori, { SatoriOptions } from "satori";
import sharp from "sharp";

/**
 * Generates a PNG image from a React element using Satori rendering engine.
 * @param element The React element to render into an image.
 * @param options Options to configure the rendering process.
 * @returns A Promise that resolves with a Buffer containing the PNG image data.
 */
const generateImage = async (
  element: ReactNode,
  options: SatoriOptions,
): Promise<Buffer> => {
  // Render the React element into SVG using Satori rendering engine
  const svg = await satori(element, options);

  // Convert the SVG string to PNG Buffer using Sharp library
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  return pngBuffer;
};

/**
 * Save a PNG file to the specified path.
 * @param {string} filePath - The file path where the PNG will be saved.
 * @param {string | NodeJS.ArrayBufferView} data - The PNG data to be saved.
 * @returns {void}
 */
const savePNGFile = (
  filePath: string,
  data: string | NodeJS.ArrayBufferView,
) => {
  // Get the directory path from the file path
  const dir = path.dirname(filePath);

  // Check if the directory exists
  if (!fs.existsSync(dir)) {
    // Create the directory if it does not exist
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write the PNG data to the specified file path
  fs.writeFileSync(filePath, data);
};

/**
 * Asynchronously generates an image for a given file and saves it to the output directory.
 *
 * @param {Object} file - The markdown file object containing file path and title.
 * @param {string} outDir - The build output location for the site.
 * @param {Object} options - Additional options for satori.
 */
export const generateAndSaveImage = async (
  file: MdFile,
  outDir: string,
  options: SatoriOptions,
) => {
  try {
    // Generate an HTML element using the default template with the file's title.
    const element = DefaultTemplate(file.title);

    // Determine the path where the image will be saved.
    const imagePath = path.join(outDir, file.path);

    // Generate image data from the HTML element and options.
    const data = await generateImage(element, options);

    // Save the generated image as a PNG file at the specified path.
    savePNGFile(imagePath, data);
  } catch (error) {
    // Log an error message if an exception occurs during the image generation process.
    console.error(`Error processing file ${file.path}:`, error);
  }
};
