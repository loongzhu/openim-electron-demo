<script setup lang="ts" name="ConnectBar">
import { useUserStore } from "@/store";
import { t } from "i18next";
import { storeToRefs } from "pinia";
import { computed } from "vue";

import sync from "@/assets/images/common/sync.png";
import sync_error from "@/assets/images/common/sync_error.png";

const userStore = useUserStore();

const { syncState, connectState, reinstall } = storeToRefs(userStore);

const showLoading = computed(
  () => syncState.value === "loading" || connectState.value === "loading",
);

const showFailed = computed(
  () => syncState.value === "error" || connectState.value === "error",
);

const loadingTip = computed(() => {
  return syncState.value === "loading" ? t("connect.syncing") : t("connect.connecting");
});

const errorTip = computed(() => {
  return syncState.value === "failed"
    ? t("connect.syncFailed")
    : t("connect.connectFailed");
});
</script>

<template>
  <div
    v-show="!reinstall"
    class="flex h-6 items-center justify-center"
    :class="{
      'bg-[#0089FF] bg-opacity-10': showLoading,
      'bg-[#FF381F] bg-opacity-15': showFailed,
    }"
  >
    <img v-show="showLoading" :src="sync" alt="sync" class="loading mr-1 h-3 w-3" />
    <img v-show="showFailed" :src="sync_error" alt="sync_error" class="mr-1 h-3 w-3" />
    <span v-show="showLoading" class="text-xs text-[#0089FF]">
      {{ showLoading ? loadingTip : "" }}
    </span>
    <span v-show="showFailed" class="text-xs text-[#FF381F]">
      {{ showFailed ? errorTip : "" }}
    </span>
  </div>
</template>

<style scoped lang="scss">
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loading {
  animation: loading 1.5s infinite;
}
</style>
