<!-- bulletinBoard -->
<template>
  <div class="bulletinBoard">
    <div class="header">
      <!-- src\components\bulletinBoard\logo.png -->
      <el-image
        src="src\components\bulletinBoard\logo.png"
        style="width: 150px"
        fit="fill"
      />
      <div class="out">
        <el-button text :icon="SwitchButton"> 退出 </el-button>
      </div>
    </div>
    <el-row :gutter="20" style="width: 100%; padding: 0px 20px">
      <el-col :lg="6" :sm="12" style="padding-top: 20px">
        <el-card class="box-cardAdd" @click="addBullOpen">
          <div>
            <el-icon class="icon"><Plus /></el-icon>
            <div class="title">
              <div>新建大屏</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <template v-for="item in userInfo.recordsList" :key="item.id">
        <el-col :lg="6" :sm="12" style="padding-top: 20px">
          <el-card class="box-card">
            <div style="width: 100%">
              <el-image
                class="cardImage"
                style="width: 100%; height: 150px"
                src="src\components\bulletinBoard\backgroundImage.png"
                fit="fill"
              />
            </div>
            <div class="title">
              {{ item.title }}
            </div>
            <el-row :gutter="0" justify="space-between">
              <!-- 预览 -->
              <el-col :span="6" style="text-align: center">
                <el-button @click="lookView(item)" text :icon="View"
                  >预览</el-button
                >
                <div class="border"></div>
              </el-col>
              <!-- 编辑 -->
              <el-col :span="6" style="text-align: center">
                <el-button @click="setOpenView(item)" text :icon="Edit"
                  >编辑</el-button
                >
                <div class="border" style=""></div>
              </el-col>
              <!-- 绘制 -->
              <el-col :span="6" style="text-align: center">
                <el-button @click="goView(item)" text :icon="EditPen"
                  >绘制</el-button
                >
                <div class="border"></div>
              </el-col>
              <!-- 删除 -->
              <el-col :span="6" style="text-align: center">
                <el-button @click="deleteView(item)" text :icon="Delete"
                  >删除</el-button
                >
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </template>
    </el-row>
    <el-dialog :title="form.typeName" v-model="dialogVisible" width="40%">
      <el-form :model="form" label-width="90px" ref="formRef">
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
          <el-button type="primary" @click="setView()">
            {{ form.typeBtnName }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  Delete,
  EditPen,
  Edit,
  View,
  Plus,
  SwitchButton,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { userInfoStore } from "../../store/userInfoStore";
const userInfo = userInfoStore();
import { nextTick, reactive, ref } from "vue";
// import xwlRequest from "../../service";
// import { log } from "console";
import { ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import {
  jldVisualBoardAttributeEdit,
  jldVisualBoardAttributeDelete,
  jldVisualBoardAttributeAdd,
} from "../../http/index";
userInfo.getBulletinList();
/**
 * 列表请求类
 */

// 编辑看板
let dialogVisible = ref(false);
const formRef: any = ref(null);
const form = reactive({
  typeName: "编辑大屏",
  typeBtnName: "保存",
  id: "",
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
// 打开修改看板对话
const setOpenView = (item: any) => {
  form.typeName = "编辑大屏";
  form.typeBtnName = "保存";
  form.id = item.id;
  form.title = item.title;
  form.generateUrl = item.generateUrl;
  form.designData = item.designData;
  form.param = item.param;
  form.boardType = item.boardType;
  dialogVisible.value = true;
};
// 修改看板
const setView = () => {
  if (form.typeName === "编辑大屏") {
    jldVisualBoardAttributeEdit(form)
      .then(() => {
        userInfo.getBulletinList();
        dialogVisible.value = false;
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    // 新建弹窗
    jldVisualBoardAttributeAdd(form)
      .then(() => {
        dialogVisible.value = false;
        userInfo.getBulletinList();
      })
      .catch((err) => {
        console.log("🚀 ~ file: IotSocket.vue:67 ~ getDevice ~ err:", err);
      });
  }
};
// 绘制看板
const goView = (item: any) => {
  router.push({
    name: "setMapPens",
    query: {
      bulletInID: item.id,
    },
  });
};
// 删除看板
const deleteView = (item: any) => {
  ElMessageBox.alert("确认要删除看板?", "删除看板", {
    confirmButtonText: "删除",
    callback: (action: Action) => {
      if (action === "confirm") {
        jldVisualBoardAttributeDelete(item)
          .then(() => {
            userInfo.getBulletinList();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  });
};
// 预览看板
const lookView = (item: any) => {
  router.push({
    name: "lookMapView",
    query: {
      bulletInID: item.id,
    },
  });
};
// 打开新建大屏弹窗
const addBullOpen = () => {
  // 打开弹窗
  dialogVisible.value = true;
  nextTick(() => {
    console.log("formRef.value :>> ", formRef.value);
    if (!formRef.value) return;
    formRef.value.resetFields();
    form.generateUrl = `${location.origin}/#/setMapPens?bulletInID=`;
    form.typeName = "新建大屏";
    form.typeBtnName = "新增";
  });
};
</script>
<style lang="less" scoped>
@cardLineHeight: 210px;
.bulletinBoard {
  width: 100%;
  .header {
    background-color: #1d263f;
    font-size: 0;
    padding: 10px;
    .out {
      font-size: 15px;
      float: right;
      .el-button {
        color: #fff;
        &:hover {
          background-color: #2c3a61;
        }
      }
    }
  }
  :deep(.box-cardAdd) {
    cursor: pointer;
    .el-card__body {
      padding: 0;
    }
    .title {
      line-height: @cardLineHeight;
    }
    .icon {
      font-size: 20px;
      position: absolute;
      top: 0px;
      bottom: 70px;
      left: 0;
      right: 0;
      margin: auto;
    }
    position: relative;
    height: @cardLineHeight;
    text-align: center;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #1d263f;
  }
  :deep(.box-card) {
    height: @cardLineHeight;
    .border {
      width: 0px;
      height: 60%;
      float: right;
      border-right: 1px solid #74777c;
      margin-top: 8%;
    }
    .el-card__body {
      padding: 0;
    }
    .title {
      text-align: center;
      padding: 10px 0;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #1d263f;
      line-height: 6px;
    }
  }
}
</style>
