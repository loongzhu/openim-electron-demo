<script setup lang="ts" name="index">
import { useUserStore } from "@/store";
import { RightOutlined } from "@ant-design/icons-vue";
import { Divider, Layout, Popover, Upload } from "ant-design-vue";
import i18n, { t } from "i18next";
import { ref } from "vue";
import NavItem from "./NavItem.vue";

import contact_icon from "@/assets/images/nav/nav_bar_contact.png";
import contact_icon_active from "@/assets/images/nav/nav_bar_contact_active.png";
import message_icon from "@/assets/images/nav/nav_bar_message.png";
import message_icon_active from "@/assets/images/nav/nav_bar_message_active.png";
import change_avatar from "@/assets/images/profile/change_avatar.png";

import OIMAvatar from "@/components/OIMAvatar/index.vue";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { Sider } = Layout;

const NavList = [
  {
    icon: message_icon,
    icon_active: message_icon_active,
    title: t("placeholder.chat"),
    path: "/chat",
  },
  {
    icon: contact_icon,
    icon_active: contact_icon_active,
    title: t("placeholder.contact"),
    path: "/contact",
  },
];

i18n.on("languageChanged", () => {
  NavList[0].title = t("placeholder.chat");
  NavList[1].title = t("placeholder.contact");
});

const { selfInfo } = storeToRefs(userStore);

const showProfile = ref(false);
const setShowProfile = (vis: boolean) => {
  showProfile.value = vis;
};

const profileMenuList = [
  {
    title: t("placeholder.myInfo"),
    gap: true,
    idx: 0,
  },
  {
    title: t("placeholder.accountSetting"),
    gap: true,
    idx: 1,
  },
  {
    title: t("placeholder.about"),
    gap: false,
    idx: 2,
  },
  {
    title: t("placeholder.logOut"),
    gap: false,
    idx: 3,
  },
];

i18n.on("languageChanged", () => {
  profileMenuList[0].title = t("placeholder.myInfo");
  profileMenuList[1].title = t("placeholder.accountSetting");
  profileMenuList[2].title = t("placeholder.about");
  profileMenuList[3].title = t("placeholder.logOut");
});

const profileMenuClick = (idx: number) => {
  switch (idx) {
    case 0:
      // emitter.emit("OPEN_USER_CARD", { isSelf: true });
      break;
    case 1:
      // if (window.electronAPI) {
      //   openPersonalSettings();
      //   return;
      // }
      // personalSettingsRef.current?.openOverlay();
      break;
    case 2:
      // if (window.electronAPI) {
      //   openAbout();
      //   return;
      // }
      // aboutRef.current?.openOverlay();
      break;
    case 3:
      // tryLogout();
      break;
    default:
      break;
  }
  setShowProfile(false);
};

const customUpload = async ({ file }: { file: File }) => {
  const resizedFile = await resizeFile(file);
  try {
    const {
      data: { url },
    } = await IMSDK.uploadFile({
      name: resizedFile.name,
      contentType: resizedFile.type,
      uuid: uuidV4(),
      file: resizedFile,
    });
    const newInfo = {
      faceURL: url,
    };
    await updateBusinessUserInfo(newInfo);
    updateSelfInfo(newInfo);
  } catch (error) {
    feedbackToast({ error: t("toast.updateAvatarFailed") });
  }
};
</script>

<template>
  <Sider
    class="no-mobile border-r border-gray-200 !bg-[#F4F4F4] dark:border-gray-800 dark:!bg-[#141414]"
    width="60"
    theme="light"
  >
    <div class="mt-6 flex flex-col items-center">
      <Popover
        trigger="click"
        placement="rightBottom"
        overlayclass="profile-popover"
        :title="null"
        :arrow="false"
        :open="showProfile"
        @openChange="(vis) => setShowProfile(vis)"
      >
        <OIMAvatar
          class="mb-6 cursor-pointer"
          :src="selfInfo.faceURL"
          :text="selfInfo.nickname"
        />

        <template #content>
          <div class="w-72 px-2.5 pb-3 pt-5.5">
            <div class="mb-4.5 ml-3 flex items-center">
              <Upload
                accept=".jpeg,.png,.webp"
                :showUploadList="false"
                :customRequest="customUpload"
              >
                <div class="avatar-wrapper">
                  <OIMAvatar :src="selfInfo.faceURL" :text="selfInfo.nickname" />
                  <div class="mask">
                    <img :src="change_avatar" width="19" alt="change_avatar" />
                  </div>
                </div>
              </Upload>
              <div class="flex-1 overflow-hidden">
                <div class="mb-1 truncate text-base font-medium">
                  {{ selfInfo.nickname }}
                </div>
              </div>
            </div>

            <div v-for="menu in profileMenuList" :key="menu.idx">
              <div
                class="flex cursor-pointer items-center justify-between rounded-md px-3 py-4 hover:bg-[var(--primary-active)]"
                @click="profileMenuClick(menu.idx)"
              >
                <div>{{ menu.title }}</div>
                <RightOutlined />
              </div>
              <div v-if="menu.gap" class="px-3">
                <Divider class="my-1.5 border-[var(--gap-text)]" />
              </div>
            </div>
          </div>
        </template>
      </Popover>

      <NavItem v-for="nav in NavList" :nav="nav" :key="nav.path" />
    </div>
    <!-- <PersonalSettings ref={personalSettingsRef} />
      <About ref={aboutRef} /> -->
  </Sider>
</template>

<style scoped lang="scss">
@use "./left-nav-bar.module.scss" as *;
</style>
