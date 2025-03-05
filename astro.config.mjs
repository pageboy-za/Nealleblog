// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";

import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import pdf from "astro-pdf";
import icon from "astro-icon";

// Define PDF options
const pdfOptions = {
  format: "A4",
  path: "/NeallePageCV", // This should match your page route
  output: "public/NeallePageCV.pdf",
  waitUntil: "networkidle2",
  printBackground: true,
  scale: 1,
  margin: {
    top: "15mm",
    bottom: "15mm",
    left: "15mm",
    right: "15mm",
  },
  width: "210mm",
  height: "297mm",
  preferCSSPageSize: true,
};

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [react(), markdoc(), pdf(pdfOptions), icon()],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
});
