<template>
	<div>
		<el-date-picker
			v-model="value"
			type="date"
			value-format="yyyy-MM-dd"
			placeholder="选择日期"
			size="mini"
			@change="(val) => $emit('rightvalue', val)"
		/>
	</div>
</template>

<script>
export default {
	name: "dateForm",
	props: {
		node: {
			default() {
				return {};
			},
		},
	},
	created() {
		this.value = this.node.data.compareValue;
	},
	data() {
		return {
			value: "",
		};
	},
};
</script>

<style lang="less" scoped>
/deep/ .el-date-editor {
	width: 100%;
}
</style>
