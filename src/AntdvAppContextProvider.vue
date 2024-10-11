<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { appContext } from "@/store/antdv-plugin";
import { App as AApp } from "ant-design-vue";

const staticMethods = AApp.useApp();
Object.assign(appContext, staticMethods);
</script>
