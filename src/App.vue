<script setup lang="ts">
import { App, ConfigProvider } from "ant-design-vue";

import AntdvAppContextProvider from "./AntdvAppContextProvider.vue";
</script>

<template>
  <ConfigProvider>
    <App>
      <AntdvAppContextProvider>
        <router-view />
      </AntdvAppContextProvider>
    </App>
  </ConfigProvider>
</template>

<style scoped></style>
