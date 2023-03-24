<template>
  <el-space direction="vertical" alignment="flex-start" style="width:100%">
    <el-skeleton style="width:100%" :loading="loading" animated :throttle="500">
      <template #template>
        <el-card>
          <div style="display:flex;flex-direction: column;width: 100%;justify-content: center;align-items: center;">
            <el-skeleton-item variant="h1" style="width: 50%; margin: 0 auto;" />
            <el-skeleton-item variant="h3" style="width: 30%; margin: 10px auto;" />

            <el-skeleton-item variant="text" style="margin: 5px 0;" :row="5" v-for="i in 3" :key="i" />

            <el-skeleton-item variant="image" style="width: 300px; height: 300px" />
            <div style="padding: 14px; width: 100%;">
              <div style=" display: flex;align-items: center;justify-items: space-between;margin-top: 20px;height: 16px;">
                <el-skeleton-item variant="text" style="width: 10%;margin-left: 10px;" />
                <el-skeleton-item variant="text" style="width: 10%;margin-left: 10px;" />
                <el-skeleton-item variant="text" style="width: 10%;margin-left: 10px;" />

              </div>
            </div>
          </div>
        </el-card>
        <el-card style="margin-top: 20px;">
          <div style="display:flex;flex-direction: column;width: 100%;justify-content: center;align-items: center;">
            <el-skeleton-item variant="h1" style="width: 50%; margin: 0 auto;" />
            <el-skeleton-item variant="h3" style="width: 30%; margin: 10px auto;" />

            <el-skeleton-item variant="text" style="margin: 5px 0;" :row="5" v-for="i in 3" :key="i" />

            <el-skeleton-item variant="image" style="width: 300px; height: 300px" />
            <div style="padding: 14px; width: 100%;">
              <div style=" display: flex;align-items: center;justify-items: space-between;margin-top: 20px;height: 16px;">
                <el-skeleton-item variant="text" style="width: 10%;margin-left: 10px;" />
                <el-skeleton-item variant="text" style="width: 10%;margin-left: 10px;" />
                <el-skeleton-item variant="text" style="width: 10%;margin-left: 10px;" />

              </div>
            </div>
          </div>

        </el-card>
      </template>

    </el-skeleton>
  </el-space>
  <div v-for="item in list " :key="item.blog_id" v-if="!loading">
    <Blog :data="item">

    </Blog>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref, onMounted } from 'vue'
import { getBlogList } from "@/api/modules/blog";
import { blog } from "@/api/interface/index";

let list = reactive<blog.ResUserList[]>([])
const loading = ref(true)
let queryInfo = reactive({ page: 1, size: 10 });
const getData = async () => {
  let result = await getBlogList(queryInfo)
  for (let i of result.data.list) {
    list.push(i)
  }
  loading.value=false

}

onMounted(() => {
  getData()
})
</script>

<style>
.el-space__item {
  width: 100%;
}

.el-card__body {
  width: 100%;
}
</style>
<style lang="scss" scoped></style>