<!-- topMenuView -->
<template>
  <div class="topMenuView">
    <!-- 打开文件需要的input -->
    <div id="uploadFileJson" v-show="false">
      <input id="inputFile" type="file" accept="application/json" />
    </div>
    <!-- 工作菜单 -->
    <el-menu mode="horizontal">
      <el-menu-item :index="'0_0'" @click="goHome">
        回到首页
        <icon-park type="home" theme="outline" />
      </el-menu-item>
      <template v-for="(menu, i1) in menuList" :key="i1">
        <!-- <el-menu-item index="1">Processing Center</el-menu-item> -->
        <el-sub-menu :index="i1 + ''">
          <template #title>{{ menu.title }}</template>
          <el-menu-item
            v-for="(cell, i2) in menu.list"
            :key="i1 + '_' + i2"
            :index="i1 + '_' + i2"
            @click="cell.func(userInfo)"
          >
            {{ cell.title }}
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
    <!-- 网络配置弹窗 -->
    <el-drawer v-model="userInfo.drawerShow">
      <template #header>
        <h4>配置数据</h4>
      </template>
      <template #default>
        <IotSocket></IotSocket>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button>关闭</el-button>
          <el-button type="primary">完成</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
// 本页面配置参数
const userInfo = reactive({
  drawerShow: false,
});
let menuList = ref([]);
import("./topMenuView")
  .then((result) => {
    menuList.value = result.default;
  })
  .catch((err) => {
    console.error(err);
  });
const activeIndex = 0;
const router = useRouter();
import type { Action } from "element-plus";
import { ElMessageBox } from "element-plus";

const goHome = () => {
  ElMessageBox.alert("是否保存?", "返回首页", {
    confirmButtonText: "保存",
    showCancelButton: true,
    cancelButtonText: "不保存",
    callback: (action: Action) => {
      if (action === "confirm") {
        menuList.value[0].list[0].func(() => {
          router.push({
            path: "/bulletinBoardList/bulletinBoard",
            query: {},
          });
        });
        // userMap.selectPen.nameId = "";
        // delete userMap.penMap[pen.dataInfo.type][pen.dataInfo.nameId];
        // mapInfo.myMap.removeOverlay(pen);
      } else {
        router.push({
          path: "/bulletinBoardList/bulletinBoard",
          query: {},
        });
      }
    },
  });
};
</script>
<style lang="less" scoped>
.topMenuView {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
</style>
