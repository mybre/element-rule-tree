export const treeData = [
  {
    type: "group",
    id: "1",
    relation: "",
    pId: "0",
    seq: "1",
    field: "1",
    operator: "",
    value: "",
    nextIsGroup: true,
    children: [
      {
        type: "group",
        id: "2",
        relation: "22",
        pId: "1",
        seq: "2",
        field: "2",
        operator: "",
        value: "",
        nextIsGroup: true,
        children: [
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
          }
        ]
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
        nextIsGroup: true,
        children: [
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
            nextIsGroup: true,
            children: [
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
            ]
          }
        ]
      }
    ]
  }
];
