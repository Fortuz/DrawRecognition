<template>
	<canvas
		ref="canvas"
		width="256"
		height="256"
		@mousedown="startDrawing"
		@mouseup="stopDrawing"
		@mouseleave="stopDrawing"
		@mousemove="draw"
		@touchstart="startDrawing"
		@touchend="stopDrawing"
		@touchcancel="stopDrawing"
		@touchmove.prevent="draw"
		style="border: 1px solid black"
	></canvas>
	<!-- ezzel kiveszem ezt a taget ebbol a komponensbol es a body html tagjeben fog megjelenni -->
	<Teleport to="body">
		<CustomDock @change="onModeChanged" @clear="onCleared"></CustomDock>
	</Teleport>
</template>

<script setup lang="ts">
import { type Ref, ref, onMounted, toRaw } from 'vue'
import CustomDock from '../components/CustomDock.vue'
import * as tf from '@tensorflow/tfjs'
import { useStore } from '../store'

const canvas: Ref<HTMLCanvasElement | null> = ref(null) // rajzfelulet
let ctx: CanvasRenderingContext2D | null = null // rajzolasi context
let drawing: Ref<boolean> = ref(false) // igaz ha eppen rajzolas tortenik
let mode: Ref<boolean> = ref(true) // igaz ha rajzolas, hamis ha radirozas
const store = useStore() // pinia store

const predict = () => {
	if (!ctx || !canvas.value) return // ha valami meg nem toltott volna be
	const model = toRaw(store.getModel!) // atvesszuk a neuronhalo modellt a pinia storebol, a 'toRaw' segitsegevel biztositjuk, hogy a reaktiv proxy mogotti eredeti objektumot kapjuk meg
	let tensor = tf.browser.fromPixels(canvas.value, 1) // atalakitjuk 3d tensorra a rajzot, a harmadik dimenzio a csatornak szama, ami most 1, mert fekete-feher a rajz
	tensor = tensor.transpose() // a tenzor dimenzióinak sorrendjenek megvaltoztatasa
	tensor = tf.reverse(tensor, 1) // megforditjuk a tenzor elemeit a megadott tengely mentén
	tensor = tf.scalar(1).sub(tensor.toFloat().div(255)).expandDims(-1) // eloszor atalakitjuk a tenzort lebegopontos számokká, majd normalizaljuk 0 és 1 koze, vegul hozzáadunk egy uj dimenziot
	tensor = tensor.round() // kerekitjuk, hogy 0 es 1 ertekek legyenek csak
	const output = model.predict(tensor) as tf.Tensor // becsles elvegzese
	const predictedIndex = output.argMax(1).dataSync()[0] // az indexszet igy lehet kinyerni a becslesbol
	return predictedIndex
}

const onCleared = () => {
	clear() // toroljuk a tablat
}

onMounted(() => {
	// mielott rendereljuk a komponenset
	if (canvas.value) {
		ctx = canvas.value.getContext('2d') // kivesszuk a canvast
		clear() // es toroljuk
	}
})

const clear = () => {
	if (ctx) {
		ctx.fillStyle = 'white'
		ctx.fillRect(0, 0, 256, 256) // az egesz tablat feherre szinezzuk
	}
}

const getTouchPosition = (event: TouchEvent) => {
	const rect = canvas.value?.getBoundingClientRect() // a rajzolasi ter
	const touch = event.touches[0]
	return {
		x: touch.clientX - (rect?.left ?? 0), // erintes x koordinata
		y: touch.clientY - (rect?.top ?? 0), // erintes y koordinata
	}
}

const startDrawing = (event: MouseEvent | TouchEvent) => {
	drawing.value = true // rajzolas kezdes
	draw(event)
}

const stopDrawing = () => {
	if (!ctx) return
	drawing.value = false // rajzolas befejezese
	ctx.beginPath()
}

const draw = (event: MouseEvent | TouchEvent) => {
	if (!drawing.value || !ctx) return

	let clientX = 0
	let clientY = 0

	if (event instanceof MouseEvent) {
		//eger
		clientX = event.offsetX
		clientY = event.offsetY
	} else if (event instanceof TouchEvent && event.touches.length > 0) {
		// erintokijelzo
		const touchPos = getTouchPosition(event)
		clientX = touchPos.x
		clientY = touchPos.y
	} // x y koordinatak meghatarozasa

	if (!mode.value) {
		// rajzolas vagy torles
		ctx.lineWidth = 30
		ctx.strokeStyle = 'white'
	} else {
		ctx.lineWidth = 1
		ctx.strokeStyle = 'black'
	}

	ctx.lineCap = 'round'
	ctx.lineTo(clientX, clientY)
	ctx.stroke()
	ctx.beginPath()
	ctx.moveTo(clientX, clientY)
	// maga a rajzolas
}

const onModeChanged = (value: boolean) => {
	mode.value = value // modvaltas
}

defineExpose({
	predict,
	clear,
}) // ezeket eleri a szulokomponens is
</script>
