<template>
  <div v-if="!loading">
    <el-card style="margin-bottom: 10px;">
      <span style="font-size: 22px; display:flex;justify-content: center;">分类 {{ queryInfo.id }} 下的文章</span>
    </el-card>
    <div v-for="item in list " :key="item.blog_id">
      <Blog :data="item">
      </Blog>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref, onMounted } from 'vue'
import { getCategoryListByid } from "@/api/modules/blog";
import { blog } from "@/api/interface/index";
import { useRoute, useRouter } from 'vue-router'
let list = reactive<blog.ResUserList[]>([])

let queryInfo = reactive({ page: 1, size: 10, id: "" });
let loading = ref(true)
const route = useRoute()
const getData = async () => {
  console.log(route.query);

  queryInfo.id = route.query.id as string
  let result = await getCategoryListByid(queryInfo)
  list.push(...result.data.list)
  queryInfo.id = result.data.list[0].category_id
  loading.value = false
}
onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped></style>