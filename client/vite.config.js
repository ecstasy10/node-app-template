import { defineConfig } from 'vite';
import { URL, fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';
import nodeStdlibBrowser from 'node-stdlib-browser';
import inject from '@rollup/plugin-inject';

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/styles.scss',
      },
    }),
    {
      ...inject({
        global: [
          require.resolve('node-stdlib-browser/helpers/esbuild/shim'),
          'global',
        ],
        process: [
          require.resolve('node-stdlib-browser/helpers/esbuild/shim'),
          'process',
        ],
        Buffer: [
          require.resolve('node-stdlib-browser/helpers/esbuild/shim'),
          'Buffer',
        ],
      }),
      enforce: 'post',
    },
    nodePolyfills(),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      ...nodeStdlibBrowser,
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  optimizeDeps: {
    include: [ 'buffer', 'process' ],
  },
  server: {
    port: 3000,
  },
});
