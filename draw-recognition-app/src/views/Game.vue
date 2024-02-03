<template>
	<Card class="card">
		<template #content>
			<canvas
				ref="canvas"
				width="256"
				class="center"
				height="256"
				@mousedown="startDrawing"
				@mouseup="stopDrawing"
				@mouseleave="stopDrawing"
				@mousemove="draw"
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

const startDrawing = (event: MouseEvent) => {
	drawing.value = true
	draw(event)
}

const stopDrawing = () => {
	drawing.value = false
	if (ctx) {
		ctx.beginPath()
	}
}

const draw = (event: MouseEvent) => {
	if (!drawing.value || !ctx) return

	if (!mode.value) {
		ctx.lineWidth = 30
		ctx.strokeStyle = 'white'
	} else {
		ctx.lineWidth = 1
		ctx.strokeStyle = 'black'
	}

	ctx.lineCap = 'round'
	ctx.lineTo(event.offsetX, event.offsetY)
	ctx.stroke()
	ctx.beginPath()
	ctx.moveTo(event.offsetX, event.offsetY)
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
}

.center {
	margin: auto;
	display: flex;
}
</style>
