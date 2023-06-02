<template>
  <div class="setMapView">
    <setMapleftMeuVue></setMapleftMeuVue>
    <topMenuView></topMenuView>
    <rightMenuView></rightMenuView>
    <div id="container"></div>
  </div>
</template>

<script lang="ts" setup>
import setMapleftMeuVue from "./components/leftMeun/setMapLeftMenu.vue";
import topMenuView from "./components/topMenu/topMenuView.vue";
import rightMenuView from "./components/rightMenu/rightMenuView.vue";
const userMap = userMapStore();
const route = useRoute();
const userInfo = userInfoStore();
import { jldCloudBusBuildingQueryList } from "/@http/index";
onMounted(() => {
  userMap.initMap();
  userInfo.getBulletinByID(route.query.bulletInID);
  jldCloudBusBuildingQueryList()
    .then((result) => {
      userInfo.jldCloudBusBuilding = result;
      console.log("result :>> ", result);
    })
    .catch((err) => {});
});
</script>

<style lang="less" scoped>
.setMapView,
#container {
  width: 100%;
  height: 100%;
}
</style>
