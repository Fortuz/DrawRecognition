<template>
	<div class="freePlay">
		<h2>{{ store.getLanguageDictItem('freePlay') }}</h2>
		<div class="cardStyle">
			<div v-if="predId" class="pred">
				{{ store.getLanguageDictItem('iThinkItis') }}
				<span style="font-weight: bold">{{ prediction }}</span>
			</div>
			<div class="grid">
				<div class="col-12">
					<DrawingPalette ref="drawingPalette"></DrawingPalette>
				</div>
				<div class="col-12">
					<Button class="button" @click="makePrediction()">{{
						store.getLanguageDictItem('submit')
					}}</Button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import DrawingPalette from '../../components/DrawingPalette.vue'
import usePlay from '../../composables/usePlay'
import { useStore } from '../../store'
const store = useStore()
const { drawingPalette, predict, prediction, predId } = usePlay(store)

const makePrediction = () => {
	predId.value = predict()
}
</script>

<style scoped>
.freePlay {
	text-align: center;
}

.pred {
	padding-bottom: 1vh;
	padding-top: 0;
}
</style>
