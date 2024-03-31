<template>
	<div class="profileCreator">
		<!-- cim -->
		<h2>{{ store.getLanguageDictItem('typeYourName') }}</h2>
		<div>
			<!-- nev beviteli mezo -->
			<InputText
				id="playerNameInput"
				size="large"
				@change="checkErrors()"
				v-model="playerName"
				:class="{ 'p-invalid': isError }"
			/>
			<!-- submit gomb -->
			<Button class="button block" @click="submit()" :disabled="!valid">
				{{ store.getLanguageDictItem('submit') }}
			</Button>
		</div>
	</div>
	<!-- nyelvvaltas -->
	<div class="cardStyle clickable" @click="store.changeLanguage()">
		<img :src="getActualFlag" :alt="getActualFlag" />
	</div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { type Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'
import { storeToRefs } from 'pinia'
const playerName: Ref<string | null> = ref(null) // felhasznalonev
const valid: Ref<boolean> = ref(false) // ervenyesen adta - e meg es lehet - e tovabbmenni
const isError: Ref<boolean> = ref(false) // ha ervenytelen
const store = useStore() // pinia store
const router = useRouter() // router objektum
const { getActualFlag } = storeToRefs(store) // store fuggveny referencia
const checkErrors = () => {
	if (playerName.value?.trim() === '' || playerName.value === null) {
		// ha ures vagy null akkor ervenytelen
		isError.value = true
		valid.value = false
	} else {
		// amugy OK
		isError.value = false
		valid.value = true
	}
}

const submit = () => {
	if (valid.value && playerName.value) {
		// ha valid
		localStorage.setItem('userNameToken', playerName.value) // elmentjuk localstoregeban a nevet
		if (!localStorage.getItem('tutorialDoneToken')) {
			// ellenorzes, hogy teljesitette - e az oktatast
			router.push('/tutorial') // ha nem, akkor oda navigalas
		} else {
			router.push('/') // amugy mehet tovabb
		}
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
img {
	max-width: 20%;
}
.clickable {
	cursor: pointer;
}
</style>
