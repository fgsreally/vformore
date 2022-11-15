<template>
  <!-- <ElPlusForm
    :config="config"
    :data="data"
    ref="ruleFormRef"
    :model="data"
    label-width="120px"
    :rules="rules"
  ></ElPlusForm> -->
  <CustomForm
    :config="config"
    :data="data"
    ref="ruleFormRef"
    :model="data"
    label-width="120px"
    :rules="rules"
  >
  </CustomForm>

  <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
  {{ data }}
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { createInstance } from "@vformore/core";
// import Form from "@vformore/component";
import { createForm } from "@vformore/component";
import { ElForm, ElFormItem, ElMessage, ElButton ,FormRules} from "element-plus";
import * as ElPlus from "element-plus";

import { Rule, ElPlusModel } from "@vformore/model";

class Pension extends ElPlusModel<Pension> {
  @Rule(
    (num: number) => {
      return num > 55;
    },
    "需要大于55",
    { required: true }
  )
  age: number;
  @Rule((num: number) => {
    return num > 5000;
  }, "似乎太低了")
  money: number;
}

const CustomForm = createForm(ElPlus, ElForm, ElFormItem);

let ruleFormRef = ref<any>();
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

let rules = reactive(new Pension().getRules({ trigger: "blur" }));

const submitForm = (formEl: any) => {
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
