import { resolve } from "path";

export default {
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        fish: resolve(__dirname, "fish/index.html"),
        2048: resolve(__dirname, "2048/index.html"),
      },
    },
  },
};
