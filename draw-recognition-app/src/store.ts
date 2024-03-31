import { defineStore } from 'pinia'
import { EnglishWords, HungarianWords } from './Langs'
import { Language } from './models/Language'
import * as tf from '@tensorflow/tfjs'

export type RootState = {
	languageDict: Record<string, string> // szotar
	language: Language // aktualis nyelv
	model: tf.LayersModel | null // neuronhalo modell
	modelPath: string // neuronhalo modell eleresi utja
	loading: boolean // tolt - e az oldal
	hunFlag: string // magyar zaszlo eleresi utja
	engFlag: string // UK zaszlo eleresi utja
	actualFlag: string // aktualis zaszlo eleresi utja
}
export type MyStore = ReturnType<typeof useStore> // store tipusa

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
			actualFlag: 'hun.webp', // kezdeti ertekek beallitasa
		}) as RootState,
	actions: {
		async initializeStore(): Promise<void> {
			this.startLoading() // toltes kezdese
			this.model = (await tf.loadLayersModel(this.modelPath)) as tf.LayersModel // neuronhalo modell betoltese
			this.endLoading() // toltes befejezodik
		},
		changeLanguage(): void {
			this.language = this.language === 1 ? 0 : 1 // language atallitasa
			if (this.language === Language.English) {
				this.actualFlag = this.engFlag // zaszlo
				this.languageDict = EnglishWords // szotas
				return
			}
			this.languageDict = HungarianWords
			this.actualFlag = this.hunFlag
		},
		getLanguageDictItem(paramName: string): string {
			return this.languageDict[paramName] // szotar elemenek visszaadas
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
