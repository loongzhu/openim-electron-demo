<script setup lang="ts" name="EmptyChat">
import { Button, Layout } from "ant-design-vue";
import { t } from "i18next";

import empty_chat_bg from "@/assets/images/empty_chat_bg.png";

const createNow = () => {
  // emitter.emit("OPEN_CHOOSE_MODAL", {
  //   type: "CRATE_GROUP",
  // });

  console.log("createNow");
};
</script>

<template>
  <Layout class="no-mobile flex items-center justify-center bg-white">
    <div>
      <div class="mb-12 flex flex-col items-center">
        <div class="mb-3 text-xl font-medium">
          {{ t("placeholder.createGroup") }}
        </div>
        <div class="text-[var(--sub-text)]">
          {{ t("placeholder.createGroupToast") }}
        </div>
      </div>
      <img :src="empty_chat_bg" alt="" width="320" />

      <div class="mt-28 flex justify-center">
        <Button class="px-8" type="primary" @click="createNow">
          {{ t("placeholder.createNow") }}
        </Button>
      </div>
    </div>
  </Layout>
</template>

<style scoped lang="scss"></style>
