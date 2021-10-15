<template>
  <div>
    <el-select
      class="operator input"
      placeholder="过滤条件"
      :value="node.data.operator"
      @change="(v) => $emit('updateConditionOperateValue', v)"
    >
      <el-option
        v-for="(val, key) in operatorMap"
        :key="key"
        :label="val"
        :value="key"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { operatorMap } from "../ruleData.js";
export default {
  name: "conditionOperate",
  componentName: "conditionOperate",

  props: {
    node: {
      default() {
        return {};
      },
    },
  },
  created() {
    this.operatorMap = operatorMap;
  },
};
</script>

<style>
</style>