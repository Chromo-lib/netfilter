import { parse, resolve } from 'path';
import { defineConfig, UserConfigExport } from 'vite'
import react from '@vitejs/plugin-react';

import { replaceWord } from './plugins/replaceWord';
import { copyStatic } from './plugins/copyStatic';
import { combineRules } from './plugins/combineRules';

console.log('process ===> ', process.env.BROWSER, process.env.NODE_ENV);
const isChrome = process.env.BROWSER === undefined ? true : process.env.BROWSER === 'chrome';
const from = isChrome ? 'browser' : 'chrome'; // this var for replaceWord plugin
const to = isChrome ? 'chrome' : 'browser'; // this var for replaceWord plugin

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
    {
      ...replaceWord({ from, to }),
      enforce: 'pre'
    },
    react(),
    copyStatic('rulesets'),
    process.env.NODE_ENV === 'production' ? copyStatic('static') : null,
    process.env.NODE_ENV === 'production' ? combineRules() : null
  ]
} as UserConfigExport);