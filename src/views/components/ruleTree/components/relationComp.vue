<template>
	<div>
		<el-select
			style="margin-top: 10px"
			size="mini"
			class="tree-relation-input"
			placeholder="关系"
			:value="dataCur.logicRela"
			@change="changeRelation"
		>
			<div v-if="dataCur.nextIsGroup">
				<el-option
					v-for="item in next_group"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				/>
			</div>
			<div v-else>
				<el-option
					v-for="item in next_condition"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				/>
			</div>
		</el-select>
	</div>
</template>

<script>
export default {
	props: {
		dataCur: Object,
		next_group: Array,
		next_condition: Array,
	},


    watch: {
        // 'dataCur.nextIsGroup'(val) {
        //     let res = '';
        //     console.log(this.dataCur, 'dataCur');
        //     if(val) {
        //         switch (this.dataCur.logicRela) {
        //             case '11': res = '21'; break;
        //             case '12': res = '22'; break;
        //             case '13': res = '23'; break;
        //         }
        //     } else {
        //         switch (this.dataCur.logicRela) {
        //             case '21': res = '11'; break;
        //             case '22': res = '22'; break;
        //             case '23': res = '23'; break;
        //         }
        //     }
        //     this.$emit('change-relation', res);
        // },
    },
	methods: {
		changeRelation(v) {
            if(v != '') {
                this.$emit('change-relation', v);
            }
		},
	},
};
</script>

<style lang="less" scoped>
</style>
