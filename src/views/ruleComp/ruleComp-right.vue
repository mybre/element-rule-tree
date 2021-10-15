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
  watch: {
    value(v) {
      this.$emit("updateRuleCompRightValue", v);
    },
  },
};
</script>

<style>
</style>