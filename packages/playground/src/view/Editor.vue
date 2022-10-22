<template>
  <el-input v-model="data.age" placeholder="年纪"></el-input>
  <el-input
    v-model="data.money"
    placeholder="退休金(大于55)"
    v-bind="config.money"
  ></el-input>
</template>

<script setup lang="ts">
import { ElInput } from "element-plus";
import { createInstance } from "@vformore/core";
import { ref } from "vue";

let { config, data } = createInstance({
  age: {
    default: 40,
  },
  money: {
    disabled: "{age<55}",
  },
});
</script>
