// Dependencies
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  preview: {
    strictPort: true,
  },
  server: {
    host: true,
    strictPort: true,
  },
});
