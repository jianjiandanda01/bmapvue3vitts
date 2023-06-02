<!-- setMapLeftMenu -->
<template>
  <div class="setMapLeftMenu">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="编辑" name="1">
        <div class="menuList">
          <el-row>
            <!-- 拖动 -->
            <el-col :span="12" class="menu">
              <el-tooltip effect="dark" content="拖动" placement="bottom">
                <el-button
                  text
                  @click="dragClick"
                  :type="userMap.mapInfo.drag ? 'primary' : ''"
                >
                  <icon-park type="full-screen-one" theme="outline" />
                </el-button>
              </el-tooltip>
            </el-col>
            <!-- 选择 -->
            <el-col :span="12" class="menu">
              <el-tooltip effect="dark" content="选择" placement="bottom">
                <el-button
                  text
                  @click="clickSelectClick"
                  :type="userMap.mapInfo.clickSelect ? 'primary' : ''"
                >
                  <icon-park type="point-out" theme="outline" />
                </el-button>
              </el-tooltip>
            </el-col>
          </el-row>
          <el-collapse v-model="activeNames">
            <el-collapse-item title="区域" name="1">
              <el-row>
                <!-- 绘制多边形 -->
                <el-col :span="8" class="menu">
                  <el-tooltip effect="dark" content="多边形" placement="bottom">
                    <el-button
                      text
                      @click="PolygonClick"
                      :type="
                        userMap.mapInfo.penType === 'Polygon' ? 'primary' : ''
                      "
                    >
                      <icon-park type="hexagon-one" theme="outline" />
                    </el-button>
                  </el-tooltip>
                </el-col>
                <!-- 绘制矩形 -->
                <el-col :span="8" class="menu">
                  <el-tooltip effect="dark" content="矩形" placement="bottom">
                    <el-button
                      text
                      @click="RectangleClick"
                      :type="
                        userMap.mapInfo.penType === 'Rectangle' ? 'primary' : ''
                      "
                    >
                      <icon-park type="square" theme="outline" />
                    </el-button>
                  </el-tooltip>
                </el-col>
                <!-- 绘制圆 -->
                <el-col :span="8" class="menu">
                  <el-tooltip effect="dark" content="圆形" placement="bottom">
                    <el-button
                      text
                      @click="CircleClick"
                      :type="
                        userMap.mapInfo.penType === 'Circle' ? 'primary' : ''
                      "
                    >
                      <icon-park type="round" theme="outline" />
                    </el-button>
                  </el-tooltip>
                </el-col>
              </el-row>
            </el-collapse-item>
            <!-- 绘制图标 -->
            <el-collapse-item
              v-for="(item, key) in markerIconList"
              :key="key"
              :title="item.title"
              name="3"
            >
              <template #title>
                <icon-park
                  type="local-two"
                  theme="outline"
                  style="margin-right: 10px"
                />
                {{ item.title }}
              </template>
              <el-col :span="24" class="menu">
                <div>
                  <el-row class="row-bg" :gutter="0">
                    <el-col
                      :span="8"
                      v-for="(img, imgKey) in item.iconList"
                      :key="img.imageUrl"
                      class="imgCellList"
                      style="padding: 10px 0"
                    >
                      <el-tooltip
                        effect="dark"
                        :content="img.label"
                        placement="bottom"
                      >
                        <el-button
                          text
                          @click="imgCellClick(img, imgKey)"
                          :type="
                            userMap.mapInfo.iconImgId.indexOf(
                              String(imgKey)
                            ) !== -1
                              ? 'primary'
                              : ''
                          "
                        >
                          <i class="iconfont" :class="img.icon"></i>
                        </el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-collapse-item>
            <!-- 绘制标签 -->
            <el-col :span="24" class="menu">
              <el-collapse-item title="标签" name="2">
                <template #title>
                  <icon-park
                    type="tag-one"
                    theme="outline"
                    style="margin-right: 10px"
                  />
                  标签
                </template>
                <el-input
                  v-model="userMap.mapInfo.labelInput"
                  @input="labelInput"
                  placeholder="请输入绘制标签内容"
                  clearable
                />
                <el-button
                  text
                  class="labelText"
                  v-for="(label, index) in labelText"
                  :key="index"
                  @click="setLabelText(label)"
                >
                  {{ label }}
                </el-button>
              </el-collapse-item>
            </el-col>
          </el-collapse>
        </div>
      </el-tab-pane>
      <el-tab-pane label="图层" name="2">
        <!-- rightMenuView -->
        <div class="rightMenuView">
          <div class="inputText" style="padding-bottom: 20px">
            <el-input
              v-model="penInputText"
              placeholder="请输入名称"
              class="input-with-select"
            >
              <template #prepend>
                <el-select
                  v-model="penInputSelect"
                  placeholder="类型"
                  style="width: 80px"
                >
                  <el-option label="全部" value="" />
                  <el-option
                    v-for="(penType, typeI) in userMap.penTypeMap"
                    :key="typeI"
                    :label="penType.label"
                    :value="penType.key"
                  >
                    <div>
                      <icon-park
                        :type="penType.icon"
                        theme="outline"
                        style="margin-right: 10px"
                      />
                      {{ penType.label }}
                    </div>
                  </el-option>
                </el-select>
              </template>
            </el-input>
          </div>
          <div class="penMap">
            <el-collapse v-model="penMapActiveName">
              <template v-for="(pen, i) in penList">
                <div
                  class="penCell"
                  @click.stop="selectPen(pen)"
                  :class="
                    userMap.selectPen.nameId === pen.dataInfo.nameId
                      ? 'select'
                      : ''
                  "
                  style="position: relative"
                >
                  <div>
                    <template v-for="(penType, typeI) in userMap.penTypeMap">
                      <!-- <el-button
                      size="small"
                      text
                      v-if="penType.key === pen.dataInfo.type"
                    > -->
                      <icon-park
                        v-if="penType.key === pen.dataInfo.type"
                        :type="penType.icon"
                        theme="outline"
                      />
                      <!-- </el-button> -->
                    </template>
                    <span style="width: 72px; display: inline-block">{{
                      pen.dataInfo.title
                    }}</span>
                  </div>
                  <el-button-group
                    style="
                      position: absolute;
                      top: 0;
                      bottom: 0;
                      right: 0;
                      margin: auto 0;
                      padding: 0;
                      height: 23px;
                    "
                  >
                    <el-button
                      size="small"
                      text
                      :type="pen.dataInfo.show ? 'primary' : ''"
                      @click="setChange('show', pen)"
                    >
                      <icon-park type="preview-open" theme="outline" />
                    </el-button>
                    <el-button
                      size="small"
                      text
                      :type="pen.dataInfo.lock ? 'primary' : ''"
                      @click="setChange('lock', pen)"
                    >
                      <icon-park type="unlock" theme="outline" />
                    </el-button>
                    <el-button
                      size="small"
                      text
                      type="danger"
                      @click="setChange('delete', pen)"
                    >
                      <icon-park type="delete" theme="outline" />
                    </el-button>
                  </el-button-group>
                </div>
              </template>
            </el-collapse>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
