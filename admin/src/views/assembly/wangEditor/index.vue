<template>
	<div>
		<el-form :model="form" :rules="formRules" ref="formRef" label-position="top">
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="文章标题" prop="title">
						<el-input v-model="form.title" placeholder="请输入标题"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="文章首图URL" prop="firstPicture">
						<el-input v-model="form.firstPicture" placeholder="文章首图，用于随机文章展示"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="分类" prop="cate">
						<el-select v-model="form.cate" placeholder="请选择分类（输入可添加新分类）" :allow-create="true" :filterable="true"
							style="width: 100%;">
							<el-option :label="item.name" :value="item.id" v-for="item in categoryList" :key="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="标签" prop="tagList">
						<el-select v-model="form.tagList" placeholder="请选择标签（输入可添加新标签）" :allow-create="true" :filterable="true"
							:multiple="true" style="width: 100%;">
							<el-option :label="item.name" :value="item.id" v-for="item in tagList" :key="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item label="文章描述" prop="description">
					<WangEditor height="300px" v-model:value="form.description" :toolbarConfig="toolbarConfig" mode="simple"/>
			</el-form-item>

			<el-form-item label="文章正文" prop="content">
				<WangEditor height="300px" v-model:value="form.content"   :toolbarConfig="toolbarConfig"  mode="simple"/>
			</el-form-item>
			<el-form-item style="text-align: right;">
				<el-button type="primary" @click="dialogVisible = true">保存</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>

<script setup lang="ts" name="wangEditor">
import { ref, reactive } from "vue";
import WangEditor from "@/components/WangEditor/index.vue";
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
	password: '',
})
const formRules = reactive({
	title: [{ required: true, message: '请输入标题', trigger: 'change' }],
	firstPicture: [{ required: true, message: '请输入首图链接', trigger: 'change' }],
	cate: [{ required: true, message: '请选择分类', trigger: 'change' }],
	tagList: [{ required: true, message: '请选择标签', trigger: 'change' }],
	words: [{ required: true, message: '请输入文章字数', trigger: 'change' }],
})
type List = {
	name: any,
	id: any
}
const categoryList = reactive<List>({ name: 'geren', id: 1234123 })
const tagList = reactive<List>({ name: 'geren', id: 1234123 })
const dialogVisible = ref(false);
const formRef = ref<any>()
const toolbarConfig=ref()
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
