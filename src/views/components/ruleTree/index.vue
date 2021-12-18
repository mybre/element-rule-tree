<template>
	<el-dialog
		style="overflow-y: auto"
		:fullscreen="isfullscreen"
		top="3vh"
		:visible.sync="show"
		:width="`${840 + maxLevel * 50}px`"
		@closed="close"
		v-loading="isLoading"
	>
		<template slot="title">
			<div style="display:flex;justify-content:space-between;align-items:center;margin-right:30px">
				<span>{{ `${isAdd?'创建':'修改'}规则` }}</span>
				<i class="el-icon-full-screen" @click="isfullscreen ? (isfullscreen = false) : (isfullscreen = true)" />
			</div>
		</template>

		<div style="padding:0 40px">
			<el-form
				ref="ruleForm"
				:rules="rules"
				:model="model"
				label-width="80px"
			>
				<el-form-item prop="name" label="规则名称">
					<el-input v-model="model.name" placeholder="请输入规则名称" clearable />
				</el-form-item>
				<el-form-item prop="scene" label="规则场景">
					<el-select
						size="small"
						class="scene input"
						placeholder="业务场景"
						:disabled="!isAdd"
						v-model="model.scene"
						@change="changeSceneType"
					>
						<el-option
							v-for="(val, key) in sceneMap"
							:key="key"
							:label="val.scene"
							:value="key"
						/>
					</el-select>
				</el-form-item>

				<el-form-item prop="scene" label="规则分类">
					<el-select
						size="small"
						class="scene input"
						placeholder="业务场景"
						:disabled="!isAdd"
						v-model="model.sceneType"
					>
						<el-option
							v-for="item in curSceneTypeOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</el-form-item>

				<el-form-item prop="remark" label="规则备注">
					<el-input
						v-model="model.remark"
						placeholder="请输入规则备注"
						clearable
						type="textarea"
					/>
				</el-form-item>
			</el-form>
		</div>

		<div class="container">
			<div class="custom-tree-container" :style="{ width: `${800 + maxLevel * 50}px` }">
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
					<div class="custom-tree-node" slot="control" slot-scope="{ node: nodeCur, data: dataCur }">
						<div>
							<span v-if="dataCur.type === 'group'">
								<el-button
									size="mini"
									v-if="Number(limitLevel) - 1 > nodeCur.level"
									@click="() => appendGroup({ nodeCur, dataCur })"
								>分组</el-button>
								<el-button
									size="mini"
									v-if="Number(limitLevel) > nodeCur.level"
									@click="() => appendRule({ nodeCur, dataCur })"
								>条件</el-button>
							</span>
							<i v-if="dataCur.parentId != 0" style="margin-left:6px" class="el-icon-circle-close close" @click="remove({ nodeCur, dataCur })" />
						</div>
					</div>
					<div slot="condition" slot-scope="{ node: nodeCur, data: dataCur }">
						<condition
							:node="nodeCur"
							:cur-scene-fields="curSceneFields"
							@leftvalue="leftvalue(nodeCur, dataCur, $event)"
							@operatevalue="operatevalue(nodeCur, dataCur, $event)"
							@rightvalue="rightvalue(nodeCur, dataCur, $event)"
						>
							<i class="el-icon-circle-close close" @click="remove({ nodeCur, dataCur })" />
						</condition>
					</div>
					<div slot="relation" slot-scope="{node: nodeCur,data: dataCur}">
						<relationComp
							:data-cur="dataCur"
							:next_group="next_group"
							:next_condition="next_condition"
							@change-relation="(val)=>changeRelation(nodeCur,val, dataCur)"
						/>
					</div>

					<div slot="error" slot-scope="{ data: dataCur }">
						<div v-if="dataCur.type != 'group' && dataCur.showError">请完善该规则</div>
						<div>{{ dataCur }}</div>
					</div>
				</tree>
			</div>
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button @click="submitRule" type="primary">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
import tree from "./components/tree";
import { _sceneMap, next_group, next_condition } from "./components/tree/data";
import condition from "./components/tree/condition";
import relationComp from "./components/relationComp";
// import API from "../../../apis/common";
// import {uuid} from './components/uuid';
import emitter from "element-ui/src/mixins/emitter";
import backData from "./data";

