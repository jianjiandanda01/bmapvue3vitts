const mapInfo = lookMapStore();
/**
 * Polygon 多边形
 * Circle 圆形
 * Rectangle 矩形
 * Marker 图标点
 * Label 文字标签
 */
import { markerIconList, labelText } from "/@assets/markerIconList";
// import { getCenterPoint } from "@store/type/PenClass";
import {
  PenType,
  PenDataInfo,
  Pen,
  PenMap,
  getCenterPoint,
} from "/@store/type/PenClass";
// import { userInfo } from "os";
export const lookMapInfo = defineStore("lookMapInfo", {
  state: () => ({
    mapInfo: {
      drag: true, // 是否开启拖拽
      clickSelect: false, // 是否单机选中
      penType: "" as PenType, // 画笔类型
      iconImgId: "", // 图标点图片iconKey
      labelInput: "", // 标注文字内容
    }, // 地图类属性
    penTypeMap: [
      { label: "多边形", key: "Polygon", icon: "hexagon-one" },
      { label: "圆形", key: "Circle", icon: "round" },
      { label: "矩形", key: "Rectangle", icon: "square" },
      { label: "标注", key: "Label", icon: "tag-one" },
      { label: "图标", key: "Marker", icon: "local-two" },
    ] as { label: string; key: PenType; icon: string }[],
    nameId: 0, // 自增ID
    penMap: {
      Polygon: {} as { [propName: string]: Pen },
      Circle: {} as { [propName: string]: Pen },
      Rectangle: {} as { [propName: string]: Pen },
      Label: {} as { [propName: string]: Pen },
      Marker: {} as { [propName: string]: Pen },
    },
    selectPen: {
      penType: "" as PenType,
      nameId: "",
      pen: {} as Pen,
    },
  }),
  getters: {},
  actions: {
    // 渲染绘制物
    setPenList(data) {
      if (data === "") {
        return;
      }
      const penData = JSON.parse(data);
      this.nameId = penData.mapInfo.nameId;
      for (const key in penData.Circle) {
        if (Object.prototype.hasOwnProperty.call(penData.Circle, key)) {
          const element = penData.Circle[key];
          const nameId = element.dataInfo.nameId;
          const Circle = new window.BMap.Circle(
            new window.BMap.Point(
              element.position.center.lng,
              element.position.center.lat
            ),
            element.position.radius,
            {
              ...mapInfo.polygonOptions,
            }
          );
          Circle.dataInfo = element.dataInfo;
          // Circle.hide();
          Circle.setStrokeOpacity(0.01);
          Circle.setFillOpacity(0.01);
          Circle.dataInfo.show = false;
          this.penMap[element.dataInfo.type][nameId] = Circle;
          this.addPenClick(Circle);
          mapInfo.myMap.addOverlay(Circle);
        }
      }
      for (const key in penData.Polygon) {
        if (Object.prototype.hasOwnProperty.call(penData.Polygon, key)) {
          const element = penData.Polygon[key];
          const nameId = element.dataInfo.nameId;
          const points = [];
          element.position.forEach((poin) => {
            points.push(new window.BMap.Point(poin.lng, poin.lat));
          });
          const Polygon = new window.BMap.Polygon(points, {
            ...mapInfo.polygonOptions,
          });
          Polygon.dataInfo = element.dataInfo;
          // Polygon.hide();
          Polygon.setStrokeOpacity(0.01);
          Polygon.setFillOpacity(0.01);
          Polygon.dataInfo.show = false;
          this.penMap[element.dataInfo.type][nameId] = Polygon;
          this.addPenClick(Polygon);
          mapInfo.myMap.addOverlay(Polygon);
        }
      }
      for (const key in penData.Rectangle) {
        if (Object.prototype.hasOwnProperty.call(penData.Rectangle, key)) {
          const element = penData.Rectangle[key];
          const nameId = element.dataInfo.nameId;
          const points = [];
          element.position.forEach((poin) => {
            points.push(new window.BMap.Point(poin.lng, poin.lat));
          });
          const Polygon = new window.BMap.Polygon(points, {
            ...mapInfo.polygonOptions,
          });
          Polygon.dataInfo = element.dataInfo;
          // Polygon.hide();
          Polygon.setStrokeOpacity(0.01);
          Polygon.setFillOpacity(0.01);
          Polygon.dataInfo.show = false;
          this.penMap[element.dataInfo.type][nameId] = Polygon;
          this.addPenClick(Polygon);
          mapInfo.myMap.addOverlay(Polygon);
        }
      }
      for (const key in penData.Marker) {
        if (Object.prototype.hasOwnProperty.call(penData.Marker, key)) {
          const element = penData.Marker[key];
          const imgKey = element.dataInfo.iconImgId.split("-")[0];
          const img =
            markerIconList[imgKey].iconList[element.dataInfo.iconImgId];
          const width = 40;
          const size = new window.BMap.Size(width, width);
          const icon = new window.BMap.Icon(`./${img.markerUrl}`, size, {
            imageSize: new window.BMap.Size(width, width),
            anchor: new window.BMap.Size(width / 2, width),
          });
          const Marker = new window.BMap.Marker(
            new window.BMap.Point(element.position.lng, element.position.lat),
            { icon: icon }
          );
          const nameId = element.dataInfo.nameId;
          Marker.setTitle(element.dataInfo.title);
          Marker.dataInfo = element.dataInfo;
          Marker.hide();
          Marker.dataInfo.show = false;
          this.addPenClick(Marker);
          this.penMap[element.dataInfo.type][nameId] = Marker;
          mapInfo.myMap.addOverlay(Marker);
        }
      }
      for (const key in penData.Label) {
        if (Object.prototype.hasOwnProperty.call(penData.Label, key)) {
          const element = penData.Label[key];
          const nameId = element.dataInfo.nameId;
          const width = 20;
          const size = new window.BMap.Size(width, width);
          const icon = new window.BMap.Icon("./public/drag.png", size, {
            imageSize: new window.BMap.Size(width, width),
            anchor: new window.BMap.Size(width / 2, width),
          });
          const label = new window.BMap.Label(element.dataInfo.title, {
            offset: new window.BMap.Size(20, 0),
            position: new window.BMap.Point(
              element.position.lng,
              element.position.lat
            ),
          });
          label.dataInfo = element.dataInfo;
          label.hide();
          label.dataInfo.show = false;
          this.penMap[element.dataInfo.type][nameId] = label;
          this.addPenClick(label);
          mapInfo.myMap.addOverlay(label);
        }
      }
    },
    // 画笔添加 事件
    addPenClick(pen) {
      if (pen.dataInfo.type === "Marker") {
        // var map = new window.BMap.Map("container");
        pen.addEventListener("click", ({ type, target }) => {
          if (target.myRichMarkerObject) {
            if (target.myRichMarkerObject.ifShow) {
              target.myRichMarkerObject.hide();
              target.myRichMarkerObject.ifShow = false;
            } else {
              target.myRichMarkerObject.show();
              target.myRichMarkerObject.ifShow = true;
            }
          } else {
            var htm = `<div class='RichMarker RichMarker1'>
            <div class='header'>
            AI公寓楼高位水箱
            </div>
            <div class='content'>
              <span>设备名称: 高位水箱</span>
            </div>
          </div>`;
            const myRichMarkerObject = new window.BMapLib.RichMarker(
              htm,
              target.getPosition(),
              {
                anchor: new window.BMap.Size(0, 0),
                enableDragging: true,
              }
            );
            myRichMarkerObject.ifShow = true;
            target.myRichMarkerObject = myRichMarkerObject;
            mapInfo.myMap.addOverlay(target.myRichMarkerObject);
          }
        });
      }

      if (
        ["Polygon", "Circle", "Rectangle"].indexOf(pen.dataInfo.type) !== -1
      ) {
        pen.mouseover = ({ type, target }) => {
          target.setStrokeOpacity(1);
          target.setFillOpacity(0.7);
          if (target.label) {
            target.label.show();
          } else {
            const point = getCenterPoint(target.getPath());
            const label = new window.BMap.Label(target.dataInfo.title, {
              offset: new window.BMap.Size(20, 0),
              position: point,
            });
            console.log(
              "🚀 ~ file: lookMapInfo.ts:189 ~ addPenClick ~ label:",
              label
            );
            target.label = label;
            mapInfo.myMap.addOverlay(target.label);
          }
          target.dataInfo.show = true;
        };
        pen.mouseout = ({ type, target }) => {
          target.setStrokeOpacity(0.01);
          target.setFillOpacity(0.01);
          target.label.hide();
          target.dataInfo.show = false;
        };
        pen.addEventListener("mouseover", pen.mouseover);

        pen.addEventListener("mouseout", pen.mouseout);
      }
    },
    // 将画笔放入penMap  初始化
    pushPenMap(pen: Pen) {
      const nameId = this.getNameId();
      this.addPenClick(pen);
      pen.dataInfo.type = this.mapInfo.penType;
      pen.dataInfo.show = true; // 显示/隐藏 开关
      pen.dataInfo.lock = true; // 锁定/接触锁定 开关
      pen.dataInfo.nameId = nameId; // 画笔ID
      pen.dataInfo.buildId = ""; // 建筑ID
      pen.dataInfo.deviceId = ""; // 设备ID
      pen.dataInfo.HLId = ""; // 回路号
      pen.dataInfo.lookPen = ""; // 看板ID
      this.penMap[this.mapInfo.penType][nameId] = pen;
      // this.penMap[this.mapInfo.penType].set(nameId, pen);
    },
    // 获取nameId
    getNameId() {
      return String(this.nameId++);
    },
    // 初始化地图
    initMap() {
      mapInfo.initMap();
      // mapInfo.initMap(() => {
      //   this.addEventListener();
      // });
    },
    // 绘制点完成后的回调
    addEventListener() {
      // 绘制区域后的回调
      mapInfo.drawingManager.addEventListener(
        "overlaycomplete",
        (e: { overlay: Pen; drawingMode: string }) => {
          e.overlay.dataInfo = {} as PenDataInfo;
          // typeName = `多边形`;
          if (e.drawingMode === "polygon") {
            e.overlay.dataInfo.title = "楼栋";
          }
          // typeName = `圆形`;
          if (e.drawingMode === "circle") {
            e.overlay.dataInfo.title = "圆形区域";
          }
          // typeName = `矩形`;
          if (e.drawingMode === "rectangle") {
            e.overlay.dataInfo.title = "矩形区域";
          }
          // // typeName = `点`;
          // if (e.drawingMode === "marker") {
          // }
          // // typeName = `折线`;
          // if (e.drawingMode === "polyline") {
          // }
          setTimeout(() => {
            if (this.mapInfo.penType !== "") {
              mapInfo.drawingManager.open();
            }
          }, 100);
          const pen: Pen = e.overlay;
          this.pushPenMap(pen);
        }
      );
      // 绘制 (点 / 标签) 后的回调
      mapInfo.mkrTool.addEventListener("markend", (evt) => {
        const pen: Pen = evt.marker;
        console.log("pen :>> ", pen);
        console.log("evt :>> ", evt);
        pen.dataInfo = {} as PenDataInfo;
        // 绘制图标
        if (this.mapInfo.penType === "Marker") {
          const key = this.mapInfo.iconImgId.split("-")[0];
          const img = markerIconList[key].iconList[this.mapInfo.iconImgId];
          pen.dataInfo.title =
            markerIconList[key].iconList[this.mapInfo.iconImgId].label;
          pen.dataInfo.iconImgId = this.mapInfo.iconImgId;
          pen.setTitle(img.label);
        }
        // 绘制标签
        if (this.mapInfo.penType === "Label") {
          const label = new window.BMap.Label(this.mapInfo.labelInput, {
            offset: new window.BMap.Size(20, 0),
          });
          pen.dataInfo.title = this.mapInfo.labelInput;
          pen.setLabel(label);
          pen.setTitle(this.mapInfo.labelInput);
          // mapInfo.myMap.removeOverlay(pen);
        }
        this.pushPenMap(pen);
      });
    },
    // 	开始绘制图像
    startPainting(type, off = false) {
      if (type === "") {
        this.mapInfo.penType = "";
        this.mapInfo.iconImgId = "";
        this.mapInfo.labelInput = "";
        mapInfo.drawingManager.close();
        mapInfo.mkrTool.close();
        return;
      } else {
        this.mapInfo.clickSelect = false;
      }
      // 多边形
      if (type === "Polygon") {
        mapInfo.drawingManager.setDrawingMode(window.BMAP_DRAWING_POLYGON);
      }
      // 圆形
      if (type === "Circle") {
        mapInfo.drawingManager.setDrawingMode(window.BMAP_DRAWING_CIRCLE);
      }
      // 矩形
      if (type === "Rectangle") {
        mapInfo.drawingManager.setDrawingMode(window.BMAP_DRAWING_RECTANGLE);
      }
      // 图标点
      if (type === "Marker") {
        const key = this.mapInfo.iconImgId.split("-")[0];
        const img = markerIconList[key].iconList[this.mapInfo.iconImgId];

        const width = 40;
        const size = new window.BMap.Size(width, width);
        const icon = new window.BMap.Icon(`./${img.markerUrl}`, size, {
          imageSize: new window.BMap.Size(width, width),
          anchor: new window.BMap.Size(width / 2, width),
        });
        mapInfo.mkrTool._opts.followText = `部署-${img.label}`;
        //打开工具
        if (mapInfo.mkrTool.open()) {
          mapInfo.mkrTool.setIcon(icon);
        } else {
          this.mapInfo.penType = "";
          // 开启失败
        }
      }
      // 标签
      if (type === "Label") {
        const width = 20;
        const size = new window.BMap.Size(width, width);
        const icon = new window.BMap.Icon("./public/drag.png", size, {
          imageSize: new window.BMap.Size(width, width),
          anchor: new window.BMap.Size(width / 2, width),
        });
        mapInfo.mkrTool._opts.followText = `${this.mapInfo.labelInput}`;
        //打开工具
        if (mapInfo.mkrTool.open()) {
          mapInfo.mkrTool.setIcon(icon);
        } else {
          this.mapInfo.penType = "";
          // 开启失败
        }
        // var map = new BMap.Map("container");
        // map.centerAndZoom(new BMap.Point(116.309965, 40.058333), 17);
        // var htm =
        //   "<div style='background:#E7F0F5;color:#0082CB;border:1px solid #333'>" +
        //   "欢迎使用百度地图！" +
        //   "<img src='http://map.baidu.com/img/logo-map.gif' border='0' />" +
        //   "</div>";
        // var point = new BMap.Point(116.30816, 40.056863);
        // var myRichMarkerObject = new BMapLib.RichMarker(htm, point, {
        //   anchor: new BMap.Size(-72, -84),
        //   enableDragging: true,
        // });
        // map.addOverlay(myRichMarkerObject);
        // mapInfo.drawingManager.setDrawingMode(window.BMAP_DRAWING_RECTANGLE);
      }
      // 是否 重置 penType
      if (off) {
        this.mapInfo.penType = type;
        mapInfo.drawingManager.close();
      } else {
        if (this.mapInfo.penType === type) {
          this.mapInfo.penType = "";
          this.mapInfo.iconImgId = "";
          this.mapInfo.labelInput = "";
          mapInfo.drawingManager.close();
          mapInfo.mkrTool.close();
        } else {
          this.mapInfo.penType = type;
          mapInfo.drawingManager.open();
          mapInfo.mkrTool.close();
        }
      }
    },
    // 设置绑定label
    setLabelNameId(pen) {
      if (!pen.dataInfo.labelNameId) {
        return;
      }
      let point = {};
      if (pen.dataInfo.type === "Polygon") {
        point = getCenterPoint(pen.getPath());
      }
      if (pen.dataInfo.type === "Circle") {
        point = pen.getCenter();
      }
      if (pen.dataInfo.type === "Rectangle") {
        point = getCenterPoint(pen.getPath());
      }
      if (pen.dataInfo.type === "Marker") {
        point = pen.getPosition();
      }
      // console.log('pen.dataInfo.labelNameId :>> ', pen.dataInfo.labelIndex);
      this.penMap.Label[pen.dataInfo.labelNameId].setPosition(point);
    },
  },
});
