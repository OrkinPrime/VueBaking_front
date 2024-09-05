<template>
	<el-card>
		<el-form label-width="80px">
			<el-form-item label="文章标题">
				<el-input placeholder="请输入文章标题" v-model="c.title"></el-input>
			</el-form-item>
			<el-form-item label="文章分类">
				<el-radio-group v-model="c.type" @change="getCategoryArr">
					<!-- 选择任意一个都会触发@change -->
					<el-radio-button label="1" :disabled="status&&c.type!=1">食谱</el-radio-button>
					<el-radio-button label="2" :disabled="status&&c.type!=2">视频</el-radio-button>
					<el-radio-button label="3" :disabled="status&&c.type!=3">资讯</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="二级分类" >
				<el-select v-model="c.categoryId">
					<el-option v-for="cat in categoryArr" :label="cat.name" :value="cat.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="封面">
				<!-- 上传组件开始 -->
				<el-upload v-model:file-list="fileList" action="http://localhost:8080/v1/uploads/file"
					list-type="picture-card" name="file" :limit="1" :on-preview="handlePictureCardPreview"
					:on-remove="handleRemove" :on-success="handleSuccess">
					<el-icon>
						<Plus />
					</el-icon>
				</el-upload>

				<el-dialog v-model="dialogVisible">
					<img w-full :src="dialogImageUrl" alt="Preview Image" />
				</el-dialog>
				<!-- 上传组件结束 -->
			</el-form-item>

			<el-form-item v-show="c.type==2" label="视频">
				<!-- 上传组件开始 -->
				<el-upload action="http://localhost:8080/v1/uploads/file" accept="video/*" name="file" :limit="1"
					:on-remove="handleRemove" :on-success="handleSuccess">
					<el-button>点击上传视频</el-button>
					<div>只能上传mp4文件，且不超过100MB</div>
				</el-upload>

				<el-dialog v-model="dialogVisible">
					<img w-full :src="dialogImageUrl" alt="Preview Image" />
				</el-dialog>
				<!-- 上传组件结束 -->
			</el-form-item>

			<el-form-item v-show="c.type!=2" label="文章内容">
				<!-- 富文本编辑器的元素 -->
				<div ref="editorContent">

				</div>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="postContent">{{c.id==null?'发布':'修改'}}内容</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	import {
		Plus
	} from '@element-plus/icons-vue';
	//导入富文本编辑器
	import Editor from 'wangeditor';
	import router from '@/router';
	import {
		ElMessage
	} from 'element-plus';
	//得到页面中用来装编辑器的div
	const editorContent = ref(null);
	// 和页面元素绑定的内容对象
	const c = ref({
		title: "",
		type: "1",
		categoryId: ""
	});
	const h = ref([])
	const dialogImageUrl = ref('')
	const dialogVisible = ref(false)
	const categoryArr = ref([]);
	const status = ref(false);
	const fileList = ref([])

	let editor = null;
	//在 Vue实例挂载完成时初始化富文本编辑器
	onMounted(() => {
		if (location.search.includes("id")) {
			let id = new URLSearchParams(location.search).get("id")
			// console.log(id)
			hy.get(BASE_URL + `/v1/contents/${id}/content`).then((r) => {
				if (r.data.code == 2000) {
					c.value = r.data.data
					getCategoryArr()
					fileList.value[0] = {
						url: BASE_URL + c.value.imgUrl
					}
					editor.txt.html(c.value.content) //对应添加富文本编辑器内容
					status.value = true;
				}
			})
		}
		getCategoryArr()
		editor = new Editor(editorContent.value);
		editor.config.placeholder = "请输入内容详情......";
		//将富文本编辑器渲染到页面中
		editor.create();
	})

	const getCategoryArr = () => {
		hy.get(BASE_URL + `/v1/categories/${c.value.type}/sub`).then((r) => {
			if (r.data.code == 2000) {
				categoryArr.value = r.data.data
			}
		})
	}


	const handleRemove = (uploadFile, uploadFiles) => {
		let url = null

		if (uploadFile.name != null) { //判断照片是用户上传的还是从数据库中读出来的
			if (uploadFile.raw.type.includes('image')) {
				c.value.imgUrl = null; //只在前端清空了
			} else {
				c.value.videoUrl = null;
			}
			url = uploadFile.response.data
		} else {
			url = c.value.imgUrl
			c.value.imgUrl = null
		}
		//判断上传的是图片还是视频
		hy.post(BASE_URL + '/v1/uploads/file/remove?url=' + url, null).then((
			respon) => {
			if (respon.data.code == 2000) {
				ElMessage.success("删除成功")
			} else {
				ElMessage.error(respon.data.msg)
			}
		})

	}
	const handleSuccess = (response, uploadFile, uploadFiles) => {
		//判断上传的是图片还是视频
		if (uploadFile.raw.type.includes('image')) {
			c.value.imgUrl = response.data
			console.log("封面路径："+c.value.imgUrl)
		} else {
			c.value.videoUrl = response.data
			console.log("视频路径："+c.value.videoUrl)
		}
	}
	const handlePictureCardPreview = (uploadFile) => {
		dialogImageUrl.value = uploadFile.url
		dialogVisible.value = true
	}

	const postContent = () => {
		//main.js中的全局函数
		let user = getUser()
		// console.log("开始发送")
		//一系列检验
		if (user == null) {
			ElMessage.error("登录信息失效，请重新登录")
			router.push("/login")
			return
		}
		if (c.value.title == "") {
			ElMessage.error("请填写标题！")
			return
		}
		if (c.value.imgUrl == null) {
			ElMessage.error("请上传封面！")
			return
		}
		if (c.value.categoryId<=1||c.value.categoryId>=10) {
			ElMessage.error("请选择二级栏目！")
			return
		}
		if (c.value.type != 2) {
			c.value.content = editor.txt.html() //获取富文本编辑器的内容
			c.value.brief = editor.txt.text().slice(0, 30) //截取
			if (c.value.brief == '' || c.value.content == null) {
				ElMessage.error("请填写内容！")
				return
			}
		} else {
			if (c.value.videoUrl == null) {
				ElMessage.error("请上传视频！")
				return
			}
		}
		//发送请求
		// console.log("用户" + user.id)
		c.value.createBy = user.id;
		let data = qs.stringify(c.value)
		// console.log("数据" + data)
		hy.post(BASE_URL + '/v1/contents/add-new', data).then((respon) => {
			// console.log(respon)
			if (respon.data.code == 2000) {
				if (c.value.id) {
					ElMessage.success("修改成功！")
				} else
					ElMessage.success("发布成功！")
				router.push("/personal/management")
			} else {
				// console.log(respon)
				ElMessage.error(respon.data.msg)
			}
		})
	}
</script>

<style>
</style>