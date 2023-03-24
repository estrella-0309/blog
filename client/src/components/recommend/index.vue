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
      <li v-for="item in topSearchList" :key="item.blog_id" :style="`background:url(${item.first_pic}) ;`">
        <div style="background: linear-gradient(180deg,transparent,rgba(0,0,0,.8)); width: 100%;">
          <div class="title">{{ item.title }}</div>
          <div class="createtime">{{ timestampToTime(item.createtime) }}</div>
        </div>

      </li>
    </ul>
  </el-card>
  <el-card class="tags">
    <template #header>
      <div class="card-header">
        <el-icon style="transform: rotate(-90deg) translateX(-2px); font-size: 15px;">
          <Discount />
        </el-icon>
        <span>标签云</span>
      </div>
    </template>
    <el-tag style="border: 0  !important;" v-for="item in items" :key="item.tag_id" :color="item.color" class="mx-1"
      effect="dark">
      {{ item.name }} ({{ item.nums }})

    </el-tag>
  </el-card>
</template>

<script setup lang='ts'>
import { reactive, ref, onMounted } from 'vue'
import { Medal, Discount } from '@element-plus/icons-vue'
import { getTopSearchList, getTagNums } from "@/api/modules/blog";
import { timestampToTime } from "@/utils/time";
import { CateGory, blog } from "@/api/interface/index";


type Item = { color: string; name: string, nums: number, tag_id: number }

const items = reactive<Item[]>([])
let topSearchList = reactive<blog.ResUserList[]>([])
let categoryList = reactive<CateGory.ResCateGoryList[]>([]);
let queryInfo = reactive({ page: 1, size: 10 });

const getData = async () => {
  let result = await getTopSearchList()
  for (let i = 0; i < result.data.length; i++) {
    topSearchList.push(result.data[i])
  }
  let tagresult = await getTagNums()
  for (let i = 0; i < tagresult.data.length; i++) {
    if (tagresult.data[i].nums) {
      items.push(tagresult.data[i])
    }
  }
}
onMounted(() => {
  getData()
})
</script>




<style lang="scss" scoped>
::v-deep .el-card__header {
  /* padding-top: 10px; */
  height: 50px;
  background-color: var(--text-title-back-color);
  border-bottom: 2px solid #fbbd08;
}

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

  span {
    margin: 0 3px;
  }
}
</style>

