import { Category } from '../models/Category'
import { Language } from '../models/Language'
import { MyStore } from '../store'

export const getNameById = (
	id: number,
	categories: Category[],
	store: MyStore
) => {
	const word = categories.find((x) => x.word_id === id)
	if (!word) throw new Error('Category not found!')
	switch (store.getLanguage) {
		case Language.English:
			return word.word_eng
		case Language.Hungarian:
			return word.word_hun
	}
}

export const getNameByCategory = (category: Category, store: MyStore) => {
	switch (store.getLanguage) {
		case Language.English:
			return category.word_eng
		case Language.Hungarian:
			return category.word_hun
	}
}
