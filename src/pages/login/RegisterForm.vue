<script setup lang="ts" name="RegisterForm">
import { ArrowLeftBold } from "@element-plus/icons-vue";
import { t } from "i18next";
import { reactive, ref, useTemplateRef, watchEffect } from "vue";

import { areaCode } from "./areaCode";

const loginMethod = defineModel<"phone" | "email">();

const emits = defineEmits<{
  setFormType: (type: FormType) => void;
}>();

type FormFields = {
  email?: string;
  phoneNumber?: string;
  areaCode: string;
  verifyCode: string;
  nickname: string;
  password: string;
  password2: string;
};

// 0login 1resetPassword 2register
const registerForm = ref(0);

const code = ref(["", "", "", "", "", ""]);

const setCode = (newCode: string[]) => {
  code.value = newCode;
};

const inputRefs = useTemplateRef("inputRefs");

const handleInputChange = (index: number, e: Event) => {
  const value = e;

  const newCode = [...code.value];

  if (value.length === 1) {
    newCode[index] = value;
    setCode(newCode);

    if (index < code.value.length - 1) {
      inputRefs.value[index + 1].focus();
    }
  } else if (value.length === 0) {
    const newCode = [...code];
    newCode[index] = "";
    setCode(newCode);
  }

  const isFilled = newCode.every((input) => input.length > 0);
  if (isFilled) {
    form.submit();
  }
};

const countdown = ref(0);

watchEffect(() => {
  if (countdown.value > 0) {
    const timer = setInterval(() => {
      countdown.value -= 1;
      if (countdown.value === 0) {
        clearInterval(timer);
      }
    }, 1000);
  }
});

const back = () => {
  emits("setFormType", 0);

  // form.resetFields();
};

const form = reactive<FormFields>({
  areaCode: "+86",
  phoneNumber: "",
  email: "",
  verifyCode: "",
  password: "",
});

const isEmail = loginMethod.value === "email";

const verifyTitile = !isEmail
  ? "placeholder.verifyPhoneNumber"
  : "placeholder.verifyEmail";

const receiver = isEmail ? form.email : `${form.areaCode} ${form.phoneNumber}`;
</script>

<template>
  <div class="flex flex-col justify-between">
    <div className="cursor-pointer text-sm text-gray-400" @click="back">
      <el-icon><ArrowLeftBold /></el-icon>
      <span className="ml-1">{{ t("placeholder.getBack") }}</span>
    </div>
    <div class="mt-4 text-2xl font-medium">
      <span v-if="registerForm === 0">{{ t("placeholder.register") }}</span>
      <span v-else-if="registerForm === 1">{{ t(verifyTitile) }}</span>
      <span v-else>{{ t("placeholder.setInfo") }}</span>
    </div>
    <div class="mt-4 tracking-wider text-gray-400" v-show="registerForm === 1">
      <span>{{ t("placeholder.pleaseEnterSendTo") }}</span>
      <span class="text-blue-600">{{ receiver }}</span>
      <span>{{ t("placeholder.verifyValidity") }}</span>
    </div>
    <el-form :model="form" label-width="auto" label-position="top" class="mt-4">
      <el-form-item v-if="loginMethod === 'phone'">
        <el-input
          v-model="form.phoneNumber"
          :placeholder="t('toast.inputPhoneNumber')"
          class="input-with-select"
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
      <el-form-item v-else>
        <el-input :placeholder="t('toast.inputEmail')"></el-input>
      </el-form-item>

      <el-form-item v-show="registerForm === 1" class="mb-14 mt-8">
        <div className="flex flex-row items-center justify-center">
          <el-input
            v-for="(item, index) in code"
            :key="index"
            :value="item"
            ref="inputRefs"
            maxlength="1"
            size="small"
            class="mr-1 h-6 w-6 text-center"
            @input="(e) => handleInputChange(index, e)"
          ></el-input>
        </div>
        <div className="mt-4 text-gray-400">
          <template v-if="countdown > 0">
            <span className=" text-blue-500">{{ countdown }}s </span>
            <span>{{ t("placeholder.regain") + t("placeholder.verifyCode") }}</span>
          </template>
          <template v-else>
            <span onClick="{sendSmsHandle}" className="cursor-pointer text-blue-500">
              {{ t("placeholder.regain") }}
            </span>
            <span>{{ t("placeholder.verifyCode") }}</span>
          </template>
        </div>
      </el-form-item>
      <el-form-item v-if="registerForm === 2" :label="t('placeholder.nickName')">
        <el-input :placeholder="t('toast.inputNickName')"></el-input>
      </el-form-item>
      <el-form-item v-if="registerForm === 2" :label="t('placeholder.password')">
        <el-input :placeholder="t('toast.inputPassword')"></el-input>
      </el-form-item>
      <el-form-item v-if="registerForm === 2" :label="t('placeholder.confirmPassword')">
        <el-input :placeholder="t('toast.reconfirmPassword')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="w-full" type="primary">
          {{ registerForm === 2 ? t("confirm") : t("placeholder.nextStep") }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.input-with-select :deep(.el-input-group__prepend) {
  background-color: var(--el-fill-color-blank);
}
</style>
