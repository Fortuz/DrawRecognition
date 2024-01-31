import { createRouter, createWebHistory } from 'vue-router'
import Menu from '../views/Menu.vue'

const routes = [{ path: '/', component: Menu }]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
