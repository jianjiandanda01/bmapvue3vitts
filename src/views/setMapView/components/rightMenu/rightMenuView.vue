<!-- rightMenuView -->
<template>
  <div class="rightMenuView">
    <div
      class="penMap"
      v-if="userMap.selectPen.nameId"
      style="padding-top: 20px"
    >
      <el-form :model="pen.dataInfo" label-width="90px" label-position="left">
        <el-form-item label="名称">
          <el-input
            v-model="pen.dataInfo.title"
            @input="setChange('title', pen)"
          />
        </el-form-item>
        <el-form-item label="绑定标签">
          <el-select
            v-model="pen.dataInfo.labelNameId"
            placeholder="Select"
            @change="setChange('labelNameId', pen)"
          >
            <el-option
              v-for="(label, labelI) in userMap.penMap.Label"
              :key="labelI"
              :label="label.dataInfo.title"
              :value="label.dataInfo.nameId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="显示 / 隐藏">
          <el-switch
            v-model="pen.dataInfo.show"
            @change="setChange('show', pen)"
          />
        </el-form-item>
        <el-form-item label="锁定 / 解锁">
          <el-switch
            v-model="pen.dataInfo.lock"
            @change="setChange('lock', pen)"
          />
        </el-form-item>
        <el-form-item label="删除表单">
          <el-button @click.prevent="deletePen(pen)">删除</el-button>
        </el-form-item>
        <el-form-item label="建筑ID">
          <el-select
            v-model="pen.dataInfo.buildId"
            placeholder="Select"
            @change="jldCloudBusBuildingChange(pen)"
          >
            <el-option
              v-for="(item, index) in userInfo.jldCloudBusBuilding"
              :key="index"
              :label="item.bdAliasName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备ID">
          <el-select v-model="pen.dataInfo.deviceId" placeholder="Select">
            <el-option
              v-for="(item, index) in userInfo.queryDeviceListResponse"
              :key="index"
              :label="item.proDeviceName"
              :value="item.deviceCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="回路号">
          <el-input v-model="pen.dataInfo.HLId" />
        </el-form-item>
        <el-form-item label="看板ID">
          <el-select v-model="pen.dataInfo.lookPen" placeholder="Select">
            <el-option label="item.label" value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Pen } from "/@store/type/PenClass";
import type { Action } from "element-plus";
const userInfo = userInfoStore();
const userMap = userMapStore();
const mapInfo = userMapInfo();
import { queryDeviceList } from "/@http/index";
import { ElMessageBox } from "element-plus";

const pen = computed<Pen>({
  // getter
  get() {
    return userMap.selectPen.pen;
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    // [firstName.value, lastName.value] = newValue.split(' ')
  },
});
// 修改表单内容
const setChange = (type, pen) => {
  console.log("type :>> ", type);
  console.log("pen :>> ", pen);
  if (type === "title") {
    if (pen.dataInfo.type === "Label") {
      const label = pen.getLabel();
      label.setContent(pen.dataInfo.title);
    }
  }
  if (type === "show") {
    console.log("pen :>> ", pen);
    if (pen.dataInfo[type]) {
      pen.show();
    } else {
      pen.hide();
    }
  }
  if (type === "lock") {
    console.log("pen :>> ", pen);
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
// 删除元素
const deletePen = (pen) => {
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
};
// 查询设备
const jldCloudBusBuildingChange = (pen, change = true) => {
  if (change) {
    pen.dataInfo.deviceId = "";
  }
  queryDeviceList(pen.dataInfo.buildId)
    .then((result) => {
      console.log("result :>> ", result);
      userInfo.queryDeviceListResponse = result;
    })
    .catch((err) => {});
};

// 只监听pinia中某一个值的变化
watch(
  () => userMap.selectPen.nameId,
  () => {
    jldCloudBusBuildingChange(userMap.selectPen.pen, false);
  }
);
</script>

<style lang="less" scoped>
.rightMenuView {
  .inputText {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  box-shadow: var(--el-box-shadow-light);
  position: fixed;
  top: 60px;
  right: 0;
  padding: 0px 20px;
  z-index: 1000;
  width: 200px;
  background-color: #fff;
}
</style>
