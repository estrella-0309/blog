<template>
	<div class="tool-bar-ri">
		<div class="header-icon">
			<SwitchDark></SwitchDark>
			<AssemblySize id="assemblySize" />
			<Fullscreen id="fullscreen" />
		</div>
		<span class="username">lzz</span>
		<Avatar />
	</div>
</template>

<script setup lang="ts">
import SwitchDark from "@/components/SwitchDark/index.vue";
import Fullscreen from "./components/Fullscreen.vue";
import AssemblySize from "./components/AssemblySize.vue";
import Avatar from "./components/Avatar.vue";
</script>

<style scoped lang="scss">
.tool-bar-ri {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 30px 0 0;

	.header-icon {
		display: flex;
		align-items: center;

		&>* {
			margin-left: 21px;
		}
	}

	.username {
		margin: 0 20px;
		font-size: 15px;
	}
}</style>
