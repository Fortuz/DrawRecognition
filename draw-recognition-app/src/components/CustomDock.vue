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
const store = useStore()
const mode: Ref<boolean> = ref(true)
const pencil: string = 'pencil.webp'
const eraser: string = 'eraser.webp'
const clear: string = 'delete.webp'

const emit = defineEmits<{
	(e: 'change', value: boolean): void
	(e: 'clear'): void
}>()

const items: ComputedRef<MenuItem[]> = computed(() => [
	{
		label: store.getLanguageDictItem('pencil'),
		icon: pencil,
		command: () => {
			mode.value = true
			emit('change', mode.value)
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
		item.command()
	}
	event.preventDefault()
}
</script>
