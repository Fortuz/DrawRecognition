<template>
	<div v-if="!store.getLoading">
		<!-- megfelelo jatek nezet ha a store mar inicializalodott -->
		<NavigationBar></NavigationBar>
		<RouterView></RouterView>
	</div>
	<ProgressSpinner class="overlay" v-if="store.getLoading">
		<!-- amugy toltokepernyo -->
	</ProgressSpinner>
</template>

<script setup lang="ts">
import NavigationBar from '../components/NavigationBar.vue'
import { useStore } from '../store'
import ProgressSpinner from 'primevue/progressspinner'
const store = useStore() // pinia store
</script>
