import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyfills from 'rollup-plugin-node-polyfills'

const ENV_PREFIX = ['VITE_']

export default defineConfig(() => ({
  envPrefix: ENV_PREFIX,
  server: { port: 4001, host: false },
  assetsInclude: ["**/*.glb"],
  define: {
    'process.env.ANCHOR_BROWSER': true,
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify', // Add polyfills for stream module
      buffer: 'buffer',           // Add polyfills for buffer module
    },
  },
  build: {
    rollupOptions: {
      external: ['@raydium-io/raydium-sdk'], // Exclude SDK from bundling
      plugins: [
        rollupNodePolyfills(), // Polyfills for Node.js core modules in Rollup
      ],
    },
  },
  optimizeDeps: {
    include: ['@raydium-io/raydium-sdk', 'crypto-browserify', 'buffer', 'stream-browserify'],
    esbuildOptions: {
      define: {
        global: 'globalThis', // Define global for Node.js polyfills
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({ buffer: true }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  plugins: [
    react({ jsxRuntime: 'classic' }),
  ],
}))
