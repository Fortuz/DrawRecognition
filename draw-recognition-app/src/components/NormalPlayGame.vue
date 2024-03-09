<template>
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
		<h2>
			{{ store.getLanguageDictItem('score') }}: {{ score }} / {{ currentIndex }}
		</h2>
		<h3>
			{{ store.getLanguageDictItem('yourWord') }}:
			<span style="font-weight: bold">
				{{ getNameByCategory(selectedCategories[currentIndex], store) }}</span
			>
		</h3>
		<div v-if="predId">
			{{ store.getLanguageDictItem('myGuessWas') }}
			<span
				style="font-weight: bold"
				:class="{ good: isCorrect, wrong: !isCorrect }"
				>{{ prediction }}</span
			>
		</div>
		<div class="cardStyle">
			<DrawingPalette ref="drawingPalette"></DrawingPalette>
			<Button @click="makePrediction()" class="button">{{
				store.getLanguageDictItem('submit')
			}}</Button>
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
const store = useStore()
const { drawingPalette, predict, predId, prediction } = usePlay(store)
const score: Ref<number> = ref(0)
const currentIndex: Ref<number> = ref(0)
const end: Ref<boolean> = ref(false)
let selectedCategories: Category[]
const router = useRouter()
const isCorrect: Ref<boolean | null> = ref(null)

const emit = defineEmits<{
	(e: 'restart'): void
}>()

const props = defineProps<{
	selectedNumber: number
}>()

const { selectedNumber } = toRefs(props)

watch(currentIndex, () => {
	if (currentIndex.value === selectedNumber.value) {
		end.value = true
	}
})

const restart = () => {
	emit('restart')
}

const initialize = () => {
	selectedCategories = getRandomCategories(categories, selectedNumber.value)
	score.value = 0
	currentIndex.value = 0
	predId.value = null
	end.value = false
}

const getRandomCategories = (array: Category[], count: number): Category[] => {
	let result = new Array(count),
		len = array.length,
		taken = new Array(len)

	if (count > len) throw new RangeError('More elements taken than available!')

	while (count--) {
		let x = Math.floor(Math.random() * len)
		result[count] = array[x in taken ? taken[x] : x]
		taken[x] = --len in taken ? taken[len] : len
	}
	return result
}

initialize()

const makePrediction = () => {
	predId.value = predict()
	isCorrect.value =
		predId.value === selectedCategories[currentIndex.value].word_id
	if (isCorrect.value === true) {
		score.value++
	}
	if (currentIndex.value === selectedNumber.value - 1) {
		end.value = true
	} else {
		currentIndex.value++
		drawingPalette.value?.clear()
	}
}

const quit = () => {
	router.push('/')
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
