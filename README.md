# vitepress-plugin-og-image

[![npm version](https://badge.fury.io/js/vitepress-plugin-og-image.svg)](https://badge.fury.io/js/vitepress-plugin-og-image)
![build](https://github.com/ryohidaka/vitepress-plugin-og-image/workflows/Build/badge.svg)
[![codecov](https://codecov.io/gh/ryohidaka/vitepress-plugin-og-image/graph/badge.svg?token=RHP9TB2F51)](https://codecov.io/gh/ryohidaka/vitepress-plugin-og-image)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

## Installation

You can install this library using npm:

```shell
npm install vitepress-plugin-og-image
```

## Usage

- Import into VitePress `config.ts` file for use.
- Set the path of the OG image in the metadata with the `transformHead` hook
- Generate OG image entities with the `buildEnd` hook.

### Params

| key               | type     | required | description                                                             |
| ----------------- | -------- | -------- | ----------------------------------------------------------------------- |
| `destDir`         | `string` | ✔       | OG image placement directory specified by **relative path from outDir** |
| `author`          | `object` | ❌       | Used to include the author's name or image in the OG image              |
| `author.name`     | `string` | ❌       | Specify the author's name to be displayed                               |
| `author.imageURL` | `string` | ❌       | Specify the author's avatar image url to be displayed                   |

### `config.ts`

```ts
const ogImagePlugin = new OgImagePlugin({
  destDir: "/og",
  author: { name: "Author Name", imageURL: "{Author Avatar URL}" },
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  transformHead(context) {
    return [
      ["meta", { property: "og:title", content: context.pageData.title }],
      ...ogImagePlugin.transformHead(context),
    ];
  },
  buildEnd(siteConfig) {
    ogImagePlugin.buildEnd(siteConfig);
  },
});
```

## Link

- [VitePress](https://vitepress.dev/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
