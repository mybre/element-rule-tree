<template>
  <div>
    <div class="custom-tree-container">
      <div class="block">
        <p>使用 render-content</p>
        <div style="padding: 30px 0">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-button-group>
                <el-button type="primary" @click="addRootGroup"
                  >添加分组</el-button
                >
                <el-button type="success" @click="addRootRule"
                  >添加条件</el-button
                >
                <el-button type="danger" @click="removeAllRules"
                  >清空</el-button
                >
              </el-button-group>
            </el-col>
            <el-col :span="4">
              <el-select
                class="scene input"
                placeholder="业务场景"
                v-model="sceneType"
              >
                <el-option
                  v-for="(val, key) in sceneMap"
                  :key="key"
                  :label="val.scene"
                  :value="key"
                />
              </el-select>
            </el-col>
            <el-col :span="12">
              <el-input placeholder="输入关键字进行过滤" v-model="filterText">
              </el-input>
            </el-col>
          </el-row>
        </div>

        <tree
          ref="tree"
          :data="data"
          node-key="id"
          default-expand-all
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span v-if="data.children">
              <el-button-group>
                <el-button
                  size="mini"
                  type="primary"
                  @click="() => appendGroup(data)"
                  >添加下层分组</el-button
                >
                <el-button
                  size="mini"
                  type="success"
                  @click="() => appendRule(data)"
                  >添加规则</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="() => remove(node, data)"
                ></el-button>
              </el-button-group>
            </span>
            <span v-else>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="() => remove(node, data)"
              ></el-button>
            </span>
          </span>
        </tree>

        <div class="buttons">
          <el-button @click="getCheckedNodes">通过 node 获取</el-button>
          <el-button @click="getCheckedKeys">通过 key 获取</el-button>
          <el-button @click="setCheckedNodes">通过 node 设置</el-button>
          <el-button @click="setCheckedKeys">通过 key 设置</el-button>
          <el-button @click="resetChecked">清空</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let id = 1000;
import tree from "../components/tree";
import { _list, _sceneMap } from "../components/tree/src/model/ruleData";
console.log(_sceneMap, "_sceneMap");
export default {
  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        type: "group",
        children: [
          {
            id: 4,
            label: "二级 1-1",
            type: "group",
            children: [
              {
                id: 9,
                type: "rule",
                label: "三级 1-1-1",
                relation: "",
                pId: "0",
                seq: "1",
                field: "input",
                operator: "",
                value: "",
              },
              {
                id: 10,
                type: "rule",
                label: "三级 1-1-2",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: "一级 2",
        type: "group",
        children: [
          {
            id: 5,
            type: "rule",
            label: "二级 2-1",
          },
          {
            id: 6,
            type: "rule",
            label: "二级 2-2",
          },
        ],
      },
      {
        id: 3,
        label: "一级 3",
        type: "group",
        children: [
          {
            id: 7,
            type: "rule",
            label: "二级 3-1",
          },
          {
            id: 8,
            type: "rule",
            label: "二级 3-2",
          },
        ],
      },
    ];
    return {
      filterText: "",
      isExpand: false,
      sceneMap: [],
      sceneType: "",
      data: JSON.parse(JSON.stringify(data)),
    };
  },
  computed: {
    showAddRoot() {
      return this.data.length == 0;
    },
  },
  components: {
    tree,
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    this.sceneMap = _sceneMap;
  },

  methods: {
    appendGroup(data) {
      const newChild = {
        id: id++,
        label: `条件组合 ${id}`,
        children: [],
        type: "group",
      };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
      this.ExpandFun();
    },
    appendRule(data) {
      const newChild = { id: id++, label: `条件 ${id}`, type: "rule" };
      data.children.push(newChild);
    },
    addRootGroup() {
      this.data.push({
        id: id++,
        label: `条件组合 ${id}`,
        children: [],
        type: "group",
      });
    },
    addRootRule() {
      const newChild = { id: id++, label: `条件 ${id}`, type: "rule" };
      this.data.push(newChild);
    },

    handleNodeClick(data) {
      console.log(data);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },

    removeAllRules() {
      this.data = [];
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    // 展开收起
    ExpandFun() {
      console.log(this.$refs.tree.store._getAllNodes().length);
      // let type = Object.prototype.toString.call(this.$refs.tree)
      this.isExpand = true;
      this.DynamicScaling();
    },
    CloseFun() {
      this.isExpand = false;
      this.DynamicScaling();
    },
    DynamicScaling() {
      for (let j = 0; j < this.$refs.tree.store._getAllNodes().length; j++) {
        this.$refs.tree.store._getAllNodes()[j].expanded = this.isExpand;
      }
    },

    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([
        {
          id: 5,
          label: "二级 2-1",
        },
        {
          id: 9,
          label: "三级 1-1-1",
        },
      ]);
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3]);
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
  },
};
</script>
<style lang="less" scoped>
.custom-tree-container {
  width: 900px;
}
.custom-tree-container /deep/ .custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.custom-tree-container /deep/ .el-tree-node__content {
  height: 52px;
  // padding:0 40px !important;
}
.custom-tree-container /deep/ .tree-relation-input {
  width: 80px;
  margin-right: 10px;
}

.custom-tree-container /deep/ .tree-card {
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  box-shadow: 9px 2px 12px 1px #d3d3d3;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
}
.custom-tree-container /deep/ .group {
  border-left: 4px solid #199dff;
  padding:10px;
}

.custom-tree-container /deep/ .rule {
  border-left: 4px solid #64ff08 !important;
  padding:10px;
}

.custom-tree-container /deep/ .rule-comp {
  padding: 10px;
}
</style>