const userMap = userMapStore();
const mapInfo = userMapInfo();
import { IconPark } from "@icon-park/vue-next/es/all";
import {
  menuList,
  dragClick,
  clickSelectClick,
  PolygonClick,
  CircleClick,
  RectangleClick,
} from "./setMapLeftMenu";
import { markerIconList, labelText } from "/@assets/markerIconList";
let activeName = ref("1");
// 选择绘制图标
let activeNames = ref(["1", "2", "3"]);
const imgCellClick = (img, imgKey) => {
  userMap.mapInfo.iconImgId = imgKey;
  userMap.startPainting("Marker", true);
};
// 绘制标签
const setLabelText = (label) => {
  userMap.mapInfo.labelInput = label;
  userMap.startPainting("Label", true);
};
// 图层--------------------------
import { PenType, PenDataInfo, Pen, PenMap } from "/@store/type/PenClass";
import { isEmpty } from "lodash";
import { ElMessageBox } from "element-plus";

let penInputText = ref("");
let penInputSelect = ref("");
let penMapActiveName = ref("");

const penList = computed<Pen[]>({
  // getter
  get() {
    // return userMap.penMap[penInputSelect.value];

    const mapArr = [];
    if (penInputSelect.value === "") {
      for (const key in userMap.penMap) {
        if (Object.prototype.hasOwnProperty.call(userMap.penMap, key)) {
          const penMapList = userMap.penMap[key];
          if (!isEmpty(penMapList)) {
            for (const PenKey in penMapList) {
              if (Object.prototype.hasOwnProperty.call(penMapList, PenKey)) {
                const penList2 = penMapList[PenKey];
                mapArr.push(penList2);
              }
            }
          }
        }
      }
    } else {
      //   return mapArr;
      for (const key in userMap.penMap[penInputSelect.value]) {
        if (
          Object.prototype.hasOwnProperty.call(
            userMap.penMap[penInputSelect.value],
            key
          )
        ) {
          const element = userMap.penMap[penInputSelect.value][key];
          console.log(`${element.dataInfo.title}(${element.dataInfo.nameId})`);
          console.log(penInputText.value);

          console.log(
            `${element.title}(${element.nameId})`.indexOf(penInputText.value)
          );

          if (penInputText.value === "") {
            mapArr.push(element);
          } else if (
            `${element.dataInfo.title}(${element.dataInfo.nameId})`.indexOf(
              penInputText.value
            ) !== -1
          ) {
            mapArr.push(element);
          }
        }
      }
    }
    return mapArr;
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    // [firstName.value, lastName.value] = newValue.split(' ')
  },
});
import type { Action } from "element-plus";
// 修改表单内容
const setChange = (type, pen) => {
  if (type === "delete") {
    ElMessageBox.alert("是否删除?", "删除元素", {
      confirmButtonText: "删除",
      callback: (action: Action) => {
        if (action === "confirm") {
          userMap.selectPen.nameId = "";
          delete userMap.penMap[pen.dataInfo.type][pen.dataInfo.nameId];
          mapInfo.myMap.removeOverlay(pen);
        }
      },
    });
  }
  if (type === "show") {
    pen.dataInfo[type] = !pen.dataInfo[type];
    if (pen.dataInfo[type]) {
      pen.show();
    } else {
      pen.hide();
    }
  }
  if (type === "lock") {
    pen.dataInfo[type] = !pen.dataInfo[type];
    if (pen.dataInfo[type]) {
      pen.disableDragging && pen.disableDragging();
      pen.disableEditing && pen.disableEditing();
      userMap.setLabelNameId(pen);
    } else {
      pen.enableDragging && pen.enableDragging();
      pen.enableEditing && pen.enableEditing();
    }
  }
  if (type === "labelNameId") {
    userMap.setLabelNameId(pen);
  }
};
// 选择标签
const selectPen = (pen) => {
  console.log("pen.dataInfo.nameId :>> ", pen);
  userMap.selectPen.pen = pen;
  userMap.selectPen.penType = pen.dataInfo.type;
  userMap.selectPen.nameId = pen.dataInfo.nameId;
  mapInfo.initializationPenStyle();
  mapInfo.setPenStyle(pen, true);
};
// 修改标签值
const labelInput = (val) => {
  userMap.mapInfo.labelInput = val;
  userMap.startPainting("Label", true);
  console.log("val :>> ", val);
};
</script>
<style lang="less" scoped>
.penCell {
  padding: 5px 0;
  border-bottom: 1px solid var(--el-collapse-border-color);
  cursor: pointer;
  &:hover {
    background-color: #dcdfe6;
  }
  > div {
    padding: 0px 10px;
    font-size: 12px;
    display: inline-block;
  }
}
.select {
  background-color: #dcdfe6;
}
.penMap {
  width: 200px;
}
.menuList {
  width: 200px;
  .menu {
    text-align: center;
  }
}
.labelText {
  margin: 10px 10px 0 0;
}
.imgCell {
  text-align: center;
  width: 75%;
  display: inline-block;
  margin: 10px 0;
  border-radius: 10px;
  padding: 5px;
  border: var(--el-border);
  border-color: #dcdfe6;
  color: #606266;
  // padding: 10px 0;
  cursor: pointer;
  &:hover {
    background-color: #ededed;
  }
}
.imgPrimary {
  color: #fff;
  background-color: var(--el-color-primary);
  &:hover {
    background-color: var(--el-color-primary);
  }
}
.imgCellList {
  text-align: center;
}
.setMapLeftMenu {
  box-shadow: var(--el-box-shadow-light);
  position: fixed;
  top: 60px;
  left: 0;
  width: 200px;
  padding: 0px 20px;
  z-index: 1000;
  height: calc(100vh - 60px);
  background-color: #fff;
  .menu {
    padding: 10px 0;

    .btnLabel {
      // width: 100px;
    }
  }
}
</style>
