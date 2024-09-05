<template>
	<div style="width: 1200px;margin: 0 auto;">
		<el-carousel>
			<el-carousel-item v-for="b in bannerArr">
				<img :src="b.imgUrl" style="width: 100%;height: 100%;" />
			</el-carousel-item>
		</el-carousel>
		<div>
			<!-- 食谱相关开始 -->
			<el-row style="background-color: white;">
				<el-col :span="3">
					<p style="font-size: 28px;margin: 10px;">烘焙食谱</p>
				</el-col>

				<el-col :span="21">
					<el-menu @select="recipeSelect" mode="horizontal" default-active="0" active-text-color="orange">
						<el-menu-item :index="''+0">全部</el-menu-item>
						<el-menu-item v-for="c in recipeCategoryArr" :index="''+c.id">{{c.name}}</el-menu-item>
					</el-menu>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="6" v-for="v in recipeArr">
					<el-card>
						<router-link :to="`/detail?id=${v.id}`">
							<img :src="BASE_URL+v.contentImgUrl" style="width: 100%;height: 145px;" />
							<p class="title_p">{{v.title}}</p>
						</router-link>
						<el-row>
							<el-col :span="4">
								<el-avatar :src="BASE_URL+v.userImgUrl" :size="35"></el-avatar>
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
			<div style="text-align: center;margin-top: 5px;">
				<el-button @click="moreContent(1)">
					点击加载更多
				</el-button>
			</div>
			<!-- 内容列表结束 -->
			<!-- 食谱相关结束 -->
		</div>
		<div>
			<!-- 烘焙视频开始 -->
			<el-row style="background-color: white;">
				<el-col :span="3">
					<p style="font-size: 28px;margin: 10px;">烘焙视频</p>
				</el-col>
				<el-col :span="21">
					<el-menu @select="videoSelect" mode="horizontal" default-active="0" active-text-color="orange">
						<el-menu-item :index="''+0">全部</el-menu-item>
						<el-menu-item v-for="c in videoCategoryArr" :index="''+c.id">{{c.name}}</el-menu-item>
					</el-menu>
				</el-col>
			</el-row>

			<el-row :gutter="20">

				<el-col :span="6" v-for="v in videoArr">
					<el-card>
						<router-link :to="`/detail?id=${v.id}`">
							<img :src="BASE_URL+v.contentImgUrl" style="width: 100%;height: 145px;" />
							<p class="title_p">{{v.title}}</p>
						</router-link>
						<el-row>
							<el-col :span="4">
								<el-avatar :src="BASE_URL+v.userImgUrl" :size="35"></el-avatar>
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
			<div style="text-align: center;margin-top: 5px;">
				<el-button @click="moreContent(2)">
					点击加载更多
				</el-button>
			</div>
			<!-- 内容列表结束 -->
			<!-- 视频相关结束 -->
		</div>
		<div>
			<!-- 行业资讯相关开始 -->
			<el-row style="background-color: white;">
				<el-col :span="3">
					<p style="font-size: 28px;margin: 10px;">行业资讯</p>
				</el-col>
				<el-col :span="21">
					<el-menu @select="infoSelect" mode="horizontal" default-active="0" active-text-color="orange">
						<el-menu-item :index="''+0">全部</el-menu-item>
						<el-menu-item v-for="c in infoCategoryArr" :index="''+c.id">{{c.name}}</el-menu-item>

					</el-menu>
				</el-col>
			</el-row>

			<el-row :gutter="20">
				<el-col :span="6" v-for="v in infoArr">
					<el-card>
						<router-link :to="`/detail?id=${v.id}`">
							<img :src="BASE_URL+v.contentImgUrl" style="width: 100%;height: 145px;" />
							<p class="title_p">{{v.title}}</p>
						</router-link>
						<el-row>
							<el-col :span="4">
								<el-avatar :src="BASE_URL+v.userImgUrl" :size="35"></el-avatar>
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
			<div style="text-align: center;margin-top: 5px;">
				<el-button @click="moreContent(3)">
					点击加载更多
				</el-button>
			</div>
			<!-- 内容列表结束 -->
			<!-- 行业资讯相关结束 -->
		</div>
	</div>
</template>

<script setup>
	import {
		ElMessage
	} from 'element-plus';
	import {
		onMounted,
		ref
	} from 'vue';
	import router from '@/router';
	const bannerArr = ref([]); //banner数组
	const recipeCategoryArr = ref([]); //食谱类别数组
	const videoCategoryArr = ref([]); //视频类别数组
	const infoCategoryArr = ref([]); //咨询类别数组

	const recipeArr = ref([]); //食谱内容数组
	const videoArr = ref([]); //视频内容数组
	const infoArr = ref([]); //咨询内容数组

	const recipeSelect = (index) => {
		console.log(index)
		loadContents(1, index)
	}
	const videoSelect = (index) => {
		console.log(index)
		loadContents(2, index)
	}
	const infoSelect = (index) => {
		console.log(index)
		loadContents(3, index)
	}
	const moreContent = (type) => {
		router.push(`/list?type=${type}`)
	}

	const loadContents = (type, categoryId) => {
		hy.get(BASE_URL + `/v1/contents/${type}/${categoryId}/index`).then((r) => {
			if (r.data.code == 2000) {
				switch (type) {
					case 1:
						recipeArr.value = r.data.data
						break
					case 2:
						videoArr.value = r.data.data
						break
					case 3:
						infoArr.value = r.data.data
						break
				}
			} else {
				ElMessage.error(r.data.msg)
			}
		})
	}

	onMounted(() => {
		hy.get(BASE_URL + '/v1/banner/all').then((r) => {
			if (r.data.code == 2000) {
				bannerArr.value = r.data.data
			} else {
				ElMessage.error(r.data.msg)
			}
		})
		getCategoryArr()
	})

	const getCategoryArr = () => {
		hy.get(BASE_URL + `/v1/categories/1/sub`).then((r) => {
			if (r.data.code == 2000) {
				recipeCategoryArr.value = r.data.data
			}
		})
		hy.get(BASE_URL + `/v1/categories/2/sub`).then((r) => {
			if (r.data.code == 2000) {
				videoCategoryArr.value = r.data.data
			}
		})
		hy.get(BASE_URL + `/v1/categories/3/sub`).then((r) => {
			if (r.data.code == 2000) {
				infoCategoryArr.value = r.data.data
			}
		})
		loadContents(1, 0)
		loadContents(2, 0)
		loadContents(3, 0)
	}
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