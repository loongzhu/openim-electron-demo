<script setup lang="ts" name="LoginForm">
import { t } from "i18next";
import md5 from "md5";
import { reactive } from "vue";
import { useRouter } from "vue-router";

import { useLogin } from "@/api/login";
import {
  getEmail,
  getPhoneNumber,
  setAreaCode,
  setEmail,
  setIMProfile,
  setPhoneNumber,
} from "@/utils/storage";

import { areaCode } from "./areaCode";

enum LoginType {
  Password,
  VerifyCode,
}

const emits = defineEmits<{
  setFormType: (type: FormType) => void;
}>();

const router = useRouter();

const loginMethod = defineModel<"phone" | "email">();

const rules = reactive({
  email: [{ required: true, type: "email", message: t("toast.inputCorrectEmail") }],
});

const form = reactive<API.Login.LoginParams>({
  areaCode: "+86",
  phoneNumber: getPhoneNumber() ?? "",
  email: getEmail() ?? "",
  password: "",
});

const { mutate: login, isLoading: loginLoading } = useLogin();

const onFinish = (params: API.Login.LoginParams) => {
  if (params.phoneNumber) {
    setAreaCode(params.areaCode);
    setPhoneNumber(params.phoneNumber);
  }
  if (params.email) {
    setEmail(params.email);
  }
  params.password = md5(params.password);
  login(params, {
    onSuccess: (data) => {
      const { chatToken, imToken, userID } = data.data;
      setIMProfile({ chatToken, imToken, userID });
      router.push("/chat");
    },
  });
};

function setFormType(type: FormType) {
  emits("setFormType", type);
}
</script>

<template>
  <div class="flex flex-row items-center justify-between">
    <div class="text-xl font-medium">{{ t("placeholder.welcome") }}</div>
  </div>

  <el-tabs v-model="loginMethod">
    <el-tab-pane :label="t('placeholder.phoneNumber')" name="phone"></el-tab-pane>
    <el-tab-pane :label="t('placeholder.email')" name="email"></el-tab-pane>
  </el-tabs>

  <el-form :model="form" :rules="rules" label-width="auto" label-position="top">
    <el-form-item v-if="loginMethod === 'phone'" :label="t('placeholder.phoneNumber')">
      <el-input
        v-model="form.phoneNumber"
        :placeholder="t('toast.inputPhoneNumber')"
        class="input-with-select"
        clearable
      >
        <template #prepend>
          <el-select class="!w-28" v-model="form.areaCode">
            <el-option
              v-for="item in areaCode"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item v-else :label="t('placeholder.email')" prop="email">
      <el-input v-model="form.email" :placeholder="t('toast.inputEmail')" />
    </el-form-item>
    <el-form-item :label="t('placeholder.password')">
      <el-input
        v-model="form.password"
        type="password"
        :placeholder="t('toast.inputPassword')"
        clearable
        show-password
      />
    </el-form-item>

    <el-form-item class="mb-4">
      <el-button
        class="w-full"
        type="primary"
        @click="onFinish(form)"
        :loading="loginLoading"
      >
        {{ t("placeholder.login") }}
      </el-button>
    </el-form-item>
    <div class="flex flex-row items-center justify-center">
      <span class="text-sm text-gray-400">
        {{ t("placeholder.registerToast") }}
      </span>
      <span class="cursor-pointer text-sm text-blue-500" @click="setFormType(2)">
        {{ t("placeholder.toRegister") }}
      </span>
    </div>
  </el-form>
</template>

<style scoped lang="scss">
.input-with-select :deep(.el-input-group__prepend) {
  background-color: var(--el-fill-color-blank);
}
</style>
