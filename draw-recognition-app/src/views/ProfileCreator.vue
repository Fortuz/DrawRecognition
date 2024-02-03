<template>
	<div class="profileCreator">
		<h2 class="big">Type your name</h2>
		<div>
			<span class="p-float-label big">
				<InputText
					id="playerNameInput"
					size="large"
					v-model="mainStore.playerName"
				/>
				<label for="playerNameInput">Your name</label>
			</span>
			<Button class="button p-button-lg">Submit</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { useMainStore } from '../stores/mainStore'
import Button from 'primevue/button'
const mainStore = useMainStore()
</script>

<style scoped>
.profileCreator {
	margin: auto;
	width: 25%;
	padding-top: 30vh;
}
.big {
	font-size: 2rem;
}

:deep(.p-inputtext) {
	width: 25rem;
	height: 5rem;
}
</style>
