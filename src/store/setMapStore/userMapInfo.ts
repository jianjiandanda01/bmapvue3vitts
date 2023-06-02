// import { userMapStore } from "@/store/userMapStore";
// const userMap = userMapStore();

import { defineStore } from "pinia";
var showRect = true;
var nameFormat = "{x}_{y}";
var ext = ".png";
var host = window.location.origin;
/**
 * PenType  类定义
 * Polygon  多边形
 * Label    文本标注
 */
export const userMapInfo = defineStore("userMapInfo", {
  state: () => ({
    drawingManager: window.BMapLib, // 地图编辑器实例
    myMap: window.BMap, // 实例化地图
    mkrTool: window.BMapLib, // 添加标注工具
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
  }),
  getters: {},
  actions: {
    // 初始化地图
    initMap(call) {
      var map = new window.BMap.Map("container", {
        mapType: window.BMAP_NORMAL_MAP,
        minZoom: 10,
        maxZoom: 20,
        enableMapClick: false,
      });
      map.centerAndZoom(
        new window.BMap.Point(103.732096070288, 36.1118808091888),
        16
      );
      map.enableScrollWheelZoom();
      // 增加瓦片图层
      var tileLayer = new window.BMap.TileLayer();
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
          new window.BMap.Point(103.702847070288, 36.1231503091888),
          new window.BMap.Point(103.761345070288, 36.1231503091888),
          new window.BMap.Point(103.761345070288, 36.1006113091888),
          new window.BMap.Point(103.702847070288, 36.1006113091888),
          new window.BMap.Point(103.702847070288, 36.1231503091888),
        ];
        var polyline = new window.BMap.Polyline(path1, {
          strokeColor: "blue",
          strokeWeight: 2,
          strokeOpacity: 0.5,
        });
        map.addOverlay(polyline);
      }
      this.myMap = map;
      this.openBMapLib(call);
    },
    //开启鼠标绘制
    openBMapLib(call) {
      // 开启鼠标绘制
      //实例化鼠标绘制工具
      this.drawingManager = new window.BMapLib.DrawingManager(this.myMap, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: false, //是否显示工具栏
        drawingToolOptions: {
          anchor: window.BMAP_ANCHOR_TOP_RIGHT, //位置
          offset: new window.BMap.Size(10, 40), //偏离值
        },
        polygonOptions: this.polygonOptions,
        circleOptions: this.polygonOptions,
        markerOptions: this.polygonOptions,
        rectangleOptions: this.polygonOptions,
        polylineOptions: this.polygonOptions,
      });
      // 生成工具的回调
      this.openMarkerTool(call);
    },
    // 打开 添加标注工具
    openMarkerTool(call) {
      this.mkrTool = new window.BMapLib.MarkerTool(this.myMap, {
        autoClose: false, // 连续绘图模式
        followText: "单击以部署内容",
      });
      call();
    },
    // 设置画笔样式
    setPenStyle(pen, select) {
      let strokeColor = this.polygonOptions.strokeColor;
      let FillColor = this.polygonOptions.fillColor;
      if (select) {
        strokeColor = "#f56c6c";
        FillColor = "#fef0f0";
      }
      pen.setStrokeColor && pen.setStrokeColor(strokeColor);
      pen.setFillColor && pen.setFillColor(FillColor);
    },
    // 初始化画笔样式
    initializationPenStyle() {
      const penLsit = this.myMap.getOverlays();
      penLsit.forEach((element) => {
        if (element.dataInfo) {
          this.setPenStyle(element, false);
        }
      });
    },
  },
});
