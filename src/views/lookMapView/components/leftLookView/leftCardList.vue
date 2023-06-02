<!--  -->
<template>
  <div class="leftCardList">
    <div class="btnExpand" v-if="!expandOff" @click="openExpand(111)">
      展开统计报表<el-icon><CaretBottom /></el-icon>
    </div>
    <div class="leftCard" v-if="expandOff">
      <div class="title"><span>|</span>安全隐患</div>
      <div class="conentList">
        <template v-for="(item, index) in userInfo.getMalfunctionPage.records">
          <div class="conent">
            <div class="label">
              {{ item.facilitiesName }} - {{ item.faultPosition }}
            </div>
            <div class="btn">
              <el-rate v-model="item.faultLevel" disabled />
              <div class="time">{{ item.createTime.substring(0, 10) }}</div>
            </div>
          </div>
        </template>
      </div>
      <el-pagination
        layout="prev, pager, next"
        :total="pageInfo.total"
        @current-change="currentChange"
      />
      <div class="title"><span>|</span>消防设施</div>
      <div class="conentList">
        <template
          v-for="(item, index) in userInfo.getFaultArchivesByBusCode"
          :key="index"
        >
          <div class="conent">
            <div class="label">
              <el-button
                class="titleBtn"
                :type="item.status === 0 ? 'primary' : ''"
                plain
                size="small"
              >
                {{ item.status_dictText }}
              </el-button>
              {{ item.deviceName }} - {{ item.installPosition }}
            </div>
            <div class="btn">
              <div class="time">
                {{
                  item.updateTime == null
                    ? "---"
                    : item.updateTime.substring(0, 10)
                }}
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="title"><span>|</span>设备实时状态</div>
    </div>
    <div class="rightBtn" @click="openExpand" v-if="expandOff">
      <el-icon><CaretTop /></el-icon>收回统计报表
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const userInfo = userInfoStore();
const value1 = 1;
const expandOff = ref(false);
// 展开  回收 统计报表
const openExpand = (i) => {
  expandOff.value = !expandOff.value;
};
import { getFaultArchivesByBusCode, getMalfunctionPage } from "/@http/index";
const pageInfo = ref({
  total: 0,
  index: 1,
  size: 10,
});

const currentChange = (val) => {
  pageInfo.value.index = val;
  getMalfunctionPage(pageInfo.value)
    .then((result) => {
      userInfo.getMalfunctionPage = result;
      pageInfo.value.total = result.total;
      // pageInfo.value.index = result.current;
    })
    .catch((err) => {});
};
currentChange(1);
</script>
<style lang="less" scoped>
.leftCardList {
  background-color: #f3f7ff;
  margin-top: 20px;
  position: relative;
  box-shadow: var(--el-box-shadow-light);

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
  .rightBtn {
    &:hover {
      font-weight: bold;
    }
    box-shadow: var(--el-box-shadow-light);
    cursor: pointer;
    background-color: var(--el-color-primary);
    width: 20px;
    height: 190px;
    padding: 10px 10px;
    color: #fff;
    text-align: center;
    position: absolute;
    right: -40px;
    bottom: -0px;
  }
  .conentList {
    max-height: 20vh;
    overflow-y: auto;
  }
  .conent {
    &:hover {
      background-color: #f7faff;
    }
    cursor: pointer;
    background-color: #ffffff;
    margin: 0px 5px 2px 5px;
    padding: 10px;
    font-size: 12px;
    .label {
      font-weight: bold;
    }
    .titleBtn {
      margin-right: 5px;
    }
    .btn {
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      .time {
        line-height: 24px;
      }
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
</style>
