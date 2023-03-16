<template>
	<div ref="echartsRef" class="card content-box"></div>
</template>

<script setup lang="ts" name="lineChart">
import { ref, onMounted, toRefs, onUpdated } from "vue";
import * as echarts from "echarts";
import { useEcharts } from "@/hooks/useEcharts";
const echartsRef = ref<HTMLElement>();

const props =  defineProps({
	data:{type:Object},
})
const {data}=toRefs(props)
let myChart: echarts.ECharts;
setTimeout(() => {
	myChart = echarts.init(echartsRef.value as HTMLElement);
}, 400);

onUpdated(() => {
	let option:echarts.EChartsOption={
		title: {
			text: `${data?.value?.type}`,
			textStyle: {
				color: "#a1a1a1"
			}
		},
		xAxis: [
			{
				type: "category",
				boundaryGap: false,
				data: data?.value?.y,
				axisLabel: {
					color: "#a1a1a1"
				}
			}
		],
		series: [
			{
				name: "Email",
				type: "line",
				stack: "Total",
				areaStyle: {},
				emphasis: {
					focus: "series"
				},
				data: data?.value?.x,
			},
		]
	}
	myChart.setOption(option)
}),
 
onMounted(() => {
	myChart = echarts.init(echartsRef.value as HTMLElement);
	let option: echarts.EChartsOption = {
			title: {
				text: `"${data?.value?.type}"`,
				textStyle: {
					color: "#a1a1a1"
				}
			},
			tooltip: {
				trigger: "axis",
				axisPointer: {
					type: "cross",
					label: {
						backgroundColor: "#6a7985"
					}
				}
			},

			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			grid: {
				left: "3%",
				right: "4%",
				bottom: "3%",
				containLabel: true
			},
			xAxis: [
				{
					type: "category",
					boundaryGap: false,
					data: data?.value?.y,
					axisLabel: {
						color: "#a1a1a1"
					}
				}
			],
			yAxis: [
				{
					type: "value",
					axisLabel: {
						color: "#a1a1a1"
					}
				}
			],
			series: [
				{
					name: "Email",
					type: "line",
					stack: "Total",
					areaStyle: {},
					emphasis: {
						focus: "series"
					},
					data: [120, 132, 101, 134, 90, 230, 210]
				},
			]
		};
		console.log(myChart, option);
		
	useEcharts(myChart, option);
});

</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
