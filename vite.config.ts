import { parse, resolve } from 'path';
import { defineConfig, UserConfigExport } from 'vite';
import { combineRules } from './plugins/combineRules';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src',
  publicDir: 'src/static',
  build: {
    rollupOptions: {
      input: {
        background: resolve(__dirname, 'src', 'background', 'index.ts'),
        content: resolve(__dirname, 'src', 'contentScript', 'index.ts'),
        editor: resolve(__dirname, 'src', 'editor.html'),
        popup: resolve(__dirname, 'src', 'popup.html')
      },
      output: {
        dir: "dist",
        chunkFileNames: "[name].[hash].js",
        entryFileNames: "[name].js",
        assetFileNames: (assetInfo) => {
          const { name } = parse(assetInfo.name);
          return `${name}.[ext]`;
        },
      },
    }
  },
  plugins: [
    process.env.NODE_ENV === 'production' ? combineRules() : null
  ]
} as UserConfigExport);