<template>
  <div class="rule-comp">
    <div style="width:100px">
      {{ node.data }}
    </div>
    <el-row :gutter="20">
      <el-col :span="8"><ruleCompLeft :node="node" @updateRuleCompLeftValue="updateRuleCompLeftValue"/></el-col>
      <el-col :span="8"><ruleCompRight :node="node" /></el-col>
      <el-col :span="8"><ruleCompCenter :node="node" /></el-col>
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
    updateRuleCompLeftValue(v){
      this.$emit('updateRuleCompLeftValue', v);
    }
  }
};
</script>

<style>
</style>