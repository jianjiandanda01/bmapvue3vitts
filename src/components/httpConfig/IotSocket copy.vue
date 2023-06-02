<template></template>

<script lang="ts">
/**
 * import { getAction, putAction } from "@/api/manage";
import store from "@/store/";
import cloneDeep from "lodash/cloneDeep";
import { mapActions, mapState } from "vuex";
import Vue from "vue";
import { ACCESS_TOKEN } from "@/store/mutation-types";
export default {
  name: "HeaderNotice",
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
  computed: {},
  mounted() {
    this.getDevice();
    this.heartCheckFun();
  },
  destroyed: function () {
    // 离开页面生命周期函数
    this.wsetOnclose();
  },
  methods: {
    ...mapActions([
      "ChangeRealTimeNewsData",
      "ChangeAlarmMessageData",
      "ChangeDeviceStatusData",
    ]),
    reconnectIot() {
      this.clearTimer();
      this.timerSocket = setTimeout(() => {
        console.log("尝试重连...");
        this.getDevice();
        this.clearTimer();
      }, this.timerNum);
    },
    clearTimer() {
      console.log("qingchu");
      //清除定时器
      clearTimeout(this.timerSocket);
      this.timerSocket = null;
    },
    async getDevice() {
      this.ws = null;
      this.deviceList = [];
      let res = await getAction(
        this.$global.boot + "/project/jldCloudIotProjectBase/queryDeviceList"
      );
      let queryList = cloneDeep(res.result);
      for (var i in queryList) {
        for (var j in queryList[i].jldCloudIotProjDeviceInfos) {
          this.deviceList.push(queryList[i].jldCloudIotProjDeviceInfos[j]);
        }
      }
      await this.alarmDevice();
      this.getIotToken();
    },
    async alarmDevice() {
      this.alarmList = [];
      let res = await getAction(
        this.$global.boot +
          "/project/jldCloudIotProjectBase/subscriptDeviceList"
      );
      let queryList = cloneDeep(res.result);
      for (var i in queryList) {
        for (var j in queryList[i].jldCloudIotProjDeviceInfos) {
          this.alarmList.push(queryList[i].jldCloudIotProjDeviceInfos[j]);
        }
      }
    },
    // 获取iot的token
    async getIotToken() {
      let res = await getAction(
        this.$global.boot + "/jldIot/jetLinksDevice/getIotToken"
      );
      let iotToken = "";
      if (res.success) {
        iotToken = cloneDeep(JSON.parse(res.message).result);
      }
      this.getWebSocket(iotToken);
    },
    wsetOnmessage: function (e) {
      if (JSON.parse(e.data).type == "authError") {
        this.$message.error(JSON.parse(e.data).message);
        // this.getDevice()
      } else {
        if (JSON.parse(e.data).requestId.indexOf("realTimeNews") != -1) {
          this.ChangeRealTimeNewsData(JSON.parse(e.data).payload);
        } else if (JSON.parse(e.data).requestId.indexOf("alarmMessage") != -1) {
          this.ChangeAlarmMessageData(JSON.parse(e.data).payload);
        } else if (
          JSON.parse(e.data).requestId.indexOf("deviceStatus") != -1 &&
          JSON.parse(e.data).type == "result"
        ) {
          this.ChangeDeviceStatusData(JSON.parse(e.data).payload);
        } else if (JSON.parse(e.data).type == "pong") {
          this.heartCheck.reset().start();
        }
      }
      //心跳检测重置
      //this.heartCheck.reset().start();
    },
    wsetOnopen() {
      console.log("WebSocketIot连接成功");
      // console.log(this.alarmList)
      this.heartCheck.reset().start();
      let deviceCodeIds = [];
      for (var i in this.deviceList) {
        this.realTimeNews.topic =
          "/device/*/ " + this.deviceList[i].deviceCode + ";
/**";
        this.realTimeNews.id = "realTimeNews" + this.deviceList[i].deviceCode;
        // this.alarmMessage.topic =
        //   '/rule-engine/device/alarm/*/ " + this.deviceList[i].deviceCode + ";
/*'
        // this.alarmMessage.id = 'alarmMessage' + this.deviceList[i].deviceCode
        this.ws.send(JSON.stringify(this.realTimeNews));
        // this.ws.send(JSON.stringify(this.alarmMessage))
        deviceCodeIds.push(this.deviceList[i].deviceCode);
      }
      for (var i in this.alarmList) {
        this.alarmMessage.topic =
          "/rule-engine/device/alarm/*/ " + this.alarmList[i].deviceCode + "; /*";
        this.alarmMessage.id = "alarmMessage" + this.alarmList[i].deviceCode;
        this.ws.send(JSON.stringify(this.alarmMessage));
      }
      for (var i = 0, len = deviceCodeIds.length; i < len; i += 5) {
        this.deviceStatus.parameter.query = {
          where:
            "id in " + deviceCodeIds.slice(i, Math.min(i + 5, len)).toString(), //eq 相等
        };
        this.deviceStatus.id = "deviceStatus" + i;
        this.ws.send(JSON.stringify(this.deviceStatus));
      }
      // 10000毫秒发一次
      this.timer = setInterval(() => {
        // 某些定时器操作
        for (var i = 0, len = deviceCodeIds.length; i < len; i += 5) {
          this.deviceStatus.parameter.query = {
            where:
              "id in " +
              deviceCodeIds.slice(i, Math.min(i + 5, len)).toString(), //eq 相等
          };
          this.deviceStatus.id = "deviceStatus" + i;
          this.ws.send(JSON.stringify(this.deviceStatus));
        }
      }, 10000);
    },
    wsetOnclose() {
      this.reconnectIot();
    },
    heartCheckFun() {
      var that = this;
      //心跳检测,每60s心跳一次
      that.heartCheck = {
        timeout: 60000,
        timeoutObj: null,
        serverTimeoutObj: null,
        reset: function () {
          clearTimeout(this.timeoutObj);
          clearTimeout(this.serverTimeoutObj);
          return this;
        },
        start: function () {
          var self = this;
          this.timeoutObj = setTimeout(function () {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            that.pingMessage.id = Math.random().toString(36).substr(-10);
            that.ws.send(JSON.stringify(that.pingMessage));
            console.info("客户端发送心跳");
            self.serverTimeoutObj = setTimeout(function () {
              //如果超过一定时间还没重置，说明后端主动断开了
              that.wsetOnclose(); //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            }, self.timeout);
          }, this.timeout);
        },
      };
    },
    getWebSocket(iotToken) {
      let url = window._CONFIG["WS"] + iotToken;
      // console.log(url)
      this.ws = new WebSocket(url);
      this.ws.onopen = this.wsetOnopen;
      this.ws.onerror = this.wsetOnerror;
      this.ws.onmessage = this.wsetOnmessage;
      this.ws.onclose = this.wsetOnclose;
    },
    wsetOnerror() {
      console.log("WebSocketIot连接发生错误");
      this.reconnectIot();
    },
  },
};
 */
</script>

<style lang="css"></style>
