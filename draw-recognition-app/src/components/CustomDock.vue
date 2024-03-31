<template>
	
	<Dock :model="items">
		<template #icon="{ item }">
			<a
				v-tooltip.top="item.label"
				href="#"
				class="dock-link"
				@click="onItemClick($event, item)"
			>
				<img :src="item.icon" style="width: 100%" />
			</a>
		</template>
	</Dock>
</template>

<script setup lang="ts">
import Dock from 'primevue/dock'
import { type Ref, ref, computed, type ComputedRef } from 'vue'
import { useStore } from '../store'
import { MenuItem } from 'primevue/menuitem'
const store = useStore() // pinia store
const mode: Ref<boolean> = ref(true) // igaz ha rajzol, hamis ha torol
const pencil: string = 'pencil.png' // ceruza kep eleresi utja
const eraser: string = 'eraser.png' // radir kep eleresi utja
const clear: string = 'delete.png' // torles kep eleresi utja

const emit = defineEmits<{
	(e: 'change', value: boolean): void
	(e: 'clear'): void
}>() //esemenyek

// Primevue MenuItem tipusu lista
const items: ComputedRef<MenuItem[]> = computed(() => [
	{
		label: store.getLanguageDictItem('pencil'), // cim
		icon: pencil, // kep
		command: () => {
			mode.value = true // igazra allitjuk
			emit('change', mode.value) // kivaltjuk az esemenyt
		}, 
	},
	{
		label: store.getLanguageDictItem('eraser'),
		icon: eraser,
		command: () => {
			mode.value = false
			emit('change', mode.value)
		},
	},
	{
		label: store.getLanguageDictItem('clear'),
		icon: clear,
		command: () => {
			emit('clear')
		},
	},
])

const onItemClick = (event: any, item: any) => {
	if (item.command) {
		item.command() // vegrehajtjuk az elemhez tartozo command fuggvenyt
	}
	event.preventDefault() // minden mas viselkedest elhagyunk
}
</script>
