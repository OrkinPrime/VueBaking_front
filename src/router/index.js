import {
	createRouter,
	createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [{
		path: '/',
		name: 'home',
		component: HomeView,
		redirect: '/index',
		children: [{
				path: '/reg',
				component: () => import('../views/home/RegView.vue')
			},
			{
				path: '/login',
				component: () => import('../views/home/LoginView.vue')
			},
			{
				path: '/index',
				component: () => import('../views/home/IndexView.vue')
			},
			{
				path: '/list',
				component: () => import('../views/home/ListView.vue')
			},
			{
				path: '/detail',
				component: () => import('../views/home/DetailView.vue')
			},
			{
				path: '/personal',
				component: () => import('../views/home/PersonalView.vue'),
				redirect: '/personal/index',
				children: [{
						path: 'index',
						component: () => import('../views/home/personal/PersonalIndexView.vue')
					},
					{
						path: 'management',
						component: () => import('../views/home/personal/PersonalManagementView.vue')
					}, {
						path: 'post',
						component: () => import('../views/home/personal/PersonalPostView.vue')
					},
				],
			},
		]
	},
	{
		path: '/admin',
		name: 'admin',
		component: () => import('../views/AdminView.vue'),
		redirect: '/admin/user',
		children: [{
				path: "user",
				component: () => import('../views/admin/UserView.vue')
			},
			{
				path: "banner",
				component: () => import('../views/admin/BannerView.vue')
			},
			{
				path: "content",
				component: () => import('../views/admin/ContentView.vue')
			},
		]
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router