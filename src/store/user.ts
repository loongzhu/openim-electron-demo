import { t } from "i18next";
import { defineStore } from "pinia";

import { BusinessUserInfo, getBusinessUserInfo } from "@/api/login";
import { IMSDK } from "@/layout/MainContentWrap";
import { feedbackToast } from "@/utils/common";
import { clearIMProfile, getLocale, setLocale } from "@/utils/storage";

import { AppConfig, AppSettings, IMConnectState } from "./type";

interface UserState {
  syncState: IMConnectState;
  progress: number;
  reinstall: boolean;
  isLogining: boolean;
  connectState: IMConnectState;
  selfInfo: BusinessUserInfo;
  appConfig: AppConfig;
  appSettings: AppSettings;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      syncState: "success",
      progress: 0,
      reinstall: true,
      isLogining: false,
      connectState: "success",
      selfInfo: {} as BusinessUserInfo,
      appConfig: {} as AppConfig,
      appSettings: {
        locale: getLocale(),
        closeAction: "miniSize",
      },
    };
  },
  getters: {},
  actions: {
    updateSyncState(syncState: IMConnectState) {
      this.$patch({ syncState });
    },
    updateProgressState(progress: number) {
      this.$patch({ progress });
    },
    updateReinstallState(reinstall: boolean) {
      this.$patch({ reinstall });
    },
    updateIsLogining(isLogining: boolean) {
      this.$patch({ isLogining });
    },
    updateConnectState(connectState: IMConnectState) {
      this.$patch({ connectState });
    },
    getSelfInfoByReq() {
      IMSDK.getSelfUserInfo()
        .then(({ data }) => {
          this.$patch({ selfInfo: data as unknown as BusinessUserInfo });
          getBusinessUserInfo([data.userID]).then(({ data }) => {
            const users: BusinessUserInfo[] = data.users;
            this.$patch((state: UserState) => ({
              selfInfo: { ...state.selfInfo, ...users[0] },
            }));
          });
        })
        .catch((error: unknown) => {
          feedbackToast({ error, msg: t("toast.getSelfInfoFailed") });
          this.userLogout();
        });
    },
    updateSelfInfo(info: Partial<BusinessUserInfo>) {
      this.$patch({ selfInfo: { ...this.selfInfo, ...info } as BusinessUserInfo });
    },
    updateAppSettings(settings: Partial<AppSettings>) {
      if (settings.locale) {
        setLocale(settings.locale);
      }
      this.$patch({ appSettings: { ...this.appSettings, ...settings } as AppSettings });
    },
    async userLogout(force = false) {
      if (!force) await IMSDK.logout();
      clearIMProfile();
      this.$patch({ selfInfo: {} as BusinessUserInfo });
      // useContactStore.getState().clearContactStore();
      // useConversationStore.getState().clearConversationStore();
      // window.electronAPI?.ipcInvoke("updateUnreadCount", 0);
      // router.navigate("/login");
    },
  },
});
