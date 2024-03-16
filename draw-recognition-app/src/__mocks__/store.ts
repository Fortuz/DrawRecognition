import { defineStore } from 'pinia'
import {  HungarianWords } from '../Langs'
import { Language } from '../models/Language'

export const useMockStore = defineStore('mockStore', {
	state: () => ({
		languageDict: HungarianWords,
		language: Language.Hungarian,
		modelPath: '/model.json',
		model: null,
		loading: true,
		hunFlag: 'hun.webp',
		engFlag: 'eng.webp',
		actualFlag: 'hun.webp',
	}),
	actions: {
		initializeStore() {
			this.startLoading()
			this.model = null
			this.endLoading()
		},
		changeLanguage() {
			return 'changed language'
		},
		getLanguageDictItem(paramName: string) {
			return this.languageDict[paramName]
		},
		startLoading() {
			this.loading = true
		},
		endLoading() {
			this.loading = false
		},
	},
	getters: {
		getLanguage() {
			Language.Hungarian
		},
		getLoading() {
			return true
		},
		getModel() {
			return true
		},
		getActualFlag(_) {
			return this.hunFlag
		},
	},
})
