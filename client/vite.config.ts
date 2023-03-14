import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  server: { hmr: true },
  resolve: {
    alias: [
      {
        find: '@',                                   // 别名
        replacement: resolve(__dirname, 'src'),      // 别名对应地址
      },
      {
        find: 'components',
        replacement: resolve(__dirname, 'src/components'),
      }
    ]
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ]
})
