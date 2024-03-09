<template>
	<Dialog v-model:visible="inMenu" modal :closable="false" :draggable="false">
		<template #header>
			<h2>{{ store.getLanguageDictItem('wordsCount') }}</h2>
		</template>
		<InputNumber
			v-model="categoryNumber"
			input-id="categoryNumberInput"
			show-buttons
			button-layout="horizontal"
			:step="1"
			:min="1"
			:max="categories.length"
		></InputNumber>
		<Button class="block button center" @click="start">{{
			store.getLanguageDictItem('start')
		}}</Button>
	</Dialog>
	<NormalPlayGame
		@restart="onRestart()"
		v-if="!inMenu && categoryNumber"
		:selected-number="categoryNumber"
	></NormalPlayGame>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue'
import NormalPlayGame from '../../components/NormalPlayGame.vue'
import { categories } from '../../assets/categories'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import { useStore } from '../../store'
const store = useStore()
const inMenu: Ref<boolean> = ref(true)
const categoryNumber: Ref<number> = ref(5)

const start = () => {
	inMenu.value = false
}

const onRestart = () => {
	inMenu.value = true
}
</script>

<style scoped>
:deep(.p-inputnumber-input) {
	width: 10vw;
}
</style>
