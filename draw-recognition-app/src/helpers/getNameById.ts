import { categories } from "../assets/categories"

export const getNameById = (id: number) => {
	const word = categories.find((x) => x.word_id === id)?.word
	if (!word) throw new Error('Category not found!')
	return word
}
