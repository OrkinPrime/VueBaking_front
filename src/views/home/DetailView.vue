<template>
	<div style="width: 1200px;margin: 0 auto;">

		<!-- 食谱相关开始 -->
		<el-row :gutter="20">
			<el-col :span="18">
				<el-card>
					<h1 style="color: orange;text-align: center;">
						{{c.title}}
					</h1>
					<p style="text-align: center;font-size: 12px;color: #666;">
						作者: {{c.nickname}} | 发布时间: {{c.createTime}} | 阅读次数: {{c.viewCount}}
					</p>
					<hr />
					<div v-if="c.type!=2">
						<el-card>
							<b style="color: #0aa1ed;">摘要:</b>
							{{c.brief}}
						</el-card>
						<p v-html="c.content"></p>
					</div>
					<div v-else>
						<video :src="BASE_URL+c.videoUrl" style="width: 100%;" controls type="video/mp4"></video>
					</div>

				</el-card>
				<!-- 评论开始 -->
				<el-card style="margin-top: 20px;">
					<p>发一条友善的评论</p>
					<hr />
					<el-row>
						<el-col :span="22">
							<el-input v-model="comment.content" placeholder="请输入评论的内容....."></el-input>
						</el-col>
						<el-col :span="2">
							<el-button @click="postComment">发布</el-button>
						</el-col>
					</el-row>
					<!-- 评论列表 -->
					<el-row v-for="c in commentArr">
						<el-col :span="2">
							<el-avatar :src="BASE_URL+c.imgUrl"></el-avatar>
						</el-col>
						<el-col :span="22">
							<p style="color: orange;font-weight: bold;margin: 0;">{{c.nickname}}</p>
							<p style="margin: 5px 0;">{{c.content}}</p>
							<p style="color: #666;font-size: 12px;">{{c.createTime}}</p>
						</el-col>
					</el-row>
				</el-card>
				<!-- 评论结束 -->
			</el-col>
			<!-- 页面右侧开始 -->
			<el-col :span="6">
				<el-card>
					<div id="head_div"></div>
					<div style="text-align: center;position: relative;top: -45px;">
						<img :src="BASE_URL+c.userImageUrl"
							style="width: 90px;height: 90px;border: 5px solid white;border-radius: 90px;">
						<p style="font-size: 20px;font-weight: bold;margin: 0;"></p>
						<el-icon>
							<Edit />
						</el-icon>{{c.nickname}}<br />
						<el-icon>
							<Clock />
						</el-icon>{{c.createTime}}
					</div>
				</el-card>
				<!-- 作者其它文章开始 -->
				<el-card style="margin: 10px 0;">
					<h2>作者其它文章</h2>
					<hr />
					<el-row :gutter="20" v-for="oc in otherArr">
						<!-- 封面 -->
						<el-col :span="10">
							<img :src="BASE_URL+oc.imgUrl" style="width: 100%;height: 70px;" />
						</el-col>
						<!-- 标题 -->
						<el-col :span="14">
							<a :href="`/detail?id=${oc.id}`" class="title_p">
							{{oc.title}}
							</a>
							<!-- 创建时间 -->
							<el-icon>
								<Clock />
							</el-icon>
							<span style="font-size: xx-small;color: #666;">{{oc.createTime}}</span>
						</el-col>
					</el-row>
				</el-card>
				<!-- 作者其它文章结束 -->

				<!-- 作者热门文章开始 -->
				<el-card style="margin: 10px 0;">
					<h2>热门文章</h2>
					<hr />
					<el-row :gutter="20" v-for="hc in hotArr">
						<el-col :span="10">
							<img :src="BASE_URL+hc.imgUrl" style="width: 100%;height: 70px;" />
						</el-col>
						<el-col :span="14">
							<a :href="`/detail?id=${hc.id}`" class="title_p">
							{{hc.title}} 
							<div style="font-size: smaller;">
								浏览量：{{hc.viewCount}}
								</div>
							</a>
							<el-icon>
								<Clock />
							</el-icon>
							<span style="font-size: 12px;color: #666;">{{hc.createTime}}</span>
						</el-col>
					</el-row>
				</el-card>
				<!-- 作者热门文章结束 -->
			</el-col>
		</el-row>
		<!-- 内容列表结束 -->
	</div>
</template>

<script setup>
	import router from '@/router';
	import {
		onMounted,
		ref
	} from 'vue';
	import {
		ElMessage
	} from 'element-plus';
	const c = ref({});
	const otherArr = ref([]);
	const hotArr = ref([]);
	const comment = ref({
		content: ''
	});
	const commentArr = ref([])
	const postComment = () => {
		let user = getUser()
		if (user == null) {
			ElMessage.error("用户登录失效，请重新登录！")
			router.push('/login')
			return
		}
		if (comment.value.content.trim() == '') {
			ElMessage.error("评论内容不能为空！");
			return
		}
		//为评论赋值
		comment.value.userId = user.id
		comment.value.contentId = c.value.id
		let data = qs.stringify(comment.value)
		hy.post(BASE_URL + '/v1/comments/add-new', data).then((r) => {
			if (r.data.code == 2000) {
				ElMessage.success("评论发表成功！");
				loadComments(c.value.id)
			}
		})
	}
	const loadComments = (contentId) =>{
		hy.get(BASE_URL+`/v1/comments/${contentId}/all`).then((r)=>{
			if(r.data.code == 2000){
				commentArr.value = r.data.data
			}else{
				ElMessage.error(r.data.msg)
			}
		})
	}
	const getOther = (userId, id) => {
		hy.get(BASE_URL + `/v1/contents/${userId}/${id}/otherC`).then((r) => {
			if (r.data.code == 2000) {
				otherArr.value = r.data.data
			}
		})
	}
	const getHot = (id) => {
		hy.get(BASE_URL + `/v1/contents/${id}/hotC`).then((r) => {
			if (r.data.code == 2000) {
				hotArr.value = r.data.data
			}
		})
	}
	onMounted(() => {
		let id = new URLSearchParams(location.search).get("id")
		hy.get(BASE_URL + `/v1/contents/${id}/detail`).then((r) => {
			if (r.data.code == 2000) {
				c.value = r.data.data
				getOther(c.value.userId, id)
				getHot(id)
				loadComments(c.value.id)
			} else {
				ElMessage.error(r.data.msg)
			}
		})
	})
</script>

<style scoped>
	#head_div {
		height: 90px;
		background-image: url("/public/imgs/avarbg.jpg");
	}

	.title_p {
		height: 40px;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	a {
		color: #333;
		text-decoration: none;
	}

	a:hover {
		color: orange;
	}
</style>