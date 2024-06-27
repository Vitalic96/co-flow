import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [svgr(), react(), viteTsconfigPaths()],
  server: {
    port: 8088,
  },
})
