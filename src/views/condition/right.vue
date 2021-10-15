<template>
  <div>
    <right-input
      v-if="curRightOption && curRightOption.type == '2'"
      :node="node"
      :curRightOption="curRightOption"
      @updateConditionRightValue="(v) => $emit('updateConditionRightValue', v)"
    />
    <right-select
      v-else-if="curRightOption && curRightOption.type == '1'"
      :node="node"
      :curRightOption="curRightOption"
      @updateConditionRightValue="(v) => $emit('updateConditionRightValue', v)"
    />
  </div>
</template>

<script>
import RightInput from "./components/right-input.vue";
import RightSelect from "./components/right-input.vue";
export default {
  name: "conditionRight",
  componentName: "conditionRight",

  props: {
    node: {
      default() {
        return {};
      },
    },
    curSceneFields: {
      default: () => {},
    },
  },
  computed: {
    curRightOption() {
      if (Object.keys(this.curSceneFields).length > 0) {
        return this.curSceneFields[this.node.data.field];
      } else {
        return "";
      }
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
    RightSelect,
  },
};
</script>

<style>
</style>