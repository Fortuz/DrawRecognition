<template>
	<Menubar :model="items">
		<template #item="{ item }">
			<span class="item" v-if="!item.icon">{{ item.label }}</span>
			<img class="flag" :src="item.icon" v-else />
		</template>
		<template #end>{{ getUserName }} </template>
	</Menubar>
	<!-- ez tartalmazza a szavak listajat -->
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
const router = useRouter() // programmatikus router
const store = useStore() // pinia store
const isCategoriesDialogOpen: Ref<boolean> = ref(false) // szavak listaja nyitvan van - e
const { getActualFlag } = storeToRefs(store) // atvesszuk a 'getActualFlag' metodus referenciajat a storebol

const gridCols = computed(() => {
	// kijelzo meretetol fuggoen jelennek meg az oszlopok
	if (window.innerWidth <= 480) {
		return 'col-6'
	} else if (window.innerWidth <= 1024) {
		return 'col-4'
	} else {
		return 'col-2'
	}
})

// primevue MenuItem lista
const items: ComputedRef<MenuItem[]> = computed(() => [
	{
		label: store.getLanguageDictItem('home'), // cim
		root: true, // mindegyik csak egy lepcsos
		command: () => {
			router.push('/') // atnavigalunk a megfelelo oldalra
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
			router.push('/tutorial')
		},
	},
	{
		label: store.getLanguageDictItem('words'),
		root: true,
		command: () => {
			isCategoriesDialogOpen.value = true // itt megjelenitjuk szavakat tartalmazo dialogot
		},
	},
	{
		icon: getActualFlag.value,
		root: true,
		command: () => {
			store.changeLanguage() // atvaltjuk a nyelvet
		},
	},
])

const getUserName = computed(() => {
	return localStorage.getItem('userNameToken') // elmentjuk a felhasznalonevet a localstoregeben
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
