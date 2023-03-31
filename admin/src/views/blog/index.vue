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
				<el-form-item label="封面" prop="first_pic">
					<el-upload class="avatar-uploader" action="http://localhost:3030/api/upload/rich_editor_uplaod"
						:show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="form.first_pic" :src="form.first_pic" class="avatar" />
						<el-icon v-else class="avatar-uploader-icon">
							<Plus />
						</el-icon>
					</el-upload>
				</el-form-item>
			</el-col>
			<el-form-item label="文章描述" prop="introduce">
				<WangEditor height="300px" v-model:value="form.introduce" :toolbarConfig="toolbarConfig" mode="simple" />
			</el-form-item>

			<el-form-item label="文章正文" prop="content">
				<WangEditor height="300px" v-model:value="form.content" :toolbarConfig="toolbarConfig" mode="simple" />
			</el-form-item>
			<el-form-item style="text-align: right;">
				<el-button type="primary" @click="submit()">保存</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>

<script setup lang="ts" name="wangEditor">
import { ref, reactive, onMounted } from "vue";
import { useRoute } from 'vue-router'
import { CateGory, Tags } from "@/api/interface/index";
import WangEditor from "@/components/WangEditor/index.vue";
import { getCategoryList, newCategory } from "@/api/modules/category";
import { CreateBlogList, getBlogById, UpdateBlogByid } from "@/api/modules/blog";
import { getTagsList, newTags } from "@/api/modules/tag";
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps, FormRules, FormInstance } from 'element-plus'

const route = useRoute()

const form = reactive({
	title: '',
	first_pic: "",
	introduce: '',
	content: '',
	cate: '',
	tagList: <string[]>[],
})
const formRules = reactive<FormRules>({
	title: [{ required: true, message: '请输入标题', trigger: 'change' }],
	first_pic: [{ required: true, message: '请输入首图链接', trigger: 'change' }],
	cate: [{ required: true, message: '请选择分类', trigger: 'change' }],
	tagList: [{ required: true, message: '请选择标签', trigger: 'change' }],
	introduce: [{ required: true, message: '请输入描述', trigger: 'change' }],
	content: [{ required: true, message: '请输入内容', trigger: 'change' }]
})
let addcolor = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399'];
let categoryList = reactive<CateGory.ResCateGoryList[]>([])
let tagList = reactive<Tags.ResTagsList[]>([])
const formRef = ref<FormInstance>()
const toolbarConfig = ref()
let catelist = new Set()
let taglist = new Set()
let queryInfo = reactive({ page: 1, size: 100 });

const getData = async () => {
	let cateresult = await getCategoryList(queryInfo)
	categoryList.push(...cateresult.data.list)
	for (let item of categoryList) {
		catelist.add(item.category_id)
	}
	let tagresult = await getTagsList(queryInfo)

	tagList.push(...tagresult.data.list)
	for (let item of tagList) {
		taglist.add(item.tag_id)
	}
}
const getDataByid = async (id: number) => {
	let result = await getBlogById({ blog_id: id })
	let data = result.data
	console.log(data);

	form.title = data.title;
	form.content = data.content;
	form.first_pic = data.first_pic;
	form.introduce = data.introduce;
	form.cate = data.category_id;
	data.tag.map((item) => {
		form.tagList.push(String(item.tag_id))
	})
}
onMounted(() => {
	if (route.query.id) {
		getDataByid(Number(route.query.id))

	}
	getData()
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (
	response,
	uploadFile
) => {
	console.log(uploadFile, response, "pic");
	form.first_pic = response.data.fileUrl
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
	if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error('Avatar picture size can not exceed 2MB!')
		return false
	}
	return true
}
const submit = () => {
	formRef.value?.validate(async (valid) => {
		if (valid) {
			let cate = 0;
			if (!catelist.has(form.cate)) {
				let result = await newCategory({ name: form.cate })
				cate = result.data.category_id
			}
			else {
				cate = Number(form.cate)
			}
			console.log(form.tagList);
			let submittag = [];
			for (let tag of form.tagList) {
				if (!taglist.has(tag)) {
					let color = addcolor[Math.floor(Math.random() * (5)) + 1]
					let result = await newTags({ name: tag, color })
					submittag.push(result.data.tag_id)
				}
				else {
					submittag.push(tag)
				}
			}
			let result;
			if (route.query.id) {
				let data = { blog_id: route.query.id, title: form.title, introduce: form.introduce, first_pic: form.first_pic, category_id: cate, tag: submittag.toString(), content: form.content }
				result = await UpdateBlogByid(data);
			}
			else {
				let data = { title: form.title, introduce: form.introduce, first_pic: form.first_pic, category_id: cate, tag: submittag.toString(), content: form.content }
				result = await CreateBlogList(data);
			}
			ElMessage.success(result?.message);

			form.title = ''
			form.first_pic = ""
			form.introduce = ''
			form.content = ''
			form.cate = ''
			form.tagList = <string[]>[]

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