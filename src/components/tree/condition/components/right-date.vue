<template>
	<div>
		<el-date-picker
			v-model="val"
			type="date"
			placeholder="选择日期"
			@change="setFieldVal"
      size="mini"
		>
		</el-date-picker>
	</div>
</template>

<script>
    export default {
        name: "dateForm",
        components: {},
        props: ['data'],
        data() {
            return {
                val:''
            };
        },
        mounted() {

        },
        methods: {
            setFieldVal(val) {
                this.$emit('set-field-val', val);
            }
        }
    };
</script>

<style lang="less" scoped>
	/deep/ .el-date-editor {
		width: 100%;
	}
</style>
