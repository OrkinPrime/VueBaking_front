<template>
	<el-card>
		<el-radio-group v-model="type" @change="loadContent">
			<el-radio-button label="1">烘焙食谱</el-radio-button>
			<el-radio-button label="2">烘焙视频</el-radio-button>
			<el-radio-button label="3">烘焙资讯</el-radio-button>
		</el-radio-group>
		<el-button @click="router.push('/personal/post')" style="position: relative;top: 3px;left: 10px;"
			type="success">发布内容</el-button>
		<!-- 内容列表开始-->
		<el-table :data="contentArr">
			<el-table-column type="index" label="编号" width="60px"></el-table-column>
			<el-table-column prop="title" label="标题" width="150px"></el-table-column>
			<el-table-column prop="brief" label="摘要" width="200px"></el-table-column>
			<el-table-column label="封面" width="80px">
				<template #default="scope">
					<img :src="BASE_URL+scope.row.imgUrl" style="width: 75px;" />
				</template>
			</el-table-column>
			<el-table-column prop="categoryName" label="分类"></el-table-column>
			<el-table-column prop="viewCount" label="浏览量"></el-table-column>
			<el-table-column prop="commentCount" label="评论量"></el-table-column>
			<el-table-column prop="createTime" label="发布时间" width="100px"></el-table-column>
			<el-table-column label="操作" width="180px" fixed="right">
				<!-- 自定义列必须添加下面的template标签 -->
				<template #default="scope">
					<!-- scope.$index得到当前行的下标 scope.row得到当前行对应的对象 -->
					<el-button @click="router.push(`/personal/post?id=${scope.row.id}`)" type="success">编辑</el-button>
					<el-button @click="remove(scope.$index,scope.row.id)" type="danger">删除</el-button>
				</template>
			</el-table-column>

		</el-table>
		<!-- 内容列表结束 -->
	</el-card>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from "vue";
	import router from "@/router";
	import {
		ElMessage
	} from 'element-plus';
	const type = ref(1);
	const contentArr = ref([]);

	const loadContent = () => {
		let user = getUser();

		// console.log("用户信息：" + user.id)
		// console.log("类型信息：" + type.value)

		// 获取localStorage中的所有键名
		var keys = Object.keys(localStorage);

		// // 检查是否有数据
		// if (keys.length === 0) {
		// 	console.log('localStorage is empty.');
		// } else {
		// 	// 遍历所有键名并打印对应的键值对
		// 	keys.forEach(function(key) {
		// 		console.log(key + ': ' + localStorage.getItem(key));
		// 	});
		// }

		if (user == null) {
			ElMessage.error("登录信息失效，请重新登录")
			router.push("/login")
		}
		hy.get(BASE_URL + `/v1/contents/${user.id}/${type.value}`).then((r) => {
			if (r.data.code == 2000) {
				// console.log("返回信息:")
				// console.log(r.data.data)
				contentArr.value = r.data.data;
			} else {
				ElMessage.error(r.data.msg);
			}
		})
	}

	const remove = (arrIndex,id)=>{
		hy.post(BASE_URL + `/v1/contents/remove/${id}`).then((respon) => {
			// console.log(respon)
			if (respon.data.code == 2000) {
				contentArr.value.splice(arrIndex,1)
				ElMessage.success("删除成功！")
			} else {
				ElMessage.error(respon.data.msg)
			}
		})
		
	}

	onMounted(() => {
		loadContent()
	})
</script>

<style>
</style>