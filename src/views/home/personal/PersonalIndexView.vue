<template>
	<el-card style="height: 500px;">
		<el-form label-width="80px" style="width: 500px;">
			<el-form-item label="头像">
				<!-- 上传组件开始 name属性设置向后端上传的参数变了名称  limit设置上传的数量 -->
				<!-- v-model:file-list="fileList" 默认是数组 -->
				<!-- action 选择完对象就向此地址发送 -->
				<!--  -->
				<el-upload v-model:file-list="fileList" action="http://localhost:8080/v1/uploads/file" name="file"
					:limit="1" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
					:on-success="handleSuccess">
					<el-icon>
						<Plus />
					</el-icon>
				</el-upload>

				<el-dialog v-model="dialogShow">
					<img w-full :src="dialogImgUrl" alt="Preview Image" />
				</el-dialog>
				<!-- 上传组件结束 -->
			</el-form-item>
			<el-form-item label="昵称">
				<el-input placeholder="请输入昵称" v-model="user.nickname"></el-input>
			</el-form-item>
			<el-form-item label="用户名">
				<el-input disabled v-model="user.username"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="uodateUserInfo">修改</el-button>
			</el-form-item>

		</el-form>
	</el-card>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue'
	import {
		Plus
	} from '@element-plus/icons-vue'
	import {
		dialogEmits
	} from 'element-plus';
	import {
		ElMessage
	} from 'element-plus';

	//文件列表
	//el-upload使用数组
	const fileList = ref([])

	//预览窗口
	const dialogShow = ref(false)
	//预览图片url
	const dialogImgUrl = ref('')
	//从localStorage获取已经登录的用户信息，未登录则为空
	const user = ref(
		localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
	)

	//保证不会因为user中imgUrl为空而引发显示空图片，进而引发删除错误
	onMounted(() => {
		if (user.value.imgUrl != null) {
			fileList.value[0] = {
				"url": `http://localhost:8080/images${user.value.imgUrl}`
			} //后端资源访问地址
		}
	})

	//删除调用
	const handleRemove = (uploadFile) => {

		let url = user.value.imgUrl ? user.value.imgUrl : uploadFile.response.data

		hy.post(BASE_URL + '/v1/uploads/file/remove?url=' + url, qs.stringify(user.value)).then((
			respon) => {
			//测试输出
			console.log(respon)
			if (respon.data.code == 2000) {
				ElMessage.success("删除成功")
				user.value.imgUrl = null;
				// 更新localStorage中的用户信息
				localStorage.setItem("user", JSON.stringify(user.value));
				// 清除fileList中的文件
				fileList.value = [];
			} else {
				// console.log(respon)
				ElMessage.error(respon.data.msg)
			}
		})
	}
	//图片预览模态框的显示
	const handlePictureCardPreview = (uploadFile) => {
		// console.log("user.value.imgUrl:" + user.value.imgUrl)
		// console.log("uploadFile:" + uploadFile.url)
		dialogShow.value = true
		dialogImgUrl.value = uploadFile.url
	}
	
	//上传成功时将经过后端处理的上传的图片信息保存在前端
	const handleSuccess = (response, uploadFile, uploadFiles) => {
		//测试输出
		console.log(response)
		user.value.imgUrl = response.data
	}
	//提交修改用户信息
	const uodateUserInfo = () => {
		hy.post(BASE_URL + '/v1/users/update', qs.stringify(user.value)).then((respon) => {
			//测试输出
			console.log(respon)
			if (respon.data.code == 2000) {
				ElMessage.success("修改成功")
				localStorage.setItem("user", JSON.stringify(user.value))
				location.reload()
			} else {
				ElMessage.error(respon.data.msg)
			}
		})
	}
</script>

<style>
</style>