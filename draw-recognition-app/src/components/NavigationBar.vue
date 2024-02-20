<template>
	<Menubar :model="items">
		<template #item="{ item }">
			<span class="item" v-if="!item.icon">{{ item.label }}</span>
			<img class="flag" :src="item.icon" v-else />
		</template>
		<template #end>{{ getUserName }} </template>
	</Menubar>
	<Dialog v-model:visible="isCategoriesDialogOpen" modal>
		<h2 class="catTitle">{{ mainStore.languageDict['words'] }}</h2>
		<ul>
			<div class="grid">
				<li
					v-for="category in categories"
					:key="category.word_id"
					:class="gridCols"
					class="category"
				>
					{{ getNameByCategory(category) }}
				</li>
			</div>
		</ul>
	</Dialog>
</template>

<script setup lang="ts">
import Menubar from 'primevue/menubar'
import { type Ref, ref, computed, type ComputedRef } from 'vue'
import Dialog from 'primevue/dialog'
import type { MenuItem } from 'primevue/menuitem'
import { useRouter } from 'vue-router'
import { categories } from '../assets/categories'
import { useMainStore } from '../stores/mainStore'
import { getNameByCategory } from '../helpers/getNameById'
const router = useRouter()
const mainStore = useMainStore()
const isCategoriesDialogOpen: Ref<boolean> = ref(false)
const hunFlag: string = 'hun.webp'
const engFlag: string = 'eng.webp'
const actualFlag: Ref<string> = ref(hunFlag)

const gridCols = computed(() => {
	if (window.innerWidth <= 480) {
		return 'col-6'
	} else if (window.innerWidth <= 1024) {
		return 'col-4'
	} else {
		return 'col-2'
	}
})

const items: ComputedRef<MenuItem[]> = computed(() => [
	{
		label: mainStore.languageDict['home'],
		root: true,
		command: () => {
			router.push('/')
		},
	},
	{
		label: mainStore.languageDict['normalPlay'],
		root: true,
		command: () => {
			router.push('/normalplay')
		},
	},
	{
		label: mainStore.languageDict['freePlay'],
		root: true,
		command: () => {
			router.push('/freeplay')
		},
	},
	{
		label: mainStore.languageDict['helper'],
		root: true,
		command: () => {
			router.push('/helper')
		},
	},
	{
		label: mainStore.languageDict['words'],
		root: true,
		command: () => {
			isCategoriesDialogOpen.value = true
		},
	},
	{
		icon: actualFlag.value,
		root: true,
		command: () => {
			actualFlag.value = actualFlag.value === engFlag ? hunFlag : engFlag
			mainStore.changeLanguage()
			console.log(actualFlag.value)
		},
	},
])

const getUserName = computed(() => {
	return localStorage.getItem('userNameToken')
})
</script>

<style scoped>
.item {
	padding-right: 4vw;
}

.item,
.flag {
	cursor: pointer;
}

ul {
	list-style: none;
}

img {
	max-height: 3vh;
}

.catTitle {
	text-align: center;
}

@media (max-width: 1024px) {
	.category {
		margin: 0;
	}
}

@media (min-width: 1025px) {
	.category {
		margin: 1vh 0vw;
	}
}
</style>
