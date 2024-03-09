<template>
	<img src="/owl2.webp" />
	<div class="talk-bubble round border" @click="onClick()">
		<div class="talktext">
			<p>{{ typedText }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { type Ref, ref, toRefs, ComputedRef, computed, watch } from 'vue'
import { useStore } from '../store'
const store = useStore()
const texts: Ref<string[]> = ref([
	store.getLanguageDictItem('tutorialSpeech1'),
	store.getLanguageDictItem('tutorialSpeech2'),
	store.getLanguageDictItem('tutorialSpeech3'),
	store.getLanguageDictItem('tutorialSpeech4'),
	store.getLanguageDictItem('tutorialSpeech5'), //navbar
	store.getLanguageDictItem('tutorialSpeech6'), //drawingpalette
	store.getLanguageDictItem('tutorialSpeech7'),
])
const typedText: Ref<string> = ref('')
const typingSpeed: number = 100
let typingInterval: NodeJS.Timeout | null = null
const textIndex: Ref<number> = ref(0)
const actualFullText: Ref<string> = ref('')
const fullText: Ref<boolean> = ref(false)
const displayActionBar: Ref<boolean> = ref(false)
const displayDrawingPalette: Ref<boolean> = ref(false)
let end: boolean = false
const emit = defineEmits<{
	(e: 'end'): void
}>()
typeText()

watch(textIndex, () => {
	if (textIndex.value === texts.value.length) {
		emit('end')
	}
	if (textIndex.value === 4) {
		displayActionBar.value = true
	}
	if (textIndex.value === 5) {
		displayDrawingPalette.value = true
	}
})

function typeText() {
	if (textIndex.value === texts.value.length) return
	actualFullText.value = texts.value[textIndex.value]
	fullText.value = false
	typedText.value = ''
	let index = 0
	typingInterval = setInterval(() => {
		if (index < actualFullText.value.length) {
			typedText.value += actualFullText.value.charAt(index)
			index++
		} else {
			clearInterval(typingInterval!)
			fullText.value = true
		}
	}, typingSpeed)
}

function showFullText() {
	if (typingInterval) {
		clearInterval(typingInterval)
		typingInterval = null
	}
	typedText.value = actualFullText.value
	fullText.value = true
}

function onClick() {
	if (fullText.value) {
		textIndex.value++
		typeText()
	} else {
		showFullText()
	}
}

defineExpose({
	displayActionBar,
	displayDrawingPalette,
})
</script>

<style scoped>
img {
	width: 5vw;
	margin-right: 1vw;
}

.talk-bubble {
	display: inline-block;
	position: relative;
	background-color: var(--bg-color-secondary);
	width: 15vw;
	overflow-y: scroll;
	height: 15vh;
	scrollbar-width: none;
	-ms-overflow-style: none;
	cursor: pointer;
}

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
</style>
