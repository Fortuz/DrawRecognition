<template>
	<div v-if="prediction">
		I think it is <span style="font-weight: bold">{{ prediction }}</span>
	</div>
	<DrawingPalette ref="drawingPalette"></DrawingPalette>
	<Button @click="predict">Predict</Button>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue'
import Button from 'primevue/button'
import DrawingPalette from '../../components/DrawingPalette.vue'
import { getNameById } from '../../helpers/getNameById'
const drawingPalette: Ref<InstanceType<typeof DrawingPalette> | null> =
	ref(null)
const prediction: Ref<string | null> = ref(null)

const predict = async () => {
	if (!drawingPalette.value)
		throw new Error('Drawing palette is not set to an instance!')
	const predictionId = await drawingPalette.value.predict()
	if (predictionId === undefined) throw new Error('PredictionId is undefined!')
	prediction.value = getNameById(predictionId)
}
</script>
