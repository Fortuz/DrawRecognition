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
		}) as RootState,
	actions: {
		async initializeStore(): Promise<void> {
			this.startLoading()
			this.model = (await tf.loadLayersModel(this.modelPath)) as tf.LayersModel
			await new Promise((resolve) => setTimeout(resolve, 30000))
			this.endLoading()
		},
		changeLanguage(): void {
			this.language = this.language === 1 ? 0 : 1
			if (this.language === Language.English) {
				this.languageDict = EnglishWords
				return
			}
			this.languageDict = HungarianWords
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
	},
})
