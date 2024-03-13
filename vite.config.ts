import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  base: 'bombay',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // components: path.join(__dirname, 'src/components'),
      // constants: path.join(__dirname, 'src/constants'),
      // effects: path.join(__dirname, 'src/effects'),
      // hooks: path.join(__dirname, 'src/hooks'),
      // store: path.join(__dirname, 'src/store'),
      // styles: path.join(__dirname, 'src/styles'),
      // UI: path.join(__dirname, 'src/UI'),
      // utils: path.join(__dirname, 'src/utils'),
    },
  },
});
