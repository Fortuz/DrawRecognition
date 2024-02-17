import { Category } from '../models/Category'
import { Language } from '../models/Language'
import { useMainStore } from '../stores/mainStore'

export const getNameById = (id: number, categories: Category[]) => {
	const mainStore = useMainStore()
	const word = categories.find((x) => x.word_id === id)
	if (!word) throw new Error('Category not found!')
	switch (mainStore.language) {
		case Language.English:
			return word.word_eng
		case Language.Hungarian:
			return word.word_hun
	}
}

export const getNameByCategory = (category: Category) => {
	const mainStore = useMainStore()
	switch (mainStore.language) {
		case Language.English:
			return category.word_eng
		case Language.Hungarian:
			return category.word_hun
	}
}
