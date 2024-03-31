<template>
	<!-- ez fog megjelenni a menube lepeskor -->
	<Dialog v-model:visible="inMenu" modal :closable="false" :draggable="false">
		<template #header>
			<!-- cim -->
			<h2>{{ store.getLanguageDictItem('wordsCount') }}</h2>
		</template>
		<!-- szam beviteli mezo -->
		<InputNumber
			v-model="categoryNumber"
			input-id="categoryNumberInput"
			show-buttons
			button-layout="horizontal"
			:step="1"
			:min="1"
			:max="categories.length"
		></InputNumber>
		<!-- indito gomb -->
		<Button class="block button center" @click="start">{{
			store.getLanguageDictItem('start')
		}}</Button>
	</Dialog>
	<!-- bagoly kep -->
	<img class="owlImage" src="/owl2.webp" />
	<!-- a normal jatek maga -->
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
const inMenu: Ref<boolean> = ref(true) // eppen a menuben vagyunk - e
const categoryNumber: Ref<number> = ref(5) // valasztott kategoriak szama

const start = () => {
	// inditjuk a jatekot
	inMenu.value = false
}

const onRestart = () => {
	// restart esemenykezelo
	inMenu.value = true
}
</script>

<style scoped>
@media (max-width: 480px) {
	:deep(.p-inputnumber-input) {
		width: 10vw;
	}
}

@media (min-width: 481px) {
	:deep(.p-inputnumber-input) {
		width: 5vw;
	}
}


</style>
