import { App } from "ant-design-vue";
import type { MessageInstance } from "ant-design-vue/es/message/interface";
import type { ModalStaticFunctions } from "ant-design-vue/es/modal/confirm";
import type { NotificationInstance } from "ant-design-vue/es/notification/interface";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore("global", () => {
  const message: MessageInstance = ref();
  const notification: NotificationInstance = ref();
  const modal: Omit<ModalStaticFunctions, "warn"> = ref();
  (() => {
    const staticFunction = App.useApp();
    message.value = staticFunction.message;
    modal.value = staticFunction.modal;
    notification.value = staticFunction.notification;
  })();

  return { message, notification, modal };
});
