<template>
  <div>
    <right-input v-if="node.data.field == 'input'" />
  </div>
</template>

<script>
import RightInput from "./components/right/right-input.vue";
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
    RightInput,
  },
};
</script>

<style>
</style>