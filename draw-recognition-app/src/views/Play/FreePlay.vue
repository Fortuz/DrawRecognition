<template>
	<div class="freePlay">
		<h2>{{ store.getLanguageDictItem('freePlay') }}</h2>
		<div class="cardStyle">
			<div v-if="prediction" class="pred">
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
import { type Ref, ref } from 'vue'
import Button from 'primevue/button'
import DrawingPalette from '../../components/DrawingPalette.vue'
import { getNameById } from '../../helpers/getNameById'
import usePlay from '../../composables/usePlay'
import { useStore } from '../../store'
import { categories } from '../../assets/categories'
const store = useStore()
const prediction: Ref<string | null> = ref(null)
const { drawingPalette, predict } = usePlay()

const makePrediction = async () => {
	const predId = await predict()
	prediction.value = getNameById(predId, categories, store)
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
