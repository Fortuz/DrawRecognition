<template>
	<NavigationBar></NavigationBar>
	<ProfileCreator></ProfileCreator>
	<!-- <RouterView></RouterView> -->
</template>

<script setup lang="ts">
import { useMainStore } from './stores/mainStore'
import NavigationBar from './components/NavigationBar.vue'
import ProfileCreator from './views/ProfileCreator.vue'
const mainStore = useMainStore()
mainStore.$state
</script>
