<template>
	<Card class="card">
		<template #content>
			<canvas
				ref="canvas"
				width="256"
				height="256"
				class="center"
				@mousedown="startDrawing"
				@mouseup="stopDrawing"
				@mouseleave="stopDrawing"
				@mousemove="draw"
				@touchstart="startDrawing"
				@touchend="stopDrawing"
				@touchcancel="stopDrawing"
				@touchmove.prevent="draw"
				style="border: 1px solid #000"
			></canvas>
		</template>
	</Card>
	<Teleport to="body">
		<CustomDock @change="onModeChanged"></CustomDock>
	</Teleport>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import { type Ref, ref, onMounted } from 'vue'
import CustomDock from '../components/CustomDock.vue'

const canvas: Ref<HTMLCanvasElement | null> = ref(null)
let ctx: CanvasRenderingContext2D | null = null
let drawing: Ref<boolean> = ref(false)
let mode: Ref<boolean> = ref(true)

onMounted(() => {
	if (canvas.value) {
		ctx = canvas.value.getContext('2d')
	}
})

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
	drawing.value = false
	if (ctx) {
		ctx.beginPath()
	}
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
</script>

<style scoped>
.card {
	width: 20vw;
	margin: auto;
	margin-top: 20vh;
	min-width: 300px;
}

.center {
	margin: auto;
	display: flex;
}
</style>
