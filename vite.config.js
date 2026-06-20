import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // vite-imagetools: processes image imports at build time.
    // Converts JPGs to WebP, strips metadata, applies quality settings.
    // Query params on import (e.g. ?format=webp&quality=80) control output.
    imagetools(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target modern browsers — stops Vite/Rollup from emitting legacy
    // polyfills (e.g. Object.create shims) that waste ~10 KB in vendor-sanity.
    target: "es2020",
    rollupOptions: {
      output: {
        // Manual chunk splitting keeps each vendor bundle lean and
        // individually cacheable. Only the changed chunk is re-downloaded
        // on deploy.
        manualChunks: {
          // React core — almost never changes, long-lived cache
          "vendor-react": ["react", "react-dom"],
          // Framer Motion — large; isolated so it can be tree-shaken
          // independently from app code
          "vendor-motion": ["framer-motion"],
          // Sanity read-only client — separate chunk avoids re-bundling
          // when app components change
          "vendor-sanity": ["@sanity/client"],
        },
      },
    },
    // Ensure terser minification runs in production (Vite default is esbuild;
    // terser squeezes an extra ~3 KB from vendor-ui)
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        passes: 2,
      },
    },
  },
});
