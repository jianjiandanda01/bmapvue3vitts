const userMap = userMapStore();
const mapInfo = userMapInfo();

interface MenuList {
  title: string;
  type: string;
  typeOff: boolean | string;
  icon: string;
  func: () => void;
  meunType?: "popover";
  iconList?: "icon" | "label";
}
// 拖动
const dragClick = () => {
  if (userMap.mapInfo.drag) {
    mapInfo.myMap.disableDragging();
  } else {
    mapInfo.myMap.enableDragging();
  }
  userMap.mapInfo.drag = !userMap.mapInfo.drag;
};
// 选择标签
const clickSelectClick = () => {
  mapInfo.initializationPenStyle();
  userMap.startPainting("");
  userMap.mapInfo.clickSelect = !userMap.mapInfo.clickSelect;
};
// 绘制多边形
const PolygonClick = () => {
  userMap.startPainting("Polygon");
};
// 绘制圆形
const CircleClick = () => {
  userMap.startPainting("Circle");
};
// 绘制矩形
const RectangleClick = () => {
  userMap.startPainting("Rectangle");
};

export {
  dragClick,
  clickSelectClick,
  PolygonClick,
  CircleClick,
  RectangleClick,
};
// title: string, [];
export const menuList: MenuList[] = [
  {
    title: "绘制矩形",
    type: "penType",
    typeOff: "Rectangle",
    icon: "square",
    func() {
    },
  },
  {
    title: "绘制图标",
    type: "penType",
    typeOff: "Marker",
    icon: "local-two",
    func() {
      userMap.startPainting("Marker", true);
    },
    meunType: "popover",
    iconList: "icon",
  },
  {
    title: "绘制标签",
    type: "penType",
    typeOff: "Label",
    icon: "tag-one",
    func() {
      userMap.startPainting("Label", true);
    },
    meunType: "popover",
    iconList: "label",
  },
];
