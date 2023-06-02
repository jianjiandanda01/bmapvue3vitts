<template>
  <div class="home">
    <el-dialog title="新建看板" v-model="dialogVisible" width="50%">
      <el-form ref="formRef" :model="form" label-width="90px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="生成URL" prop="generateUrl">
          <el-input v-model="form.generateUrl" disabled />
        </el-form-item>
        <el-form-item label="看板类型" prop="boardType">
          <el-select v-model="form.boardType">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="addBull"> 新增 </el-button>
        </span>
      </template>
    </el-dialog>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
import { userInfoStore } from "../store/userInfoStore";
const userInfo = userInfoStore();
// import axios from "../http/axios";
import xwlRequest from "../service";
import { jldVisualBoardAttributeAdd } from "../http/index";
import { nextTick, onMounted, reactive, ref } from "vue";
let dialogVisible = ref(false);
const form = reactive({
  title: "",
  generateUrl: "",
  designData: "",
  param: "",
  boardType: "1", // 看板类型 1、地图 2、拓扑图 3、数据看板 4、三维
});
const options = [
  {
    value: "1",
    label: "地图",
  },
  // {
  //   value: "2",
  //   label: "拓扑图",
  // },
  // {
  //   value: "3",
  //   label: "数据看板",
  // },
  // {
  //   value: "4",
  //   label: "三维",
  // },
];
// 更新看板视图
// userInfo.getBulletinList();
import type { FormInstance } from "element-plus";

const formRef = ref<FormInstance>();
// 唤起新增弹窗
const newPenMap = (formEl) => {
  dialogVisible.value = true;
  nextTick(() => {
    if (!formRef.value) return;
    formRef.value.resetFields();
    form.generateUrl = `${location.origin}/#/setMapPens?bulletInID=`;
  });
};
// 新增看板
const addBull = (name) => {
  jldVisualBoardAttributeAdd(form)
    .then((result) => {
      console.log("🚀 新建看板成功!");
      dialogVisible.value = false;
      userInfo.getBulletinList();
    })
    .catch((err) => {
      console.log("🚀 ~ file: IotSocket.vue:67 ~ getDevice ~ err:", err);
    });
};
</script>

<style>
.home {
  display: flex;
}
.leftrMenu {
  width: 200px;
}
</style>
