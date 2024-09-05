<template>
	<div style="width: 1200px;margin: 0 auto;">
		<!-- 相关开始 -->
		<el-row :gutter="20">
			<el-col :span="6" v-for="v in contentArr">
				<el-card>
					<router-link :to="`/detail?id=${v.id}`">
						<img :src="BASE_URL+'/images'+v.contentImgUrl" style="width: 100%;height: 145px;" />
						<p class="title_p">{{v.title}}</p>
					</router-link>
					<el-row>
						<el-col :span="4">
							<el-avatar :src="BASE_URL+'/images'+v.userImgUrl" :size="35"></el-avatar>
						</el-col>
						<el-col :span="20">
							<p style="margin-top: 10px;">
								{{v.nickname}}
								<span style="font-size: 12px;color: #666;float: right;">
									{{v.categoryName}}
								</span>
							</p>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>
		<!-- 内容列表结束 -->
	</div>
</template>

<script setup>
	import {
		ElMessage
	} from 'element-plus';
	import {
		onBeforeUpdate,
		onMounted,
		ref
	} from 'vue';
	const contentArr = ref([]);
	const loadContents = () => {
		let type = new URLSearchParams(location.search).get("type")
		let kw = new URLSearchParams(location.search).get("kw")
		if (type != null) {
			hy.get(BASE_URL + `/v1/contents/${type}/list`).then((r) => {
				if (r.data.code == 2000) {
					contentArr.value = r.data.data
				} else {
					ElMessage.error(r.data.msg)
				}
			})
		} else if (kw != null) {
			hy.get(BASE_URL + `/v1/contents/${kw}/search`).then((r) => {
				if (r.data.code == 2000) {
					contentArr.value = r.data.data
				} else {
					ElMessage.error(r.data.msg)
				}
			})
		}
	}
	onMounted(() => {
		loadContents()
	})
	onBeforeUpdate(() => {
		loadContents()
	})
</script>

<style scoped>
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