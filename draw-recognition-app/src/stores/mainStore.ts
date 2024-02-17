import { defineStore } from 'pinia'
import { Language } from '../models/Language'
export type RootState = {
	language: Language
}

export const useMainStore = defineStore('mainStore', {
	state: () =>
		({
			language: Language.English,
		}) as RootState,
	actions: {
		initializeStore(): void {},
	},
})
