import { HeadConfig, SiteConfig, TransformContext } from "vitepress";
import { Author, MdFile, OgImagePluginParams } from "./types";
import { fetchFonts, generateAndSaveImage, getSlugByPath } from "./utils";
import path from "path";

/**
 * A plugin for generating og:image meta tags for VitePress pages.
 */
export class OgImagePlugin {
  // Directory where the generated og:image files will be stored.
  destDir: string;

  // Array to store metadata of Markdown files for generating og:image tags.
  mdFiles: MdFile[] = [];

  author?: Author;

  /**
   * Creates an instance of OgImagePlugin.
   * @param params Parameters for the OgImagePlugin.
   * @param params.destDir The directory where the generated og:image files will be stored. Defaults to DEFAULT_DEST_DIR if not provided.
   */
  constructor(params: OgImagePluginParams) {
    const { author, destDir } = params;
    this.destDir = destDir;
    this.author = author;
  }

  /**
   * Transforms the head of each page to include og:image meta tags.
   * @param context The context object containing information about the page being transformed.
   * @returns An array of HeadConfig objects representing the meta tags to be added to the head of the page.
   */
  transformHead(context: TransformContext): HeadConfig[] {
    const pageData = context.pageData;
    // Derive the slug from the relative path of the page.
    const contentPath = getSlugByPath(pageData.relativePath);

    // Generate the file path for the og:image file.
    const imagePath = path.join(this.destDir, `${contentPath}.png`);

    // Store metadata of the Markdown file for later use.
    const metadata = { path: imagePath, title: pageData.title };
    this.mdFiles.push(metadata);

    // Return the meta tags to be added to the head of the page.
    return [
      [
        "meta",
        {
          property: "og:image",
          content: imagePath,
        },
      ],
    ];
  }

  /**
   * Asynchronously generates and saves images for markdown files.
   * @param {SiteConfig} siteConfig - Configuration object for the site.
   * @returns {Promise<void>}
   */
  async buildEnd(siteConfig: SiteConfig) {
    // Fetch fonts buffer asynchronously.
    const fonts = await fetchFonts();

    // Define options for satori.
    const options = {
      width: 1200,
      height: 630,
      fonts,
    };

    // Use Promise.all to generate and save images for all markdown files concurrently.
    await Promise.all(
      this.mdFiles.map((file) =>
        generateAndSaveImage(file, siteConfig.outDir, options, this.author),
      ),
    );
  }
}
