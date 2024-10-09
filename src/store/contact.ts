import { ApplicationHandleResult } from "@openim/wasm-client-sdk";
import {
  BlackUserItem,
  FriendApplicationItem,
  FriendUserItem,
  GroupApplicationItem,
  GroupItem,
} from "@openim/wasm-client-sdk/lib/types/entity";
import { t } from "i18next";
import { defineStore } from "pinia";

import { IMSDK } from "@/layout/MainContentWrap";
import { feedbackToast } from "@/utils/common";

export const useContactStore = defineStore("contact", {
  state: () => ({
    friendList: [],
    blackList: [],
    groupList: [],
    recvFriendApplicationList: [],
    sendFriendApplicationList: [],
    recvGroupApplicationList: [],
    sendGroupApplicationList: [],
    unHandleFriendApplicationCount: 0,
    unHandleGroupApplicationCount: 0,
  }),
  actions: {
    async getFriendListByReq() {
      try {
        let offset = 0;
        let tmpList = [] as FriendUserItem[];
        let initialFetch = true;
        // eslint-disable-next-line
        while (true) {
          const count = initialFetch ? 10000 : 1000;
          const { data } = await IMSDK.getFriendListPage({ offset, count });
          tmpList = [...tmpList, ...data];
          offset += count;
          if (data.length < count) break;
          initialFetch = false;
        }
        // const { data } = await IMSDK.getFriendList();
        this.$patch({
          friendList: [...tmpList],
        });
      } catch (error) {
        feedbackToast({ error, msg: t("toast.getFriendListFailed") });
      }
    },
    setFriendList(list: FriendUserItem[]) {
      this.$patch({ friendList: list });
    },
    updateFriend(friend: FriendUserItem, remove?: boolean) {
      const tmpList = [...this.friendList];
      const idx = tmpList.findIndex((f) => f.userID === friend.userID);
      if (idx < 0) {
        return;
      }
      if (remove) {
        tmpList.splice(idx, 1);
      } else {
        tmpList[idx] = { ...friend };
      }
      this.$patch({ friendList: tmpList });
    },
    pushNewFriend(friend: FriendUserItem) {
      this.$patch({ friendList: [...this.friendList, friend] });
    },
    async getBlackListByReq() {
      try {
        const { data } = await IMSDK.getBlackList();
        this.$patch({ blackList: data });
      } catch (error) {
        feedbackToast({ error, msg: t("toast.getBlackListFailed") });
      }
    },
    updateBlack(black: BlackUserItem, remove?: boolean) {
      const tmpList = [...this.blackList];
      const idx = tmpList.findIndex((b) => b.userID === black.userID);
      if (idx < 0) {
        return;
      }
      if (remove) {
        tmpList.splice(idx, 1);
      } else {
        tmpList[idx] = { ...black };
      }
      this.$patch({ blackList: tmpList });
    },
    pushNewBlack(black: BlackUserItem) {
      this.$patch({ blackList: [...this.blackList, black] });
    },
    async getGroupListByReq() {
      try {
        let offset = 0;
        let tmpList = [] as GroupItem[];
        // eslint-disable-next-line
        while (true) {
          const { data } = await IMSDK.getJoinedGroupListPage({ offset, count: 1000 });
          tmpList = [...tmpList, ...data];
          offset += 1000;
          if (data.length < 1000) break;
        }

        // const { data } = await IMSDK.getJoinedGroupList();
        this.$patch({ groupList: tmpList });
      } catch (error) {
        feedbackToast({ error, msg: t("toast.getGroupListFailed") });
      }
    },
    setGroupList(list: GroupItem[]) {
      this.$patch({ groupList: list });
    },
    updateGroup(group: GroupItem, remove?: boolean) {
      const tmpList = [...this.groupList];
      const idx = tmpList.findIndex((g) => g.groupID === group.groupID);
      if (idx < 0) {
        return;
      }
      if (remove) {
        tmpList.splice(idx, 1);
      } else {
        tmpList[idx] = { ...group };
      }
      this.$patch({ groupList: tmpList });
    },
    pushNewGroup(group: GroupItem) {
      this.$patch({ groupList: [...this.groupList, group] });
    },
    async getRecvFriendApplicationListByReq() {
      try {
        const { data } = await IMSDK.getFriendApplicationListAsRecipient();
        const unHandleFriendApplicationCount = data.filter(
          (application) => application.handleResult === 0,
        ).length;
        this.$patch({
          recvFriendApplicationList: data,
          unHandleFriendApplicationCount,
        });
      } catch (error) {
        console.error(error);
      }
    },
    updateRecvFriendApplication(application: FriendApplicationItem) {
      let tmpList = [...this.recvFriendApplicationList];
      let isHandleResultUpdate = false;
      const idx = tmpList.findIndex((a) => a.fromUserID === application.fromUserID);
      if (idx < 0) {
        tmpList = [...tmpList, application];
      } else {
        isHandleResultUpdate = true;
        tmpList[idx] = { ...application };
      }
      if (idx < 0 || isHandleResultUpdate) {
        const unHandleFriendApplicationCount = tmpList.filter(
          (application) => application.handleResult === 0,
        ).length;
        this.$patch({
          recvFriendApplicationList: tmpList,
          unHandleFriendApplicationCount,
        });
        return;
      }
      this.$patch({ recvFriendApplicationList: tmpList });
    },
    async getSendFriendApplicationListByReq() {
      try {
        const { data } = await IMSDK.getFriendApplicationListAsApplicant();
        this.$patch({ sendFriendApplicationList: data });
      } catch (error) {
        console.error(error);
      }
    },
    updateSendFriendApplication(application: FriendApplicationItem) {
      let tmpList = [...this.sendFriendApplicationList];
      const idx = tmpList.findIndex((a) => a.toUserID === application.toUserID);
      if (idx < 0) {
        tmpList = [...tmpList, application];
      } else {
        tmpList[idx] = { ...application };
      }
      this.$patch({ sendFriendApplicationList: tmpList });
    },
    async getRecvGroupApplicationListByReq() {
      try {
        const { data } = await IMSDK.getGroupApplicationListAsRecipient();
        const unHandleGroupApplicationCount = data.filter(
          (application) => application.handleResult === 0,
        ).length;
        this.$patch({ recvGroupApplicationList: data, unHandleGroupApplicationCount });
      } catch (error) {
        console.error(error);
      }
    },
    updateRecvGroupApplication(application: GroupApplicationItem) {
      let tmpList = [...this.recvGroupApplicationList];
      let isHandleResultUpdate = false;
      const idx = tmpList.findIndex((a) => a.userID === application.userID);
      if (idx < 0) {
        tmpList = [...tmpList, application];
      } else {
        isHandleResultUpdate = true;
        tmpList[idx] = { ...application };
      }
      if (idx < 0 || application.handleResult === ApplicationHandleResult.Unprocessed) {
        const unHandleGroupApplicationCount = tmpList.filter(
          (application) => application.handleResult === 0,
        ).length;
        this.$patch({
          recvGroupApplicationList: tmpList,
          unHandleGroupApplicationCount,
        });
        return;
      }
      this.$patch({ recvGroupApplicationList: tmpList });
    },
    async getSendGroupApplicationListByReq() {
      try {
        const { data } = await IMSDK.getGroupApplicationListAsApplicant();
        this.$patch({ sendGroupApplicationList: data });
      } catch (error) {
        console.error(error);
      }
    },
    updateSendGroupApplication(application: GroupApplicationItem) {
      let tmpList = [...this.sendGroupApplicationList];
      const idx = tmpList.findIndex((a) => a.groupID === application.groupID);
      if (idx < 0) {
        tmpList = [...tmpList, application];
      } else {
        tmpList[idx] = { ...application };
      }
      this.$patch({ sendGroupApplicationList: tmpList });
    },
    updateUnHandleFriendApplicationCount(num: number) {
      this.$patch({ unHandleFriendApplicationCount: num });
    },
    updateUnHandleGroupApplicationCount(num: number) {
      this.$patch({ unHandleGroupApplicationCount: num });
    },
    clearContactStore() {
      this.$reset();
    },
  },
});
