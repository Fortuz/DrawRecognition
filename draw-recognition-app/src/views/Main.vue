<template>
	<div v-if="store.getLoading === false">
		<NavigationBar></NavigationBar>
		<RouterView></RouterView>
	</div>
	<ProgressSpinner class="loadingScreen" v-else></ProgressSpinner>
</template>

<script setup lang="ts">
import NavigationBar from '../components/NavigationBar.vue'
import { useStore } from '../store'
import ProgressSpinner from 'primevue/progressspinner'

const store = useStore()
</script>
