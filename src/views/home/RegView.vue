<template>
	<div style="width: 1200px;margin: 0 auto;">
		<el-row :gutter="20">
			<!-- 将页面均匀分块，:span="12" 意为占12块 (只适配PC端)-->
			<el-col :span="12">
				<el-card>
					<img src="/imgs/reg.png" style="width: 100%;" />
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-form label-width="100px" style="margin-top: 30px;">
					<el-form-item>
						<h1 style="font-size: 40px;width: 100%;">
							立即注册
							<router-link to="/login"
								style="font-size: 20px;color: #0aa1ed;text-decoration: none;float: right;">
								已有账号？现在登录
							</router-link>
						</h1>
					</el-form-item>
					<el-form-item label="用户名">
						<!-- 用户名不可重复，于后端检测后反馈 -->
						<el-input type="text" placeholder="请输入用户名" v-model="user.username"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input type="password" placeholder="请输入密码" v-model="user.password"></el-input>
					</el-form-item>
					<el-form-item label="昵称">
						<el-input type="text" placeholder="请输入昵称" v-model="user.nickname"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="reg">注册</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		ElMessage
	} from 'element-plus';
	import router from '@/router';
	const user = ref({
		username: "",
		password: "",
		nickname: ""
	})

	const reg = () => {
		//测试输出
		console.log(user)
		hy.post(BASE_URL + '/v1/users/reg', qs.stringify(user.value)).then((respon) => {
			//测试输出
			console.log(respon)
			if (respon.data.code == 2000) {
				ElMessage.success("注册成功")
				// 两层封装，最外层为响应对象
				router.push('/login')
			} else {
				ElMessage.error(respon.data.msg)
			}
		})
	}
</script>

<style scoped>

</style>