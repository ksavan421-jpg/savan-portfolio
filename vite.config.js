import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

function preserveBackdropFilter() {
  return {
    name: 'preserve-backdrop-filter',
    enforce: 'post',
    generateBundle(_, bundle) {
      for (const fileName in bundle) {
        if (fileName.endsWith('.css')) {
          const chunk = bundle[fileName];
          if (chunk.type === 'asset' && typeof chunk.source === 'string') {
            chunk.source = chunk.source.replace(
              /-webkit-backdrop-filter:([^;{}]+)/g,
              (match, val) => `-webkit-backdrop-filter:${val};backdrop-filter:${val}`
            );
          }
        }
      }
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), preserveBackdropFilter()],
})
