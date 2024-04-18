<template>
	<!-- jatek vegi dialog -->
	<Dialog v-model:visible="end" modal :closable="false" :draggable="false">
		<template #header>
			<h2>
				{{ store.getLanguageDictItem('yourFinalScoreIs') }} {{ score }} /
				{{ selectedNumber }}
			</h2>
		</template>
		<label class="block">{{ store.getLanguageDictItem('playAnother') }}</label>
		<div class="block">
			<Button class="button" @click="restart()">{{
				store.getLanguageDictItem('yes')
			}}</Button>
			<Button class="button" @click="quit()">{{
				store.getLanguageDictItem('no')
			}}</Button>
		</div>
	</Dialog>
	<div class="normalPlayGame">
		<!-- pontok -->
		<h2>
			{{ store.getLanguageDictItem('score') }}: {{ score }} /
			{{ !end ? currentIndex : selectedNumber }}
		</h2>
		<!-- aktualis rajzolando szo -->
		<h3>
			{{ store.getLanguageDictItem('yourWord') }}:
			<span style="font-weight: bold">
				{{ getNameByCategory(selectedCategories[currentIndex], store) }}</span
			>
		</h3>
		<!-- legutobbi szo becslese -->
		<div v-if="prediction">
			{{ store.getLanguageDictItem('myGuessWas') }}
			<span
				style="font-weight: bold"
				:class="{ good: isCorrect, wrong: !isCorrect }"
				>{{ prediction }}</span
			>
		</div>
		<!-- rajzfelulet -->
		<div class="cardStyle">
			<div class="grid">
				<div class="col-12">
					<DrawingPalette ref="drawingPalette"></DrawingPalette>
				</div>
				<div class="col-12">
					<Button @click="makePrediction()" class="button">{{
						store.getLanguageDictItem('submit')
					}}</Button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { type Ref, ref, watch, toRefs } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import DrawingPalette from './DrawingPalette.vue'
import { getNameByCategory } from '../helpers/getNameById'
import usePlay from '../composables/usePlay'
import { categories } from '../assets/categories'
import type { Category } from '../models/Category'
import { useRouter } from 'vue-router'
import { useStore } from '../store'
const store = useStore() // pinia store
const { drawingPalette, predict, predId, prediction } = usePlay(store) // hasznaljuk a usePlay composable fuggvenyeit / valtozoit
const score: Ref<number> = ref(0) // pontszam
const currentIndex: Ref<number> = ref(0) // valasztott szavak listajaban hanyadik elemnel vagyunk
const end: Ref<boolean> = ref(false) // vege van - e a jateknak
let selectedCategories: Category[] // valasztott szavak listaja
const router = useRouter() // programmatikus router
const isCorrect: Ref<boolean | null> = ref(null) // legutobbi szot kitalalta - e

const emit = defineEmits<{
	(e: 'restart'): void
}>() // esemenyek

const props = defineProps<{
	selectedNumber: number
}>() // szulo komponenstol kapott parameterek

const { selectedNumber } = toRefs(props) // parameterek atvetele

watch(currentIndex, () => {
	// currentIndex valtozasa eseten ez lefut
	if (currentIndex.value === selectedNumber.value) {
		end.value = true // ha a lista vegere ertunk, akkor vege a jateknak
	}
})

const restart = () => {
	emit('restart') // ujrakezdes
}

const initialize = () => {
	selectedCategories = getRandomCategories(categories, selectedNumber.value)
	score.value = 0
	currentIndex.value = 0
	predId.value = null
	end.value = false
	// valtozok inicializalasa
}

const getRandomCategories = (array: Category[], count: number): Category[] => {
	if (count > array.length) {
		// ellenorizzuk, hogy a kert elemek szama nem haladja - e meg az elerheto elemek szamat
		throw new RangeError('More elements taken than available!')
	}

	let result = [] // eredmenytomb
	let len = array.length // eredeti tomb hossza
	let taken = new Array(len).fill(false) // mely indexek lett mar kivalasztva

	while (result.length < count) {
		let randomIndex = Math.floor(Math.random() * len) // veletlenszeru index
		if (!taken[randomIndex]) {
			// ha az adott index meg nem lett kivalasztva
			result.push(array[randomIndex]) // hozzaadjuk az eredmenytombhoz
			taken[randomIndex] = true // megjeloljuk, hogy ez az index már kivalasztasra kerult
		}
	}

	return result
}

initialize()

const makePrediction = () => {
	store.startLoading() // toltes indul
	predId.value = predict() // becsles elvegzese
	isCorrect.value =
		predId.value === selectedCategories[currentIndex.value].word_id // helyes - e a becsles
	if (isCorrect.value === true) {
		score.value++ // ha helyes, pontszam novelese
	}
	if (currentIndex.value === selectedNumber.value - 1) {
		end.value = true // jatek vege ellenorzes
	} else {
		currentIndex.value++ // index leptetes
		drawingPalette.value?.clear() // vaszon torlese
	}
	store.endLoading() // toltes befejezodott
}

const quit = () => {
	router.push('/') // vissza a fooldalra
}
</script>

<style scoped>
.good {
	color: green;
}

.wrong {
	color: red;
}

.normalPlayGame {
	text-align: center;
}
</style>
