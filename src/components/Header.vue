<template>
	<div style="width: 1200px; margin: 0 auto;">
		<el-row :gutter="20">
			<el-col :span="6">
				<router-link to="/">
					<img src="/imgs/icon.png" width="200" />
				</router-link>
			</el-col>
			<el-col :span="10">
				<el-menu router mode="horizontal" active-text-color="orange">
					<el-menu-item index="/">首页</el-menu-item>
					<el-menu-item index="/list?type=1">食谱</el-menu-item>
					<el-menu-item index="/list?type=2">视频</el-menu-item>
					<el-menu-item index="/list?type=3">咨询</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="6">
				<el-input v-model="keyword" style="position: relative;top: 15px;" placeholder="请输入搜索的关键字">
					<template #append>
						<el-button :icon="Search" @click="searchContent" />
					</template>
				</el-input>
			</el-col>
			<el-col :span="2">
				<el-popover v-if="user==null" placement="top-start" :title="'欢迎来到烘焙坊'" :width="200" trigger="hover">
					<template #reference>
						<el-icon :size="30" style="position: relative; top:15px">
							<User></User>
						</el-icon>
					</template>
					<!-- 路由跳转 -->
					<!-- 1.动态路由跳转（已有按钮，此处使用） -->
					<!-- 2.router-link -->
					<!-- 从router文件夹导入router -->
					<!-- 使用push改变url -->
					<el-button type="info" @click="router.push('/reg')">注册</el-button>
					<el-button type="warning" @click="router.push('/login')">登录</el-button>
				</el-popover>

				<el-popover v-else placement="top-start" title="欢迎来到烘焙坊" :width="200" trigger="hover">
					<template #reference>
						<el-icon :size="30" style="position: relative; top:15px">
							<User></User>
						</el-icon>
					</template>
					<div style="text-align: center;">
						<el-avatar :src="BASE_URL+user.imgUrl"></el-avatar><br />
						<el-button type="info" size="small" @click="router.push('/personal')">个人中心</el-button>
						<el-button type="warning" size="small" @click="logout">退出登录</el-button>
						<!-- <el-button v-if="user.isAdmin==1" size="small" type="danger" >后台管理页面</el-button> -->
					</div>

				</el-popover>
			</el-col>


		</el-row>
	</div>
</template>
<script setup>
	import {
		Search
	} from '@element-plus/icons-vue';
	import router from '../router'
	import {
		ref
	} from 'vue';
	const keyword = ref(null)

	const searchContent = () => {
		router.push(`/list?kw=${keyword.value}`)
		console.log(keyword.value)
	}
	//				如果客户端有此对象的字符串，			则将字符串转换成对象				  否则设为空
	const user = ref(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null)

	const logout = () => {
		localStorage.removeItem("user")
		user.value = null
		//页面刷新
		location.href = "/"
	}
</script>