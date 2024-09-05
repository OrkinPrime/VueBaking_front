import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import qs from 'qs'

//window代表全局,配置全局属性/方法
window.qs = qs;
//全局引入axios
import axios from 'axios';
window.hy = axios;
//这种是在脚本标签内使用
window.BASE_URL = 'http://localhost:8080';
window.getUser = () => {
	return localStorage.user ? JSON.parse(localStorage.user) : null;
}

//在vue实例中添加全局属性 可 任意页面中在template标签内使用

const app = createApp(App)
app.config.globalProperties.BASE_URL = 'http://localhost:8080';

app.use(store).use(router).use(ElementPlus).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}