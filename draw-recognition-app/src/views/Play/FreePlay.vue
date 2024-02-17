<template>
	<div v-if="prediction">
		{{ mainStore.languageDict['iThinkItIs'] }}
		<span style="font-weight: bold">{{ prediction }}</span>
	</div>
	<DrawingPalette ref="drawingPalette"></DrawingPalette>
	<Button @click="makePrediction()">{{
		mainStore.languageDict['submit']
	}}</Button>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue'
import Button from 'primevue/button'
import DrawingPalette from '../../components/DrawingPalette.vue'
import { getNameById } from '../../helpers/getNameById'
import usePlay from '../../composables/usePlay'
import { useMainStore } from '../../stores/mainStore'
import { categories } from '../../assets/categories'
const mainStore = useMainStore()
const prediction: Ref<string | null> = ref(null)
const { drawingPalette, predict } = usePlay()

const makePrediction = async () => {
	const predId = await predict()
	prediction.value = getNameById(predId, categories)
}
</script>
