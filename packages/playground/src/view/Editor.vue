<template>
  <ElPlusForm
    :config="config"
    :data="data"
    ref="ruleFormRef"
    :model="data"
    label-width="120px"
    :rules="rules"
  ></ElPlusForm>
  <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
  {{ data }}
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { createInstance } from "@vformore/core";
// import Form from "@vformore/component";
import { ElPlusForm } from "@vformore/component";
import { Pension } from "./Model";
import { ElMessage, FormInstance, ElButton } from "element-plus";

let ruleFormRef = ref<FormInstance>();
let { config, data } = createInstance({
  age: {
    _component: "ElInputNumber",
    _default: 40,
    _formItem: { label: "年龄", prop: "age" },

    label: "年龄",
  },
  money: {
    _component: "ElSelect",
    _formItem: { label: "退休金", prop: "money" },
    _default: 3000,
    _children: [
      { key: "low", label: "普通", value: 3000, _component: "ElOption" },
      { key: "high", label: "高", value: 8000, _component: "ElOption" },
    ],
    disabled: "{{age<55}}",
    label: "退休金",
  },
});

let rules = reactive(new Pension().getRules());

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.$.exposed?.validate((valid: boolean) => {
    if (valid) {
      ElMessage.success("submit!");
    } else {
      ElMessage.error("error submit!");
      return false;
    }
  });
};
</script>
