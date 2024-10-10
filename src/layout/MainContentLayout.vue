<script setup lang="ts" name="MainContentLayout">
import { Layout, Spin } from "ant-design-vue";
import { t } from "i18next";
import { computed, toRefs } from "vue";

import { useUserStore } from "@/store";

import LeftNavBar from "./LeftNavBar/index.vue";
import TopSearchBar from "./TopSearchBar/index.vue";
import { useGlobalEvent } from "./useGlobalEven";

useGlobalEvent();

const userStore = useUserStore();
const { updateAppSettings } = userStore;

const { isLogining, progress, reinstall, syncState } = toRefs(userStore);

const loadingTip = computed(() => {
  return isLogining.value ? t("toast.loading") : `${progress.value}%`;
});

const showLockLoading = computed(() => {
  return isLogining.value || (reinstall.value && syncState.value === "loading");
});
</script>

<template>
  <Spin class="!max-h-none" :spinning="showLockLoading" :tip="loadingTip">
    <Layout class="h-full">
      <TopSearchBar />
      <Layout>
        <LeftNavBar />
        <router-view />
      </Layout>
    </Layout>
  </Spin>
</template>

<style scoped lang="scss"></style>
