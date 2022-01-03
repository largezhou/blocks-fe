import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import externalGlobals from 'rollup-plugin-external-globals'
import viteSvgIcons from 'vite-plugin-svg-icons'

export default defineConfig({
  plugins: [
    vue(),
    viteSvgIcons({
      iconDirs: [
        path.resolve(__dirname, 'src/icons'),
      ],
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  build: {
    rollupOptions: {
      external: ['vue'],
      plugins: [
        commonjs(),
        externalGlobals({
          vue: 'Vue',
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
