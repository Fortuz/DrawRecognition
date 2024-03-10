<template>
	<img src="/owl2.webp" />
	<div class="talk-bubble round border" ref="chatBubble" @click="onClick()">
		<div class="talktext">
			<p>{{ typedText }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { type Ref, ref, watch, nextTick } from 'vue'
import { useStore } from '../store'
const store = useStore()
const texts: Ref<string[]> = ref([
	store
		.getLanguageDictItem('tutorialSpeech1')
		.replace('_', localStorage.getItem('userNameToken')!),
	store.getLanguageDictItem('tutorialSpeech2'),
	store.getLanguageDictItem('tutorialSpeech3'),
	store.getLanguageDictItem('tutorialSpeech4'),
	store.getLanguageDictItem('tutorialSpeech5'), //navbar
	store.getLanguageDictItem('tutorialSpeech6'), //drawingpalette
	store.getLanguageDictItem('tutorialSpeech7'),
])
const typedText: Ref<string> = ref('')
const typingSpeed: number = 20
let typingInterval: NodeJS.Timeout | null = null
const textIndex: Ref<number> = ref(0)
const actualFullText: Ref<string> = ref('')
const chatBubble: Ref<HTMLElement | null> = ref(null)
const fullText: Ref<boolean> = ref(false)
const displayActionBar: Ref<boolean> = ref(false)
const displayDrawingPalette: Ref<boolean> = ref(false)
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

watch(typedText, () => {
	if (chatBubble.value && shouldScroll()) {
		scrollToBottom()
	}
})

function scrollToBottom() {
	nextTick(() => {
		if (chatBubble.value) {
			chatBubble.value.scrollTop = chatBubble.value.scrollHeight
		}
	})
}

function shouldScroll(): boolean {
	const bubble = chatBubble.value
	return bubble ? bubble.scrollHeight > bubble.clientHeight : false
}

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
