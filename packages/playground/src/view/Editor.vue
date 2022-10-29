<template>
  <el-form :model="data" label-width="120px">
    <Form
      :data="data"
      :config="config"
      :comp-list="compList"
      :get-comp="getComp"
    ></Form>
  </el-form>
</template>

<script setup lang="ts">
import { ElInput } from "element-plus";
import { createInstance } from "@vformore/core";
import FormItem from "./FormItem.vue";
import Form from "@vformore/component";
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
    disabled: "{age<55}",
    label: "退休金",
  },
});

let compList = {
  input: ElInput,
};
</script>
