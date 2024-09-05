<template>
	<el-container>
		<el-header height="80px" style="background-color: white;">
			<Header></Header>
		</el-header>
		<el-main>
			<!-- 路由跳转占位，二级页面区域 -->
			<router-view></router-view>
		</el-main>
		<el-footer style="background-color: black;height: 280px;padding: 50px 0;">
			<Footer></Footer>
		</el-footer>
	</el-container>
</template>

<script setup>
	import {
		Search
	} from '@element-plus/icons-vue'
	import Header from '../components/Header.vue'
	import Footer from '../components/Footer.vue'
</script>

<style scoped>

</style>