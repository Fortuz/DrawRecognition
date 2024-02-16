<template>
	<Dialog v-model:visible="end" modal>
		Your final score is : {{ score }} / {{ selectedNumber }}
		<div>
			<label>Do you want to play another game?</label>
			<Button @click="restart()">Yes</Button>
			<Button @click="quit()">No</Button>
		</div>
	</Dialog>
	<div>Score: {{ score }} / {{ currentIndex }}</div>
	<div>
		Your word:
		<span style="font-weight: bold">
			{{ selectedCategories[currentIndex].word }}</span
		>
	</div>
	<div v-if="prediction">
		My guess was: <span style="font-weight: bold">{{ prediction }}</span>
	</div>
	<DrawingPalette ref="drawingPalette"></DrawingPalette>
	<Button @click="makePrediction()">Predict</Button>
</template>

<script setup lang="ts">
import { type Ref, ref, watch, toRefs } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import DrawingPalette from './DrawingPalette.vue'
import { getNameById } from '../helpers/getNameById'
import usePlay from '../composables/usePlay'
import { categories } from '../assets/categories'
import type { Category } from '../models/Category'
import { useRouter } from 'vue-router'

const { drawingPalette, predict } = usePlay()
const score: Ref<number> = ref(0)
const currentIndex: Ref<number> = ref(0)
const prediction: Ref<string | null> = ref(null)
const end: Ref<boolean> = ref(false)
let selectedCategories: Category[]
const router = useRouter()

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
	prediction.value = null
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

const makePrediction = async () => {
	const predId = await predict()
	if (predId === selectedCategories[currentIndex.value].word_id) {
		score.value++
	}
	prediction.value = getNameById(predId)
	if (currentIndex.value === selectedNumber.value - 1) {
		end.value = true
	} else {
		currentIndex.value++
		drawingPalette.value?.clear()
	}
}

const quit = () => {
	router.push('/home')
}
</script>
