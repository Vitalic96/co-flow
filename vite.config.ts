import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    svgr(),
    react(),
    viteTsconfigPaths(),
    nodePolyfills({
      protocolImports: true,
    }),
  ],
  server: {
    port: 8088,
  },
})
