<template>
  <div class="rule-comp">
    <div style="word-wrap: break-word">
      {{ node.data }}
    </div>
    <el-row :gutter="20">
      <el-col :span="8"
        ><ruleCompLeft
          :node="node"
          @updateRuleCompLeftValue="updateRuleCompLeftValue"
      /></el-col>
      <el-col :span="8"
        ><ruleCompCenter
          :node="node"
          @updateRuleCompCenterValue="updateRuleCompCenterValue"
      /></el-col>

      <el-col :span="8"
        ><ruleCompRight
          :node="node"
          @updateRuleCompRightValue="updateRuleCompRightValue"
      /></el-col>
    </el-row>
  </div>
</template>

<script>
import ruleCompLeft from "./ruleComp-left";
import ruleCompRight from "./ruleComp-right";
import ruleCompCenter from "./ruleComp-center";
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
    ruleCompLeft,
    ruleCompRight,
    ruleCompCenter,
  },
  methods: {
    updateRuleCompLeftValue(v) {
      console.log(v, "left");
      this.$emit("updateRuleCompLeftValue", v);
    },
    updateRuleCompRightValue(v) {
      console.log(v, "right");
      this.$emit("updateRuleCompRightValue", v);
    },
    updateRuleCompCenterValue(v) {
      console.log(v, "center");
      this.$emit("updateRuleCompCenterValue", v);
    },
  },
};
</script>

<style>
</style>