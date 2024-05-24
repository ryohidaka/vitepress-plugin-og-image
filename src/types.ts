export type OgImagePluginParams = {
  destDir: string;
  author?: Author;
};

export type MdFile = {
  path: string;
  title: string;
};

export type Author = {
  name?: string;
  imageURL?: string;
};
