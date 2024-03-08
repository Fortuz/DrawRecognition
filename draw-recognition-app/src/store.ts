import { defineStore } from 'pinia'
import { EnglishWords, HungarianWords } from './Langs'
import { Language } from './models/Language'
export type RootState = {
	languageDict: Record<string, string>
	language: Language
}
export type MyStore = ReturnType<typeof useStore>

export const useStore = defineStore('store', {
	state: () =>
		({
			languageDict: HungarianWords,
			language: Language.Hungarian,
		}) as RootState,
	actions: {
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
	},
	getters: {
		getLanguage(): Language {
			return this.language
		},
	},
})
