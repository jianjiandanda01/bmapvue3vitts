import xwlRequest from "../service";

import { ElNotification } from "element-plus";
import {
  JldCloudBusBuildingResult,
  QueryDeviceListResponse,
  GetFaultArchivesByBusCode,
  GetMalfunctionPage,
} from "/@store/type/PenClass";
// 获取看板列表
export const jldVisualBoardAttributeList = () => {
  interface Result {
    current: number;
    hitCount: boolean;
    optimizeCountSql: boolean;
    orders: any[];
    pages: number;
    records: Record[];
    searchCount: boolean;
    size: number;
    total: number;
  }
  interface Record {
    boardType: string;
    busCode: string;
    createBy: string;
    createTime: string;
    designData: string;
    generateUrl: string;
    id: string;
    param: string;
    title: string;
    updateBy: string;
    updateTime: string;
  }
  return new Promise<Result>((resolve, reject) => {
    xwlRequest
      .get({
        url: "jld-cloud-data-visualization-biz/jldVisualBoardAttribute/list",
        params: {
          pageSize: 200,
        },
      })
      .then((result: any) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
// 新增看板
export const jldVisualBoardAttributeAdd = (form: any) => {
  // return new
  return new Promise<unknown>((resolve, reject) => {
    xwlRequest
      .post({
        url: "jld-cloud-data-visualization-biz/jldVisualBoardAttribute/add",
        data: form,
      })
      .then((result) => {
        ElNotification.success({
          title: "新建看板成功",
          message: "新建看板成功",
        });
        resolve(result);
      })
      .catch((err) => {
        ElNotification.error({
          title: "新建看板失败",
          message: "新建看板失败",
        });
        reject(err);
      });
  });
};
// 修改看板
export const jldVisualBoardAttributeEdit = (form: any) => {
  return new Promise<void>((resolve, reject) => {
    xwlRequest
      .put({
        url: "jld-cloud-data-visualization-biz/jldVisualBoardAttribute/edit",
        data: {
          ...form,
        },
      })
      .then(() => {
        ElNotification.success({
          title: "修改成功",
          message: form.title + "_看板属性修改成功",
        });
        resolve();
      })
      .catch((err) => {
        ElNotification.error({
          title: "修改失败",
          message: "看板属性修改失败",
        });
        reject(err);
      });
  });
};
// 删除看板
export const jldVisualBoardAttributeDelete = (item: any) => {
  return new Promise<void>((resolve, reject) => {
    xwlRequest
      .delete({
        url: "jld-cloud-data-visualization-biz/jldVisualBoardAttribute/delete",
        params: {
          id: item.id,
        },
      })
      .then(() => {
        ElNotification.success({
          title: "删除成功",
          message: "看板删除成功",
        });
        resolve();
      })
      .catch((err) => {
        ElNotification.error({
          title: "删除失败",
          message: "看板删除失败",
        });
        reject(err);
      });
  });
};
// 通过ID获取看板属性
export const jldVisualBoardAttributeQueryById = (id: any) => {
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
  return new Promise<ResordInfo>((resolve, reject) => {
    xwlRequest
      .get({
        url: "jld-cloud-data-visualization-biz/jldVisualBoardAttribute/queryById",
        params: {
          id: id,
        },
      })
      .then((result: any) => {
        resolve(result);
        // this.resordInfo = result;
      })
      .catch((err) => {
        reject(err);
        console.log("🚀 ~ file: IotSocket.vue:67 ~ getDevice ~ err:", err);
      });
  });
};
// 物联网设备信息-建筑物
export const jldCloudBusBuildingQueryList = () => {
  return new Promise<JldCloudBusBuildingResult[]>((resolve, reject) => {
    xwlRequest
      .get({
        url: "/jld-cloud-business-boot/building/jldCloudBusBuilding/queryList",
      })
      .then((result: any) => {
        resolve(result);
      })
      .catch((err) => {
        ElNotification.error({
          title: "请求失败",
          message: "设备查询失败",
        });
        reject(err);
      });
  });
};
// 物联网设备信息-列表查询
export const queryDeviceList = (id: any) => {
  return new Promise<QueryDeviceListResponse[]>((resolve, reject) => {
    xwlRequest
      .get({
        url: "/jld-cloud-business-boot/project/jldCloudIotProjDeviceInfo/queryDeviceList",
        params: {
          bdId: id,
        },
      })
      .then((result: any) => {
        resolve(result);
      })
      .catch((err) => {
        ElNotification.error({
          title: "请求失败",
          message: "设备查询失败",
        });
        reject(err);
      });
  });
};
// 消防设备查询
export const getFaultArchivesByBusCode = () => {
  return new Promise<GetFaultArchivesByBusCode[]>((resolve, reject) => {
    xwlRequest
      .get({
        url: "/jld-cloud-business-boot/jldOwnerDeviceArchives/getFaultArchivesByBusCode",
        params: {
          // bdId: id,
        },
      })
      .then((result: any) => {
        resolve(result);
      })
      .catch((err) => {
        ElNotification.error({
          title: "请求失败",
          message: "设备查询失败",
        });
        reject(err);
      });
  });
};
// 消防设施 查询
export const getMalfunctionPage = (pageInfo: any) => {
  console.log(
    "🚀 ~ file: index.ts:228 ~ getMalfunctionPage ~ pageInfo:",
    pageInfo
  );
  return new Promise<GetMalfunctionPage>((resolve, reject) => {
    xwlRequest
      .get({
        url: "/jld-cloud-business-boot/malfunction/getMalfunctionPage",
        params: {
          // busCode: this userInfo().busCode,
          // sysOrgCode: this.userInfo().orgCode,
          pageNo: pageInfo.index,
          pagesize: pageInfo.size,
          // pageNo: 1,
          // pagesize: 10,
        },
      })
      .then((result: any) => {
        resolve(result);
      })
      .catch((err) => {
        ElNotification.error({
          title: "请求失败",
          message: "设备查询失败",
        });
        reject(err);
      });
  });
};
