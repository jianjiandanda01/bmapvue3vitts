import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import * as _ from "lodash";
// import { install } from "@icon-park/vue/es/all";
// import "@icon-park/vue/styles/index.css";
import "./assets/style/RichMarker.less";
import "element-plus/dist/index.css";
import "./style.css";
const app = createApp(App);
// install(app);
app.use(router);
const pinia = createPinia();
// app.provide("$_", _);
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(pinia);
app.mount("#app");
