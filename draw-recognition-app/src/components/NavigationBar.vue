<template>
	<Menubar :model="items">
		<template #item="{ item }">
			<span class="item" v-if="!item.icon">{{ item.label }}</span>
			<img class="flag" :src="item.icon" v-else />
		</template>
		<template #end>{{ getUserName }} </template>
	</Menubar>
	<Dialog v-model:visible="isCategoriesDialogOpen" modal>
		<h2 class="catTitle">{{ store.languageDict['words'] }}</h2>
		<ul>
			<div class="grid">
				<li
					v-for="category in categories"
					:key="category.word_id"
					:class="gridCols"
					class="category"
				>
					{{ getNameByCategory(category, store) }}
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
import { useStore } from '../store'
import { getNameByCategory } from '../helpers/getNameById'
import { storeToRefs } from 'pinia'
const router = useRouter()
const store = useStore()
const isCategoriesDialogOpen: Ref<boolean> = ref(false)
const { getActualFlag } = storeToRefs(store)

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
		label: store.getLanguageDictItem('home'),
		root: true,
		command: () => {
			router.push('/')
		},
	},
	{
		label: store.getLanguageDictItem('normalPlay'),
		root: true,
		command: () => {
			router.push('/normalplay')
		},
	},
	{
		label: store.getLanguageDictItem('freePlay'),
		root: true,
		command: () => {
			router.push('/freeplay')
		},
	},
	{
		label: store.getLanguageDictItem('helper'),
		root: true,
		command: () => {
			router.push('/helper')
		},
	},
	{
		label: store.getLanguageDictItem('words'),
		root: true,
		command: () => {
			isCategoriesDialogOpen.value = true
		},
	},
	{
		icon: getActualFlag.value,
		root: true,
		command: () => {
			store.changeLanguage()
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
