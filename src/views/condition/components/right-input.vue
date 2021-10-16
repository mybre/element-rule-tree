<template>
  <div>
    <el-input v-model="value" />
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
        console.log(val, "123123");
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