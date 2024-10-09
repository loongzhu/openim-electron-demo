import "ant-design-vue/dist/reset.css";
import "element-plus/dist/index.css";
import "./i18n/index";
import "./index.scss";

import Antd from "ant-design-vue";
import ElementPlus from "element-plus";
import { createPinia } from "pinia";
import { Component, createApp } from "vue";
import { VueQueryPlugin } from "vue-query";

import App from "./App.vue";
import router from "./routes";

const app = createApp(App as Component);

const pinia = createPinia();
app.use(pinia);

app.use(router);
app.use(ElementPlus);
app.use(VueQueryPlugin);
app.use(Antd);

app.mount("#app");

postMessage({ payload: "removeLoading" }, "*");

window.electronAPI?.ipcInvoke("main-win-ready");
