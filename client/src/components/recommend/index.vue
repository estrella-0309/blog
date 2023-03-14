<template>
  <el-card class="topsearch">
    <template #header>
      <div class="card-header">
        <el-icon>
          <Medal />
        </el-icon>
        <span>热门文章</span>
      </div>
    </template>
    <ul>
      <li>
        <div class="title">123</div>
        <div class="createtime">2023-01-11</div>
      </li>
      <li>2</li>
    </ul>
  </el-card>
  <el-card class="tags">
    <template #header>
      <div class="card-header">
        <el-icon>
          <Medal />
        </el-icon>
        <span>标签云</span>
      </div>
    </template>
    <el-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="dark">
      {{ item.label }}
    </el-tag>
  </el-card>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { Medal } from '@element-plus/icons-vue'

import type { TagProps } from 'element-plus'

type Item = { type: TagProps['type']; label: string }

const items = ref<Array<Item>>([
  { type: '', label: 'Tag 1' },
  { type: 'success', label: 'Tag 22222' },
  { type: 'info', label: 'Tag 3123123' },
  { type: 'danger', label: 'Tag12311231 4' },
  { type: 'warning', label: 'Tag12313123 5' },
  { type: 'warning', label: 'Ta12233g 5' },
  { type: 'warning', label: 'Tag1321 5' },
  { type: 'warning', label: 'Tag3231231231 5' },
  { type: 'warning', label: 'Tag123 5' },

])
</script>




<style lang="scss" scoped>
.topsearch {
  color: var(--title-color);
  width: 260px;

  .card-header {
    font-size: 14px;
    display: flex;
    align-items: center;

    background-color: var(--text-title-back-color);
  }

  ul li {
    // background:url(http://8.130.96.111:3030/upload/413106851577925.jpg) no-repeat;
    // background-size: 100% 100%;
    background-color: red;
    height: 100px;
    margin: 10px 0;
    border-radius: 10px;
    font-size: 12px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: flex-end;
    padding-left: 5px;
    padding-bottom: 5px;
  }
}

.tags {
  margin-top: 30px;
  width: 260px;
  span{
    margin: 0 3px;
  }
}
</style>


<style>
.el-card__header {
  /* padding-top: 10px; */
  height: 50px;
  background-color: var(--text-title-back-color);
  border-bottom: 2px solid #fbbd08;
}
</style>