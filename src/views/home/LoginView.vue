<template>
	<div id="main-div">
		<el-card style="width: 500px;height: 300px;margin: 50px auto;">
			<el-form label-width="80px" style="margin-top: 50px;width: 430px">
				<el-form-item label="用户名">
					<el-input type="text" placeholder="请输入用户名" v-model="user.username"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input type="password" placeholder="请输入密码" v-model="user.password"></el-input>
				</el-form-item>
				<el-form-item style="position: relative;left: 120px;">
					<el-button type="primary" @click="login">登录</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script setup>
	// 登录接口 http://localhost:8080/v1/users/login
	// 参数 username   password
	import {
		ElMessage
	} from 'element-plus';
	import {
		ref
	} from 'vue';
	const user = ref({
		username: "",
		password: ""
	})

	//使用axios发送请求
	const login = () => {
		hy.post(BASE_URL + '/v1/users/login', qs.stringify(user.value)).then((respon) => {
			//测试输出
			console.log(respon)
			if (respon.data.code == 2000) {
				ElMessage.success("登录成功")
				// 两层封装，最外层为响应对象
				localStorage.setItem("user", JSON.stringify(respon.data.data))
				location.href = "/"
			} else {
				ElMessage.error(respon.data.msg)
			}
		})
	}
</script>

<style scoped>
	#main-div {
		overflow: hidden;
		height: 500px;
		background-image: url('/public/imgs/loginbg.gif');
		background-size: cover;
		/* 设置背景图片为封面 */
		background-position: center;
		/* 设置背景图片居中 */
	}
</style>