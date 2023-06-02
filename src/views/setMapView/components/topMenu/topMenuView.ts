// import { saveAs } from "file-saver";
const userInfo = userInfoStore();
const userMap = userMapStore();
import { jldVisualBoardAttributeEdit } from "/@http/index";
// 设置背景透明度和边线透明度
const setFillAndStrokOpacity = ({ type, target }) => {
  console.log("target.stateType :>> ", typeof target.stateType);
  // 正常状态
  if (target.stateType === 0) {
    if (target.drawingMode === "marker") {
      if (type === "onmouseover") {
        target.show();
      }
      if (type === "onmouseout") {
        target.hide();
      }
      return;
    }

    if (type === "onmouseover") {
      target.setStrokeOpacity(0.5);
      target.setFillOpacity(0.5);
      // store.labelList[target.labelIndex].show();
    }
    if (type === "onmouseout") {
      target.setFillOpacity(0.001);
      target.setStrokeOpacity(0.001);
      // store.labelList[target.labelIndex].hide();
    }
  }
};
// 将数据转换为JSON
const dataConvertJSON = () => {
  const severPen = {
    mapInfo: {
      nameId: userMap.nameId,
    },
    Polygon: {}, // 多边形
    Circle: {}, // 圆
    Rectangle: {}, // 矩形
    Label: {}, // 画笔配套文字标注
    Marker: {}, // 点
  };
  for (const key in userMap.penMap.Polygon) {
    if (Object.prototype.hasOwnProperty.call(userMap.penMap.Polygon, key)) {
      const element = userMap.penMap.Polygon[key];
      severPen.Polygon[element.dataInfo.nameId] = {
        dataInfo: element.dataInfo,
        position: element.getPath(),
      };
    }
  }
  for (const key in userMap.penMap.Rectangle) {
    if (Object.prototype.hasOwnProperty.call(userMap.penMap.Rectangle, key)) {
      console.log("🚀 ~ file: topMenuView.ts:60 ~ dataConvertJSON ~ key:", key);
      const element = userMap.penMap.Rectangle[key];
      severPen.Rectangle[element.dataInfo.nameId] = {
        dataInfo: element.dataInfo,
        position: element.getPath(),
      };
    }
  }
  for (const key in userMap.penMap.Circle) {
    if (Object.prototype.hasOwnProperty.call(userMap.penMap.Circle, key)) {
      const element = userMap.penMap.Circle[key];
      severPen.Circle[element.dataInfo.nameId] = {
        dataInfo: element.dataInfo,
        position: {
          center: element.getCenter(),
          radius: element.getRadius(),
        },
      };
    }
  }
  for (const key in userMap.penMap.Marker) {
    if (Object.prototype.hasOwnProperty.call(userMap.penMap.Marker, key)) {
      const element = userMap.penMap.Marker[key];
      severPen.Marker[element.dataInfo.nameId] = {
        dataInfo: element.dataInfo,
        position: element.getPosition(),
      };
    }
  }
  for (const key in userMap.penMap.Label) {
    if (Object.prototype.hasOwnProperty.call(userMap.penMap.Label, key)) {
      const element = userMap.penMap.Label[key];
      const label = element.getLabel();
      severPen.Label[element.dataInfo.nameId] = {
        dataInfo: element.dataInfo,
        position: label.getPosition(),
      };
    }
  }
  return severPen;
};
export default [
  {
    title: "文件管理",
    list: [
      {
        title: "保存看板",
        func(cell) {
          const severPen = dataConvertJSON();
          const content = JSON.stringify(severPen);
          userInfo.resordInfo.designData = content;
          jldVisualBoardAttributeEdit(userInfo.resordInfo)
            .then((result) => {
              cell && cell();
              console.log(
                "🚀 ~ file: topMenuView.ts:183 ~ .then ~ result:",
                result
              );
            })
            .catch((err) => {
              console.log(
                "🚀 ~ file: IotSocket.vue:67 ~ getDevice ~ err:",
                err
              );
            });
        },
      },
      {
        title: "保存文件到本地",
        func() {
          const severPen = dataConvertJSON();
          const content = JSON.stringify(severPen);
          const blob = new Blob([content], { type: "application/json" });
          // saveAs(blob, "地图绘制文件.json");
        },
      },
      {
        title: "打开本地文件",
        func() {
          const inputFile = document.getElementById(
            "inputFile"
          ) as HTMLInputElement | null;
          inputFile.onchange = () => {
            const file = inputFile.files[0];
            const reader: FileReader = new FileReader(); // 新建一个FileReader
            reader.readAsText(file, "UTF-8"); // 读取文件
            reader.onload = function (evt: any) {
              // 读取完文件之后会回来这里
              const fileString: string = evt.target.result; // 读取文件内容
              // const jsonObj: SeaverPen = JSON.parse(fileString);
              userMap.setPenList(fileString);
            };
          };
          inputFile.click();
        },
      },
    ],
  },
  // {
  //   title: "编辑 / 查看",
  //   list: [
  //     {
  //       title: "打开/关闭 预览模式",
  //       func() {
  //         store.openLookMap();
  //       },
  //     },
  //     {
  //       title: "打开网络配置",
  //       func(userInfo) {
  //         userInfo.drawerShow = true;
  //       },
  //     },
  //     {
  //       title: "打开绘制模式",
  //       func(userInfo) {
  //         store.drawingManager.open();
  //       },
  //     },
  //     {
  //       title: "关闭绘制模式",
  //       func(userInfo) {
  //         store.drawingManager.close();
  //       },
  //     },
  //   ],
  // },
];
