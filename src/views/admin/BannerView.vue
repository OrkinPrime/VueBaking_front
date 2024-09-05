<template>
	<el-table :data="bannerArr">
		<el-table-column type="index" label="编号"></el-table-column>
		<el-table-column label="轮播图">
			<template #default="scope">
				<img style="width: 300px;" />
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template #default="scope">
				<el-button type="danger">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script setup>
	import {
		ElMessage
	} from 'element-plus';
	import {
		onMounted,
		ref
	} from 'vue';
	const bannerArr = ref([])
</script>

<style>
</style>