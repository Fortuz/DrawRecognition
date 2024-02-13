<template>
	<Menubar :model="items">
		<template #item="{ item }">
			<a :href="item.route">{{ item.label }}</a>
		</template>
	</Menubar>
</template>

<script setup lang="ts">
import Menubar from 'primevue/menubar'
import { Ref, ref } from 'vue'
import type { MenuItem } from 'primevue/menuitem'
const items: Ref<MenuItem[]> = ref([
	{
		label: 'Normal play',
		root: true,
		route: '/normalplay',
	},
	{
		label: 'Free play',
		root: true,
		route: '/freeplay',
	},
])
</script>

<style scoped>
span {
	margin: 1rem;
}

a {
	margin: 5px;
	cursor: pointer;
}
</style>
