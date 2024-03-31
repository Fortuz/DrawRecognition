<template>
	<div class="freePlay">
		<!-- cim -->
		<h2>{{ store.getLanguageDictItem('freePlay') }}</h2>
		<img class="owlImage" src="/owl2.webp" />
		<div class="cardStyle">
			<div v-if="prediction" class="pred">
				<!-- becsult szo, csak akkor jelenik meg ha nem null -->
				{{ store.getLanguageDictItem('iThinkItis') }}
				<span style="font-weight: bold">{{ prediction }}</span>
			</div>
			<div class="grid">
				<div class="col-12">
					<!-- rajzfelulet -->
					<DrawingPalette ref="drawingPalette"></DrawingPalette>
				</div>
				<div class="col-12">
					<!-- submit gomb -->
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
const store = useStore() // pinia store
const { drawingPalette, predict, prediction, predId } = usePlay(store) // usePlay composable elkeszitese

const makePrediction =  () => {
	store.startLoading()
	predId.value =  predict() // usePlay.predId ertekenek beallitasa a becslesnek megfeleloen
	store.endLoading()
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
