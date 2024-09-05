<template>
	<div style="width: 1200px;margin: 0 auto;">
		<el-row :gutter="20">
			<el-col :span="4">
				<el-card style="height: 100%;">
					<!-- router属性：使得每个子导航选项都有跳转功能，index为路径 -->
					<!-- active-text-color属性：被激活的子选项字体颜色 -->
					<el-menu router active-text-color="orange" style="border: 0;">
						<el-menu-item index="/personal/index">个人信息</el-menu-item>
						<el-menu-item index="/personal/management">稿件管理</el-menu-item>
					</el-menu>
				</el-card>
			</el-col>
			<el-col :span="20">
				<router-view></router-view>
			</el-col>
		</el-row>
	</div>
</template>

<script>
</script>

<style>
</style>