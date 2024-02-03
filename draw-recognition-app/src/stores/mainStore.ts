import { defineStore } from 'pinia'
import { Language } from '../models/Language'
import { type Ref, ref } from 'vue'
export type RootState = {
	language: Language
	playerName: Ref<string | null>
}

export const useMainStore = defineStore('mainStore', {
	state: () =>
		({
			language: Language.English,
			playerName: ref(null),
		}) as RootState,
	actions: {
		initializeStore(): void {
			this.playerName = 'Zsolt Szigetközi'
		},
	},
})
