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
            :icon="EditPen"
            size="small"
            @click="setPenIcon(cell, key)"
          />
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="锁定 / 解锁"
          v-if="cell.drawingMode !== 'marker'"
        >
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
import { filter } from "lodash";
import { computed, reactive, ref } from "vue";
// import topBtnList from "../components/topBtnLsit.vue";
// import { onMounted } from "vue";
import { userBaiDuMap } from "../../store/store";
// 搜索
const searchText = ref("");
const storePenList = computed(() => {
  const arr = filter(store.iconTextList, (pen) => {
    if (searchText.value) {
      if (pen.content.indexOf(searchText.value) !== -1) {
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
const store = userBaiDuMap();
// onMounted(() => {});
// 锁定
const lockPenClick = (cell: any) => {
  if (cell.lock) {
    cell.marker = new BMap.Marker(cell.getPosition(), {
      title: "请将标注拖拽到指定位置后点击锁定按钮",
      enableDragging: true,
    });
    cell.marker.addEventListener("dragend", () => {
      cell.setPosition(cell.marker.getPosition());
    });
    store.myMap.addOverlay(cell.marker);
    // cell.enableEditing();
    // 关闭编辑模式
    store.drawingManager.close();
    cell.lock = false;
  } else {
    // store.myMap.clearOverlays();
    store.myMap.removeOverlay(cell.marker);
    store.openPen = false;
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
  store.myMap.removeOverlay(store.iconTextList[key]);
  delete store.iconTextList[key];
  //   store.myMap.removeOverlay(store.labelList[cell.labelIndex]);
  //   delete store.labelList[key];

  //   store.myMap.removeOverlay(cell);
  //   delete store.penList[key];
};
// 修改 icon 图标
const setIconImageRef = (cell: any, key: any) => {
  store.iconType.index = key;
  store.iconType.off = true;
};
let dialogVisible = ref(false);
let diaLogIcon: any = {};
// 修改属性值
const setPenIcon = (cell: any, key: any) => {
  store.iconType.type = "iconTextList";
  store.iconType.index = cell.keyId;
  store.iconType.off = true;
  // cell.setContent(`${cell.typeName}(${cell.keyId})`);
  //   diaLogIcon = reactive(cloneDeep(cell));
  //   diaLogIcon.key = key;
  //   dialogVisible.value = true;
};
// 保存覆盖物属性
const setTypeName = () => {
  // 修改标注文字
  const cell = store.iconTextList[store.iconType.index];
  cell.setContent(`${cell.typeName}(${cell.keyId})`);
};
 */
</script>
<style lang="" scoped></style>
