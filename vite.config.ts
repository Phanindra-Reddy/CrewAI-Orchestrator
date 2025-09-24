import * as path from "path";
import tailwindcss from "@tailwindcss/vite"; // default import is correct
import react from "@vitejs/plugin-react"; // default import is correct
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), // Vite React plugin
    tailwindcss(), // Tailwind plugin
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // use namespace import for path
    },
  },
});
