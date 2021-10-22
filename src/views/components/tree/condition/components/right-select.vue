<template>
	<div>
		<el-select
			placeholder="条件值"
			:value="value"
			size="mini"
			@change="(val) => $emit('updateConditionRightValue', val)"
		>
			<el-option
				v-for="(val, key) in curRightOption.values"
				:key="key"
				:label="val"
				:value="key"
			/>
		</el-select>
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
    curRightOption: {
      default: () => {},
    },
  },
  data() {
    return {
      value: "",
    };
  },
  watch: {
    "node.data.value": {
      handler(val) {
        this.value = val;
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>
