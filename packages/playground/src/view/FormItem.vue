<template>
  <el-form-item :label="label">
    <component v-bind="$attrs" :is="(compList as any)[_component] " />
  </el-form-item>
</template>

<script lang="ts" setup>
import { ElInput, ElFormItem } from "element-plus";
const { label, _component } = defineProps<{
  label: string;
  _component: string;
}>();

const compList = {
  input: ElInput,
};
</script>
