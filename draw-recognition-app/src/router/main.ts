import { createRouter, createWebHistory } from 'vue-router'
import ProfileCreator from '../views/ProfileCreator.vue'
import Home from '../views/Home.vue'
import Game from '../views/Game.vue'
import Helper from '../views/Helper.vue'

const routes = [
	{ path: '/helper', component: Helper },
	{ path: '/game', component: Game },
	{ path: '/profilecreator', component: ProfileCreator },
	{ path: '/home', component: Home },
	{ path: '/', component: ProfileCreator },
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
