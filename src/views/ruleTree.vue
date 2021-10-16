<template>
  <div>
    <div class="custom-tree-container" :style="{width:`${800 + maxLevel * 50}px`}">
      <div style="padding: 30px 0"></div>

      <div class="tree-card" style="padding: 16px">
        <div style="margin-bottom: 30px">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-select
                size="small"
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
            <el-col :span="6">
              <el-input
                size="small"
                placeholder="输入关键字进行过滤"
                v-model="filterText"
              >
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-select
                v-model="limitLevel"
                placeholder="请选择最深嵌套"
                size="small"
              >
                <el-option value="1" label="嵌套层级 1"></el-option>
                <el-option value="2" label="嵌套层级 2"></el-option>
                <el-option value="3" label="嵌套层级 3"></el-option>
                <el-option value="4" label="嵌套层级 4"></el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-button size="small" @click="sumbit">提交</el-button>
            </el-col>
            <el-col :span="8">
              <div style="text-align: right">
                <el-button-group>
                  <el-button
                    type="primary"
                    size="small"
                    v-if="Number(limitLevel) > 1"
                    @click="appendGroup({ data, type: 'isRoot' })"
                    >添加分组
                  </el-button>
                  <el-button
                    type="success"
                    size="small"
                    @click="appendRule({ data, type: 'isRoot' })"
                    >添加条件
                  </el-button>
                  <el-button
                    type="danger"
                    size="small"
                    v-if="data.length"
                    @click="remove({ data, type: 'isRoot' })"
                    >清空
                  </el-button>
                </el-button-group>
              </div>
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
            <span>type: {{ dataCur.type }}</span>
            <span>label: {{ dataCur.label }}</span>
            <span>id: {{ dataCur.id }}</span>
            <span>pId: {{ dataCur.pId }}</span>
            <span>field: {{ dataCur.field }}</span>
            <span>value: {{ dataCur.value }}</span>
            <span>operator: {{ dataCur.operator }}</span>
            <span>relation: {{ dataCur.relation }}</span>
            <span v-if="dataCur.type === 'group'">
              <el-button-group>
                <el-button
                  size="mini"
                  type="primary"
                  v-if="Number(limitLevel) - 1 > nodeCur.level"
                  @click="() => appendGroup({ nodeCur, dataCur })"
                  >添加下层分组</el-button
                >
                <el-button
                  size="mini"
                  type="success"
                  v-if="Number(limitLevel) > nodeCur.level"
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
          <div slot="relation" slot-scope="{ data: dataCur }">
            <!--            <div>next_group: {{ dataCur.nextIsGroup }}</div>-->
            <el-select
              style="margin-top: 10px"
              size="mini"
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
import tree from "../components/tree";
import {
  _sceneMap,
  next_group,
  next_condition,
  _list,
} from "../components/tree/data";
import condition from "../components/tree/condition";
let id = 1000;
import emitter from "element-ui/src/mixins/emitter";
export default {
  mixins:[emitter],
  name:'ruleTree',
  componentName:'ruleTree',
  data() {
    return {
      filterText: "",
      isExpand: false,
      sceneMap: [],
      sceneType: "markting",
      next_group: [],
      next_condition: [],
      data: [],
      limitLevel: "3",
      maxLevel:0,
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
    this.data = this.toTree(_list);
    this.getDepth();
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


    // 递归遍历 查找深度
    getDepth() {
      var arr = this.data;
      var depth = 0;
      while (arr.length > 0) {
        var temp = [];
        for (var i = 0; i < arr.length; i++) {
          temp.push(arr[i]);
        }
        arr = [];
        for (var i = 0; i < temp.length; i++) {
          if(temp[i].children) {
            for (var j = 0; j < temp[i].children.length; j++) {
              arr.push(temp[i].children[j]);
            }
          }
        }
        if (arr.length >= 0) {
          depth++;
        }
      }
      this.maxLevel = depth;
    },

    appendGroup({ nodeCur, dataCur, type }) {
      const newChild = {
        id: id++,
        label: `组合 ${id}`,
        children: [],
        type: "group",
        relation: "",
        nextIsGroup: false,
        pId: 0,
        field: "",
        operator: "",
        value: "",
      };

      if (type && type === "isRoot") {
        this.data.push(newChild);
        this.handleNodeIsGroup(this.data);
      } else {
        if (!dataCur.children) {
          this.$set(dataCur, "children", []);
        }
        newChild.pId = nodeCur.nodeId;
        dataCur.children.push(newChild);
        this.handleNodeIsGroup(dataCur.children);
        this.ExpandFun();
      }
      this.getDepth();
    },
    appendRule({ nodeCur, dataCur, type }) {
      const newChild = {
        id: id++,
        label: `条件 ${id}`,
        type: "condition",
        field: "",
        value: "",
        operator: "",
        relation: "",
        nextIsGroup: false,
        pId: 0,
      };
      if (type && type === "isRoot") {
        this.data.push(newChild);
        this.handleNodeIsGroup(this.data);
      } else {
        newChild.pId = nodeCur.nodeId;
        dataCur.children.push(newChild);
        this.handleNodeIsGroup(dataCur.children);
      }
      this.getDepth();
    },

    // 处理当前组内每个块与下个块之间的关系
    handleNodeIsGroup(data) {
      if (data.length >= 1) {
        this.$set(data[data.length - 1], "nextIsGroup", false);
      }
      for (let i = 0; i < data.length - 1; ++i) {
        if (data[i + 1].type === "group") {
          this.$set(data[i], "nextIsGroup", true);
        } else {
          this.$set(data[i], "nextIsGroup", false);
        }
      }
    },

    remove({ nodeCur, dataCur, type }) {
      if (type && type === "isRoot") {
        // 有 data 是根部
        this.data = [];
        this.maxLevel = 0;
      } else {
        const parent = nodeCur.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex((d) => d.id === dataCur.id);
        children.splice(index, 1);
        this.handleNodeIsGroup(children);
      }
      this.getDepth();
    },

    handleNodeClick(data) {
      // console.log(data);
    },

    filterNode(value, data) {
      if (!value) return true;
      return JSON.stringify(data).indexOf(value) !== -1;
    },

    changeSceneType() {
      this.data = [];
      this.maxLevel = 0;
    },

    // 展开收起
    ExpandFun() {
      // console.log(this.$refs.tree.store._getAllNodes().length);
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

    sumbit() {
      let obj = JSON.parse(JSON.stringify(this.data));
      let list = this.extractTree(obj, "children");
      console.log(list, "result");
    },

    // 同层结构转树形结构
    toTree(data) {
      let result = [];
      if (!Array.isArray(data)) {
        return result;
      }
      data.forEach((item) => {
        delete item.children;
      });
      let map = {};
      data.forEach((item) => {
        map[item.id] = item;
      });
      data.forEach((item) => {
        let parent = map[item.pId];
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          result.push(item);
        }
      });
      return result;
    },
    extractTree(arrs, childs, attrArr) {
      let attrList = [];
      if (!Array.isArray(arrs) && !arrs.length) return [];
      if (typeof childs !== "string") return [];
      if (
        !Array.isArray(attrArr) ||
        (Array.isArray(attrArr) && !attrArr.length)
      ) {
        attrList = Object.keys(arrs[0]);
        attrList.splice(attrList.indexOf(childs), 1);
      } else {
        attrList = attrArr;
      }
      let list = [];
      const getObj = (arr) => {
        arr.forEach(function (row) {
          let obj = {};
          attrList.forEach((item) => {
            obj[item] = row[item];
          });
          list.push(obj);
          if (row[childs]) {
            getObj(row[childs]);
          }
        });
        return list;
      };
      return getObj(arrs);
    },
  },
};
</script>
<style lang="less" scoped>
.custom-tree-container {
  //width: 900px;
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
  margin: 10px;
  padding: 10px;
}

.custom-tree-container /deep/ .condition {
  border-left: 6px solid #64ff08 !important;
  margin: 10px;
  padding: 10px;
}

.custom-tree-container /deep/ .condition-comp {
  //padding: 10px 0;
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