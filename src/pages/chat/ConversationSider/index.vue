<script setup lang="ts" name="index">
import FlexibleSider from "@/components/FlexibleSider/index.vue";
import { useConversationStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import ConnectBar from "./ConnectBar.vue";
import ConversationItem from "./ConversationItem.vue";

const conversationStore = useConversationStore();

const { conversationList } = storeToRefs(conversationStore);

const route = useRoute();
</script>

<template>
  <div>
    <ConnectBar />
    <FlexibleSider
      :need-hidden="Boolean(route.parmas?.conversationID)"
      wrap-class-name="left-2 right-2 top-1.5 flex flex-col"
    >
      <div class="flex-1">
        <ConversationItem
          v-for="item in conversationList"
          :key="item.conversationID"
          :is-active="route.params.conversationID == item.conversationID"
          :conversation="item"
        />
      </div>
    </FlexibleSider>
  </div>
</template>

<style scoped lang="scss"></style>
