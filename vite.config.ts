/// <reference types='vitest' />
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import vueTwind from "vite-plugin-vue-twind";
import { resolve } from 'path';

export default ({mode}: any) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
  cacheDir: '../../node_modules/.vite/chat-client',

  server: {
    port: 4200,
    host: 'localhost',
  },

  optimizeDeps: {
    include: [
      "proto"
    ]
  },

  build: {
    commonjsOptions: {
      include: [
        // For protobuf js
        /proto/, 
        // For web3 js
        /events/, /cross-fetch/, /crc-32/, /@ethereumjs\+rlp/, /eventemitter3/,
        // For vuex-persist
        /deepmerge/
      ],
    },
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [vue(), vueTwind({
    mode: 'emit',
  }), nxViteTsPaths()],

  base: "/chat-client/",

  resolve: {
    alias: {
      // web3: resolve('./node_modules/web3/dist/web3.min.js')
    }
  },

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
}