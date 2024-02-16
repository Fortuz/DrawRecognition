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
	<Teleport to="body">
		<CustomDock @change="onModeChanged" @clear="onCleared"></CustomDock>
	</Teleport>
</template>

<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue'
import CustomDock from '../components/CustomDock.vue'
import * as tf from '@tensorflow/tfjs'

const canvas: Ref<HTMLCanvasElement | null> = ref(null)
let ctx: CanvasRenderingContext2D | null = null
let drawing: Ref<boolean> = ref(false)
let mode: Ref<boolean> = ref(true)
const modelPath: string = '/model.json'

const predict = async () => {
	if (!ctx || !canvas.value) return
	const model = await tf.loadLayersModel(modelPath)
	let tensor = tf.browser.fromPixels(canvas.value, 1)
	tensor = tensor.transpose()
	tensor = tf.reverse(tensor, 1)
	tensor = tf.scalar(1).sub(tensor.toFloat().div(255)).expandDims(-1)
	tensor = tensor.round()
	const output = model.predict(tensor) as tf.Tensor
	const predictedIndex = output.argMax(1).dataSync()[0]
	return predictedIndex
}

const onCleared = () => {
	clear()
}

onMounted(() => {
	if (canvas.value) {
		ctx = canvas.value.getContext('2d')
		clear()
	}
})

const clear = () => {
	if (ctx) {
		ctx.fillStyle = 'white'
		ctx.fillRect(0, 0, 256, 256)
	}
}

const getTouchPosition = (event: TouchEvent) => {
	const rect = canvas.value?.getBoundingClientRect()
	const touch = event.touches[0]
	return {
		x: touch.clientX - (rect?.left ?? 0),
		y: touch.clientY - (rect?.top ?? 0),
	}
}

const startDrawing = (event: MouseEvent | TouchEvent) => {
	drawing.value = true
	draw(event)
}

const stopDrawing = () => {
	if (!ctx) return
	drawing.value = false
	ctx.beginPath()
}

const draw = (event: MouseEvent | TouchEvent) => {
	if (!drawing.value || !ctx) return

	let clientX = 0
	let clientY = 0

	if (event instanceof MouseEvent) {
		clientX = event.offsetX
		clientY = event.offsetY
	} else if (event instanceof TouchEvent && event.touches.length > 0) {
		const touchPos = getTouchPosition(event)
		clientX = touchPos.x
		clientY = touchPos.y
	}

	if (!mode.value) {
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
}

const onModeChanged = (value: boolean) => {
	mode.value = value
}

defineExpose({
	predict,
	clear,
})
</script>
