<script setup lang="ts" name="index">
import { Layout } from "ant-design-vue";
import {} from "vue";
import { RouterView } from "vue-router";
import ConversationSider from "./ConversationSider/index.vue";
</script>

<template>
  <Layout class="flex-row">
    <ConversationSider />
    <router-view />
  </Layout>
</template>

<style scoped lang="scss"></style>
