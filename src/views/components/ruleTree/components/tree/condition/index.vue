<template>
	<div class="condition-comp">
		<el-row :gutter="10">
			<el-col :span="6">
				<el-select
					placeholder="属性"
					:value="node.data.field"
					@change="leftvalue"
					size="mini"
				>
					<el-option
						v-for="(val, key) in curSceneFields"
						:key="key"
						:label="val.fieldName"
						:value="key"
					/>
				</el-select>
			</el-col>

			<el-col :span="4">
				<el-select
					placeholder="过滤条件"
					:value="node.data.compare"
					@change="operatevalue"
					size="mini"
				>
					<el-option
						v-for="(val, key) in operatorMap"
						:key="key"
						:label="val"
						:value="key"
					/>
				</el-select>
			</el-col>

			<el-col
				:span="13"
			>
				<Right
					:node="node"
					:cur-scene-fields="curSceneFields"
					:cur-right-option="curRightOption"
					@rightvalue="rightvalue"
				/>
			</el-col>
			<el-col :span="1">
				<slot />
			</el-col>
		</el-row>
	</div>
</template>

<script>
import Right from "./right";
import { operatorMap } from "../data.js";
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
    computed: {
        curRightOption() {
            return this.curSceneFields[this.node.data.field];
        },
    },

    created() {
        this.operatorMap = operatorMap;
    },
    methods: {
        rightvalue(v) {
            console.log(v, "rightvalue1");
            this.$emit("rightvalue", v);
        },
        operatevalue(v) {
            console.log('operatevalue');
            this.$emit("operatevalue", v);
        },
        leftvalue(v) {
            console.log(v, 'leftvalue');
            this.$emit("leftvalue", v);
        },
    },
};
</script>

<style>
</style>
