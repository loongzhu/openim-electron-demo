<script setup lang="ts" name="index">
import { Popover } from "ant-design-vue";
import i18n, { t } from "i18next";
import { reactive, ref } from "vue";

import add_friend from "@/assets/images/topSearchBar/add_friend.png";
import add_group from "@/assets/images/topSearchBar/add_group.png";
import create_group from "@/assets/images/topSearchBar/create_group.png";
import search from "@/assets/images/topSearchBar/search.png";
import show_more from "@/assets/images/topSearchBar/show_more.png";
import WindowControlBar from "@/components/WindowControlBar/index.vue";

const actionMenuList = reactive([
  {
    idx: 0,
    title: t("placeholder.addFriends"),
    icon: add_friend,
  },
  {
    idx: 1,
    title: t("placeholder.addGroup"),
    icon: add_group,
  },
  {
    idx: 2,
    title: t("placeholder.createGroup"),
    icon: create_group,
  },
]);

i18n.on("languageChanged", () => {
  actionMenuList[0].title = t("placeholder.addFriends");
  actionMenuList[1].title = t("placeholder.addGroup");
  actionMenuList[2].title = t("placeholder.createGroup");
});

const actionVisible = ref(false);
const setActionVisible = (vis: boolean) => {
  actionVisible.value = vis;
};

const actionClick = (idx: number) => {
  switch (idx) {
    case 0:
    case 1:
      // setIsSearchGroup(Boolean(idx));
      // searchModalRef.current?.openOverlay();
      break;
    case 2:
      // setChooseModalState({ type: "CRATE_GROUP" });
      // chooseModalRef.current?.openOverlay();
      break;
    case 3:
      break;
    default:
      break;
  }
  setActionVisible(false);
};
</script>

<template>
  <div
    class="no-mobile app-drag flex h-10 min-h-[40px] items-center bg-[var(--top-search-bar)] dark:bg-[#141414]"
  >
    <div class="flex w-full items-center justify-center">
      <div
        class="app-no-drag flex h-[26px] w-1/3 cursor-pointer items-center justify-center rounded-md bg-[rgba(255,255,255,0.2)]"
      >
        <img width="16" :src="search" alt="" />
        <span class="ml-2 text-[#D2E3F8]">{{ t("placeholder.search") }}</span>
      </div>

      <Popover
        :arrow="false"
        :title="null"
        trigger="click"
        placement="bottom"
        :open="actionVisible"
        @open-change="(vis) => setActionVisible(vis)"
      >
        <img
          class="app-no-drag ml-8 cursor-pointer"
          width="20"
          :src="show_more"
          alt="show_more"
        />

        <template #content>
          <div class="p-1">
            <div
              v-for="item in actionMenuList"
              :key="item.idx"
              class="flex cursor-pointer items-center rounded px-3 py-2 text-xs hover:bg-[var(--primary-active)]"
              @click="() => actionClick(item.idx)"
            >
              <img width="20" :src="item.icon" alt="call_video" />
              <div class="ml-3">
                {{ item.title }}
              </div>
            </div>
          </div>
        </template>
      </Popover>
    </div>
    <WindowControlBar />
    <!-- <UserCardModal ref={userCardRef} {...userCardState} />
      <GroupCardModal ref={groupCardRef} groupData={groupCardData} />
      <ChooseModal ref={chooseModalRef} state={chooseModalState} />
      <SearchUserOrGroup
        ref={searchModalRef}
        isSearchGroup={isSearchGroup}
        openUserCardWithData={openUserCardWithData}
        openGroupCardWithData={openGroupCardWithData}
      />
      <RtcCallModal inviteData={inviteData} ref={rtcRef} /> -->
  </div>
</template>

<style scoped lang="scss"></style>
