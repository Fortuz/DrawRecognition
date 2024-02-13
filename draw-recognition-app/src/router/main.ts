import { createRouter, createWebHistory } from 'vue-router'
import ProfileCreator from '../views/ProfileCreator.vue'
import Home from '../views/Home.vue'
import Helper from '../views/Helper.vue'
import FreePlay from '../views/Play/FreePlay.vue'
import NormalPlay from '../views/Play/NormalPlay.vue'

const routes = [
	{ path: '/normalplay', component: NormalPlay },
	{ path: '/freeplay', component: FreePlay },
	{ path: '/helper', component: Helper },
	{ path: '/profilecreator', component: ProfileCreator },
	{ path: '/home', component: Home },
	{ path: '/', component: ProfileCreator },
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
