import { type Ref, ref, ComputedRef, computed, watch } from 'vue'
import DrawingPalette from '../components/DrawingPalette.vue'
import { getNameById } from '../helpers/getNameById'
import { categories } from '../assets/categories'
import { MyStore } from '../store'

export default function usePlay(store: MyStore) {
	const predId: Ref<number | null> = ref(null)

	const prediction: ComputedRef<string | null> = computed(() => {
		if (!predId.value) return null
		console.log(predId.value)
		return getNameById(predId.value, categories, store)
	})

	watch(predId, () => {
		console.log(predId.value)
	})

	const drawingPalette: Ref<InstanceType<typeof DrawingPalette> | null> =
		ref(null)

	const predict = (): number => {
		if (!drawingPalette.value)
			throw new Error('Drawing palette is not set to an instance!')
		const predictionId = drawingPalette.value.predict()
		if (predictionId === undefined)
			throw new Error('PredictionId is undefined!')
		return predictionId
	}
	return { drawingPalette, predict, predId, prediction }
}
