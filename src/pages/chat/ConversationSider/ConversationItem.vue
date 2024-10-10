<script setup lang="ts" name="ConversationItem">
import OIMAvatar from "@/components/OIMAvatar/index.vue";
import { parseTwemoji } from "@/components/Twemoji";
import { useConversationStore } from "@/store";
import { formatConversionTime, formatMessageByType } from "@/utils/imCommon";
import type {
  ConversationItem as ConversationItemType,
  MessageItem,
} from "@openim/wasm-client-sdk/lib/types/entity";
import { Badge } from "ant-design-vue";
import { computed, toRefs } from "vue";
import { useRouter } from "vue-router";

interface Props {
  isActive: boolean;
  conversation: ConversationItemType;
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  conversation: {} as ConversationItemType,
});

const { conversation, isActive } = toRefs(props);

const conversationStore = useConversationStore();

const router = useRouter();

const toSpecifiedConversation = () => {
  if (isActive.value) {
    return;
  }
  conversationStore.updateCurrentConversation({ ...conversation.value });
  router.push(`/chat/${conversation.value.conversationID}`);
};

const latestMessageContent = computed(() => {
  let content: string = "";
  try {
    content = formatMessageByType(
      JSON.parse(conversation.value.latestMsg) as MessageItem,
    );
  } catch (error) {
    content = t("messageDescription.catchMessage");
  }
  return parseTwemoji(content);
});

const latestMessageTime = computed(() => {
  return formatConversionTime(conversation.value.latestMsgSendTime);
});
</script>

<template>
  <div
    class="conversation-item border"
    :class="{
      'conversation-item-active': isActive || conversation.isPinned,
      'conversation-item-pinned': conversation.isPinned,
    }"
    style="border-color: transparent"
    @click="toSpecifiedConversation"
  >
    <!-- eslint-disable-next-line vue/max-attributes-per-line -->
    <Badge size="small" :count="conversation.unreadCount">
      <OIMAvatar
        :src="conversation.faceURL"
        :isgroup="Boolean(conversation.groupID)"
        :text="conversation.showName"
      />
    </Badge>
    <div className="ml-3 flex h-11 flex-1 flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex-1 truncate font-medium">{{ conversation.showName }}</div>
        <div className="ml-2 text-xs text-[var(--sub-text)]">
          {{ latestMessageTime }}
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex min-h-[16px] flex-1 items-center overflow-hidden text-xs">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div
            v-html="latestMessageContent"
            className="truncate text-[rgba(81,94,112,0.5)]"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "./conversation-item.module.scss";
</style>
