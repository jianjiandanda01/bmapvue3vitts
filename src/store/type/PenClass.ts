export type PenType =
  | ""
  | "Polygon"
  | "Circle"
  | "Rectangle"
  | "Label"
  | "Marker";
export interface PenDataInfo {
  title: string;
  type: PenType;
  nameId: string;
  show: boolean;
  lock: boolean;
  buildId: string;
  deviceId: string;
  HLId: string;
  lookPen: string;
  labelNameId: string;
  iconImgId?: string;
}
export interface Pen {
  dataInfo: PenDataInfo;
  addEventListener: (string, Funciton) => void;
  setTitle: (string) => void;
  setLabel: (string) => void;
  getPath: () => void;
  getCenter: () => void;
  getRadius: () => void;
  getPosition: () => void;
  getLabel: () => Pen;
  show: () => void;
  hide: () => void;
}
export interface PenSelect {
  penType: PenType;
  nameId: "";
  pen: Pen;
}
export interface PenMap {
  Polygon: { [propName: string]: Pen };
  Circle: { [propName: string]: Pen };
  Rectangle: { [propName: string]: Pen };
  Label: { [propName: string]: Pen };
  Marker: { [propName: string]: Pen };
}

// 获取多边形的中心点
export function getCenterPoint(path: any) {
  var x = 0.0;
  var y = 0.0;
  for (var i = 0; i < path.length; i++) {
    x = x + parseFloat(path[i].lng);
    y = y + parseFloat(path[i].lat);
  }
  x = x / path.length;
  y = y / path.length;
  return new window.BMap.Point(x, y);
}
export interface JldCloudBusBuildingResult {
  bdAliasName: string;
  bdElevation2DFile: null | string;
  bdElevationFile: null | string;
  bdFinishDate: null;
  bdId: string;
  bdOverGroundFloor: number;
  bdOverGroundSpace: number;
  bdPlanFile: null | string;
  bdStdFloorSpace: null;
  bdUnderGroundFloor: number | null;
  bdUnderGroundSpace: number | null;
  buildingInfo: BuildingInfo;
  busCode: string;
  ext1: null;
  ext2: null;
  ext3: null;
  floorSize: number;
  id: string;
  lableCode: null | string;
  projectCode: null | string;
  realStatus: number;
  remarks: null | string;
  sortNo: null;
}
export interface BuildingInfo {
  bdAddr: string;
  bdElevationFile: null | string;
  bdFinishDate: string;
  bdFireHazard: null | string;
  bdFireHazardDictText: null | string;
  bdFireResistant: string;
  bdFireResistantDictText: string;
  bdHeight: number;
  bdLat: string;
  bdLng: string;
  bdName: string;
  bdOccupySpace: number;
  bdOverGroundFloor: number | null;
  bdOverGroundSpace: number | null;
  bdPlanFile: null | string;
  bdSpace: number;
  bdStdFloorSpace: number | null;
  bdStructure: string;
  bdStructureDictText: string;
  bdType: string;
  bdTypeDictText: string;
  bdUnderGroundFloor: number | null;
  bdUnderGroundSpace: number | null;
  bdUseWay: string;
  bdUseWayDictText: string;
  busCode: string;
  city: number;
  cityDictText: string;
  county: number;
  countyDictText: string;
  createBy: null | string;
  createTime: string;
  id: string;
  projectCode: null;
  province: number;
  provinceDictText: string;
  remarks: null | string;
  status: string;
  statusDictText: string;
  updateBy: null | string;
  updateTime: null | string;
}
export interface QueryDeviceListResponse {
  addr: string;
  bdId: string;
  bdIdDictText: string;
  busCode: string;
  busCodeDictText: string;
  createBy: string;
  createTime: string;
  deviceCode: string;
  deviceCodeDictText: string;
  deviceModel: string;
  deviceModelDictText: string;
  deviceSn: string;
  effectiveDeadline: string;
  floorId: string;
  floorIdDictText: string;
  id: string;
  installer: string;
  installerPhone: string;
  iotStatus: string;
  lat: null;
  lng: null;
  otherId: string;
  proDeviceName: string;
  projectCode: string;
  projectCodeDictText: string;
  properties: null;
  proStatus: number;
  proStatusDictText: string;
  pushStatus: number;
  realStatus: number | null;
  runStatus: number;
  simcardBaseInfo: null;
  status: number;
  statusDictText: string;
  statusExplain: null;
  sysOrgCode: string;
  sysOrgCodeDictText: string;
  systemCode: string;
  systemCodeDictText: string;
  systemDisplayForm: number;
  updateBy: string;
  updateTime: string;
}
export interface GetFaultArchivesByBusCode {
  bulidingId: null | string;
  busCode: string;
  createBy: string;
  createTime: string;
  devCount: number;
  deviceModel: string;
  deviceName: string;
  deviceSn: string;
  deviceSrcSn: string;
  deviceType: number;
  deviceType_dictText: string;
  expireDate: string;
  firmId: string;
  firmName: string;
  floorId: null | string;
  groupId: string;
  groupName: string;
  id: string;
  installDate: string;
  installPosition: string;
  isDelete: number;
  itemsCode: null | string;
  itemsId: null | string;
  lendType: number | null;
  maintainDate: number;
  maintainDate_dictText: string;
  nextMaintainDate: string;
  nfcCode: null | string;
  prevMaintainDate: string;
  produceDate: string;
  qrcode: null;
  qualifiedFile: null;
  remarks: null | string;
  status: number;
  status_dictText: string;
  sysOrgCode: string;
  sysOrgCode_dictText: string;
  tipsType: number | null;
  type: number;
  updateBy: null | string;
  updateTime: null | string;
  validityDate: null | string;
  warrantyTime: number;
}
export interface GetMalfunctionPage {
  current: number;
  hitCount: boolean;
  optimizeCountSql: boolean;
  orders: string[];
  pages: number;
  records: GetMalfunctionPageResult[];
  searchCount: boolean;
  size: number;
  total: number;
}

export interface GetMalfunctionPageResult {
  busCode: string;
  createBy: string;
  createBy_dictText: string;
  createTime: string;
  facilitiesId: string;
  facilitiesName: string;
  faultDetail: string;
  faultLevel: number;
  faultPosition: string;
  faultType: number;
  fileList: GetMalfunctionPageFileList[];
  id: string;
  isComplete: number;
  itemId: string;
  itemName: string;
  itemsCode: null;
  itemsId: null;
  malfunctionLogList: null;
  solveMethod: null;
  sysOrgCode: string;
  sysOrgCode_dictText: string;
  taskName: string;
  taskplanId: string;
  time: null;
  updateBy: null;
  updateTime: null;
}
export interface GetMalfunctionPageFileList {
  createTime: number;
  fileType: number;
  id: string;
  imageDes: null;
  itemId: string;
  num: number;
  sid: string;
  stype: number;
  updateTime: null;
  url: string;
}
