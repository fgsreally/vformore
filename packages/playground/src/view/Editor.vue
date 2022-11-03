<template>
  <el-form :model="data" label-width="120px">
    <Form
      :data="data"
      :config="config"
      :comp-list="compList"
      :get-comp="getComp"
    ></Form>
  </el-form>
  <el-input v-model="data.money"></el-input>

  {{ error ? error : "" }}
</template>

<script setup lang="ts">
import { ElInput, ElForm, ElButton } from "element-plus";
import { ref, watch } from "vue";
import { createInstance } from "@vformore/core";
import FormItem from "./FormItem.vue";
import Form from "@vformore/component";
import { Pension } from "./Model";

let error = ref();

function getComp() {
  return FormItem;
}

let { config, data } = createInstance({
  age: {
    _component: "input",
    _default: 40,
    label: "年龄",
  },
  money: {
    _component: "input",
    _default: 3000,
    disabled: "{{age<55}}",
    label: "退休金",
  },
});

watch(
  data,
  (n) => {
    let pension = new Pension(n);
    error.value = pension.exec().error;
  },
  { deep: true }
);

let compList = {
  input: ElInput,
};
</script>
