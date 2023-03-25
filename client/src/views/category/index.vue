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
const route = useRoute()
let queryInfo = reactive({ page: 1, size: 10, id: route.query.id as string });
let loading = ref(true)

const router = useRouter()
const getData = async () => {
  console.log(route.query);
  loading.value=true
  let result = await getCategoryListByid(queryInfo)
  list=[]
  list.push(...result.data.list)
  queryInfo.id = result.data.list[0].category_id
  loading.value = false
}
onMounted(() => {
  getData()
})
watch(
  () => route.query,
  () => {
    // 强制组件重新渲染
    queryInfo.id = ''
    nextTick(() => {
      queryInfo.id = route.query.id as string || ''
      getData()
    })
  }
)
</script>

<style lang="scss" scoped></style>