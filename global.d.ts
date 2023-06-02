export {};
declare global {
  interface Window {
    BMap: any; // 地图实例
    BMapLib: any; // 鼠标绘制实例
    BMAP_NORMAL_MAP: any;
    BMAP_ANCHOR_TOP_RIGHT: any;
    BMAP_DRAWING_MARKER: any; // 画点
    BMAP_DRAWING_CIRCLE: any; // 画圆
    BMAP_DRAWING_POLYLINE: any; // 画线
    BMAP_DRAWING_POLYGON: any; // 画多边形
    BMAP_DRAWING_RECTANGLE: any; // 画矩形
  }
}
