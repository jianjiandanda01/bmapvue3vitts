/*/**
 * @description : import { defineStore } from "pinia";
// import BMapGL from "./BMap";
import { iconList } from "../components/menuView/rightIconList";
import { cloneDeep } from "lodash";

var showRect = true;
var nameFormat = "{x}_{y}";
var ext = ".png";
var host = window.location.origin;

// 获取多边形的中心点
function getCenterPoint(path) {
  var x = 0.0;
  var y = 0.0;
  for (var i = 0; i < path.length; i++) {
    x = x + parseFloat(path[i].lng);
    y = y + parseFloat(path[i].lat);
  }
  x = x / path.length;
  y = y / path.length;
  return new BMap.Point(x, y);
}
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
      store.labelList[target.labelIndex].show();
    }
    if (type === "onmouseout") {
      target.setFillOpacity(0.001);
      target.setStrokeOpacity(0.001);
      store.labelList[target.labelIndex].hide();
    }
  }
};
// 定义保存数据类
interface SeaverPen {
  // 多边形
  polygon: {
    typeName: string;
    path: { lat: number; lng: number }[];
  }[];
  // 圆
  circle: {
    typeName: string;
    center: { lat: number; lng: number };
    radius: number;
  }[];
  // 点
  marker: {
    typeName: string;
    position: { lat: number; lng: number };
    icon: {
      imageUrl: string;
      key: [string, number];
    };
  }[];
  // 折线
  polyline: {
    typeName: string;
    path: { lat: number; lng: number }[];
  }[];
  // 矩形
  rectangle: {
    typeName: string;
    path: { lat: number; lng: number }[];
  }[];
  // 画笔配套文字标注
  label: {
    typeName: string;
    position: { lat: number; lng: number };
  }[];
  // 文字标注类
  iconText: {
    typeName: string;
    content: string;
    keyId: string;
    position: { lat: number; lng: number };
  }[];
}
export const userBaiDuMap = defineStore("counter", {
  state: () => ({
    myMap: null, // 实例化地图
    nameId: 0, // 记录nameId
    penList: {}, // 画笔list
    labelList: {}, // 画笔配套labelList
    iconTextList: {}, // 文字标注List
    penType: "iconImage", // 画笔类型
    drawingManager: null, // 鼠标绘画工具
    overviewMapControl: null, // 缩略图工具
    polygonOptions: {
      strokeWeight: 1,
      strokeColor: "#0c6",
      fillColor: "#d2ffd5",
    }, // 多边形默认样式
    iconTextStyle: {
      borderColor: "#fab6b6",
      backgroundColor: "#fef0f0",
      color: "#f56c6c",
    }, // 文字标注默认样式
    isLook: false, // 是否预览模式
    continuousOff: true, // 是否连续绘画模式
    openPen: false, // 是否绘画模式
    iconType: {
      type: "",
      off: false,
      iconContent: "",
      name: "",
      blueFile: "",
      index: 0,
      key: 0 as number | null,
    }, // 图标属性信息
  }),
  getters: {},
  actions: {
    // 获取nameId
    getNameId() {
      this.nameId = ++this.nameId;
      return this.nameId;
    },
    // 初始化地图
    initMap(type) {
      var map = new BMap.Map("container", {
        mapType: BMAP_NORMAL_MAP,
        minZoom: 10,
        maxZoom: 20,
        enableMapClick: false,
      });
      map.centerAndZoom(new BMap.Point(103.732096070288, 36.1118808091888), 16);
      map.enableScrollWheelZoom();
      // map.enableDoubleClickZoom();
      // map.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT }));
      // map.addControl(new BMap.NavigationControl());
      // map.addControl(
      //   new BMap.MapTypeControl({
      //     mapTypes: [],
      //     // mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP],
      //   })
      // );
      // 缩略图  不支持离线地图
      // this.overviewMapControl = new BMap.OverviewMapControl({
      //   anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
      //   isOpen: true,
      // });
      // map.addControl(this.overviewMapControl);
      // 增加瓦片图层
      var tileLayer = new BMap.TileLayer();
      tileLayer.getTilesUrl = function (tileCoord: any, zoom: any) {
        var name = nameFormat
          .replace("{x}", tileCoord.x)
          .replace("{y}", tileCoord.y)
          .replace("{z}", zoom);
        return host + "/tiles/" + zoom + "/" + name + ext;
      };
      map.addTileLayer(tileLayer);
      // 增加矩形图层
      if (showRect) {
        var path1 = [
          new BMap.Point(103.702847070288, 36.1231503091888),
          new BMap.Point(103.761345070288, 36.1231503091888),
          new BMap.Point(103.761345070288, 36.1006113091888),
          new BMap.Point(103.702847070288, 36.1006113091888),
          new BMap.Point(103.702847070288, 36.1231503091888),
        ];
        var polyline = new BMap.Polyline(path1, {
          strokeColor: "blue",
          strokeWeight: 2,
          strokeOpacity: 0.5,
        });
        map.addOverlay(polyline);
      }
      this.myMap = map;
      if (type === "draw") {
        // 开启鼠标绘制
        this.openBMapLib();
      }
      if (type === "look") {
        this.openLookMap();
      }
    },
    // 开启 / 关闭 预览模式
    openLookMap() {
      if (this.isLook) {
        // 关闭预览状态
        for (const key in this.labelList) {
          if (Object.prototype.hasOwnProperty.call(this.labelList, key)) {
            const element = this.labelList[key];
            element.show();
          }
        }
        for (const key in this.penList) {
          if (Object.prototype.hasOwnProperty.call(this.penList, key)) {
            const element = this.penList[key];
            // 报警状态
            if (element.stateType === 2) {
              element.setFillColor("#d2ffd5");
              element.setStrokeColor("#0c6");
              clearInterval(element.interval);
              break;
            }
            setFillAndStrokOpacity({
              type: "onmouseover",
              target: element,
            });
            element.removeEventListener("mouseover", element.mouseover);
            element.removeEventListener("mouseout", element.mouseout);
          }
        }
        this.myMap.addControl(this.drawingManager._drawingTool);
        this.isLook = false;
      } else {
        // 触发预览状态
        for (const key in this.labelList) {
          if (Object.prototype.hasOwnProperty.call(this.labelList, key)) {
            const element = this.labelList[key];
            element.hide();
          }
        }
        for (const key in this.penList) {
          if (Object.prototype.hasOwnProperty.call(this.penList, key)) {
            const element = this.penList[key];
            // 报警状态
            if (element.stateType === 2) {
              let typeNum = false;
              element.interval = setInterval(() => {
                if (typeNum) {
                  element.setFillColor("#79bbff");
                  element.setStrokeColor("#409EFF");
                } else {
                  element.setFillColor("#f89898");
                  element.setStrokeColor("#F56C6C");
                }
                typeNum = !typeNum;
              }, 500);
              break;
            }
            setFillAndStrokOpacity({ type: "onmouseout", target: element });
            // 每个绑定的函数名 都必须唯一,否则无法取消
            element.mouseover = eval(setFillAndStrokOpacity.toString());
            element.mouseout = eval(setFillAndStrokOpacity.toString());

            element.addEventListener("mouseover", element.mouseover);
            element.addEventListener("mouseout", element.mouseout);
          }
        }
        if (this.drawingManager) {
          this.myMap.removeControl(this.drawingManager._drawingTool);
        }
        this.isLook = true;
        this.iconType.key = null;
      }
    },
    //开启鼠标绘制
    openBMapLib() {
      // 开启鼠标绘制
      //实例化鼠标绘制工具
      this.drawingManager = new BMapLib.DrawingManager(this.myMap, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: false, //是否显示工具栏
        drawingToolOptions: {
          anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
          offset: new BMap.Size(10, 40), //偏离值
        },
        polygonOptions: this.polygonOptions,
        circleOptions: this.polygonOptions,
        markerOptions: this.polygonOptions,
        rectangleOptions: this.polygonOptions,
        polylineOptions: this.polygonOptions,
      });
      // 绘制点完成后的回调
      // this.drawingManager.addEventListener("markercomplete", (e: any) => {
      //   this.iconType.index = this.penList.keyId;
      //   this.iconType.off = true;
      // });
      // 生成工具的回调
      this.addEventListener();
    },
    // 绘制点完成后的回调
    addEventListener() {
      this.drawingManager.addEventListener("overlaycomplete", (e: any) => {
        console.log("e :>> ", e);
        e.overlay.keyId = this.getNameId();
        let typeName = "";
        let point = null;
        if (e.drawingMode === "polygon") {
          typeName = `多边形`;
          point = getCenterPoint(e.overlay.getPath());
        }
        if (e.drawingMode === "circle") {
          typeName = `圆形`;
          point = e.overlay.point;
        }
        if (e.drawingMode === "marker") {
          typeName = `点`;
          point = e.overlay.point;
          this.iconType.index = e.overlay.keyId;
        }
        if (e.drawingMode === "polyline") {
          typeName = `折线`;
          point = e.overlay.getPath()[0];
        }
        if (e.drawingMode === "rectangle") {
          typeName = `矩形`;
          point = getCenterPoint(e.overlay.getPath());
        }
        e.overlay.drawingMode = e.drawingMode;
        e.overlay.typeName = typeName;
        e.overlay.isShow = true;
        // 添加文字标注 / 获取labelIndex
        const labelIndex = this.addLabel(
          e.overlay.typeName,
          point,
          e.overlay.keyId
        );
        e.overlay.labelIndex = labelIndex;
        e.overlay.stateType = 0;
        e.overlay.lock = true;
        e.overlay.disableMassClear();
        this.penList[e.overlay.keyId] = e.overlay;
        if (this.penType === "iconImage") {
          this.setIconImage(this.iconType.key);
        }
        if (this.penType === "region") {
          this.penType = "";
        }
        if (this.penType === "iconText") {
          this.setIconIsText();
        }
        if (this.continuousOff) {
          this.drawingManager.open();
        } else {
          this.penType = "";
          this.drawingManager.close();
        }
      });
    },
    // 添加绘制物
    addOverlay(typeName, pen, point, drawingMode) {
      pen.keyId = this.getNameId();
      pen.typeName = typeName;
      pen.disableMassClear();
      this.myMap.addOverlay(pen);
      const labelIndex = this.addLabel(pen.typeName, point, pen.keyId);
      pen.labelIndex = labelIndex;
      pen.drawingMode = drawingMode;
      this.penList[pen.keyId] = pen;
      // this.penList.push(pen);
      if (drawingMode === "marker") {
        console.log("pen :>> ", pen.icon.key);
        this.iconType.index = pen.keyId;
        this.setIconImage(pen.icon.key);
      }
    },
    // 修改icon图标
    setIconImage(key) {
      const cell = iconList[key];
      const width = 40;
      const size = new BMap.Size(width, width);
      const icon = new BMap.Icon(`./${cell.blueFile}`, size, {
        imageSize: new BMap.Size(width, width),
        anchor: new BMap.Size(width / 2, width),
      });
      icon.key = key;
      this.penList[this.iconType.index].typeName = cell.name;
      this.penList[this.iconType.index].setIcon(icon);
      // 修改标注文字信息
      this.setLabelCont(this.iconType.index);
      this.iconType.off = false;
    },
    // 设置icon为文字标注类型
    setIconIsText() {
      const iconText = this.iconType.iconContent;
      // 修改原有的标注
      this.labelList[this.iconType.index].setStyle(this.iconTextStyle);
      this.labelList[this.iconType.index].setContent(
        `${iconText}(${this.iconType.index})`
      );
      this.labelList[this.iconType.index].typeName = iconText;
      this.labelList[this.iconType.index].isShow = true;

      // 将标注添加到文字标注List
      this.iconTextList[this.iconType.index] = cloneDeep(
        this.labelList[this.iconType.index]
      );
      console.log("this.iconTextList :>> ", this.iconTextList);
      // 删除原有的点标注
      this.myMap.removeOverlay(this.penList[this.iconType.index]);
      delete this.penList[this.iconType.index];
      // 从labelList移除此标注
      delete this.labelList[this.iconType.index];
    },
    // 修改标注文字信息
    setLabelCont(key) {
      console.log("key :>> ", key);
      this.labelList[this.penList[key].labelIndex].setContent(
        `${this.penList[key].typeName}(${key})`
      );
    },
    // 添加文字标注
    addLabel(typeName, point, keyId) {
      const label = new BMap.Label(`${typeName}(${keyId})`, {
        position: point,
      });
      label.disableMassClear();
      label.setStyle({
        backgroundColor: "#8f8f8f",
        color: "#fff",
        borderColor: "black",
      });
      this.labelList[keyId] = label;
      this.labelList[keyId].keyId = keyId;
      // this.labelList.push(label);
      this.myMap.addOverlay(label);
      return keyId;
    },
    // 计算多边形的中心点
    getCenterPoint(path) {
      var x = 0.0;
      var y = 0.0;
      for (var i = 0; i < path.length; i++) {
        x = x + parseFloat(path[i].lng);
        y = y + parseFloat(path[i].lat);
      }
      x = x / path.length;
      y = y / path.length;
      return new BMap.Point(x, y);
    },
    // 渲染绘制物
    renderingPenList(json) {
      // const fileString: string = evt.target.result; // 读取文件内容
      if (json === "") return;
      const jsonObj: SeaverPen = JSON.parse(json);
      console.log(
        "🚀 ~ file: store.ts:443 ~ renderingPenList ~ jsonObj:",
        jsonObj
      );
      // 多边形
      jsonObj.polygon.forEach((element) => {
        const pathList = [];
        element.path.forEach((path) => {
          pathList.push(new BMap.Point(path.lng, path.lat));
        });
        const pen = new BMap.Polygon(pathList, this.polygonOptions);
        pen.stateType = 0;
        pen.lock = true;
        pen.isShow = true;
        this.addOverlay(
          element.typeName,
          pen,
          this.getCenterPoint(pathList),
          "polygon"
        );
      });
      // 圆形
      jsonObj.circle.forEach((element) => {
        const pen = new BMap.Circle(
          new BMap.Point(element.center.lng, element.center.lat),
          element.radius,
          this.polygonOptions
        );
        this.addOverlay(
          element.typeName,
          pen,
          new BMap.Point(element.center.lng, element.center.lat),
          "circle"
        );
      });
      // 点
      jsonObj.marker.forEach((element) => {
        const pen = new BMap.Marker(
          new BMap.Point(
            element.position.lng,
            element.position.lat,
            this.polygonOptions
          )
        );
        pen.stateType = 0;
        pen.lock = true;
        pen.isShow = true;
        pen.icon = element.icon;
        this.addOverlay(
          element.typeName,
          pen,
          new BMap.Point(element.position.lng, element.position.lat),
          "marker"
        );
      });
      // 折线
      jsonObj.polyline.forEach((element) => {
        const pathList = [];
        element.path.forEach((path) => {
          pathList.push(new BMap.Point(path.lng, path.lat));
        });
        const pen = new BMap.Polyline(pathList, this.polygonOptions);
        this.addOverlay(
          element.typeName,
          pen,
          new BMap.Point(element.path[0].lng, element.path[0].lat),
          "polyline"
        );
      });
      // 矩形
      jsonObj.rectangle.forEach((element) => {
        const pathList = [];
        element.path.forEach((path) => {
          pathList.push(new BMap.Point(path.lng, path.lat));
        });
        const pen = new BMap.Polygon(pathList, this.polygonOptions);
        this.addOverlay(
          element.typeName,
          pen,
          this.getCenterPoint(pathList),
          "rectangle"
        );
      });
      // 文字标注类
      jsonObj.iconText.forEach((element) => {
        const keyId = this.getNameId();
        const label = new BMap.Label(`${element.typeName}(${keyId})`, {
          position: element.position,
        });
        label.typeName = element.typeName;
        label.stateType = 0;
        label.lock = true;
        label.isShow = true;
        label.keyId = keyId;
        label.setStyle(this.iconTextStyle);
        this.myMap.addOverlay(label);
        this.iconTextList[keyId] = label;
      });
    },
    // 定位到目标点
    positionMarker({ lng, lat }) {
      const po = new BMap.Point(lng, lat);
      this.myMap.panTo(po);
      this.myMap.setZoom(19);
    },
    // 打开信息窗事件
    addInfoWindow(title, content, { lng, lat }) {
      // var searchInfoWindow = new BMap.InfoWindow(this.myMap, content, {
      //   width: 280,
      //   height: 50,
      //   title: "AI公寓楼建筑物信息",
      //   panel: "panel", //检索结果面板
      //   enableAutoPan: true, //自动平移
      //   enableSendToPhone: false, //是否启动发送到手机功能
      //   searchTypes: [
      //     // BMAPLIB_TAB_SEARCH, //周边检索
      //     // BMAPLIB_TAB_TO_HERE, //到这里去
      //     // BMAPLIB_TAB_FROM_HERE, //从这里出发
      //   ],
      // });
      // console.log("searchInfoWindow :>> ", searchInfoWindow);
      // this.myMap.openInfoWindow(searchInfoWindow, new BMap.Point(lng, lat));
      // searchInfoWindow.open(new BMap.Point(lng, lat));
      // var opts = {
      //   width: 0, // 信息窗口宽度
      //   height: 0, // 信息窗口高度
      //   title: title, // 信息窗口标题
      //   enableMessage: false, // 是否在信息窗里显示短信发送按钮（默认开启）
      // };
      // var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
      // this.myMap.openInfoWindow(infoWindow, this.myMap.getCenter()); // 打开信息窗口
      var html = [
        "<div class='infoBoxContent'><div class='title'><strong>中海雅园</strong><span class='price'>均价43000</span></div>",
        "<div class='list'><ul><li><div class='left'><img src='house3.jpg'/></div><div class='left'><a target='_blank' href='http://map.baidu.com'>中海雅园南北通透四居室</a><p>4室2厅，205.00平米，3层</p></div><div class='rmb'>760万</div></li>",
        "<li><div class='left'><img src='house1.jpg'/></div><div class='left'><a target='_blank' href='http://map.baidu.com'>中海雅园四居室还带保姆间</a><p>2室1厅，112.00平米，16层</p></div><div class='rmb'>300万</div></li>",
        "<li><div class='left'><img src='house2.jpg'/></div><div class='left'><a target='_blank' href='http://map.baidu.com'>《有钥匙 随时看》花园水系</a><p>3室2厅，241.00平米，16层</p></div><div class='rmb'>400万</div></li>",
        "<li><div class='left'><img src='house3.jpg'/></div><div class='left'><a target='_blank' href='http://map.baidu.com'>富力城D区正规楼王大三居</a><p>3室3厅，241.00平米，17层</p></div><div class='rmb'>600万</div></li>",
        "<li class='last'><div class='left'><img src='house1.jpg'/></div><div class='left'><a target='_blank' href='http://map.baidu.com'>富力城豪，身份人士的象征</a><p>4室2厅，213.90平米，25层</p></div><div class='rmb'>700万</div></li>",
        "</ul></div>",
        "</div>",
      ];
      var infoBox = new BMapLib.InfoBox(this.myMap, content, {
        boxStyle: {
          background: "url('tipbox.gif') no-repeat center top",
          width: "270px",
          height: "300px",
        },
        closeIconMargin: "1px 1px 0 0",
        enableAutoPan: true,
        // align: INFOBOX_AT_TOP,
      });
      infoBox.open(this.myMap.getCenter());
    },
  },
});
*/
