import type { useAppProps } from "ant-design-vue/es/app/context";
import { AppContextKey } from "ant-design-vue/es/app/context";
import type { App } from "vue";
import { reactive } from "vue";

export const appContext: useAppProps = reactive({
  message: {},
  notification: {},
  modal: {},
} as useAppProps);

export function antdvProvide(app: App<unknown>) {
  app.provide(AppContextKey, appContext);
}
