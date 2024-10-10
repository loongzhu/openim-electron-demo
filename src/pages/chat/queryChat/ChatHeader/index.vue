<script setup lang="ts" name="index">
import group_member from "@/assets/images/chatHeader/group_member.png";
import launch_group from "@/assets/images/chatHeader/launch_group.png";
import settings from "@/assets/images/chatHeader/settings.png";
import OIMAvatar from "@/components/OIMAvatar/index.vue";
import { useConversationStore } from "@/store";
import { SessionType } from "@openim/wasm-client-sdk";
import { Layout, Tooltip } from "ant-design-vue";
import i18n, { t } from "i18next";
import { storeToRefs } from "pinia";
import { computed, reactive } from "vue";

const { Header } = Layout;

const conversationStore = useConversationStore();

const { currentConversation, currentGroupInfo } = storeToRefs(conversationStore);

const isGroup = computed(() => Boolean(currentConversation.value?.groupID));

const isNotification = computed(
  () => currentConversation.value.conversationType === SessionType.Notification,
);

const isSingle = computed(
  () => currentConversation.value.conversationType === SessionType.Single,
);

const showCard = () => {
  if (isSingle.value || isNotification.value) {
    // window.userClick(currentConversation?.userID);
    return;
  }
  if (currentGroupInfo.value) {
    // emitter.emit("OPEN_GROUP_CARD", currentGroupInfo);
  }
};

const menuList = reactive([
  {
    title: t("placeholder.createGroup"),
    icon: launch_group,
    idx: 3,
  },
  {
    title: t("placeholder.invitation"),
    icon: launch_group,
    idx: 4,
  },
  {
    title: t("placeholder.setting"),
    icon: settings,
    idx: 5,
  },
]);

i18n.on("languageChanged", () => {
  menuList[0].title = t("placeholder.createGroup");
  menuList[1].title = t("placeholder.invitation");
  menuList[2].title = t("placeholder.setting");
});

const filteredMenuList = computed(() => {
  return menuList.filter((menu) => {
    if (menu.idx === 4 && (isSingle.value || (!isGroup.value && !isSingle.value))) {
      return false;
    }
    if (menu.idx === 3 && !isSingle.value) {
      return false;
    }
    return true;
  });
});
</script>

<template>
  <Header class="relative border-b border-b-[var(--gap-text)] !bg-white !px-3">
    <div class="flex h-full items-center leading-none">
      <div className="flex flex-1 items-center overflow-hidden">
        <OIMAvatar
          :src="currentConversation?.faceURL"
          :text="currentConversation?.showName"
          :isgroup="isGroup"
          :isnotification="isNotification"
          @click="showCard"
        />
        <div
          class="ml-3 flex !h-10.5 flex-1 flex-col justify-between overflow-hidden"
          :class="{ '!justify-center': isNotification }"
        >
          <div class="truncate text-base font-semibold">
            {{ currentConversation?.showName }}
          </div>
          <div
            v-if="!isSingle && !isNotification"
            class="flex items-center text-xs text-[var(--sub-text)]"
          >
            <img width="20" :src="group_member" alt="member" />
            <span>{{ currentGroupInfo?.memberCount }}</span>
          </div>
        </div>
      </div>

      <div v-if="!isNotification" class="mr-5 flex">
        <Tooltip v-for="menu in filteredMenuList" :title="menu.title" :key="menu.idx">
          <img
            class="ml-5 cursor-pointer"
            width="20"
            :src="menu.icon"
            alt=""
            @click="() => menuClick(menu.idx)"
          />
        </Tooltip>
      </div>
    </div>

    <!-- <SingleSetting ref="{singleSettingRef}" />
    <GroupSetting ref="{groupSettingRef}" /> -->
  </Header>
</template>

<style scoped lang="scss"></style>
