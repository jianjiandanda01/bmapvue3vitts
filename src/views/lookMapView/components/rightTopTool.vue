<!-- rightTopTool -->
<template>
  <div class="rightTopTool">
    <div class="btnList">
      <div
        @click="toolClick('Money')"
        :class="toolName === 'Money' ? 'primary' : ''"
      >
        <el-icon><Money /></el-icon>
        <div>图层</div>
      </div>
      <div
        @click="toolClick('Refresh')"
        :class="toolName === 'Refresh' ? 'primary' : ''"
      >
        <el-icon><Refresh /></el-icon>
        <div>刷新</div>
      </div>
      <div
        @click="toolClick('SuitcaseLine')"
        :class="toolName === 'SuitcaseLine' ? 'primary' : ''"
      >
        <el-icon><SuitcaseLine /></el-icon>
        <div>工具</div>
      </div>
      <div
        @click="toolClick('FullScreen')"
        :class="toolName === 'FullScreen' ? 'primary' : ''"
      >
        <el-icon><FullScreen /></el-icon>
        <div>全屏</div>
      </div>
    </div>
    <!-- 图层 -->
    <el-card class="box-card" v-if="toolName === 'Money'">
      <div class="imageList">
        <el-collapse v-model="activeNames">
          <!-- 图标 -->
          <el-collapse-item
            v-for="(item, key) in markerIconList"
            :key="key"
            :title="item.title"
            name="1"
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
                          imgId.indexOf(String(imgKey)) !== -1 ? 'primary' : ''
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
          <!-- 标签 -->
          <el-collapse-item title="标签" name="2">
            <el-button
              text
              class="labelText"
              @click="selectLabel('')"
              :type="labelId.length === labelText.length ? 'primary' : ''"
            >
              全部
            </el-button>
            <el-button
              text
              class="labelText"
              v-for="(label, index) in labelText"
              :key="index"
              @click="selectLabel(label)"
              :type="labelId.indexOf(label) !== -1 ? 'primary' : ''"
            >
              {{ label }}
            </el-button>
          </el-collapse-item>
          <!-- 区域 -->
          <el-collapse-item title="区域" name="3">
            <el-row>
              <!-- 绘制多边形 -->
              <el-col :span="8" class="menu">
                <el-tooltip effect="dark" content="多边形" placement="bottom">
                  <el-button
                    text
                    @click="penClick('Polygon')"
                    :type="penType.indexOf('Polygon') !== -1 ? 'primary' : ''"
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
                    @click="penClick('Rectangle')"
                    :type="penType.indexOf('Rectangle') !== -1 ? 'primary' : ''"
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
                    @click="penClick('Circle')"
                    :type="penType.indexOf('Circle') !== -1 ? 'primary' : ''"
                  >
                    <icon-park type="round" theme="outline" />
                  </el-button>
                </el-tooltip>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
    <!-- 工具 -->
    <el-card class="box-card" v-if="toolName === 'SuitcaseLine'">
      <template #header>
        <div class="card-header">
          <span>| 图层工具</span>
        </div>
      </template>
      <el-form :model="form" :inline="true" label-position="left">
        <el-form-item label="告警" prop="delivery">
          <el-switch v-model="form.delivery" />
        </el-form-item>
        <el-form-item label="故障" prop="delivery">
          <el-switch v-model="form.delivery" />
        </el-form-item>
        <el-form-item label="地图刷新" prop="delivery">
          <el-select
            v-model="form.region"
            placeholder="please select your zone"
          >
            <el-option label="10秒" value="10000" />
            <el-option label="1分钟" value="60000" />
            <el-option label="2分钟" value="120000" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { toolImageMap } from "./rightTopTool";
import { uniq } from "lodash";
import { markerIconList, labelText } from "/@assets/markerIconList";
import { pull, cloneDeep } from "lodash";
import { IconPark } from "@icon-park/vue-next/es/all";

