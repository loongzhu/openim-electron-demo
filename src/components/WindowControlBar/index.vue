<script setup lang="ts" name="index">
import { Platform } from "@openim/wasm-client-sdk";
import { onKeyStroke } from "@vueuse/core";
import { onMounted } from "vue";

import win_close from "@/assets/images/topSearchBar/win_close.png";
import win_max from "@/assets/images/topSearchBar/win_max.png";
import win_min from "@/assets/images/topSearchBar/win_min.png";

function handleClick(type: string) {
  window.electronAPI?.ipcInvoke(type);
}

onMounted(() => {
  onKeyStroke("Escape", (e) => {
    window.electronAPI?.ipcInvoke("minimizeWindow");
  });
});
</script>

<template>
  <div className="absolute right-3 top-3.5 z-[99999999] flex h-fit items-center">
    <div
      className="app-no-drag flex h-[14px] cursor-pointer items-center"
      @click="handleClick('minimizeWindow')"
    >
      <img
        className="app-no-drag cursor-pointer"
        width="14"
        :src="win_min"
        alt="win_min"
      />
    </div>
    <img
      className="app-no-drag mx-3 cursor-pointer"
      width="13"
      :src="win_max"
      alt="win_max"
      @click="handleClick('maxmizeWindow')"
    />
    <img
      className="app-no-drag cursor-pointer"
      width="12"
      :src="win_close"
      alt="win_close"
      @click="handleClick('closeWindow')"
    />
  </div>
</template>

<style scoped lang="scss"></style>
