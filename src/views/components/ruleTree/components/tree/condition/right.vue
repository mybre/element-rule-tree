<template>
	<div>
		<right-input
			v-if="curRightOption && curRightOption.type === '2'"
			:node="node"
			:cur-right-option="curRightOption"
			@rightvalue="(v) => $emit('rightvalue', v)"
		/>
		<right-select
			v-else-if="curRightOption && curRightOption.type === '1'"
			:node="node"
			:cur-right-option="curRightOption"
			@rightvalue="(v) => $emit('rightvalue', v)"
		/>
		<right-date
			v-else-if="curRightOption && curRightOption.type === '3'"
			:node="node"
			:cur-right-option="curRightOption"
			@rightvalue="(v) => $emit('rightvalue', v)"
		/>
		<div v-else style="color: transparent;">1</div>
	</div>
</template>

<script>
import RightInput from "./components/right-input.vue";
import RightSelect from "./components/right-select.vue";
import RightDate from "./components/right-date.vue";
export default {
    name: "conditionRight",
    componentName: "conditionRight",

    props: {
        node: {
            default() {
                return {};
            },
        },
        curSceneFields: {
            default: () => {},
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
        value(v) {
            this.$emit("rightvalue", v);
        },
    },
    components: {
        RightInput,
        RightSelect,
        RightDate,
    },
};
</script>

<style>
</style>
