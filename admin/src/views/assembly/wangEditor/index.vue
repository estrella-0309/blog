<template>
	<div>
		<el-form :model="form" :rules="formRules" ref="formRef" label-position="top">
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="文章标题" prop="title">
						<el-input v-model="form.title" placeholder="请输入标题"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="分类" prop="cate">
						<el-select v-model="form.cate" placeholder="请选择分类（输入可添加新分类）" :allow-create="true" :filterable="true"
							style="width: 100%;">
							<el-option :label="item.name" :value="item.category_id" v-for="item in categoryList"
								:key="item.category_id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="标签" prop="tagList">
						<el-select v-model="form.tagList" placeholder="请选择标签（输入可添加新标签）" :allow-create="true" :filterable="true"
							:multiple="true" style="width: 100%;">
							<el-option :label="item.name" :value="item.tag_id" v-for="item in tagList" :key="item.tag_id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-col :span="12">
				<el-form-item label="封面" prop="firstPicture">
					<el-upload class="avatar-uploader" action="http://localhost:3030/api/upload/rich_editor_uplaod"
						:show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="form.firstPicture" :src="form.firstPicture" class="avatar" />
						<el-icon v-else class="avatar-uploader-icon">
							<Plus />
						</el-icon>
					</el-upload>
				</el-form-item>
			</el-col>
			<el-form-item label="文章描述" prop="description">
				<WangEditor height="300px" v-model:value="form.description" :toolbarConfig="toolbarConfig" mode="simple" />
			</el-form-item>

			<el-form-item label="文章正文" prop="content">
				<WangEditor  height="300px" v-model:value="form.content" :toolbarConfig="toolbarConfig"
					mode="simple" />
			</el-form-item>
			<el-form-item style="text-align: right;">
				<el-button type="primary" @click="sumit()">保存</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>

<script setup lang="ts" name="wangEditor">
import { ref, reactive, onMounted } from "vue";
import { CateGory, Tags } from "@/api/interface/index";
import WangEditor from "@/components/WangEditor/index.vue";
import { getCategoryList } from "@/api/modules/category";
import { getTagsList } from "@/api/modules/tag";
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps,FormRules, FormInstance } from 'element-plus'

const form = reactive({
	title: '',
	firstPicture: '',
	description: '',
	content: '',
	cate: null,
	tagList: [],
	words: null,
	readTime: null,
	views: 0,
	appreciation: false,
	recommend: false,
	commentEnabled: false,
	top: false,
	published: false,
})
const formRules = reactive<FormRules>({
	title: [{ required: true, message: '请输入标题', trigger: 'change' }],
	firstPicture: [{ required: true, message: '请输入首图链接', trigger: 'change' }],
	cate: [{ required: true, message: '请选择分类', trigger: 'change' }],
	tagList: [{ required: true, message: '请选择标签', trigger: 'change' }],
	description: [{ required: true, message: '请输入描述', trigger: 'change' }],
	content: [{ required: true, message: '请输入内容', trigger: 'change' }]
})
let categoryList = reactive<CateGory.ResCateGoryList[]>([])
let tagList = reactive<Tags.ResTagsList[]>([])
const dialogVisible = ref(false);
const formRef = ref<FormInstance>()
const toolbarConfig = ref()
let queryInfo = reactive({ page: 1, size: 10 });

const getData = async () => {
	let cateresult = await getCategoryList(queryInfo)
	categoryList.push(...cateresult.data.list)
	let tagresult = await getTagsList(queryInfo)
	tagList.push(...tagresult.data.list)
}

onMounted(() => {
	getData()
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (
	response,
	uploadFile
) => {
	form.firstPicture= URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error('Avatar picture size can not exceed 2MB!')
		return false
	}
	return true
}
const sumit=()=>{
	formRef.value?.validate(async (valid) => {
		if (valid) {
			// let result = await newTags({ name: formRef.name, color: formRef.color })
			// ElMessage.success(result.message);
			console.log(form);
			
		}
	})
}
</script>


<style scoped>
.avatar-uploader .avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
}
</style>