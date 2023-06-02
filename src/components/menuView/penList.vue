<!-- leftPenCell -->
<template>
  <div class="leftPenCell">
    <!-- 

      <div style="padding-bottom: 10px">
      <el-input v-model="searchText" placeholder="按标注名称查询">
        <template #append>
          <el-button :icon="Search" />
        </template>
      </el-input>
    </div>
    <div class="cell" v-for="(cell, key) in storePenList" :key="key">
      <template v-if="cell.drawingMode === penTypeLabel">
        <el-input
          v-model="cell.typeName"
          placeholder="请输入标注名称"
          @change="setTypeName(cell, key)"
        >
          <template #append>
            <el-button> ({{ cell.keyId }}) </el-button>
          </template>
        </el-input>
        <el-button-group>
          <el-tooltip effect="dark" content="修改属性">
            <el-button
              type=""
              :icon="EditPen"
              size="small"
              @click="setPenIcon(cell, key)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="锁定 / 解锁">
            <el-button
              :type="cell.lock ? 'primary' : ''"
              :icon="cell.lock ? Lock : Unlock"
              size="small"
              @click="lockPenClick(cell)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="显示 / 隐藏">
            <el-button
              :type="cell.isShow ? 'primary' : ''"
              :icon="View"
              size="small"
              @click="viewPenClick(cell)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="删除">
            <el-button
              type="danger"
              :icon="DeleteFilled"
              size="small"
              @click="deletePenClick(cell, key)"
            />
          </el-tooltip>
        </el-button-group>
      </template>
    </div>
     -->
  </div>
</template>

<script lang="ts" setup>
/**
 * import {
  Search,
  EditPen,
  Unlock,
  Lock,
  View,
  Hide,
  DeleteFilled,
  PictureFilled,
} from "@element-plus/icons-vue";
import { cloneDeep, pullAt, omit } from "lodash";
import { computed, reactive, ref } from "vue";
// import topBtnList from "../components/topBtnLsit.vue";
// import { onMounted } from "vue";
import { filter } from "lodash";
import { userBaiDuMap } from "../../store/store";
const props = defineProps({
  cellType: {
    type: String,
    required: true,
  },
});
const penTypeLabel = computed(() => {
  if (props.cellType === "iconImage") {
    return "marker";
  }
  if (props.cellType === "region") {
    return "polygon";
  }
  if (props.cellType === "iconText") {
    return "iconText";
  }
});
import { Pen } from "@store/type/PenClass";
const store = userBaiDuMap();
// onMounted(() => {});
// 搜索
const searchText = ref("");
const storePenList = computed<Pen[]>(() => {
  const arr = filter(store.penList, (pen: Pen) => {
    if (searchText.value) {
      if (pen.typeName.indexOf(searchText.value) !== -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  });
  return arr;
});
// 锁定
const lockPenClick = (cell: any) => {
  if (cell.lock) {
    // 开启拖拽功能
    if (cell.enableDragging) {
      cell.enableDragging();
      if (!cell.dragend) {
        cell.dragend = () => {
          store.labelList[cell.labelIndex].setPosition(cell.getPosition());
        };
      }
      cell.addEventListener("dragend", cell.dragend);
    }
    // 开启点位
    if (cell.disableEditing) {
      cell.disableEditing();
    }
    cell.lock = false;
    // 关闭编辑模式
    store.drawingManager.close();
    store.openPen = false;
  } else {
    // 关闭拖拽功能
    if (cell.disableDragging) {
      cell.disableDragging();
    }
    // 关闭点位
    if (cell.enableEditing) {
      cell.enableEditing();
    }
    cell.lock = true;
  }
};
// 显示
const viewPenClick = (cell: any) => {
  if (cell.isShow) {
    cell.hide();
    cell.isShow = false;
  } else {
    cell.isShow = true;
    cell.show();
  }
};
// 删除
const deletePenClick = (cell: any, key: any) => {
  store.myMap.removeOverlay(store.labelList[cell.labelIndex]);
  delete store.labelList[key];

  store.myMap.removeOverlay(cell);
  delete store.penList[key];
};
// 修改 icon 图标
// const setIconImageRef = (cell: any, key: any) => {
//   store.iconType.index = cell.keyId;
//   store.iconType.off = true;
// };
let dialogVisible = ref(false);
let diaLogIcon: any = {};
// 修改属性值
const setPenIcon = (cell: any, key: any) => {
  store.iconType.type = "penList";
  store.iconType.index = cell.keyId;
  store.iconType.off = true;
  // diaLogIcon = reactive(cloneDeep(cell));
  // diaLogIcon.key = key;
  // dialogVisible.value = true;
};
const setTypeName = (cell: any, key: any) => {
  store.labelList[cell.labelIndex].setContent(
    `${cell.typeName}(${cell.keyId})`
  );
  // cell.setContent(`${cell.typeName}(${cell.keyId})`);
};
// 保存覆盖物属性
const saveDialogIcon = () => {
  // 修改标注文字
  store.penList[diaLogIcon.key].typeName = diaLogIcon.typeName;
  store.penList[diaLogIcon.key].stateType = Number(diaLogIcon.stateType);
  store.setLabelCont(diaLogIcon.key);
  dialogVisible.value = false;
};
 */
</script>
<style lang="less" scoped>
.cell {
  padding-bottom: 10px;
}
</style>
