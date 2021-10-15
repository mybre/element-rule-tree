<template>
  <div class="condition-comp">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-select
          placeholder="属性"
          :value="node.data.field"
          @change="changeLeftValue"
        >
          <el-option
            v-for="(val, key) in curSceneFields"
            :key="key"
            :label="val.fieldName"
            :value="key"
          >
          </el-option>
        </el-select>
      </el-col>

      <el-col :span="4">
        <el-select
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
      </el-col>

      <el-col :span="14"
        ><Right
          :node="node"
          :curSceneFields="curSceneFields"
          @updateConditionRightValue="updateConditionRightValue"
      /></el-col>
    </el-row>
  </div>
</template>

<script>
import Right from "./right";
import { operatorMap } from "../ruleData.js";
export default {
  name: "Condition",
  componentName: "Condition",
  props: {
    node: {
      default: () => {},
    },
    curSceneFields: {
      default: () => {},
    },
  },
  components: {
    Right,
  },
  data() {
    return {
      operatorMap: [],
    };
  },
  created() {
    this.operatorMap = operatorMap;
  },
  methods: {
    updateConditionRightValue(v) {
      console.log(v, "right");
      this.$emit("updateConditionRightValue", v);
    },
    updateConditionOperateValue(v) {
      console.log(v, "operate");
      this.$emit("updateConditionOperateValue", v);
    },
    changeLeftValue(v) {
      this.$emit("updateConditionLeftValue", v);
    },
  },
};
</script>

<style>
</style>