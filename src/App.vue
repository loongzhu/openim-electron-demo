<script setup lang="ts">
import { App, ConfigProvider } from "ant-design-vue";
</script>

<template>
  <ConfigProvider>
    <App> <router-view></router-view> </App>
  </ConfigProvider>
</template>

<style scoped></style>
