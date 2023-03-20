<template>
	<div style="height: 80vh;background-color: #ffffff;">
		<el-table :data="TagsList" style="width: 100%;font-size: 18px;">
			<el-table-column label="序号" type="index" width="300"></el-table-column>
			<el-table-column prop="name" label="名称" width="300" />
			<el-table-column prop="color" label="颜色" width="300">
				<template #default="scope">
					<div style="width: 100px;height:20px;border: 1px solid #ccc;" :style="`background-color:${scope.row.color}`">
					</div>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template v-slot="scope">
					<el-button type="primary" @click="showEditDialog(scope.row)" :icon="Edit"> 编辑</el-button>
					<el-button type="danger" slot="reference" :icon="Delete" @click="showdeleteTags(scope.row)">删除</el-button>
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
				<el-form-item label="颜色" prop="name">
					<div style="width: 100px;height:25px;border: 1px solid #ccc; margin-right: 10px;"
						:style="`background-color:${addForm.color}`"></div>
					<el-color-picker :predefine="addcolor" v-model="addForm.color" show-alpha />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="addDialogVisible = false">取消</el-button>
					<el-button type="primary" @click="addTags()">
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
				<el-form-item label="颜色" prop="name">
					<div style="width: 100px;height:25px;border: 1px solid #ccc; margin-right: 10px;"
						:style="`background-color:${editForm.color}`"></div>
					<el-color-picker :predefine="addcolor" v-model="editForm.color" show-alpha />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editDialogVisible = false">取消</el-button>
					<el-button type="primary" @click="updateTags()">
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
import { getTagsList, newTags, editTags, deleteTags } from "@/api/modules/tag";
import { Tags } from "@/api/interface/index";
import { Delete, Edit, Plus } from '@element-plus/icons-vue'
import { FormInstance, FormRules, ElMessage } from 'element-plus'

let addcolor = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399'];

//获取标签列表
let TagsList = reactive<Tags.ResTagsList[]>([]);
let queryInfo = reactive({ page: 1, size: 10 });
let total = ref(0);
const getData = async () => {
	let result = await getTagsList(queryInfo)
	total.value = result.data.total;
	addForm.color = addcolor[(total.value) % 5]
	TagsList.length = 0;
	TagsList.push(...result.data.list);
}

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



//添加分类
let addDialogVisible = ref(false)
let addFormRef = ref<FormInstance>()
let addForm = reactive<{ name: string, color: string }>({ name: '', color: addcolor[(total.value) % 5] })
let formRules = reactive<FormRules>({
	name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
})
const showAddDialog = () => {
	addDialogVisible.value = true
}
const addDialogClosed = () => {
	addFormRef.value?.resetFields()
}
const addTags = () => {
	addFormRef.value?.validate(async (valid) => {
		if (valid) {
			let result = await newTags({ name: addForm.name, color: addForm.color })
			ElMessage.success(result.message);
			addDialogVisible.value = false
			getData()
		}
	})
}

//修改分类
let editDialogVisible = ref(false)
let editForm = reactive<Tags.ResTagsList>({ name: "", tag_id: 0, color: "" })
let editFormRef = ref<FormInstance>()
const editDialogClosed = () => {
	editForm.name = ""
	editForm.tag_id = 0
	editFormRef.value?.resetFields()
}
const showEditDialog = (row: Tags.ResTagsList) => {
	Object.keys(editForm).forEach(key => editForm[key] = row[key])
	console.log(editForm);

	editDialogVisible.value = true
}
const updateTags = () => {
	editFormRef.value?.validate(async valid => {
		if (valid) {
			let result = await editTags(editForm)
			ElMessage.success(result.message);
			editDialogVisible.value = false
			getData()
		}
	})
}

//删除分类
let deleteDialogVisible = ref(false)
const deleteDialogClosed = () => {
	deleteDialogVisible.value = false
}
const showdeleteTags = (row: Tags.ResTagsList) => {
	Object.keys(editForm).forEach(key => editForm[key] = row[key])
	deleteDialogVisible.value = true

}
const deletetags = async () => {
	let result = await deleteTags({ tag_id: editForm.tag_id })
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