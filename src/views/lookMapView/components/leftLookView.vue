<!-- leftLookView -->
<template>
  <div class="leftLookView">
    <leftSearchList></leftSearchList>
    <leftCardList v-model:expandOff="expandOff"></leftCardList>
  </div>
</template>

<script lang="ts" setup>
import leftSearchList from "./leftLookView/leftSearchList.vue";
import leftCardList from "./leftLookView/leftCardList.vue";
import { ref } from "vue";

const expandOff = ref(false);
</script>
<style lang="less" scoped>
.leftLookView {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 10px;
  width: 300px;
  .btnExpand {
    border-radius: 2px;
    overflow: hidden;
    box-shadow: var(--el-box-shadow-light);
    color: #409eff;
    background-color: #fff;
    text-align: center;
    margin-top: 10px;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    padding: 5px 0;
    &:hover {
      box-shadow: 0 0px 5px #409eff;
    }
  }
  :deep(.el-input-group__append) {
    background-color: #409eff;
    color: #fff;
  }
}
</style>
