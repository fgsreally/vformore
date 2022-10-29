import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts()]
  , build: {
    lib: {
      entry: "src/index.ts",
      formats: ['es', "cjs"],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ["vue"]
    }
  }
})
