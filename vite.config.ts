import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// import ElementPlus from "unplugin-element-plus/vite";
import { resolve } from "path";
// import ElementPlus from "unplugin-element-plus/vite";

// const path = require('path');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // ElementPlus({
    // importStyle: "sass",
    // useSource: true,
    //   //   // options
    // }),
    vue(),
    // ...
    AutoImport({
      // resolvers: [ElementPlusResolver()],
      imports: [
        "vue",
        "vue-router",
        "pinia",
        {
          // lodash: [
          //   // named imports
          //   "isEmpty", // import { useMouse } from '@vueuse/core',
          // ],
          "/@store/setMapStore/userMapStore.ts": [
            // named imports
            "userMapStore", // import { useMouse } from '@vueuse/core',
          ],
          "/@store/setMapStore/userMapInfo.ts": [
            // named imports
            "userMapInfo", // import { useMouse } from '@vueuse/core',
          ],
          "/@store/userInfoStore": [
            // named imports
            "userInfoStore", // import { useMouse } from '@vueuse/core',
          ],
          "/@store/lookMapStore/index": [
            // named imports
            "lookMapStore", // import { useMouse } from '@vueuse/core',
          ],
          "/@store/lookMapStore/lookMapInfo": [
            // named imports
            "lookMapInfo", // import { useMouse } from '@vueuse/core',
          ],
        },
      ],
    }),
    Components({
      // resolvers: [ElementPlusResolver()],
    }),
    [
      "import",
      {
        libraryName: "@icon-park/vue",
        libraryDirectory: "es/icons",
        camel2DashComponentName: false, // default: true,
      },
    ],
  ],
  server: {
    host: "0.0.0.0",
  },
  resolve: {
    // 配置路径别名
    alias: {
      "/@": resolve(__dirname, "./src"),
      "/@store": resolve(__dirname, "./src/store"),
      "/@components": resolve(__dirname, "./src/components"),
      "/@assets": resolve(__dirname, "./src/assets"),
      "/@http": resolve(__dirname, "./src/http"),
      "/@service": resolve(__dirname, "./src/service"),
    },
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/assets/style/global.less";',
      },
    },
  },
});
