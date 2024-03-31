<template>
	<div class="menu">
		<!-- navigacios elemek egy listaban -->
		<ul>
			<!-- normal jatek -->
			<li class="cardStyle clickable" @click="router.push('/normalplay')">
				<p>{{ store.getLanguageDictItem('normalPlay') }}</p>
			</li>
			<!-- szabad jatek -->
			<li class="cardStyle clickable" @click="router.push('/freeplay')">
				<p>{{ store.getLanguageDictItem('freePlay') }}</p>
			</li>
			<!-- oktatas -->
			<li class="cardStyle clickable" @click="router.push('/tutorial')">
				<p>{{ store.getLanguageDictItem('helper') }}</p>
			</li>
			<!-- nyelvvaltas -->
			<li class="cardStyle clickable" @click="store.changeLanguage()">
				<img :src="getActualFlag" :alt="getActualFlag" />
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStore } from '../store'
import { useRouter } from 'vue-router'
const store = useStore() // pinia store
const router = useRouter() // router objektum
const { getActualFlag } = storeToRefs(store) // store fuggveny referencia
</script>

<style scoped>
@media (max-width: 480px) {
	li {
		width: 75%;
		margin: 5vh 5vw;
	}
}

@media (min-width: 481px) and (max-width: 1024px) {
	li {
		width: 50%;
		margin: 5vh auto;
	}
}

@media (min-width: 1025px) {
	li {
		width: 30%;
		margin: 5vh auto;
	}
}

ul {
	list-style: none;
}

li * {
	text-decoration: none;
	color: var(--text-color);
	font-weight: bold;
}

img {
	max-width: 20%;
}

p {
	font-weight: bold;
}

.clickable {
	cursor: pointer;
}
</style>
