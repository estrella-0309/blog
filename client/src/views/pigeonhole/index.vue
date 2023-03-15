<template>
  <el-card>
    <template #header>
      <div class="card-header" style="text-align: center;">
        <h2 style="font-weight: 500;">文章归档</h2>
        <p style="font-size: 14px;margin-top: 5px;">目前共计2篇文章</p>
      </div>
    </template>
    <div class="timeline">
      <div :class="colorObj[index % 5].class" v-for="(i, index) in 7" :key="index">
        <el-button :type="colorObj[index % 5].type">2023年9月</el-button>
        <div class="item" v-for="i in 3" :key="i">
          <div class="date">3月</div>
          <div class="wrap">
            <el-button :type="colorObj[index % 5].type" class="tag" style=" margin:auto 30px;">2023年9月</el-button>
          </div>
        </div>
      </div>
      <el-button>hello,world!</el-button>
    </div>

  </el-card>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
let colorObj = [{
  class: 'el-button--primary',
  type: 'primary' as "default" | "primary" | "success" | "info" | "warning" | "danger" | "text",
}, {
  class: 'el-button--success',
  type: 'success' as "default" | "primary" | "success" | "info" | "warning" | "danger" | "text",
}, {
  class: 'el-button--info',
  type: 'info' as "default" | "primary" | "success" | "info" | "warning" | "danger" | "text",
}, {
  class: 'el-button--warning',
  type: 'warning' as "default" | "primary" | "success" | "info" | "warning" | "danger" | "text",
}, {
  class: 'el-button--danger',
  type: 'danger' as "default" | "primary" | "success" | "info" | "warning" | "danger" | "text",
}];
</script>

<style lang="scss" scoped>
.timeline {
  margin: 10px 0 0 30px;

  .item {
    height: 65px;
    display: flex;
    align-items: center;

    .date {
      font-size: 14px;
      width: 44px;
    }

    .wrap {
      height: 100%;
      border-left: 4px solid;
      border-color: var(--el-button-bg-color);
      position: relative;
      display: flex;

      .tag {
        position: relative;
        z-index: 2;


        &::before {
          content: "";
          position: absolute;
          left: -6px;
          width: 10px;
          height: 10px;
          transform: rotate(45deg);
          border-left: 1px solid var(--el-button-border-color);
          border-bottom: 1px solid var(--el-button-border-color);
          background-color: var(--el-button-bg-color);
          transition: .1s;
        }

        &:hover::before {
          border-color: var(--el-button-hover-border-color);
          background-color: var(--el-button-hover-bg-color);
        }
      }

      &::before {
        position: absolute;
        content: "";
        left: -4px;
        width: 4px;
        height: 20px;
        background-color: var(--el-bg-color-overlay);
        transition: 0;
      }

      &::after {
        position: absolute;
        content: "";
        left: -5px;
        width: 5px;
        height: 5px;
        border-radius: 100%;
        border: 1px solid var(--el-button-bg-color);
      }
    }
  }
}
</style>