const lookInfo = lookMapInfo();
const form = reactive({
  delivery: false,
  region: "10000",
});
// 工具点击事件
let toolName = ref("");
let activeNames = ref(["1", "2", "3"]);
const toolClick = (name) => {
  if (toolName.value === name) {
    toolName.value = "";
  } else {
    toolName.value = name;
  }
};
// 图层点击事件
let imgId = ref([]);
const imgCellClick = (img, key) => {
  if (imgId.value.indexOf(key) !== -1) {
    pull(imgId.value, key);
  } else {
    imgId.value.push(key);
  }
  imgId.value = uniq(imgId.value);
  for (const key in lookInfo.penMap.Marker) {
    if (Object.prototype.hasOwnProperty.call(lookInfo.penMap.Marker, key)) {
      const element = lookInfo.penMap.Marker[key];
      if (imgId.value.indexOf(element.dataInfo.iconImgId) !== -1) {
        element.show();
        element.dataInfo.show = true;
      } else {
        element.hide();
        element.dataInfo.show = false;
      }
    }
  }
};
// 标签点击事件
let labelId = ref([]);
const selectLabel = (label = "") => {
  if (labelId.value.indexOf(label) !== -1) {
    pull(labelId.value, label);
  } else {
    labelId.value.push(label);
  }
  labelId.value = uniq(labelId.value);
  if (label === "") {
    if (labelId.value.length === 1) {
      labelId.value = cloneDeep(labelText);
    } else {
      labelId.value = [];
    }
  }
  let i = {
    index: 0,
    show: false,
  };
  for (const key in lookInfo.penMap.Label) {
    if (Object.prototype.hasOwnProperty.call(lookInfo.penMap.Label, key)) {
      const element = lookInfo.penMap.Label[key];
      if (i.index === 0) {
        i.index++;
        i.show = !element.dataInfo.show;
      }
      if (label !== "") {
        if (element.dataInfo.title === label) {
          if (element.dataInfo.show) {
            i.show = false;
          } else {
            i.show = true;
          }
        }
      }
      if (label === "" || element.dataInfo.title === label) {
        element.dataInfo.show = i.show;
        if (element.dataInfo.show) {
          element.show();
        } else {
          element.hide();
        }
      }
    }
  }
};
// 区域点击事件
let penType = ref([]);
const penClick = (type) => {
  let show = false;
  if (penType.value.indexOf(type) !== -1) {
    show = false;
    pull(penType.value, type);
  } else {
    show = true;
    penType.value.push(type);
  }
  penType.value = uniq(penType.value);

  for (const key in lookInfo.penMap[type]) {
    if (Object.prototype.hasOwnProperty.call(lookInfo.penMap[type], key)) {
      const element = lookInfo.penMap[type][key];
      if (show) {
        element.setStrokeOpacity(1);
        element.setFillOpacity(1);
        element.removeEventListener("mouseout", element.mouseout);
        element.removeEventListener("mouseover", element.mouseover);
        // element.show();
      } else {
        element.setStrokeOpacity(0.01);
        element.setFillOpacity(0.01);
        element.addEventListener("mouseout", element.mouseout);
        element.addEventListener("mouseover", element.mouseover);
        // element.hide();
      }
      element.dataInfo.show = show;
    }
  }
};
</script>
<style lang="less" scoped>
.rightTopTool {
  position: fixed;
  top: 20px;
  right: 20px;
  // background-color: @color;
  z-index: 1000;
  .imageList {
    padding-bottom: 20px;
    :deep(.imgCell) {
      cursor: pointer;
      text-align: center;
      position: relative;
      &:hover {
        background-color: #ededed;
      }
      .checkbox {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 10px;
        height: 10px;
        font-size: 0;
        border: 1px solid #9b9ca4;
        border-radius: 4px;
        input {
          margin: 0;
        }
      }
      .imgPrimary {
        line-height: 9px;
        font-size: 7px;
        color: #fff;
        border: 1px solid var(--el-color-primary);
        background-color: var(--el-color-primary);
      }
    }
    .label {
      font-size: 12px;
    }
    .title {
      font-size: 14px;
      font-weight: bold;
      color: var(--el-color-primary);
      padding: 10px 0;
    }
  }
  :deep(.box-card) {
    width: 260px;
    position: fixed;
    top: 20px;
    right: 90px;
    z-index: 1000;
    .card-header {
      font-weight: bold;
      color: var(--el-color-primary);
    }
  }
  .btnList {
    text-align: center;
    width: 50px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: var(--el-box-shadow-light);
    > div {
      cursor: pointer;
      color: #575869;
      font-weight: bold;
      padding: 5px 10px;
      border-bottom: 1px solid #ededed;
      font-size: 14px;
      &:hover {
        background-color: #ededed;
        border-radius: 5px;
      }
    }
    .primary {
      color: var(--el-color-primary);
    }
    > div:nth-child(4) {
      border-bottom: 0px solid #ededed;
    }
  }
}
</style>
