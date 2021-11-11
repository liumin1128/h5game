import { resolve } from "path";

export default {
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        fish: resolve(__dirname, "fish/index.html"),
      },
    },
  },
};
