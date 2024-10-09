<script setup lang="ts" name="LeftBar">
import { ref } from "vue";
import { t } from "i18next";

import login_bg from "@/assets/images/login/login_bg.png";

const configVisible = ref(false);

const setConfigVisible = (visible: boolean) => {
  configVisible.value = visible;
};
</script>

<template>
  <div class="flex min-h-[420]">
    <div class="mr-14 text-center">
      <div class="text-2xl" @click="setConfigVisible(true)">
        {{ t("placeholder.title") }}
      </div>
      <span class="text-sm text-gray-400">{{ t("placeholder.subTitle") }}</span>
      <img :src="login_bg" alt="login_bg" />
    </div>
    <!-- <ConfigModal visible={configVisible} close={closeConfigModal} /> -->
  </div>
</template>

<style scoped lang="scss"></style>
