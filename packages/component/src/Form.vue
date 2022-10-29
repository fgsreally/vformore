<template>
  <component
    v-for="(item, i) in layoutList"
    :key="item"
    :is="getComponent(config[item]._component)"
    v-model="data[item]"
    v-bind="config[item]"
  ></component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Component } from "vue";
const { config, data, compList, list, getComp } = defineProps<{
  config: { [key: string]: { component: string; [key: string]: any } };
  data: { [key: string]: any };
  compList?: { [key: string]: Component };
  getComp?: (key: string) => Component;
  list?: string;
}>();

let layoutList = computed(() => {
  return list || Object.keys(config);
});

function getComponent(key: string) {
  return getComp?.(key) || compList?.[key] || key;
}
</script>
