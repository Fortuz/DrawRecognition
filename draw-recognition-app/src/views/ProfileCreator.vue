<template>
	<div class="profileCreator">
		<h2>{{ store.getLanguageDictItem('typeYourName') }}</h2>
		<div>
			<InputText
				id="playerNameInput"
				size="large"
				@change="checkErrors()"
				v-model="playerName"
				:class="{ 'p-invalid': isError }"
			/>
			<Button class="button block" @click="submit()" :disabled="!valid">
				{{ store.getLanguageDictItem('submit') }}
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { type Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'
const playerName: Ref<string | null> = ref(null)
const valid: Ref<boolean> = ref(false)
const isError: Ref<boolean> = ref(false)
const store = useStore()
const router = useRouter()
const checkErrors = () => {
	if (playerName.value?.trim() === '' || playerName.value === null) {
		isError.value = true
		valid.value = false
	} else {
		isError.value = false
		valid.value = true
	}
}

const submit = () => {
	if (valid.value && playerName.value) {
		localStorage.setItem('userNameToken', playerName.value)
		router.push('/')
	}
}
</script>

<style scoped>
@media (max-width: 480px) {
	.profileCreator {
		width: 75%;
	}
}

@media (min-width: 481px) and (max-width: 1024px) {
	.profileCreator {
		width: 50%;
	}
}

@media (min-width: 1025px) {
	.profileCreator {
		width: 25%;
	}
}

.profileCreator {
	margin: auto;
	padding-top: 30vh;
}
</style>
../stores/store
