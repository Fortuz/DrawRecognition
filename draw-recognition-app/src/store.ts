import { defineStore } from 'pinia'
import { EnglishWords, HungarianWords } from './Langs'
import { Language } from './models/Language'
import * as tf from '@tensorflow/tfjs'

export type RootState = {
	languageDict: Record<string, string>
	language: Language
	model: tf.LayersModel | null
	modelPath: string
	loading: boolean
	hunFlag: string
	engFlag: string
	actualFlag: string
}
export type MyStore = ReturnType<typeof useStore>

export const useStore = defineStore('store', {
	state: () =>
		({
			languageDict: HungarianWords,
			language: Language.Hungarian,
			modelPath: '/model.json',
			model: null,
			loading: true,
			hunFlag: 'hun.webp',
			engFlag: 'eng.webp',
			actualFlag: 'hun.webp',
		}) as RootState,
	actions: {
		async initializeStore(): Promise<void> {
			this.startLoading()
			this.model = (await tf.loadLayersModel(this.modelPath)) as tf.LayersModel
			this.endLoading()
		},
		changeLanguage(): void {
			this.language = this.language === 1 ? 0 : 1
			if (this.language === Language.English) {
				this.actualFlag = this.engFlag
				this.languageDict = EnglishWords
				return
			}
			this.languageDict = HungarianWords
			this.actualFlag = this.hunFlag
		},
		getLanguageDictItem(paramName: string): string {
			return this.languageDict[paramName]
		},
		startLoading(): void {
			this.loading = true
		},
		endLoading(): void {
			this.loading = false
		},
	},
	getters: {
		getLanguage(): Language {
			return this.language
		},
		getLoading(): boolean {
			return this.loading
		},
		getModel(): tf.LayersModel {
			if (!this.model) throw new Error('Model is not loaded!')
			return this.model as tf.LayersModel
		},
		getActualFlag(): string {
			return this.actualFlag
		},
	},
})
