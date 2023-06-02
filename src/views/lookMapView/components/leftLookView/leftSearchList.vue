<!-- leftSearchList -->
<template>
  <div class="leftSearchList">
    <div class="searchInput">
      <el-input v-model="searchText" placeholder="请输入搜索内容">
        <template #append>
          <el-button :icon="Search" type="primary" />
        </template>
      </el-input>
    </div>
    <div class="searchList" v-if="searchText !== ''">
      <div class="searchCell" @click="selectBuildingClick">
        <div class="title">
          A1公寓楼
          <el-icon><School /></el-icon>
        </div>
        <div class="content">
          <div>地址: 安宁路西路88号</div>
          <div>使用性质: 教学</div>
          <div>危险级: 甲级</div>
          <div>建筑物类别: 一类高层建筑</div>
          <div>结构类型: 钢筋混泥土结构</div>
          <div>耐火等级: 一级</div>
          <div>建造日期: 2023年5月24日</div>
        </div>
      </div>
    </div>
    <div class="searchSelectList" v-if="searchText !== ''">
      <el-collapse v-model="activeNames">
        <!-- 火灾报警系统 -->
        <el-collapse-item name="1">
          <template #title>
            <div class="title">
              <span>|</span>
              火灾报警系统
            </div>
          </template>
          <div class="position">
            位置: 水泵房
            <span>
              <span class="success">
                <el-icon><Monitor /></el-icon>
                在线
              </span>
              <span class="error">报警</span>
            </span>
          </div>
          <div>
            <el-tabs v-model="activeName" class="search-tabs" type="card">
              <el-tab-pane label="报警信息" name="first">
                <div class="searchSelectCell">
                  <div class="label">
                    <el-button type="warning">未处理</el-button>
                    <el-button type="danger" plain>火警！光电探头</el-button>
                  </div>
                  <div class="address">
                    详细地址：甘肃省兰州市安宁区安宁西路88号-1F-
                    水泵房，报警时间：05-16 16:14:56
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="历史信息" name="second">历史信息</el-tab-pane>
            </el-tabs>
          </div>
        </el-collapse-item>
        <!-- 自动喷淋系统 -->
        <el-collapse-item name="2">
          <template #title>
            <div class="title">
              <span>|</span>
              自动喷淋系统
            </div>
          </template>
          <div class="position">
            位置: 水泵房
            <span>
              <span class="success">
                <el-icon><Monitor /></el-icon>
                在线
              </span>
              <span class="error">报警</span>
            </span>
          </div>
          <div>
            <el-tabs v-model="activeName" class="search-tabs" type="card">
              <el-tab-pane label="报警信息" name="first">
                <div class="searchSelectCell">
                  <div class="label">
                    <el-button type="danger" plain>高阈值告警</el-button>
                  </div>
                  <div class="address">
                    上报值：1250 报警时间：08-09 14:36:56
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="历史信息" name="second">历史信息</el-tab-pane>
            </el-tabs>
          </div>
        </el-collapse-item>
        <!-- 高位水箱系统 -->
        <el-collapse-item name="3">
          <template #title>
            <div class="title">
              <span>|</span>
              高位水箱系统
            </div>
          </template>
          <div class="position">
            位置: 水泵房
            <span>
              <span class="success">
                <el-icon><Monitor /></el-icon>
                在线
              </span>
              <span class="error">报警</span>
            </span>
          </div>
          <div>
            <el-tabs v-model="activeName" class="search-tabs" type="card">
              <el-tab-pane label="报警信息" name="first">
                <div class="searchSelectCell">
                  <div class="label">
                    <el-button type="danger" plain>高阈值告警</el-button>
                  </div>
                  <div class="address">
                    上报值：1250 报警时间：08-09 14:36:56
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="历史信息" name="second">历史信息</el-tab-pane>
            </el-tabs>
          </div>
        </el-collapse-item>
        <!-- 智慧用电 -->
        <el-collapse-item name="4">
          <template #title>
            <div class="title">
              <span>|</span>
              智慧用电
            </div>
          </template>
          <div class="position">
            位置: 水泵房
            <span>
              <span class="success">
                <el-icon><Monitor /></el-icon>
                在线
              </span>
              <span class="error">报警</span>
            </span>
          </div>
          <div>
            <el-tabs v-model="activeName" class="search-tabs" type="card">
              <el-tab-pane label="报警信息" name="first">
                <div class="searchSelectCell">
                  <div class="label">
                    <el-button type="danger" plain>08-09 14:36:56 </el-button>
                  </div>
                  <div class="address">
                    剩余电流状态：异常，B相相电压状态：正常，
                    状态：异常，c相相电压状态：正常，B相电流...
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="历史信息" name="second">历史信息</el-tab-pane>
            </el-tabs>
          </div>
        </el-collapse-item>
        <!-- 独立烟感系统 -->
        <el-collapse-item name="5">
          <template #title>
            <div class="title">
              <span>|</span>
              独立烟感系统
            </div>
          </template>
          <div class="iconList">
            <el-row :gutter="20">
              <el-col
                :span="6"
                class="iconCell"
                v-for="(icon, iconI) in 8"
                :key="iconI"
              >
                <el-image
                  src="src\components\lookView\leftLookView\yanwu2.png"
                  fit="fill"
                />
                <div class="icon-label">网关</div>
                <div class="icon-label">71B640</div>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- <selectBuilding ref="selectBuilding"></selectBuilding> -->
  </div>
