import { defineStore } from "pinia";
import {
  jldVisualBoardAttributeList,
  jldVisualBoardAttributeQueryById,
} from "../http/index";
// import { userBaiDuMap } from "./store";
// const store = userBaiDuMap();
const mapInfo = lookMapInfo();
const userMap = userMapStore();
import {
  JldCloudBusBuildingResult,
  GetFaultArchivesByBusCode,
  QueryDeviceListResponse,
  GetMalfunctionPage,
} from "/@store/type/PenClass";

// 看板类定义
interface ResordInfo {
  boardType: string;
  busCode: string;
  createBy: string;
  createTime: string;
  designData: string;
  generateUrl: string;
  id: string;
  param: string;
  title: string;
  updateBy: null;
  updateTime: null;
}
export const userInfoStore = defineStore("userInfoStore", {
  state: () => ({
    deviceList: [],
    alarmList: [],
    recordsList: [] as any, // 看板List
    resordInfo: {} as ResordInfo, // 看板详情
    jldCloudBusBuilding: [] as JldCloudBusBuildingResult[],
    queryDeviceListResponse: [] as QueryDeviceListResponse[],
    getFaultArchivesByBusCode: [] as GetFaultArchivesByBusCode[],
    getMalfunctionPage: {} as GetMalfunctionPage,
  }),
  actions: {
    // 获取看板列表
    getBulletinList() {
      jldVisualBoardAttributeList()
        .then((result) => {
          this.recordsList = result.records;
        })
        .catch((err) => {
          console.log("🚀 ~ file: IotSocket.vue:67 ~ getDevice ~ err:", err);
        });
    },
    // 通过ID获取看板属性
    getBulletinByID(id, type: "set" | "look" = "set") {
      jldVisualBoardAttributeQueryById(id)
        .then((result: ResordInfo) => {
          this.resordInfo = result;
          if (type === "set") {
            userMap.setPenList(result.designData);
          }
          if (type === "look") {
            mapInfo.setPenList(result.designData);
          }
        })
        .catch((err) => {
          console.log("🚀 ~ file: IotSocket.vue:67 ~ getDevice ~ err:", err);
        });
    },
  },
});
