<template>
  <el-card>
    <template #header>
      <div class="card-header" style="text-align: center;">
        <h2 style="font-weight: 500;">文章归档</h2>
        <p style="font-size: 14px;margin-top: 5px;">目前共计{{ data.total }}篇文章</p>
      </div>
    </template>
    <div class="timeline" v-if="(JSON.stringify(data.list) != '{}')">
      <div :class="colorObj[index % 5].class" v-for="(value, key, index) in data.list" :key="key">
        <el-button :type="colorObj[index % 5].type">{{ key }} </el-button>
        <div class="item" v-for="item in value" :key="item.blog_id">
          <div class="date">{{ TimeToDate(item.createtime) }}日</div>
          <div class="wrap">
            <el-button :type="colorObj[index % 5].type" class="tag" style=" margin:auto 30px;">{{ item.title }}</el-button>
          </div>
        </div>
      </div>
      <el-button>hello,world!</el-button>
    </div>

  </el-card>
</template>

<script setup lang='ts'>
import { reactive, ref, onMounted } from 'vue'
import { getBlogbyTime } from "@/api/modules/blog";
import { timestampToTime, TimeToDate } from "@/utils/time";
type buttontype = "default" | "primary" | "success" | "info" | "warning" | "danger" | "text";
let colorObj = [{
  class: 'el-button--primary',
  type: 'primary' as buttontype
}, {
  class: 'el-button--success',
  type: 'success' as buttontype
}, {
  class: 'el-button--info',
  type: 'info' as buttontype
}, {
  class: 'el-button--warning',
  type: 'warning' as buttontype
}, {
  class: 'el-button--danger',
  type: 'danger' as buttontype
}]
let data = ref<any>([])
const getData = async () => {
  let result = await getBlogbyTime()
  console.log(result, "?");
  data.value = result.data
}
onMounted(() => {
  getData()
})
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