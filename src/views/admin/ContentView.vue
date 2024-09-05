<template>
	<el-table :data="contentArr">
		<el-table-column type="index" label="编号"></el-table-column>
		<el-table-column prop="title" width="150px" label="标题"></el-table-column>
		<el-table-column label="封面" width="80px">
			<template #default="scope">
				<img style="width: 100%;" />
			</template>
		</el-table-column>
		<el-table-column prop="brief" label="摘要" width="300px"></el-table-column>
		<el-table-column prop="type" label="分类" width="80px"></el-table-column>
		<el-table-column prop="viewCount" label="浏览量" width="80px"></el-table-column>
		<el-table-column prop="commentCount" label="评论量" width="80px"></el-table-column>
		<el-table-column prop="createTime" label="创建时间" width="180px"></el-table-column>

		<el-table-column label="操作" width="180px">
			<template #default="scope">
				<el-button type="success">编辑</el-button>
				<el-button type="danger">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const contentArr = ref([]);
</script>

<style>
</style>