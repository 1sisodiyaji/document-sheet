import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import the path module

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "node_modules"),
    },
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true, // Optional: remove console logs
        pure_getters: true, // Optional: clean up getters
      },
      mangle: true, // Optional: minify
      format: {
        comments: false, // Optional: remove comments in the final bundle
      },
    },
    minify: 'terser', // Use terser to minimize code
    sourcemap: false, // Disable sourcemaps for production builds
  },
});
