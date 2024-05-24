import { HeadConfig, TransformContext } from "vitepress";
import { MdFile, OgImagePluginParams } from "./types";
import { getSlugByPath } from "./utils";
import path from "path";

/**
 * A plugin for generating og:image meta tags for VitePress pages.
 */
export class OgImagePlugin {
  // Directory where the generated og:image files will be stored.
  destDir: string;

  // Array to store metadata of Markdown files for generating og:image tags.
  mdFiles: MdFile[] = [];

  /**
   * Creates an instance of OgImagePlugin.
   * @param params Parameters for the OgImagePlugin.
   * @param params.destDir The directory where the generated og:image files will be stored. Defaults to DEFAULT_DEST_DIR if not provided.
   */
  constructor(params: OgImagePluginParams) {
    const { destDir } = params;
    this.destDir = destDir;
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
}
