<template>
	<div class="profileCreator">
		<h2 class="big">{{ mainStore.languageDict['typeYourName'] }}</h2>
		<div>
			<span class="p-float-label big">
				<InputText
					id="playerNameInput"
					size="large"
					@change="checkErrors()"
					v-model="playerName"
					:class="{ 'p-invalid': isError }"
				/>
				<label for="playerNameInput">{{
					mainStore.languageDict['yourName']
				}}</label>
			</span>
			<Button class="p-button-lg" @click="submit()" :disabled="!valid">
				{{ mainStore.languageDict['submit'] }}
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { type Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '../stores/mainStore'
const playerName: Ref<string | null> = ref(null)
const valid: Ref<boolean> = ref(false)
const isError: Ref<boolean> = ref(false)
const mainStore = useMainStore()
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
		router.push('/home')
	}
}
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
