import { defineConfig } from "vitepress";
import { OgImagePlugin } from "../../../index";

const ogImagePlugin = new OgImagePlugin({
  destDir: "/og",
  author: { name: "Ryo Hidaka", imageURL: "https://ryohidaka.jp/icon.png" },
});


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  transformHead(context) {
    return [...ogImagePlugin.transformHead(context)];
  },
  buildEnd(siteConfig) {
    ogImagePlugin.buildEnd(siteConfig);
  },
});
