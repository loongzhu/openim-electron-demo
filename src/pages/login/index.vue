<script setup lang="ts" name="index">
import { ref, watch } from "vue";
import { t } from "i18next";

import LeftBar from "./LeftBar.vue";
import LoginForm from "./LoginForm.vue";
import WindowControlBar from "@/components/WindowControlBar/index.vue";

export type FormType = 0 | 2;

const formType = ref<FormType>(0);

const setFormType = (type: FormType) => {
  formType.value = type;
};

const loginMethod = ref<"phone" | "email">("phone");

const updateLoginMethod = (method: "phone" | "email") => {
  loginMethod.value = method;
};
</script>

<template>
  <div class="relative flex h-full flex-col">
    <div class="app-drag relative h-10 bg-[var(--top-search-bar)]">
      <WindowControlBar />
    </div>
    <div class="flex flex-1 items-center justify-center">
      <LeftBar />
      <div
        class="mr-14 h-[450px] w-[350px] rounded-md p-11"
        style="box-shadow: 0 0 30px rgba(0, 0, 0, 0.1)"
      >
        <LoginForm
          v-if="formType === 0"
          v-model="loginMethod"
          @setFormType="setFormType"
        />
        <div v-else>
          {{ formType }}
          <!-- <RegisterForm
            v-if="formType === 0"
            v-model="loginMethod"
            @setFormType="setFormType"
          /> -->
        </div>
        <!-- 
          {formType === 2 && (
            <RegisterForm loginMethod={loginMethod} setFormType={setFormType} />
          )} -->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
