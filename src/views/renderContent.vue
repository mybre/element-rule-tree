<template>
  <div>
    <div class="custom-tree-container">
      <div class="block">
        <p>使用 render-content</p>
        <div style="padding: 30px 0">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-button-group>
                <el-button
                  type="primary"
                  @click="appendGroup({ data, type: 'isRoot' })"
                  >添加分组</el-button
                >
                <el-button
                  type="success"
                  @click="appendRule({ data, type: 'isRoot' })"
                  >添加条件</el-button
                >
                <el-button
                  type="danger"
                  @click="remove({ data, type: 'isRoot' })"
                  >清空</el-button
                >
              </el-button-group>
            </el-col>
            <el-col :span="4">
              <el-select
                class="scene input"
                placeholder="业务场景"
                v-model="sceneType"
                @change="changeSceneType"
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
          :indent="10"
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
        >
          <div
            class="custom-tree-node"
            slot="control"
            slot-scope="{ node: nodeCur, data: dataCur }"
          >
            <span>{{ nodeCur.data.field }}</span>
            <span v-if="dataCur.type == 'group'">
              <el-button-group>
                <el-button
                  size="mini"
                  type="primary"
                  @click="() => appendGroup({ nodeCur, dataCur })"
                  >添加下层分组</el-button
                >
                <el-button
                  size="mini"
                  type="success"
                  @click="() => appendRule({ nodeCur, dataCur })"
                  >添加规则</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="() => remove({ nodeCur, dataCur })"
                ></el-button>
              </el-button-group>
            </span>
            <span v-else>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="() => remove({ nodeCur, dataCur })"
              ></el-button>
            </span>
          </div>
          <div slot="condition" slot-scope="{ node: nodeCur, data: dataCur }">
            <condition
              :node="nodeCur"
              :curSceneFields="curSceneFields"
              @updateConditionLeftValue="
                updateConditionLeftValue(nodeCur, dataCur, $event)
              "
              @updateConditionOperateValue="
                updateConditionOperateValue(nodeCur, dataCur, $event)
              "
              @updateConditionRightValue="
                updateConditionRightValue(nodeCur, dataCur, $event)
              "
            />
          </div>
          <div slot="relation" slot-scope="{ node: nodeCur, data: dataCur }">
            <div>next_group: {{ dataCur.nextIsGroup }}</div>
            <el-select
              class="tree-relation-input"
              placeholder="关系"
              v-model="dataCur.relation"
              @change="changeRelation"
            >
              <div v-if="dataCur.nextIsGroup">
                <el-option
                  v-for="(val, key) in next_group"
                  :key="key"
                  :label="val"
                  :value="key"
                  @change="changeRelation"
                >
                </el-option>
              </div>
              <div v-else>
                <el-option
                  v-for="(val, key) in next_condition"
                  :key="key"
                  :label="val"
                  :value="key"
                  @change="changeRelation"
                >
                </el-option>
              </div>
            </el-select>
          </div>
        </tree>
      </div>
    </div>
  </div>
</template>

<script>
let id = 1000;
import tree from "../components/tree";
import {
  _list,
  _sceneMap,
  next_group,
  next_condition,
  operatorMap,
  treeData,
} from "./ruleData";
import condition from "./condition";
export default {
  data() {
    return {
      filterText: "",
      isExpand: false,
      sceneMap: [],
      sceneType: "markting",
      next_group: [],
      next_condition: [],
      data: [],
    };
  },
  components: {
    condition,
    tree,
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    this.data = treeData;
    this.sceneMap = _sceneMap;
    this.next_group = next_group;
    this.next_condition = next_condition;
  },

  computed: {
    curSceneFields() {
      return this.sceneType ? this.sceneMap[this.sceneType].fields : {};
    },
  },

  methods: {
    appendGroup({ dataCur, type }) {
      const newChild = {
        id: id++,
        label: `条件组合 ${id}`,
        children: [],
        type: "group",
        relation: "",
        nextIsGroup: false,
        isNew: true,
      };

      if (type && type == "isRoot") {
        this.data.push(newChild);
        this.handleNodeIsGroup(this.data);
      } else {
        if (!dataCur.children) {
          this.$set(dataCur, "children", []);
        }
        dataCur.children.push(newChild);
        this.handleNodeIsGroup(dataCur.children);
        this.ExpandFun();
      }
    },
    appendRule({ dataCur, type }) {
      const newChild = {
        id: id++,
        label: `条件 ${id}`,
        type: "condition",
        field: "",
        value: "",
        operator: "",
        relation: "",
        nextIsGroup: false,
        isNew: true,
      };
      if (type && type == "isRoot") {
        this.data.push(newChild);
        this.handleNodeIsGroup(this.data);
      } else {
        dataCur.children.push(newChild);
        this.handleNodeIsGroup(dataCur.children);
      }
    },

    // 处理当前组内每个块与下个块之间的关系
    handleNodeIsGroup(data) {
      if (data.length >= 1) {
        this.$set(data[data.length - 1], "nextIsGroup", false);
      }
      for (let i = 0; i < data.length - 1; ++i) {
        if (data[i + 1].type == "group") {
          this.$set(data[i], "nextIsGroup", true);
        } else {
          this.$set(data[i], "nextIsGroup", false);
        }
      }
    },

    remove({ nodeCur, dataCur, type }) {
      if (type && type == "isRoot") {
        // 有 data 是根部
        this.data = [];
      } else {
        const parent = nodeCur.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex((d) => d.id === dataCur.id);
        children.splice(index, 1);
        this.handleNodeIsGroup(children);
      }
    },

    handleNodeClick(data) {
      // console.log(data);
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    changeSceneType(value) {
      this.data = [];
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

    updateConditionLeftValue(node, data, $event) {
      this.$set(data, "field", $event);
      this.$set(data, "value", "");
    },
    updateConditionOperateValue(node, data, $event) {
      this.$set(data, "operator", $event);
    },
    updateConditionRightValue(node, data, $event) {
      this.$set(data, "value", $event);
    },

    changeRelation(value) {
      console.log(value, "changeRelation");
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
  box-shadow: 2px 2px 8px 1px #d3d3d3;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
}
.custom-tree-container /deep/ .group {
  border-left: 6px solid #199dff;
  padding: 10px;
}

.custom-tree-container /deep/ .condition {
  border-left: 6px solid #64ff08 !important;
  padding: 10px;
}

.custom-tree-container /deep/ .condition-comp {
  padding: 10px 0;
}

.custom-tree-container /deep/ .tree-blink {
  animation-name: example;
  animation-duration: 0.7s;
  animation-iteration-count: 2;
}

@keyframes example {
  from {
    background-color: transparent;
  }
  to {
    background-color: #c5d7fc;
  }
}
</style>