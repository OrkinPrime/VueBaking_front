<template>
	<div class="common-layout">
		<el-container style="background-color: white;">
			<el-header style="background-color: #336688;">
				<h1 style="font-size: 30px;margin: 0;color: white;">
					烘焙坊后台管理系统
					<span style="float: right;font-size: 20px;">欢迎 xxxx 回来
						<a href="javascript:void(0)" style="color: orange;text-decoration: none;">退出登录</a>
					</span>
				</h1>
			</el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu router active-text-color="orange" default-active="1">
						<img src="/imgs/icon.png" style="width: 150px;" />
						<el-menu-item index="1">
							<el-icon>
								<User />
							</el-icon>用户管理
						</el-menu-item>
						<el-menu-item index="2">
							<el-icon>
								<Picture></Picture>
							</el-icon>轮播图管理
						</el-menu-item>
						<el-menu-item index="3">
							<el-icon>
								<ChatLineSquare />
							</el-icon>内容管理
						</el-menu-item>
					</el-menu>
				</el-aside>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>


<script setup>
	import router from '@/router';
	import {
		ref
	} from 'vue';
</script>

<style>
</style>