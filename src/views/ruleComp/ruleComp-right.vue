<template>
  <div>
    <el-input v-model="value" />
  </div>
</template>

<script>
export default {
  name: "ruleCompRight",
  componentName: "ruleCompRight",

  props: {
    node: {
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      value: "",
    };
  },
};
</script>

<style>
</style>