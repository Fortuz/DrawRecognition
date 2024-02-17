<template>
	<div class="menu">
		<ul>
			<li>
				<RouterLink to="/normalplay">{{
					mainStore.languageDict['normalPlay']
				}}</RouterLink>
			</li>
			<li>
				<RouterLink to="/freeplay">{{
					mainStore.languageDict['freePlay']
				}}</RouterLink>
			</li>
			<li>
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
