import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Default output directory
    assetsDir: "assets", // Directory for static assets
  },
  server: {
    open: "CSS/index.html", // Ensure Vite opens the correct index.html
  },
});
