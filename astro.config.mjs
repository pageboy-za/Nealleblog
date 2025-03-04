// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

import pdf from "astro-pdf";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), markdoc(), keystatic(), pdf(options)],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
});
