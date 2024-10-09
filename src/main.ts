import "element-plus/dist/index.css";
import "./i18n/index";
import "./index.scss";

import ElementPlus from "element-plus";
import { createPinia } from "pinia";
import { Component, createApp } from "vue";

import App from "./App.vue";
import router from "./routes";

const app = createApp(App as Component);

const pinia = createPinia();
app.use(pinia);

app.use(router);
app.use(ElementPlus);

app.mount("#app");

postMessage({ payload: "removeLoading" }, "*");

window.electronAPI?.ipcInvoke("main-win-ready");
