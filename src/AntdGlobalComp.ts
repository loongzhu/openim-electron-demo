import { App } from "ant-design-vue";
import type { MessageInstance } from "ant-design-vue/es/message/interface";
import type { ModalStaticFunctions } from "ant-design-vue/es/modal/confirm";
import type { NotificationInstance } from "ant-design-vue/es/notification/interface";

let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, "warn">;

export default () => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;
  return null;
};

export { message, modal, notification };
