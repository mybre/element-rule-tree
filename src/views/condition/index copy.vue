<template>
  <div class="condition">
    <el-row :gutter="20">
      <el-col :span="8"
        ><Left
          :node="node"
          @updateConditionLeftValue="updateConditionLeftValue"
      /></el-col>
      <el-col :span="8"
        ><Operate
          :node="node"
          @updateConditionOperateValue="updateConditionOperateValue"
      /></el-col>

      <el-col :span="8"
        ><Right
          :node="node"
          @updateConditionRightValue="updateConditionRightValue"
      /></el-col>
    </el-row>
  </div>
</template>

<script>
import Left from "./left";
import Right from "./right";
import Operate from "./operate";
export default {
  name: "ruleComp",
  componentName: "ruleComp",
  props: {
    node: {
      default() {
        return {};
      },
    },
  },
  components: {
    Left,
    Right,
    Operate,
  },
  methods: {
    updateConditionLeftValue(v) {
      console.log(v, "left");
      this.$emit("updateConditionLeftValue", v);
    },
    updateConditionRightValue(v) {
      console.log(v, "right");
      this.$emit("updateConditionRightValue", v);
    },
    updateConditionOperateValue(v) {
      console.log(v, "operate");
      this.$emit("updateConditionOperateValue", v);
    },
  },
};
</script>

<style>
</style>