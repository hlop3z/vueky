// rollup.config.js
import fs from "fs";
import terser from "@rollup/plugin-terser";

// Read the package.json
const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
const packageName = pkg.name.toLowerCase().replace(/-/g, "_");

// Terser Config
const terserConfig = {
  compress: {
    drop_console: true,
  },
};

export default {
  input: "dist/index.js",
  output: {
    name: packageName,
    file: `dist/index.min.js`,
    format: "iife",
    plugins: [terser(terserConfig)],
  },
};
