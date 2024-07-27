// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import pkg from "./package.json";

const packageName = JSON.stringify(pkg.name.replace(/-/g, "_"));

export default defineConfig({
  define: {
    packageName: packageName,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/__init__.ts"),
      name: packageName,
      fileName: "index",
      formats: ["es"],
    },
  },
});
