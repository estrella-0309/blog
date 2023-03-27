import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Inspect from 'vite-plugin-inspect'
import path from 'path'
const pathSrc = path.resolve(__dirname, 'src')
// https://vitejs.dev/config/

export default defineConfig({
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
  server: {
    // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
    host: "0.0.0.0",
    cors: true,
    // 跨域代理配置
    proxy: {
      "/api": {
        target: "http://localhost:3030", // easymock
        // target: "https://www.fastmock.site/mock/f81e8333c1a9276214bcdbc170d9e0a0", // fastmock
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, "")
      },
      '/qq': {// 匹配所有以 '/api2'开头的请求路径
        target: 'https://users.qzone.qq.com',// 代理目标的基础路径
        changeOrigin: true,
        rewrite: path => path.replace(/^\/qq/, "")
        // pathRewrite: { '^/qq': '' }
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],


      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),


        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],


      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),


    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],


      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),


    Icons({
      autoInstall: true,
    }),
    Inspect(),
  ],

})
