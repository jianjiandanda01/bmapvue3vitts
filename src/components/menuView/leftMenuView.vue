<!-- leftMenuView -->
<template>
  <div class="leftMenuView">
    <!-- 
     <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="绘图" name="appPen">
        <el-form-item label="开启绘画模式">
          <el-switch v-model="store.openPen" @change="openPenChange" />
        </el-form-item>
        <el-form-item label="连续绘画模式" v-if="store.openPen">
          <el-switch v-model="store.continuousOff" />
        </el-form-item>
        <el-form :model="form" label-width="120px">
          <div>
            <el-collapse v-model="activeNames">
              <template v-if="store.openPen">
                <el-collapse-item title="选择画笔类型" name="1">
                  <div>
                    <el-radio-group
                      v-model="store.penType"
                      @change="penTypeChange"
                    >
                      <el-radio
                        v-for="(pen, i) in penTypeList"
                        :key="i"
                        :label="pen.label"
                        size="large"
                      >
                        绘制{{ pen.name }}
                      </el-radio>
                    </el-radio-group>
                  </div>
                </el-collapse-item>
                <el-collapse-item
                  title="图标-消防类型"
                  name="2"
                  v-if="store.penType === 'iconImage'"
                >
                  <div>
                    <el-row :gutter="10" style="">
                      <el-col :span="6" v-for="(icon, i) in iconList" :key="i">
                        <el-tooltip effect="dark" :content="icon.name">
                          <div
                            class="iconCell"
                            :class="i === store.iconType.key ? 'select' : ''"
                            @click="selectIcon(icon, i)"
                          >
                            <el-image
                              style="width: 100%; height: 100%"
                              :src="icon.blueFile"
                              fit="fill"
                            />
                          </div>
                        </el-tooltip>
                      </el-col>
                    </el-row>
                  </div>
                </el-collapse-item>
                <el-input
                  v-model="store.iconType.iconContent"
                  v-if="store.penType === 'iconText'"
                  placeholder="请输入标注内容"
                />
              </template>
            </el-collapse>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="元素列表" name="penList">
        <el-tabs v-model="activeName2">
          <el-tab-pane
            :label="pen.name"
            :name="pen.name"
            :key="i"
            v-for="(pen, i) in penTypeList"
          >
            <penList :cellType="pen.label" v-if="pen.label !== 'iconText'">
            </penList>
            <iconTextList v-else></iconTextList>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
    -->
  </div>
</template>

<script setup lang="ts">
/**
 * import { reactive, ref } from "vue";

import { userBaiDuMap } from "../../store/store";
const store = userBaiDuMap();
import { iconList } from "./rightIconList";
import type { TabsPaneContext } from "element-plus";
// import { storeToRefs } from "pinia";
// import { saveAs } from "file-saver";
// import { ref } from "vue";
const form = reactive({});
const activeNames = ref("");
const activeName2 = ref("图标");
// declare const BMap: any;
// const penType = ref("");
const penTypeList = reactive([
  {
    name: "图标",
    label: "iconImage",
  },
  {
    name: "区域",
    label: "region",
  },
  {
    name: "标签",
    label: "iconText",
  },
]);
const openPenChange = () => {
  if (store.openPen) {
    store.drawingManager.open();
  } else {
    store.drawingManager.close();
  }
};
const penTypeChange = () => {
  if (store.penType === "iconImage") {
    const bor = store.drawingManager.setDrawingMode(BMAP_DRAWING_MARKER);
  }
  if (store.penType === "region") {
    const bor = store.drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);
  }
  if (store.penType === "iconText") {
    const bor = store.drawingManager.setDrawingMode(BMAP_DRAWING_MARKER);
  }
  // if (store.continuousOff) {
  store.drawingManager.open();
  // }
};

// icon图标的点击事件
const activeName = ref("appPen");
const selectIcon = (cell, i) => {
  // if (store.isLook) {
  //   for (const key in store.penList) {
  //     if (Object.prototype.hasOwnProperty.call(store.penList, key)) {
  //       const pen = store.penList[key];
  //       if (pen.drawingMode === "marker") {
  //         if (pen.getIcon().key === i) {
  //           pen.show();
  //         } else {
  //           pen.hide();
  //         }
  //       }
  //     }
  //   }
  store.iconType.key = i;
  // } else {
  //   store.setIconImage(i);
  // }
};
// 切换tabs页面
const handleClick = (tab: TabsPaneContext) => {
  if (tab.paneName === "penList") {
    store.openPen = false;
    openPenChange();
  }
  console.log("tab.name :>> ", tab.paneName);
};
 */
</script>
<style lang="less" scoped>
.leftMenuView {
  position: fixed;
  top: 60px;
  left: 0;
  height: calc(100vh - 60px);
  z-index: 1000;
  width: 200px;
  padding-left: 20px;
  padding-right: 10px;
  background-color: white;
}
.iconCell {
  background-color: #fff;
  width: 40px;
  height: 40px;
  padding: 10px 0px;
  cursor: pointer;
  // box-shadow: 0px 0px 3px #111;
  border-radius: 10px;
  margin-bottom: 3px;
}
.select {
  background-color: #409eff;
  border-color: #409eff;
  box-shadow: 0px 0px 3px #409eff;
}
</style>
