<template>
  <CustomForm
    :config="config"
    :data="data"
    :model="data"
    ref="ruleFormRef"
    label-width="120px"
    :rules="rules"
  >
  </CustomForm>

  <n-button type="primary" @click="submitForm(ruleFormRef)">Submit</n-button>
  {{ data }}
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { createInstance } from "@vformore/core";
// import Form from "@vformore/component";
import { createForm } from "@vformore/component";

import * as Naive from "naive-ui";
import { NForm, NFormItem, NButton } from "naive-ui";
import { ElMessage } from "element-plus";

import { Rule, NaiveModel } from "@vformore/model";

class Pension extends NaiveModel<Pension> {
  @Rule(
    (num: number) => {
      return num > 55;
    },
    "需要大于55",
    { trigger: "input" }
  )
  age: number;
  @Rule((num: number) => {
    return num > 5000;
  }, "似乎太低了")
  money: number;
}
const CustomForm = createForm(Naive, NForm, NFormItem, "value");

let ruleFormRef = ref<any>();
let { config, data } = createInstance({
  age: {
    _component: "NInputNumber",
    _default: 40,
    _formItem: { label: "年龄", path: "age" },

    label: "年龄",
  },
  money: {
    _component: "NSelect",
    _formItem: { label: "退休金", path: "money" },
    _default: 3000,
    options: [
      { key: "low", label: "普通", value: 3000 },
      { key: "high", label: "高", value: 8000 },
    ],
    disabled: "{{age<=55}}",
    label: "退休金",
  },
});

let rules = reactive(new Pension().getRules({ trigger: "blur" }));
const submitForm = (formEl: any) => {
  if (!formEl) return;
  console.log(formEl.$.exposed);

  formEl.$.exposed?.validate((errors: any) => {
    if (errors) {
      ElMessage.error("fail");
    } else {
      ElMessage.success("success");
    }
  });
};
</script>
