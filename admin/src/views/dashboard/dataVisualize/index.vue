<template>
	<div class="dataVisualize-box">
		<div class="top-box">
			<div class="item-center ">
				<div class="PV-traffic traffic-box"  @click="ChangeLine('pv')">
					<div class="traffic-img">
							<img src="./images/today.png" alt="" />
					</div>
					<div class="userinfo">
						<div class="traffic-name sle">今日访问量</div>
						<div class="item-value">4567</div>
					</div>
				</div>
				<div class="blog-traffic traffic-box"  @click="ChangeLine('blog')">
					<div class="traffic-img">
					<el-icon><Document /></el-icon>
					</div>
					<div class="userinfo">
						<div class="traffic-name sle">文章数</div>
						<div class="item-value">4567</div>
					</div>
				</div>
				<div class="today-traffic traffic-box"  @click="ChangeLine('comment')">
					<div class="traffic-img">
					<el-icon><ChatDotSquare /></el-icon>
					</div>
					<div class="userinfo">
						<div class="traffic-name sle">评论数</div>
						<div class="item-value">4567</div>
					</div>

				</div>
				<div class="yesterday-traffic traffic-box"  @click="ChangeLine( 'tag')">
					<div class="traffic-img">
						<img src="./images/book_sum.png" alt="" />
					</div>
					<div class="userinfo">
						<div class="traffic-name sle">标签数</div>
						<div class="item-value">4567</div>
					</div>
				</div>
			</div>
		</div>
		<main>
		
			<div class="main-left">
				<LineChart  :data="linedata" ></LineChart>
			</div>
			<div class="main-right">
				<pieChart></pieChart>

			</div>
		</main>
	</div>
</template>

<script setup lang="ts" name="dataVisualize">
import  LineChart  from "@/views/echarts/lineChart/index.vue";
import pieChart from "@/views/echarts/pieChart/index.vue";
import { ref, onMounted } from "vue";

onMounted(() => {
});

type AllowType ='pv' | 'blog' | 'comment' | 'tag'
let type=ref<AllowType>('pv')
const data:Map<AllowType,Object>=new Map();
data.set('pv', {
	x: [1, 2, 3, 4, 5],
	y: ['3-12', '3-12', '3 - 12', '3-12'],
	type:'pv'
})
data.set('blog', {
	x: [4, 2, 35, 44, 123],
	y: ['3-12', '3-12', '3 - 12', '3-12'],
	type: 'blog'
})
data.set('comment', {
	x: [4, 2, 35, 44, 123],
	y: ['3.10-3.12', '3-12', '3 - 12', '3-12'],
	type: 'comment'
})
data.set('tag', {
	x: [4, 2, 35, 44, 123],
	y: ['3-12', '3-12', '3 - 12', '3-12'],
	type: 'tag'
})
let linedata=ref<Object>({
	x: [1, 2, 3, 4, 5],
	y: ['3-12', '3-12', '3 - 12', '3-12'],
	type: 'pv'
})

const ChangeLine= (chosetype: AllowType)=> {
	console.log(chosetype,linedata);
	type.value= chosetype
	linedata.value = JSON.parse(JSON.stringify(data.get(type.value))) || {}
	console.log(linedata.value);
}
// const pieData = [
// 	{ value: 5000, name: "Gitee 访问量" },
// 	{ value: 5000, name: "GitHub 访问量" }
// ];
// const curveData = [
// 	{ value: 30, spotName: "掘金" },
// 	{ value: 90, spotName: "CSDN" },
// 	{ value: 10, spotName: "Gitee" },
// 	{ value: 70, spotName: "GitHub" },
// 	{ value: 20, spotName: "知乎" },
// 	{ value: 60, spotName: "MyBlog" },
// 	{ value: 55, spotName: "简书" },
// 	{ value: 80, spotName: "StackOverFlow" },
// 	{ value: 50, spotName: "博客园" }
// ];
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
