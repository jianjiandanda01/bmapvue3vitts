<!--  -->
<template>
  <div class="IotSocket">IotSocket</div>
</template>

<script lang="ts">
// import { getAction, putAction } from "../../api/manage.js";
// import global from "../../config/global.js";
// import { cloneDeep } from "lodash";
// import axios from "axios";

// window._CONFIG["domianURL"] = "http://82.157.129.234:19999"; //开发
// window._CONFIG["WS"] = "ws://49.232.71.237:8849/messaging/"; //WebScoket=>开发
// window._CONFIG["staticDomainURL"] =
//   window._CONFIG["domianURL"] + "/jld-cloud-system-biz/img";

// let apiBaseUrl = window._CONFIG["domianURL"] || "/jeecg-boot";

// const global = {
//   boot: "/jld-cloud-business-boot",
//   system: "/jld-cloud-system-biz",
//   real: "/jld-cloud-real-time-data",
//   start: "/start-boot", //甘肃上传模块
// };
/**
 * X-Access-Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJidXNDb2RlIjoiMDkzMTEwMDAxMjciLCJleHAiOjE2ODQzOTgwNjIsInVzZXJuYW1lIjoidGlhbnFpbmdqaWF5dWFuIn0.RIfiKj450UHdWuzJVWOflBizpbGc3KioGAOPnAvhZqE
 */
