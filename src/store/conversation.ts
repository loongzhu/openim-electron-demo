import {
  ConversationItem,
  GroupItem,
  GroupMemberItem,
} from "@openim/wasm-client-sdk/lib/types/entity";
import { t } from "i18next";
import { defineStore } from "pinia";

import { IMSDK } from "@/layout/MainContentWrap";
import { feedbackToast } from "@/utils/common";
import { conversationSort, isGroupSession } from "@/utils/imCommon";

import { ConversationListUpdateType } from "./type";
import { useUserStore } from "./user";

const CONVERSATION_SPLIT_COUNT = 500;

export const useConversationStore = defineStore("conversation", {
  state: () => ({
    conversationList: [],
    currentConversation: undefined,
    unReadCount: 0,
    currentGroupInfo: undefined,
    currentMemberInGroup: undefined,
  }),
  actions: {
    async getConversationListByReq(isOffset?: boolean) {
      let tmpConversationList = [] as ConversationItem[];
      try {
        const { data } = await IMSDK.getConversationListSplit({
          offset: isOffset ? this.conversationList.length : 0,
          count: CONVERSATION_SPLIT_COUNT,
        });
        tmpConversationList = data;
      } catch (error) {
        feedbackToast({ error, msg: t("toast.getConversationFailed") });
        return true;
      }

      this.$patch({
        conversationList: [
          ...(isOffset ? this.conversationList : []),
          ...tmpConversationList,
        ],
      });

      return tmpConversationList.length === CONVERSATION_SPLIT_COUNT;
    },
    updateConversationList(list: ConversationItem[], type: ConversationListUpdateType) {
      const idx = list.findIndex(
        (c) => c.conversationID === this.currentConversation?.conversationID,
      );
      if (idx > -1) this.updateCurrentConversation(list[idx]);

      if (type === "filter") {
        this.$patch({
          conversationList: conversationSort([...list, ...this.conversationList]),
        });
        return;
      }

      let filterArr: ConversationItem[] = [];
      const chids = list.map((ch) => ch.conversationID);
      filterArr = this.conversationList.filter(
        (tc) => !chids.includes(tc.conversationID as string),
      );

      this.$patch({ conversationList: conversationSort([...list, ...filterArr]) });
    },
    delConversationByCID(conversationID: string) {
      const tmpConversationList = this.conversationList;
      const idx = tmpConversationList.findIndex(
        (cve) => cve.conversationID === conversationID,
      );
      if (idx < 0) {
        return;
      }
      tmpConversationList.splice(idx, 1);
      this.$patch({ conversationList: [...tmpConversationList] });
    },
    updateCurrentConversation(conversation?: ConversationItem) {
      if (!conversation) {
        this.$patch({
          currentConversation: undefined,
          quoteMessage: undefined,
          currentGroupInfo: undefined,
          currentMemberInGroup: undefined,
        });
        return;
      }

      const prevConversation = this.currentConversation;

      const toggleNewConversation =
        conversation.conversationID !== prevConversation?.conversationID;
      if (toggleNewConversation && isGroupSession(conversation.conversationType)) {
        this.getCurrentGroupInfoByReq(conversation.groupID);
        this.getCurrentMemberInGroupByReq(conversation.groupID);
      }

      this.$patch({ currentConversation: { ...conversation } });
    },
    async getUnReadCountByReq() {
      try {
        const { data } = await IMSDK.getTotalUnreadMsgCount();
        this.$patch({ unReadCount: data });
        return data;
      } catch (error) {
        console.error(error);
        return 0;
      }
    },
    updateUnReadCount(count: number) {
      this.$patch({ unReadCount: count });
    },
    async getCurrentGroupInfoByReq(groupID: string) {
      let groupInfo: GroupItem;
      try {
        const { data } = await IMSDK.getSpecifiedGroupsInfo([groupID]);
        groupInfo = data[0];
      } catch (error) {
        feedbackToast({ error, msg: t("toast.getGroupInfoFailed") });
        return;
      }

      this.$patch({ currentGroupInfo: { ...groupInfo } });
    },
    updateCurrentGroupInfo(groupInfo: GroupItem) {
      this.$patch({ currentGroupInfo: { ...groupInfo } });
    },
    async getCurrentMemberInGroupByReq(groupID: string) {
      const userStore = useUserStore();

      let memberInfo: GroupMemberItem;
      const selfID = userStore.selfInfo.userID;
      try {
        const { data } = await IMSDK.getSpecifiedGroupMembersInfo({
          groupID,
          userIDList: [selfID],
        });
        memberInfo = data[0];
      } catch (error) {
        feedbackToast({ error, msg: t("toast.getGroupMemberFailed") });
        return;
      }

      this.$patch({ currentMemberInGroup: { ...memberInfo } });
    },
    tryUpdateCurrentMemberInGroup(member: GroupMemberItem) {
      const currentMemberInGroup = this.currentMemberInGroup;
      if (
        member.groupID === currentMemberInGroup?.groupID &&
        member.userID === currentMemberInGroup?.userID
      ) {
        this.$patch({ currentMemberInGroup: { ...member } });
      }
    },
    clearConversationStore() {
      this.$reset();
    },
  },
});
