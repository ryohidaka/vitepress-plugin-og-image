import { describe, it, expect, beforeEach, vi } from "vitest";
import { OgImagePlugin } from "../src/";

describe("OgImagePlugin", () => {
  let ogImagePlugin;

  beforeEach(() => {
    ogImagePlugin = new OgImagePlugin({
      destDir: "/og",
    });
  });

  describe("transformHead", () => {
    it("should add og:image meta tag to page head", () => {
      const context = {
        pageData: {
          relativePath: "test-page.md",
          title: "Test Page",
        },
      };

      const headConfig = ogImagePlugin.transformHead(context);

      expect(headConfig).toEqual([
        [
          "meta",
          {
            property: "og:image",
            content: "/og/test-page.png",
          },
        ],
      ]);
    });
  });
});
