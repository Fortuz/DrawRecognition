import { type Ref, ref } from 'vue'
import DrawingPalette from '../components/DrawingPalette.vue'

export default function usePlay() {
	const drawingPalette: Ref<InstanceType<typeof DrawingPalette> | null> =
		ref(null)

	const predict = async (): Promise<number> => {
		if (!drawingPalette.value)
			throw new Error('Drawing palette is not set to an instance!')
		const predictionId = await drawingPalette.value.predict()
		if (predictionId === undefined)
			throw new Error('PredictionId is undefined!')
		return predictionId
	}

	return { drawingPalette, predict }
}
