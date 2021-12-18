<template>
	<div>
		<el-input
			v-model="value"
			size="mini"
			placeholder="请输入"
			clearable
		/>
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
    "node.data.compareValue": {
      handler(val) {
        this.value = val;
      },
      immediate: true,
    },
    value(val) {
      this.$emit("rightvalue", val);
    },
  },
};
</script>

<style>
</style>
