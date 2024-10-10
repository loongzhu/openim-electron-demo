<script setup lang="ts" name="OIMAvatar">
import { Avatar as AntdAvatar } from "ant-design-vue";
import { ref, toRefs } from "vue";

import default_group from "@/assets/images/contact/group.png";
import { getDefaultAvatar } from "@/utils/avatar";

import { avatarList } from "@/utils/avatar";

interface Props {
  src: string;
  text: string;
  size?: number;
  color?: string;
  bgColor?: string;
  isgroup?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 42,
  color: "#fff",
  bgColor: "#0289FA",
  isgroup: false,
});

const { src, text, size, color, bgColor, isgroup } = toRefs(props);

const default_avatars = avatarList.map((item) => item.name);

const errorHolder = ref();

const getAvatarUrl = () => {
  if (src?.value) {
    if (default_avatars.includes(src?.value)) return getDefaultAvatar(src?.value);

    return src?.value;
  }
  return isgroup?.value ? default_group : undefined;
};
</script>

<template>
  <AntdAvatar
    :style="{
      backgroundColor: bgColor,
      minWidth: `${size}px`,
      minHeight: `${size}px`,
      lineHeight: `${size - 2}px`,
      color,
    }"
    shape="square"
    :src="errorHolder ?? getAvatarUrl()"
  >
    {{ text }}
  </AntdAvatar>
</template>

<style scoped lang="scss"></style>
