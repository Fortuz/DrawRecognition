<template>
	<Dock :model="items">
		<template #icon="{ item }">
			<a
				v-tooltip.top="item.label"
				href="#"
				class="p-dock-link"
				@click="onItemClick($event, item)"
			>
				<img :src="item.icon" style="width: 100%" />
			</a>
		</template>
	</Dock>
</template>

<script setup lang="ts">
import Dock from 'primevue/dock'
import { type Ref, ref } from 'vue'

const mode: Ref<boolean> = ref(true)
const pencil: string = 'pencil.webp'
const eraser: string = 'eraser.webp'
const clear: string = 'delete.webp'

const emit = defineEmits<{
	(e: 'change', value: boolean): void
	(e: 'clear'): void
}>()

const items = ref([
	{
		label: 'Pencil',
		icon: pencil,
		command: () => {
			mode.value = true
			emit('change', mode.value)
		},
	},
	{
		label: 'Eraser',
		icon: eraser,
		command: () => {
			mode.value = false
			emit('change', mode.value)
		},
	},
	{
		label: 'Clear',
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
