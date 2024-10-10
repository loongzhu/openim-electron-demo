<script setup lang="ts" name="index">
import { toRefs } from "vue";

interface Props {
  needHidden?: boolean;
  wrapClassName: string;
}

const props = withDefaults(defineProps<Props>(), {
  needHidden: false,
  wrapClassName: "",
});

const { needHidden, wrapClassName } = toRefs(props);
</script>

<template>
  <aside
    class="relative bg-white dark:text-white"
    :class="{
      'max-[600px]:hidden': needHidden,
      'max-[600px]:!max-w-none max-[600px]:!basis-full': !needHidden,
    }"
  >
    <div
      class="absolute bottom-0 left-0 right-1 top-0 z-10 overflow-hidden"
      :class="wrapClassName"
    >
      <slot></slot>
    </div>
    <div class="sider_resize"></div>
    <div class="sider_bar"></div>
  </aside>
</template>

<style scoped lang="scss">
@use "./flexible-sider.module.scss" as styles;
</style>
