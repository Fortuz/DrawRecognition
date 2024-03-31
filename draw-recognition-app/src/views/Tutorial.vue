<template>
	<!-- navigacios bar csak akkor ha a valtozo igaz -->
	<NavigationBar v-if="owl?.displayActionBar"></NavigationBar>
	<div class="cardStyle" v-if="owl?.displayDrawingPalette">
		<!-- rajzfelulet ha a valtozo igaz-->
		<DrawingPalette class="drawingPalette"></DrawingPalette>
	</div>
	<div class="owl">
		<Owl @end="onEnd()" ref="owl"></Owl>
		<!-- skip gomb -->
		<Button class="button" @click="onEnd()">{{
			store.getLanguageDictItem('skip')
		}}</Button>
	</div>
</template>

<script setup lang="ts">
import Owl from '../components/Owl.vue'
import Button from 'primevue/button'
import NavigationBar from '../components/NavigationBar.vue'
import DrawingPalette from '../components/DrawingPalette.vue'
import { type Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'
const store = useStore() // pinia store
const owl: Ref<InstanceType<typeof Owl> | null> = ref(null) // Owl.vue referencia
const router = useRouter() // router objektum hasznalata
function onEnd() {
	// end esemenykezelo
	localStorage.setItem('tutorialDoneToken', 'true') // elmentjuk locastorageban, hogy elvegezte az oktatast
	router.push('/') // vissza a fooldalra
}
</script>

<style scoped>
@media (max-width: 480px) {
	.owl {
		position: fixed;
		top: 60vh;
		left: 0;
		width: 100%;
		height: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

@media (min-width: 481px) and (max-width: 1024px) {
	.owl {
		position: fixed;
		top: 50vh;
		left: 0;
		width: 100%;
		height: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

@media (min-width: 1025px) {
	.owl {
		position: fixed;
		top: 15vh;
		left: 0;
		width: 45vw;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
