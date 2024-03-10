<template>
	<NavigationBar v-if="owl?.displayActionBar"></NavigationBar>
	<div class="cardStyle" v-if="owl?.displayDrawingPalette">
		<DrawingPalette></DrawingPalette>
	</div>
	<div class="owl">
		<Owl @end="onEnd()" ref="owl"></Owl>
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
const store = useStore()
const owl: Ref<InstanceType<typeof Owl> | null> = ref(null)
const router = useRouter()
function onEnd() {
	localStorage.setItem('tutorialDoneToken', 'true')
	router.push('/')
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
