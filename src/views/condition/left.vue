<template>
  <div>
    <left-input v-if="node.data.field == 'input'" />
  </div>
</template>

<script>
import LeftInput from "./components/left/left-input.vue";
export default {
  name: "conditionLeft",
  componentName: "conditionLeft",

  props: {
    node: {
      default() {
        return {};
      },
    },
  },
  components: {
    LeftInput
  },
  watch: {
    value(v) {
      this.$emit('updateConditionLeftValue', v);
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