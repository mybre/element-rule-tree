<template>
  <div>
    <left-input v-if="node.data.field == 'input'" />
  </div>
</template>

<script>
import LeftInput from "./components/left/left-input.vue";
export default {
  name: "conditionRight",
  componentName: "conditionRight",

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
      this.$emit("updateConditionRightValue", v);
    },
  },
  components: {
    LeftInput,
  },
};
</script>

<style>
</style>