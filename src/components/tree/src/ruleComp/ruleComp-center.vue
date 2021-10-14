<template>
  <div>
    <el-input v-model="value" />
  </div>
</template>

<script>
export default {
  name: "ruleCompCenter",
  componentName: "ruleCompCenter",

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