<template>
  <div class="custom-tree-container">
    <div class="block">
      <p>使用 scoped slot</p>
      <el-input placeholder="输入关键字进行过滤" v-model="filterText">
      </el-input>
      <tree
        ref="tree"
        :data="data"
        node-key="id"
        default-expand-all
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button size="mini" @click="() => append(data)">
              Append
            </el-button>
            <el-button size="mini" @click="() => remove(node, data)">
              Delete
            </el-button>
          </span>
        </span>
      </tree>
    </div>
  </div>
</template>

<script>
let id = 1000;
import tree from "../components/tree";
export default {
  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 4,
            label: "二级 1-1",
            children: [
              {
                id: 9,
                label: "三级 1-1-1",
              },
              {
                id: 10,
                label: "三级 1-1-2",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: "一级 2",
        children: [
          {
            id: 5,
            label: "二级 2-1",
          },
          {
            id: 6,
            label: "二级 2-2",
          },
        ],
      },
      {
        id: 3,
        label: "一级 3",
        children: [
          {
            id: 7,
            label: "二级 3-1",
          },
          {
            id: 8,
            label: "二级 3-2",
          },
        ],
      },
    ];
    return {
      filterText: "",
      data: JSON.parse(JSON.stringify(data)),
      data: JSON.parse(JSON.stringify(data)),
    };
  },
  components: {
    tree,
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },

  methods: {
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
  },
};
</script>

<style lang="less" scoped>
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
}
</style>