export default {
	name: "ruleTree",
	props: {
		show: Boolean,
        limitLevel: {
            type: String,
            default: "30",
        },
        isAdd:{
            type: Boolean,
            default: false,
        },
        ruleId:String,
	},
	mixins: [emitter],
	componentName: "ruleTree",
	data() {
		return {
            isLoading: false,
			isfullscreen: false,
			filterText: "",
			isExpand: false,
			sceneMap: [],
			next_group: [],
			next_condition: [],
			data: [],
			maxLevel: 0,
            model: {
                name:"",
                remark:"",
                scene:"2",
                sceneType:1,
            },
            rules:{
                name: [
                    { required: true, message: '请输入标签', trigger: 'blur' },
                    { max: 50, message: '最长度 50 个字符', trigger: 'blur' }
                ],
                remark: [
                    { max: 200, message: '最长度 200 个字符', trigger: 'blur' }
                ],
            },
            seqGroup:1,
            seqCondition:1,
            seeds:0
		};
	},
	components: {
		condition,
		tree,
        relationComp
	},
	watch: {
		filterText(val) {
			this.$refs.tree.filter(val);
		},
        show(val) {
            if(val && !this.isAdd) {
                this.getRuleInfo();
            }
        }
	},
	mounted() {
		// this.data = this.toTree(_list);
		this.getDepth();
		this.sceneMap = _sceneMap;
		this.next_group = next_group;
		this.next_condition = next_condition;
		this.appendGroup({type:"isRoot"});
		console.log(backData, 'backData');
	},

	computed: {
		curSceneFields() {
			return this.model.scene ? this.sceneMap[this.model.scene].fields : {};
		},

        curSceneTypeOptions() {
            if(this.model.scene && this.sceneMap[this.model.scene]) {
                return this.sceneMap[this.model.scene].sceneTypeOptions;
            } else {
                return {};
            }
        }
	},

	methods: {
        getRuleInfo() {
            this.isLoading = true;
            // API.getRuleInfo({
            //     params: {
            //         ruleId:this.ruleId
            //     },
            //     success: (data) => {
            //         console.log(data, 'data');
            //         this.model.name = data.name;
            //         // this.model.remark = data.remark;
            //         // this.model.sceneType = data.sceneType;
            //     },
            //     complete:() => {
            //         this.isLoading = false;
            //     }
            // });
        },
		// 递归遍历 查找深度
		getDepth() {
			var arr = this.data;
			var depth = 0;
			while (arr.length > 0) {
				var temp = [];
				for (var i1 = 0; i1 < arr.length; i1++) {
					temp.push(arr[i1]);
				}
				arr = [];
				for (var i = 0; i < temp.length; i++) {
					if (temp[i].children) {
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
            let id = Date.now() + this.seeds++;
			const newChild = {
				id: id,
				// label: `组合 ${id}`,
                seq:this.seqGroup++,
				children: [],
				type: "group",
				logicRela: "23",
				nextIsGroup: false,
				parentId: 0,
				field: "",
				compare: "",
				compareValue: "",
				isBlink: true,
                showError: false,
                valueType:0
			};

			if (type && type === "isRoot") {
				this.data.push(newChild);
				this.handleNodeIsGroup(this.data);
			} else {
				if (!dataCur.children) {
					this.$set(dataCur, "children", []);
				}
				newChild.parentId = nodeCur.nodeId;
				dataCur.children.push(newChild);
				this.handleNodeIsGroup(dataCur.children);
				this.ExpandFun();
			}
			this.getDepth();
		},
		appendRule({ nodeCur, dataCur, type }) {
            let id = Date.now() + this.seeds++;
			const newChild = {
				id: id,
				// label: `条件 ${id}`,
				type: "condition",
                seq:this.seqCondition++,
				field: "",
				compareValue: "",
				compare: "",
				logicRela: "13",
				nextIsGroup: false,
				parentId: 0,
				isBlink: true,
                showError: false,
                valueType:0,
			};

			newChild.parentId = nodeCur.nodeId;
			dataCur.children.push(newChild);
			this.handleNodeIsGroup(dataCur.children);
			this.getDepth();
		},

		// 处理当前组内每个块与下个块之间的关系
		handleNodeIsGroup(data) {
			// this.$set(data[data.length - 1], "nextIsGroup", true);
			if (data.length >= 1) {
				this.$set(data[data.length - 1], "nextIsGroup", false);
			}
			for (let i = 0; i < data.length - 1; ++i) {
				let res = data[i].logicRela;
				if (data[i + 1].type === "group") {
					this.$set(data[i], "nextIsGroup", true);
					switch (data[i].logicRela) {
						case '11': res = '21'; break;
						case '12': res = '22'; break;
						case '13': res = '23'; break;
					}
				} else {
					this.$set(data[i], "nextIsGroup", false);
					switch (data[i].logicRela) {
						case '21': res = '11'; break;
						case '22': res = '12'; break;
						case '23': res = '13'; break;
					}
				}
				this.$set(data[i], "logicRela", res);
			}
		},

		remove({ nodeCur, dataCur }) {
			const parent = nodeCur.parent;
			const children = parent.data.children || parent.data;
			const index = children.findIndex((d) => d.id === dataCur.id);
			children.splice(index, 1);
			this.handleNodeIsGroup(children);

			this.getDepth();
		},

		handleNodeClick() {
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

		leftvalue(node, data, $event) {
			this.$set(data, "field", $event);
			this.$set(data, "compareValue", "");
            // 值类型(1.单值2.范围值3.集合4.参数)
            let valueType = 0;
            let a = ['projectname','userId'];
            if(a.includes($event)){
                valueType = 1;
            }
            this.$set(data, 'valueType', valueType);
            console.log(data, 'data');
		},
		operatevalue(node, data, $event) {
			this.$set(data, "compare", $event);
		},
		rightvalue(node, data, $event) {
			this.$set(data, "compareValue", $event);
		},

		changeRelation(node,value, dataCur) {
			this.$set(dataCur, "logicRela", value);
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
				let parent = map[item.parentId];
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
			if (!Array.isArray(attrArr) || (Array.isArray(attrArr) && !attrArr.length)) {
				attrList = Object.keys(arrs[0]);
                let index = attrList.indexOf(childs);
                if(index != -1)
				attrList.splice(index, 1);
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
		close() {
			this.$emit("update:show", false);
            this.data = {};
            this.model = {
                remark:"",
                name:"",
                scene:"",
                sceneType:""
            };
		},
        submitRule() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid && Object.keys(this.data).length > 0) {
                    let obj = JSON.parse(JSON.stringify(this.data));
                    if (obj.length > 0) {
                        let list = this.extractTree(obj, "children");
                        let a = list.filter(v=>v.type == 'condition').filter(m=>{
                            return m.compare == '' || m.compareValue == '' || m.field == '';
                        });
                        if(a.length > 0) {
                            this.$message.warning('请完善规则');
                            return false;
                        } else if(a.length == 0) {
                            this.$message.success('表单完成');
                            let b = list.map(v=>{
                                delete v.isBlink;
                                delete v.showError;
                                delete v.nextIsGroup;
                                return {
                                    ...v,
                                    settings: JSON.stringify({action:1}),
                                };
                            });
                            let ruleConditions = [];
                            let ruleGroups = [];
                            b.forEach(v=>{
                                let temp = JSON.parse(JSON.stringify(v));
                                // v.type == 'condition'?ruleConditions.push(v):ruleGroups.push(v);
                                if(v.type == 'condition') {
                                    let groupId = temp.parentId;
                                    delete temp.parentId;
                                    ruleConditions.push({...temp,groupId,conditionRela:temp.logicRela});
                                } else {
                                    ruleGroups.push(temp);
                                }
                            });
                            console.log(ruleConditions, 'ruleConditions');
                            console.log(ruleGroups, 'ruleGroups');
                            let updateOjb = {
                               ruleConditions,
                               ruleGroups,
                               name:this.model.name,
                               remark:this.model.remark,
                               scene: parseInt(this.model.scene),
                               sceneType: parseInt(this.model.sceneType),
                               settings: JSON.stringify({action:2})
                            };
                            if(!this.isAdd){
                                updateOjb.id = this.ruldId;
                            }
                            this.saveRule(updateOjb);
                            return true;
                        }
                    } else {
                        Message.warning("筛选规则为空");
                    }

                } else {
                    this.$message.warning('请添加规则');
                    return false;
                }
            });

        },
        saveRule(rule){
            console.log(rule, 'rule');
            // API.saveRule({
            //     params:rule,
            //     success: (data) => {
            //         console.log(data, 'data');
            //     },
            // });
        }
	},
};
</script>
<style lang="less" scoped>
/deep/ .el-dialog__header {
	padding: 20px 20px 10px;
	height: unset;
	line-height: unset;
}

.container {
	// max-height: 100px;
	// overflow-y: scroll;
}
.custom-tree-container {
	margin-top: 20px;
}

.custom-tree-container /deep/ .custom-tree-node {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
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
	border-left: 4px solid #199dff;
	margin: 8px;
	padding: 8px;
}

.custom-tree-container /deep/ .condition {
	border-left: 4px solid #64ff08 !important;
	margin: 8px;
	padding: 10px 8px;
}

.custom-tree-container /deep/ .condition-comp {
	//padding: 10px 0;
	//display: flex;
	//justify-content: space-between;
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

/deep/ .el-tree-node__children {
    overflow: auto !important;
}
</style>
