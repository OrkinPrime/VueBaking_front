<template>
	<el-table :data="userArr">
		<el-table-column type="index" label="编号"></el-table-column>
		<el-table-column prop="username" label="用户名"></el-table-column>
		<el-table-column prop="nickname" label="昵称"></el-table-column>
		<el-table-column prop="" label="头像">
			<template #default="scope">
				<el-avatar></el-avatar>
			</template>
		</el-table-column>
		<el-table-column label="管理员">
			<template #default="scope">
				<el-switch></el-switch>
			</template>
		</el-table-column>
		<el-table-column prop="createTime" label="创建时间"></el-table-column>
		<el-table-column label="操作">
			<template #default="scope">
				<el-button type="danger">删除</el-button>
			</template>
		</el-table-column>

	</el-table>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const userArr = ref([]);
</script>

<style>
</style>