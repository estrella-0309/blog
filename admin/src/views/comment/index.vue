<template>
  <div style="height: 80vh;background-color: #ffffff;">
    <div style="padding:20px"> 搜索：
      <el-autocomplete v-model="state1" :fetch-suggestions="querySearch" clearable class="inline-input w-50"
        placeholder="请选择页面" @select="handleSelect" />
      <el-input
          style="width: 15%;margin-left:20px"
          v-model="input2"
          class="w-50 m-2"
          placeholder="用户qq号"
          :prefix-icon="Search"
        />
        <el-date-picker
          style="margin-left: 20px;"
          v-model="value1"
          type="date"
          placeholder="Pick a day"
          size="default"
        />
    </div>
    <el-table :data="blogList" :border="true" style="width: 100%;font-size: 16px;">
      <el-table-column label="序号" type="index" width="60"></el-table-column>
      <el-table-column prop="title" label="标题" width="200" />
      <el-table-column prop="category_id" label="分类" width="100">
      </el-table-column>
      <el-table-column prop="istop" label="置顶" width="100">
        <template #default="scope">
          <el-switch :inactive-value="0" :active-value="1" v-model="scope.row.istop" @change="ChangeTop(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否隐藏" width="100">
        <template #default="scope">
          <el-switch :inactive-value="0" :active-value="1" v-model="scope.row.status" @change="ChangeView(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="createtime" label="创建时间" width="200">
        <template #default="scope">
          {{ timestampToTime(scope.row.createtime) }}
        </template>
      </el-table-column>
      <el-table-column prop="updatetime" label="上次更新" width="200">
        <template #default="scope">
          {{ timestampToTime(scope.row.updatetime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" @click="EditDialog(scope.row.blog_id)" :icon="Edit"> 编辑</el-button>
          <el-button type="danger" slot="reference" :icon="Delete"
            @click="showdeleteBlog(scope.row.blog_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top: 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="queryInfo.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryInfo.size" :total="total"
      layout="total, sizes, prev, pager, next, jumper" background>
    </el-pagination>
    <el-dialog v-model="deleteDialogVisible" title="删除分类" width="30%" @close="deleteDialogClosed">
      <span>确定要删除该分类吗</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="deletetags()">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { getBlogList, TopNews, UnTopNews, DeleteBlogByid, ViewNews, UnViewNews } from "@/api/modules/blog";
import { Blog } from "@/api/interface/index";
import { Delete, Edit } from '@element-plus/icons-vue'
import { timestampToTime } from "@/utils/time";
import { ElMessage } from 'element-plus'
import {  Search } from '@element-plus/icons-vue'
const route = useRoute()
const router = useRouter()
//获取标签列表
let blogList = reactive<Blog.ResUserList[]>([]);
let queryInfo = reactive({ page: 1, size: 10 });
let total = ref(0);
const getData = async () => {
  let result = await getBlogList(queryInfo)
  for (let i of result.data.list) {
    blogList.push(i)
  }
  total.value = Number(result.data.total)
  console.log(blogList);

}
let search=ref({
  
})
onMounted(() => {
  getData();
});


//修改分页
const handleSizeChange = (newSize: number) => {
  queryInfo.size = newSize
  getData()
};
const handleCurrentChange = (newPage: number) => {
  queryInfo.page = newPage
  getData()
};

const EditDialog = (id: number) => {
  router.push({
    path: '/blog/write',
    query: { id: id }
  })
}
//删除博客
let deleteId = ref(0);
let deleteDialogVisible = ref(false)
let deleteDialogClosed = () => {
  deleteDialogVisible.value = false
  deleteId.value = 0
}

const showdeleteBlog = (id: number) => {
  deleteDialogVisible.value = true
  deleteId.value = id;
}

const deletetags = async () => {
  let result = await DeleteBlogByid({ blog_id: deleteId.value })
  ElMessage.success(result?.message);
  deleteDialogVisible.value = false
  getData();

}


const ChangeTop = async (row: Blog.ResUserList) => {
  let result;
  if (row.istop) {
    result = await TopNews({ blog_id: row.blog_id })
  }
  else {
    result = await UnTopNews({ blog_id: row.blog_id })
  }


}
const ChangeView = async (row: Blog.ResUserList) => {
  let result;
  if (row.status) {
    result = await ViewNews({ blog_id: row.blog_id })
  }
  else {
    result = await UnViewNews({ blog_id: row.blog_id })
  }
}
</script>

<style lang="scss" scoped>
.el-button+span {
  margin-left: 10px;
}
</style>