<template>
	<img src="/owl2.webp" />
	<!-- szovegdoboz -->
	<div class="talk-bubble round border" ref="chatBubble" @click="onClick()">
		<div class="talktext">
			<!-- dinamikusan megjeleniti a szoveget -->
			<p>{{ typedText }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { type Ref, ref, watch, nextTick } from 'vue'
import { useStore } from '../store'
const store = useStore() // pinia store
const texts: Ref<string[]> = ref([
	store
		.getLanguageDictItem('tutorialSpeech1')
		.replace('_', localStorage.getItem('userNameToken')!),
	store.getLanguageDictItem('tutorialSpeech2'),
	store.getLanguageDictItem('tutorialSpeech3'),
	store.getLanguageDictItem('tutorialSpeech4'),
	store.getLanguageDictItem('tutorialSpeech5'),
	store.getLanguageDictItem('tutorialSpeech6'),
	store.getLanguageDictItem('tutorialSpeech7'),
]) // a megjelenitendo szovegek, _ kicserelve a jatekos nevere
const typedText: Ref<string> = ref('') // a mar aktualis szovegbol leirt szoveg
const typingSpeed: number = 20 // irasi sebesseg
let typingInterval: NodeJS.Timeout | null = null // irasi intervallum
const textIndex: Ref<number> = ref(0) // az aktualis szoveg indexsze
const actualFullText: Ref<string> = ref('') // az aktualis teljes szoveg
const chatBubble: Ref<HTMLElement | null> = ref(null) // HTML element referencia
const fullText: Ref<boolean> = ref(false) // kiirta - e mar a teljes aktualis szoveget
const displayActionBar: Ref<boolean> = ref(false) // mutatja - e a navigacios bart
const displayDrawingPalette: Ref<boolean> = ref(false) // mutatja - e a rajzfeluletet
const emit = defineEmits<{
	(e: 'end'): void
}>() // esemenyek
typeText() // elkezdi irni a szoveget

watch(textIndex, () => {
	// egy figyelo a textIndexre
	if (textIndex.value === texts.value.length) {
		// ha kiirta az osszes szoveget, akkor vegrehajtja az end esemenyt
		emit('end')
	}
	if (textIndex.value === 4) {
		// 4. indexszu szovegnel kell kirajzolni a navbart
		displayActionBar.value = true
	}
	if (textIndex.value === 5) {
		// 5. indexszu szovegnel kell megjeleniteni a rajzfeluletet
		displayDrawingPalette.value = true
	}
})

watch(typedText, () => {
	// figyelo az aktualisan leirt szovegre
	if (chatBubble.value && shouldScroll()) {
		// ha betelne a szovegdoboz
		scrollToBottom() // leteker a szovegdoboz aljara
	}
})

function scrollToBottom() {
	// tekeres a szovegdoboz aljara
	nextTick(() => {
		if (chatBubble.value) {
			chatBubble.value.scrollTop = chatBubble.value.scrollHeight
		}
	})
}

function shouldScroll(): boolean {
	// szukseges - e letekerni a szovegdoboz aljara
	const bubble = chatBubble.value // szovegdoboz referencia
	return bubble ? bubble.scrollHeight > bubble.clientHeight : false // magassag alapjan meghatarozas
}

function typeText() {
	if (textIndex.value === texts.value.length) return // ha vege az aktualis szovegnek
	actualFullText.value = texts.value[textIndex.value] // aktualis szoveg meghatarozasa
	fullText.value = false // meg nem irta vegig a szoveget
	typedText.value = '' // ures szoveg beallitasa
	let index = 0 // kezdo index
	typingInterval = setInterval(() => {
		if (index < actualFullText.value.length) {
			// ha meg van szoveg
			typedText.value += actualFullText.value.charAt(index) // betu hozzaadas
			index++ // leptetes
		} else {
			clearInterval(typingInterval!) // vege
			fullText.value = true
		}
	}, typingSpeed)
}

function showFullText() {
	if (typingInterval) {
		clearInterval(typingInterval) // ha eppen ir, akkor szakitsuk meg
		typingInterval = null
	}
	typedText.value = actualFullText.value // teljes szoveg kiirasa
	fullText.value = true // igazra allitjuk, hogy eppen a teljes szoveg van megjelenitve
}

function onClick() {
	if (fullText.value) {
		// ha mar a teljes szoveg van kiirva
		textIndex.value++ // leptetes
		typeText() // kiiras
	} else {
		showFullText() // kulonben a teljes szoveg kiirasa
	}
}

defineExpose({
	displayActionBar,
	displayDrawingPalette,
}) // ezeket fogja elerni a szulokomponens is
</script>

<style scoped>
.talk-bubble::-webkit-scrollbar {
	display: none;
}

.talktext {
	padding: 1em;
	margin: 1vh 1vw;
	text-align: left;
	line-height: 1.5em;
	word-wrap: break-word;
}
.talktext p {
	-webkit-margin-before: 0em;
	-webkit-margin-after: 0em;
}

.border {
	border: 1px solid black;
}
.round {
	border-radius: 30px;
	-webkit-border-radius: 30px;
	-moz-border-radius: 30px;
}

@media (max-width: 480px) {
	.talk-bubble {
		display: inline-block;
		position: relative;
		background-color: var(--bg-color-secondary);
		width: 50vw;
		overflow-y: scroll;
		height: 20vh;
		scrollbar-width: none;
		-ms-overflow-style: none;
		cursor: pointer;
	}
	img {
		width: 15vw;
		margin-right: 1vw;
	}
}

@media (min-width: 481px) and (max-width: 1024px) {
	img {
		width: 15vw;
		margin-right: 1vw;
	}
	.talk-bubble {
		display: inline-block;
		position: relative;
		background-color: var(--bg-color-secondary);
		width: 45vw;
		overflow-y: scroll;
		height: 20vh;
		scrollbar-width: none;
		-ms-overflow-style: none;
		cursor: pointer;
	}
}

@media (min-width: 1025px) {
	img {
		width: 5vw;
		margin-right: 1vw;
	}
	.talk-bubble {
		display: inline-block;
		position: relative;
		background-color: var(--bg-color-secondary);
		width: 25vw;
		overflow-y: scroll;
		height: 20vh;
		scrollbar-width: none;
		-ms-overflow-style: none;
		cursor: pointer;
	}
}
</style>