export default {
  components: {},
  data() {
    return {
      ws: null,
      timer: null,
      timeObj: null,
      deviceList: [],
      alarmList: [],
      // device
      realTimeNews: {
        type: "sub", //固定为sub
        topic: "", // topic,见topic列表.
        parameter: {},
        id: "", //请求ID, 请求的标识,服务端在推送消息时,会将此标识一并返回.
      }, //推送历史消息
      alarmMessage: {
        type: "sub", //固定为sub
        topic: "",
        parameter: {},
        id: "", //请求ID, 请求的标识,服务端在推送消息时,会将此标识一并返回.
      }, //推送报警信息
      deviceStatus: {
        type: "sub", //固定为sub
        topic: "/device-batch/state-sync",
        parameter: {},
        id: "", //请求ID, 请求的标识,服务端在推送消息时,会将此标识一并返回.
      }, //推送状态信息
      pingMessage: {
        id: "",
        type: "ping",
      },
      heartCheck: null,
      timerSocket: null, //首先我在data函数里面进行定义定时器名称：
      timerNum: 10000, // 设置定时器时间
    };
  },
  created() {},
  mounted() {
    // this.getDevice();
    // this.heartCheckFun();
  },
  methods: {
    // getDevice() {
    //   this.ws = null;
    //   this.deviceList = [];
    //   console.log("发起请求");
    //   axios({
    //     url:
    //       import.meta.env.GLOBAL_BOOT +
    //       "/project/jldCloudIotProjectBase/queryDeviceList",
    //     method: "get",
    //     baseURL: import.meta.env.BASE_URL, // api base_url
    //     timeout: 30000, // 请求超时时间
    //     headers: {
    //       "X-Access-Token":
    //         "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJidXNDb2RlIjoiMDkzMTEwMDAxMjciLCJleHAiOjE2ODQzOTgwNjIsInVzZXJuYW1lIjoidGlhbnFpbmdqaWF5dWFuIn0.RIfiKj450UHdWuzJVWOflBizpbGc3KioGAOPnAvhZqE",
    //     },
    //   })
    //     .then((result) => {
    //       let queryList = cloneDeep(result.data.result);
    //       for (var i in queryList) {
    //         for (var j in queryList[i].jldCloudIotProjDeviceInfos) {
    //           this.deviceList.push(queryList[i].jldCloudIotProjDeviceInfos[j]);
    //         }
    //       }
    //     })
    //     .catch((err) => {
    //       console.log("🚀 ~ file: IotSocket.vue:67 ~ getDevice ~ err:", err);
    //     });
    //   this.alarmDevice();
    // },
    // heartCheckFun() {
    //   var that = this;
    //   //心跳检测,每60s心跳一次
    //   that.heartCheck = {
    //     timeout: 60000,
    //     timeoutObj: null,
    //     serverTimeoutObj: null,
    //     reset: function () {
    //       clearTimeout(this.timeoutObj);
    //       clearTimeout(this.serverTimeoutObj);
    //       return this;
    //     },
    //     start: function () {
    //       var self = this;
    //       this.timeoutObj = setTimeout(function () {
    //         //这里发送一个心跳，后端收到后，返回一个心跳消息，
    //         //onmessage拿到返回的心跳就说明连接正常
    //         that.pingMessage.id = Math.random().toString(36).substr(-10);
    //         that.ws.send(JSON.stringify(that.pingMessage));
    //         console.info("客户端发送心跳");
    //         self.serverTimeoutObj = setTimeout(function () {
    //           //如果超过一定时间还没重置，说明后端主动断开了
    //           that.wsetOnclose(); //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
    //         }, self.timeout);
    //       }, this.timeout);
    //     },
    //   };
    // },
    // // 获取iot的token
    // async getIotToken() {
    //   axios({
    //     url: import.meta.env.GLOBAL_BOOT + "/jldIot/jetLinksDevice/getIotToken",
    //     method: "get",
    //     baseURL: import.meta.env.BASE_URL, // api base_url
    //     timeout: 30000, // 请求超时时间
    //     headers: {
    //       "X-Access-Token":
    //         "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJidXNDb2RlIjoiMDkzMTEwMDAxMjciLCJleHAiOjE2ODQzOTgwNjIsInVzZXJuYW1lIjoidGlhbnFpbmdqaWF5dWFuIn0.RIfiKj450UHdWuzJVWOflBizpbGc3KioGAOPnAvhZqE",
    //     },
    //   })
    //     .then((result) => {
    //       let iotToken = "";
    //       if (result.data.success) {
    //         iotToken = cloneDeep(JSON.parse(result.data.message).result);
    //       }
    //       this.getWebSocket(iotToken);
    //     })
    //     .catch((err) => {
    //       console.log("🚀 ~ file: IotSocket.vue:120 ~ getIotToken ~ err:", err);
    //     });
    // },
    // alarmDevice() {
    //   this.alarmList = [];
    //   axios({
    //     url:
    //       import.meta.env.GLOBAL_BOOT +
    //       "/project/jldCloudIotProjectBase/subscriptDeviceList",
    //     method: "get",
    //     baseURL: import.meta.env.BASE_URL, // api base_url
    //     timeout: 30000, // 请求超时时间
    //     headers: {
    //       "X-Access-Token":
    //         "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJidXNDb2RlIjoiMDkzMTEwMDAxMjciLCJleHAiOjE2ODQzOTgwNjIsInVzZXJuYW1lIjoidGlhbnFpbmdqaWF5dWFuIn0.RIfiKj450UHdWuzJVWOflBizpbGc3KioGAOPnAvhZqE",
    //     },
    //   })
    //     .then((result) => {
    //       let queryList = cloneDeep(result.data.result);
    //       for (var i in queryList) {
    //         for (var j in queryList[i].jldCloudIotProjDeviceInfos) {
    //           this.alarmList.push(queryList[i].jldCloudIotProjDeviceInfos[j]);
    //         }
    //       }
    //       this.getIotToken();
    //     })
    //     .catch((err) => {
    //       console.log("🚀 ~ file: IotSocket.vue:120 ~ alarmDevice ~ err:", err);
    //     });
    // },
    // getWebSocket(iotToken) {
    //   let url = "ws://49.232.71.237:8849/messaging/" + iotToken;
    //   // console.log(url)
    //   this.ws = new WebSocket(url);
    //   this.ws.onopen = this.wsetOnopen;
    //   this.ws.onerror = this.wsetOnerror;
    //   this.ws.onmessage = this.wsetOnmessage;
    //   this.ws.onclose = this.wsetOnclose;
    // },
    // wsetOnopen() {
    //   // console.log("WebSocketIot连接成功");
    //   this.heartCheck.reset().start();
    //   let deviceCodeIds = [];
    //   // console.log("this.deviceList :>> ", this.deviceList);
    //   // console.log("this.deviceList.length :>> ", this.deviceList.length);
    //   // this.deviceList.forEach((element) => {
    //   // console.log("element :>> ", element);
    //   // });
    //   for (var i in this.deviceList) {
    //     console.log(
    //       "this.deviceList[i].deviceCode :>> ",
    //       this.deviceList[i].deviceCode
    //     );
    //     this.realTimeNews.topic =
    //       "/device/*/" + this.deviceList[i].deviceCode + "/**";
    //     this.realTimeNews.id = "realTimeNews" + this.deviceList[i].deviceCode;
    //     this.ws.send(JSON.stringify(this.realTimeNews));
    //     deviceCodeIds.push(this.deviceList[i].deviceCode);
    //   }
    //   for (var i in this.alarmList) {
    //     this.alarmMessage.topic =
    //       "/rule-engine/device/alarm/*/" + this.alarmList[i].deviceCode + "/*";
    //     this.alarmMessage.id = "alarmMessage" + this.alarmList[i].deviceCode;
    //     this.ws.send(JSON.stringify(this.alarmMessage));
    //   }
    //   console.log("deviceCodeIds :>> ", deviceCodeIds);
    //   for (var i = 0, len = deviceCodeIds.length; i < len; i += 5) {
    //     this.deviceStatus.parameter.query = {
    //       where:
    //         "id in " + deviceCodeIds.slice(i, Math.min(i + 5, len)).toString(), //eq 相等
    //     };
    //     this.deviceStatus.id = "deviceStatus" + i;
    //     // console.log("this.deviceStatus :>> ", this.deviceStatus);
    //     this.ws.send(JSON.stringify(this.deviceStatus));
    //   }
    //   // 10000毫秒发一次
    //   this.timer = setInterval(() => {
    //     // 某些定时器操作
    //     for (var i = 0, len = deviceCodeIds.length; i < len; i += 5) {
    //       // console.log("deviceCodeIds :>> ", deviceCodeIds);
    //       this.deviceStatus.parameter.query = {
    //         where:
    //           "id in " +
    //           deviceCodeIds.slice(i, Math.min(i + 5, len)).toString(), //eq 相等
    //       };
    //       this.deviceStatus.id = "deviceStatus" + i;
    //       this.ws.send(JSON.stringify(this.deviceStatus));
    //     }
    //   }, 10000);
    // },
    // wsetOnerror() {
    //   console.log("WebSocketIot连接发生错误");
    //   this.reconnectIot();
    // },
    // wsetOnmessage: function (e) {
    //   // console.log("🚀 ~ file: IotSocket.vue:230 ~ e:", e);
    //   if (JSON.parse(e.data).type == "authError") {
    //     this.$message.error(JSON.parse(e.data).message);
    //   } else {
    //     console.log(
    //       "JSON.parse(e.data).payload :>> ",
    //       JSON.parse(e.data).payload
    //     );
    //     if (JSON.parse(e.data).requestId.indexOf("realTimeNews") != -1) {
    //       // this.ChangeRealTimeNewsData(JSON.parse(e.data).payload);
    //     } else if (JSON.parse(e.data).requestId.indexOf("alarmMessage") != -1) {
    //       // this.ChangeAlarmMessageData(JSON.parse(e.data).payload);
    //     } else if (
    //       JSON.parse(e.data).requestId.indexOf("deviceStatus") != -1 &&
    //       JSON.parse(e.data).type == "result"
    //     ) {
    //       // this.ChangeDeviceStatusData(JSON.parse(e.data).payload);
    //     } else if (JSON.parse(e.data).type == "pong") {
    //       this.heartCheck.reset().start();
    //     }
    //   }
    //   //心跳检测重置
    //   //this.heartCheck.reset().start();
    // },
    // wsetOnclose() {
    //   this.reconnectIot();
    // },
    // reconnectIot() {
    //   this.clearTimer();
    //   this.timerSocket = setTimeout(() => {
    //     console.log("尝试重连...");
    //     this.getDevice();
    //     this.clearTimer();
    //   }, this.timerNum);
    // },
    // clearTimer() {
    //   console.log("qingchu");
    //   //清除定时器
    //   clearTimeout(this.timerSocket);
    //   this.timerSocket = null;
    // },
  },
};
</script>
<style lang="" scoped></style>
