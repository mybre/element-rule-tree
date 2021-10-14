<template>
  <div>
    <el-input v-model="value" />
  </div>
</template>

<script>
export default {
  name: "ruleCompLeft",
  componentName: "ruleCompLeft",

  props: {
    node: {
      default() {
        return {};
      },
    },
  },
  watch: {
    value(v) {
      this.$emit('updateRuleCompLeftValue', v);
    }
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