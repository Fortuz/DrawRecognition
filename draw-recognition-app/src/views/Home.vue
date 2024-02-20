<template>
	<div class="menu">
		<ul>
			<li class="cardStyle">
				<RouterLink to="/normalplay">{{
					mainStore.languageDict['normalPlay']
				}}</RouterLink>
			</li>
			<li class="cardStyle">
				<RouterLink to="/freeplay">{{
					mainStore.languageDict['freePlay']
				}}</RouterLink>
			</li>
			<li class="cardStyle">
				<RouterLink to="helper">{{
					mainStore.languageDict['helper']
				}}</RouterLink>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { useMainStore } from '../stores/mainStore'

const mainStore = useMainStore()
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
</style>