</template>

<script lang="ts" setup>
import { Search, CaretBottom } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
// import { userBaiDuMap } from "@store/store";
// import selectBuilding from "./selectBuilding.vue";
// const store = userBaiDuMap();
const searchText = ref("");
let activeNames = ref(["5"]);
let activeName = ref("2");
onMounted(() => {
  // var videoElement: HTMLVideoElement = document.getElementById("videoPlay");
  // videoElement.play();
});
// 点击建筑物信息
// const selectBuilding = ref(null);
const selectBuildingClick = () => {
  console.log("123 :>> ", 123);
  // console.log("selectBuilding :>> ", new selectBuilding());
  const content = `<div class='buildMarkerInfoWindow'>
  <div class='title'>AI公寓楼建筑物信息</div>
  <div class='conent'><span>建筑物名称：第三教学楼</span></div>
  </div>`;
  const title = `<div>AI公寓楼建筑物信息</div>`;
  // store.positionMarker({
  //   lng: 103.732096070288,
  //   lat: 36.1118808091888,
  // });
  // store.addInfoWindow(title, content, {
  //   lng: 103.732096070288,
  //   lat: 36.1118808091888,
  // });
};
</script>
<style lang="less">
.buildMarkerInfoWindow {
  background-color: var(--el-color-primary);
}
.buildMarkerInfoWindowTitle {
  background-color: var(--el-color-primary);
}
</style>
<style lang="less" scoped>
.iconCell {
  text-align: center;
  font-size: 0;
  margin-bottom: 20px;
  .el-image {
    width: 70%;
  }
  .icon-label {
    height: 12px;
    font-size: 12px;
    color: var(--el-color-primary);
  }
}
.searchSelectCell {
  padding-left: 10px;
  .address {
    margin-top: 10px;
    color: #23262a;
  }
}
.search-tabs {
  margin-top: 10px;
  :deep(.el-tabs__header) {
    height: 30px;
  }
  :deep(.el-tabs__item) {
    height: 30px;
    padding: 0px 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  :deep(.is-active) {
    background-color: var(--el-color-primary);
    color: #fff;
  }
}

.searchSelectList {
  padding: 10px;
  background-color: #f3f7ff;
  font-size: 12px;
  max-height: calc(70vh);
  overflow-y: auto;
  .position {
    font-weight: bold;
    padding: 5px 10px;
    background-color: #e8f4fe;
    > span {
      float: right;
    }
  }
  .title {
    padding: 10px 0;
    font-weight: bold;
    color: #23262a;
    font-size: 14px;
    span {
      color: var(--el-color-primary);
      margin: 0 10px;
    }
  }
}
.success {
  color: var(--el-color-success);
}
.error {
  color: var(--el-color-error);
}
.searchList {
  .content {
    > div {
      display: inline-block;
      padding-left: 20px;
    }
  }
  .title {
    padding: 10px 0px;
    font-weight: bold;
    font-size: 14px;
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
  }
  color: #fff;
  padding: 20px;
  padding-top: 0;
  padding-left: 0;
  font-size: 12px;
  margin-top: 20px;
  background-color: #409eff;
}
.leftSearchList {
  box-shadow: var(--el-box-shadow-light);
}
.searchInput {
  border-radius: 2px;
  overflow: hidden;
  font-size: 0;
  box-shadow: var(--el-box-shadow-light);
  &:hover {
    box-shadow: 0 0px 5px #409eff;
  }
}
</style>
