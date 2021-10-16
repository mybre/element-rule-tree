<template>
  <div>
    <el-input v-model="value"  size="mini"/>
  </div>
</template>

<script>
export default {
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
    "node.data.value": {
      handler(val) {
        this.value = val;
      },
      immediate: true,
    },
    value(val) {
      this.$emit("updateConditionRightValue", val);
    },
  },
};
</script>

<style>
</style>