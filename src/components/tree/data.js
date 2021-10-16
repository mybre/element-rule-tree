export const next_group = {
  "21": "与",
  "22": "或",
  "23": "空"
};
export const next_condition = {
  "11": "与",
  "12": "或",
  "13": "空"
};
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
  "10": "等于"
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
  markting: {
    scene: "推广场景", //
    description: "筛选出新注册客户，最近一次购物时间相距今天的时间差。",
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
  cust: {
    scene: "自定义场景", // 场景名称
    fields: {}
  },
  studentClass: {
    scene: "学服场景", //场景名称
    fields: {
      studentId: {
        tableName: "bd_BdStudentclass",
        fieldName: "学员",
        type: "2",
        url: ""
      },
      studentclassId: {
        tableName: "bd_BdStudentclass",
        fieldName: "学员班级",
        type: "2",
        url: ""
      },
      classId: {
        tableName: "bd_BdStudentclass",
        fieldName: "班级",
        type: "2",
        url: ""
      },

      studentclassStatus: {
        tableName: "bd_BdStudentclass",
        fieldName: "班级订单变更情况",
        type: "1", //1.有值
        values: {
          ORIG: "原班级",
          GEND: "常规",
          REPD: "已重读",
          CHAD: "已转班",
          TRAD: "已转让",
          DEFO: "已顺开",
          DEFC: "已顺关",
          CREF: "已关退",
          OREF: "已开退"
        }
      },
      studentclassExpiredate: {
        tableName: "bd_BdStudentclass",
        fieldName: "班级过期时间",
        type: "3" //3.时间范围
      },
      studentclassSertype: {
        tableName: "bd_BdStudentclass",
        fieldName: "订单协议服务类型",
        type: "1", //1.有值
        values: {
          R: "重读",
          F: "退费",
          N: "不退费不重读",
          B: "无协议"
        }
      },
      studentclassOpenstatus: {
        tableName: "bd_BdStudentclass",
        fieldName: "学员班级开课状态",
        type: "1", //1.有值
        values: {
          P: "预开课",
          O: "已开课",
          C: "已关课"
        }
      },
      studentclassOpendate: {
        tableName: "bd_BdStudentclass",
        fieldName: "学员班级开课状态",
        type: "3" //3.时间
      },
      studentclassYear: {
        tableName: "bd_BdStudentclass",
        fieldName: "班级年份",
        type: "3" //3.时间
      }
    }
  }
};
