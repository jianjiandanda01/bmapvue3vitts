<!-- lookMapView -->
<template>
  <div class="lookMapView">
    <rightTopTool></rightTopTool>
    <leftLookView></leftLookView>
    <div id="container"></div>
  </div>
</template>

<script lang="ts" setup>
import rightTopTool from "./components/rightTopTool.vue";
import leftLookView from "./components/leftLookView.vue";
const lookMap = lookMapStore();
const mapInfo = lookMapInfo();
const route = useRoute();
import { userInfoStore } from "/@store/userInfoStore";
const userInfo = userInfoStore();
import {
  getFaultArchivesByBusCode,
  jldCloudBusBuildingQueryList,
} from "/@http/index";

onMounted(() => {
  lookMap.initMap();
  userInfo.getBulletinByID(route.query.bulletInID, "look");
  jldCloudBusBuildingQueryList()
    .then((result) => {
      userInfo.jldCloudBusBuilding = result;
      console.log("result :>> ", result);
    })
    .catch((err) => {});
  getFaultArchivesByBusCode()
    .then((result) => {
      userInfo.getFaultArchivesByBusCode = result;
      // console.log("result :>> ", result);
    })
    .catch((err) => {});
});
</script>
<style lang="less" scoped>
.home,
.lookMapView,
#container {
  width: 100%;
  height: 100%;
}
</style>
