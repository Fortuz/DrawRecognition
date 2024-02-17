<template>
	<Menubar :model="items">
		<template #item="{ item }">
			<span class="item">{{ item.label }}</span>
		</template>
		<template #end>{{ getUserName }} </template>
	</Menubar>
	<Dialog v-model:visible="isCategoriesDialogOpen" modal>
		<ul>
			<li v-for="category in categories" :key="category.word_id">
				{{ category.word }}
			</li>
		</ul>
	</Dialog>
</template>

<script setup lang="ts">
import Menubar from 'primevue/menubar'
import { type Ref, ref, computed } from 'vue'
import Dialog from 'primevue/dialog'
import type { MenuItem } from 'primevue/menuitem'
import { useRouter } from 'vue-router'
import { categories } from '../assets/categories'
const router = useRouter()
const isCategoriesDialogOpen: Ref<boolean> = ref(false)
const items: Ref<MenuItem[]> = ref([
	{
		label: 'Home',
		root: true,
		command: () => {
			router.push('/')
		},
	},
	{
		label: 'Normal play',
		root: true,
		command: () => {
			router.push('/normalplay')
		},
	},
	{
		label: 'Free play',
		root: true,
		command: () => {
			router.push('/freeplay')
		},
	},
	{
		label: 'Helper',
		root: true,
		command: () => {
			router.push('/helper')
		},
	},
	{
		label: 'Words',
		root: true,
		command: () => {
			isCategoriesDialogOpen.value = true
		},
	},
])

const getUserName = computed(() => {
	return localStorage.getItem('userNameToken')
})
</script>

<style scoped>
span {
	margin: 1rem;
}

a {
	margin: 5px;
	cursor: pointer;
}

.item {
	margin-right: 2vw;
	cursor: pointer;
}

ul {
	list-style: none;
}
</style>
