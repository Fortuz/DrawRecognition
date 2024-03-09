import { createRouter, createWebHistory } from 'vue-router'
import ProfileCreator from '../views/ProfileCreator.vue'
import Helper from '../views/Helper.vue'
import FreePlay from '../views/Play/FreePlay.vue'
import NormalPlay from '../views/Play/NormalPlay.vue'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'

const routes = [
	{ path: '/profilecreator', component: ProfileCreator },
	{ path: '/', component: Home },
	{
		path: '/',
		component: Main,
		children: [
			{ path: '/normalplay', component: NormalPlay },
			{ path: '/freeplay', component: FreePlay },
		],
	},
	{ path: '/helper', component: Helper },
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, _, next) => {
	if (!userIsDefined() && to.fullPath !== '/profilecreator') {
		next({ path: '/profilecreator' })
	} else {
		next()
	}
})

const userIsDefined = () => {
	return !!localStorage.getItem('userNameToken')
}
