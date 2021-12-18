export const next_group = [
  {value:"21",label:"与",},
  {value:"22",label:"或",},
  {value:"23",label:"空"},
  
];
export const next_condition = [
  {value:"11",label:"与",},
  {value:"12",label:"或",},
  {value:"13",label:"空"},
];

// 1.大于2.大于等于3.等于4.小于等于5.小于6.包含7.不包含8.匹配9.不匹配10不等于11.函数
export const operatorMap = {
  "1": "大于",
  "2": "大于等于",
  "3": "等于",
  "4": "小于等于",
  "5": "小于",
  "6": "包含",
  "7": "不包含",
  "8": "匹配",
  "9": "不匹配",
  "10": "等于",
  "11": "函数"
};

export const _list = [
  {
    type: "group",
    id: "1",
    relation: "",
    pId: "0",
    seq: "1",
    field: "1",
    operator: "",
    value: "",
    nextIsGroup: true
  },
  {
    type: "group",
    id: "2",
    relation: "22",
    pId: "1",
    seq: "2",
    field: "2",
    operator: "",
    value: "",
    nextIsGroup: true
  },
  {
    type: "condition",
    id: "3",
    field: "userId",
    operator: "2",
    value: "",
    pId: "2",
    relation: "11",
    seq: "3",
    nextIsGroup: false
  },
  {
    type: "condition",
    id: "4",
    field: "4",
    operator: "8",
    value: "",
    pId: "2",
    relation: "",
    seq: "4",
    nextIsGroup: true
  },
  {
    type: "group",
    id: "5",
    relation: "",
    pId: "1",
    seq: "5",
    field: "5",
    operator: "",
    value: "",
    nextIsGroup: true
  },
  {
    type: "condition",
    id: "6",
    field: "6",
    operator: "2",
    value: "",
    pId: "5",
    relation: "12",
    seq: "6",
    nextIsGroup: false
  },
  {
    type: "condition",
    id: "7",
    field: "7",
    operator: "",
    value: "",
    pId: "5",
    relation: "23",
    seq: "7",
    nextIsGroup: true
  },
  {
    type: "group",
    id: "8",
    relation: "",
    pId: "5",
    seq: "8",
    field: "8",
    operator: "",
    value: "",
    nextIsGroup: true
  },
  {
    type: "condition",
    id: "9",
    field: "9",
    operator: "",
    value: "",
    pId: "8",
    relation: "13",
    seq: "9",
    nextIsGroup: false
  },
  {
    type: "condition",
    id: "10",
    field: "10",
    operator: "9",
    value: "",
    pId: "8",
    relation: "12",
    seq: "10",
    nextIsGroup: false
  },
  {
    type: "condition",
    id: "11",
    field: "11",
    operator: "1",
    value: "",
    pId: "8",
    relation: "",
    seq: "11",
    nextIsGroup: true
  }
];

export const _sceneMap = {
  2: {
    sceneTypeOptions: [
        {label:"类型1", value:1},
        {label:"类型2", value:2},
        {label:"类型3", value:3},
    ],
    scene: "推广场景",
    fields: {
      userId: {
        tableName: "bd_BdStudentclass",
        fieldName: "用户",
        type: "2",
        url: ""
      },
      studentclassCategory: {
        tableName: "bd_BdStudentclass",
        fieldName: "订单类型",
        type: "1",
        values: {
          GEN: "常规订单",
          REP: "重读订单",
          CHA: "转班订单",
          TRA: "转让订单",
          REF: "退费订单",
          DEF: "顺延订单",
          GIV: "赠课订单"
        }
      },
      studentclassGift: {
        tableName: "bd_BdStudentclass",
        fieldName: "是否赠送的班级",
        type: "1",
        values: {
          Y: "是",
          N: "否"
        }
      },
      projectname: {
        tableName: "oc_bdproject",
        fieldName: "时间",
        type: "3" //3.时间
      },
      dptname: {
        tableName: "mk_bddpt",
        fieldName: "部门名称",
        type: "3" //3.时间
      }
    }
  },

};
