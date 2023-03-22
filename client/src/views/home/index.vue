<template>
  <div v-for="item in list " :key="item.blog_id">
    <Blog :data="item">

    </Blog>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref, onMounted } from 'vue'
import { getBlogList } from "@/api/modules/blog";
import { blog } from "@/api/interface/index";

let list = reactive<blog.ResUserList[]>([])

let queryInfo = reactive({ page: 1, size: 10 });
const getData= async () => {
  let result=await getBlogList(queryInfo)
  for (let i of result.data.list) {
    list.push(i)
  }
	console.log(list);

}

onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped></style>