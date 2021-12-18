<template>
    <div>
        <el-button @click="showCreateRules = true">show</el-button>
        <rule-tree :show.sync="showCreateRules" :is-add="curRuleIsAdd" :rule-id="curRuleId" />
    </div>
</template>

<script>
import ruleTree from "./components/ruleTree/index.vue"
    export default {
        data() {
            return {
                showCreateRules: false,
                curRuleIsAdd: true,
                curRuleId:"1000"
            }
        },
        components: {
            ruleTree
        }       
    }
</script>

<style lang="less" scoped>

</style>