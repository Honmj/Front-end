import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import vitePluginImp from 'vite-plugin-imp';
import fs from 'fs';
import path from 'path';
import lessToJS from 'less-vars-to-js';
import config from './src/config';

const env = process.argv[process.argv.length - 1];

const baseUrl = config[env];

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/config/theme.less'), 'utf8')
);

export default defineConfig({
  // base: baseUrl.cdn,
  plugins: [
    reactRefresh(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/lib/${name}/style/index.less`,
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 重写 less 变量，定制样式
        modifyVars: themeVariables,
      },
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'), // 根路径
      '@': path.resolve(__dirname, './src'), // src 路径
    },
  },
  server: {
    port: 3001, // 开发环境启动的端口
    open: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        // 当遇到 /api 路径时，将其转换成 target 的值
        target: 'http://jsonplaceholder.typicode.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 将 /api 重写为空
      },
    },
  },
});
