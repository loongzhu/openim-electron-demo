<script setup lang="ts" name="NavItem">
import { Badge } from "ant-design-vue";
import { computed, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({ nav: Object });

const route = useRoute();
const router = useRouter();

const { nav } = toRefs(props);

const { icon, icon_active, title, path } = nav?.value;

const isActive = computed(() => {
  return route.path === path;
});

const tryNavigate = () => {
  if (isActive.value) return;
  // TODO Keep answering when jumping back to chat from another page (if there is one)
  // navigator.push(path);
};

const count = computed(() => {
  if (path === "/chat") {
    // return unReadCount;
  }
  if (path === "/contact") {
    // return unHandleFriendApplicationCount + unHandleGroupApplicationCount;
  }
  return 0;
});
</script>

<template>
  <Badge size="small" :count="count">
    <div
      class="mb-3 flex h-[52px] w-12 cursor-pointer flex-col items-center justify-center rounded-md"
      :class="{ 'bg-[#e9e9eb]': isActive }"
      @click="tryNavigate"
    >
      <img width="20" :src="isActive ? icon_active : icon" alt="" />
      <div className="mt-1 text-xs text-gray-500">{{ title }}</div>
    </div>
  </Badge>
</template>

<style scoped lang="scss"></style>
