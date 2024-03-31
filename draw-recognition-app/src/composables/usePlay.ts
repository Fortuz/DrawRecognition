import { type Ref, ref, ComputedRef, computed } from 'vue'
import DrawingPalette from '../components/DrawingPalette.vue'
import { getNameById } from '../helpers/getNameById'
import { categories } from '../assets/categories'
import { MyStore } from '../store'

export default function usePlay(store: MyStore) {
	const predId: Ref<number | null> = ref(null) // becsles azonosito

	const prediction: ComputedRef<string | null> = computed(() => {
		// visszaadja a predId - hoz tartozo szot
		if (predId.value === null) return null // ha meg nincs becsles, akkor null
		return getNameById(predId.value, categories, store) // meghivjuk a fuggvenyt, ami konvertalja az id-t nevre
	})

	const drawingPalette: Ref<InstanceType<typeof DrawingPalette> | null> = // DrawingPalette referencia
		ref(null)

	const predict = (): number => {
		if (!drawingPalette.value)
			throw new Error('Drawing palette is not set to an instance!') // hibakezeles
		const predictionId = drawingPalette.value.predict() // a drawingpalette-ben definialt predict fuggveny hivasa
		if (predictionId === undefined)
			throw new Error('PredictionId is undefined!') // hibakezeles
		return predictionId
	}
	return { drawingPalette, predict, predId, prediction } // ezeket lehet kivulrol hasznalni
}
