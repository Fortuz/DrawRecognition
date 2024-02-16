<template>
	<div v-if="prediction">
		I think it is <span style="font-weight: bold">{{ prediction }}</span>
	</div>
	<DrawingPalette ref="drawingPalette"></DrawingPalette>
	<Button @click="makePrediction()">Predict</Button>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue'
import Button from 'primevue/button'
import DrawingPalette from '../../components/DrawingPalette.vue'
import { getNameById } from '../../helpers/getNameById'
import usePlay from '../../composables/usePlay'
const prediction: Ref<string | null> = ref(null)
const { drawingPalette, predict } = usePlay()

const makePrediction = async () => {
	const predId = await predict()
	prediction.value = getNameById(predId)
}
</script>
