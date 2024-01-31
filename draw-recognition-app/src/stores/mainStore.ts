import { defineStore } from 'pinia'
export type RootState = {}

export const useMainStore = defineStore('mainStore', {
	state: () => ({}) as RootState,
})
