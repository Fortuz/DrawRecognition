<template>
	<NavigationBar></NavigationBar>
	<RouterView></RouterView>
</template>

<script setup lang="ts">
import { useMainStore } from './stores/mainStore'
import NavigationBar from './components/NavigationBar.vue'
const mainStore = useMainStore()
mainStore.$state
</script>
