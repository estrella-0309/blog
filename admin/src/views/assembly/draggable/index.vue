<template>
	<div style="height: 80vh;background-color: #ffffff;">
		<el-button type="primary" :icon="Plus" style="margin:10px 0 10px 10px"
			@click="addDialogVisible = true">添加标签</el-button>
		<el-table :data="categoryList" style="width: 100%;font-size: 18px;">
			<el-table-column label="序号" type="index" width="400"></el-table-column>
			<el-table-column prop="name" label="名称" width="400" />
			<el-table-column prop="name" label="颜色" width="400" />
			<el-table-column label="操作">
				<template v-slot="scope">
					<el-button type="primary" @click="showEditDialog(scope.row)" :icon="Edit"> 编辑</el-button>
					<el-button type="danger" slot="reference" :icon="Delete" @click="showdeleteCategory(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination style="margin-top: 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="queryInfo.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryInfo.size" :total="total"
			layout="total, sizes, prev, pager, next, jumper" background>
		</el-pagination>
		<el-dialog v-model="addDialogVisible" title="添加分类" width="30%" @close="addDialogClosed">
			<el-form ref="addFormRef" :model="addForm" :rules="formRules" label-width="80px">
				<el-form-item label="分类名称" prop="name">
					<el-input v-model="addForm.name"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="addDialogVisible = false">取消</el-button>
					<el-button type="primary" @click="addCategory()">
						确定
					</el-button>
				</span>
			</template>
		</el-dialog>
		<el-dialog v-model="editDialogVisible" title="修改分类" width="30%" @close="editDialogClosed">
			<el-form ref="editFormRef" :model="editForm" :rules="formRules" label-width="80px">
				<el-form-item label="分类名称" prop="name">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editDialogVisible = false">取消</el-button>
					<el-button type="primary" @click="updateCategory()">
						确定
					</el-button>
				</span>
			</template>
		</el-dialog>
		<el-dialog v-model="deleteDialogVisible" title="删除分类" width="30%" @close="deleteDialogClosed">
			<span>确定要删除该分类吗</span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="deleteDialogVisible = false">取消</el-button>
					<el-button type="primary" @click="deletecategory()">
						确定
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from "vue";
import { getCategoryList, newCategory, editCategory, deleteCategory } from "@/api/modules/category";
import { CateGory } from "@/api/interface/index";
import { Delete, Edit, Plus } from '@element-plus/icons-vue'
import { FormInstance, FormRules, ElMessage } from 'element-plus'


//获取分类列表
let categoryList = reactive<CateGory.ResCateGoryList[]>([]);
let queryInfo = reactive({ page: 1, size: 10 });
let total = ref(0);
const getData = async () => {
	let result = await getCategoryList(queryInfo)
	total.value = result.data.total;
	categoryList.length = 0;
	categoryList.push(...result.data.list);

}

onMounted(() => {
	getData()

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



//添加分类
let addDialogVisible = ref(false)
let addFormRef = ref<FormInstance>()
let addForm = reactive<{ name: string }>({ name: '' })

let formRules = reactive<FormRules>({
	name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
})
const addDialogClosed = () => {
	addFormRef.value?.resetFields()
}
const addCategory = () => {
	addFormRef.value?.validate(async (valid) => {
		if (valid) {
			let result = await newCategory({ name: addForm.name })
			ElMessage.success(result.message);
			addDialogVisible.value = false
			getData()
		}
	})
}

//修改分类
let editDialogVisible = ref(false)
let editForm = reactive<CateGory.ResCateGoryList>({ name: "", category_id: 0 })
let editFormRef = ref<FormInstance>()
const editDialogClosed = () => {
	editForm.name = ""
	editForm.category_id = 0
	editFormRef.value?.resetFields()
}
const showEditDialog = (row: CateGory.ResCateGoryList) => {
	Object.keys(editForm).forEach(key => editForm[key] = row[key])
	editDialogVisible.value = true
}
const updateCategory = () => {
	editFormRef.value?.validate(async valid => {
		if (valid) {
			let result = await editCategory(editForm)
			ElMessage.success(result.message);
			addDialogVisible.value = false
			getData()
		}
	})
}

//删除分类
let deleteDialogVisible = ref(false)
const deleteDialogClosed = () => {
	deleteDialogVisible.value = false
}
const showdeleteCategory = (row: CateGory.ResCateGoryList) => {
	Object.keys(editForm).forEach(key => editForm[key] = row[key])
	deleteDialogVisible.value = true

}
const deletecategory = async () => {
	let result = await deleteCategory({ category_id: editForm.category_id })
	ElMessage.success(result.message);
	deleteDialogVisible.value = false
	getData()

}
</script>

<style lang="scss" scoped>
.el-button+span {
	margin-left: 10px;
}
</style>