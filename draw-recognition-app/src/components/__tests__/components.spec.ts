vi.mock('vue-router', () => ({
	useRouter: () => ({
		push: mockPush,
	}),
}))

vi.mock('../../store', () => ({
	useStore: () => useMockStore(),
}))

vi.mock('../../composables/usePlay', () => ({
	default: vi.fn(() => ({
		drawingPalette: { current: {} },
		predict: vi.fn(() => 0),
		prediction: 'Szivárvány',
		predId: vi.fn(() => 0),
	})),
}))

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DrawingPalette from '../DrawingPalette.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useMockStore } from '../../__mocks__/store'
import CustomDock from '../CustomDock.vue'
import PrimeVue from 'primevue/config'
import NavigationBar from '../NavigationBar.vue'
import NormalPlayGame from '../NormalPlayGame.vue'
import Owl from '../Owl.vue'
const mockPush = vi.fn()

beforeEach(() => {
	Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
		value: vi.fn(() => ({
			fillRect: vi.fn(),
			beginPath: vi.fn(),
			moveTo: vi.fn(),
			lineTo: vi.fn(),
			stroke: vi.fn(),
			lineWidth: 1,
			strokeStyle: null,
			fillStyle: null,
		})),
		writable: true,
	})
})

describe('DrawingPalette', () => {
	let wrapper: any

	beforeEach(() => {
		wrapper = mount(DrawingPalette, {
			global: {
				plugins: [setActivePinia(createPinia())],
			},
		})
	})

	it('initializes with correct default data', () => {
		expect(wrapper.vm.drawing).toBe(false)
		expect(wrapper.vm.mode).toBe(true)
	})

	it('handles startDrawing and stopDrawing correctly', () => {
		wrapper.vm.startDrawing(new MouseEvent('mousedown'))
		expect(wrapper.vm.drawing).toBe(true)
		wrapper.vm.stopDrawing()
		expect(wrapper.vm.drawing).toBe(false)
	})

	it('handles drawing correctly', () => {
		wrapper.vm.startDrawing(new MouseEvent('mousedown'))
		wrapper.vm.draw(new MouseEvent('mousemove'))
		wrapper.vm.stopDrawing()
	})

	it('toggles mode correctly', () => {
		wrapper.vm.onModeChanged(false)
		expect(wrapper.vm.mode).toBe(false)
		wrapper.vm.onModeChanged(true)
		expect(wrapper.vm.mode).toBe(true)
	})

	it('clears the canvas correctly', () => {
		wrapper.vm.clear()
		expect(wrapper.vm.ctx.fillRect).toHaveBeenCalledWith(0, 0, 256, 256)
	})
})

describe('CustomDock', () => {
	let wrapper: any
	beforeEach(() => {
		wrapper = mount(CustomDock, {
			global: {
				plugins: [setActivePinia(createPinia())],
			},
		})
	})

	it('contains an image in each dock item with the correct src', () => {
		const images = wrapper.findAll('.dock-link img')
		expect(images).toHaveLength(3)
		const expectedSrcs = ['pencil.png', 'eraser.png', 'delete.png']
		images.forEach((imgWrapper: any, index: any) => {
			expect(imgWrapper.attributes('src')).toBe(expectedSrcs[index])
		})
	})

	it('executes command and emits event on item click', () => {
		Object.defineProperty(window.Node.prototype, 'isSameNode', {
			value: function (otherNode: any) {
				return this === otherNode
			},
			writable: true,
		})
		wrapper.findAll('.dock-link')[0].trigger('click')
		expect(wrapper.vm.mode).toBe(true)
		expect(wrapper.emitted()).toHaveProperty('change')
		expect(wrapper.emitted('change')[0]).toEqual([true])
		wrapper.findAll('.dock-link')[2].trigger('click')
		expect(wrapper.emitted()).toHaveProperty('clear')
	})

	it('reacts to changes in mode correctly', () => {
		expect(wrapper.vm.mode).toBe(true)
		wrapper.vm.mode = false
		wrapper.vm.$nextTick()
		expect(wrapper.vm.mode).toBe(false)
	})

	it('initializes with the correct mode', () => {
		expect(wrapper.vm.mode).toBe(true)
	})
})

describe('NavigationBar', () => {
	let wrapper: any
	beforeEach(() => {
		localStorage.setItem('userNameToken', 'userName')
		wrapper = mount(NavigationBar, {
			global: {
				plugins: [PrimeVue, setActivePinia(createPinia())],
			},
		})
	})

	it('renders menu items correctly', () => {
		expect(wrapper.findAll('.item').length).toBe(5)
		expect(wrapper.findAll('.flag').length).toBe(1)
	})

	it('returns correct grid column class correctly', () => {
		Object.defineProperty(window, 'width', { value: 1025, writable: true })
		expect(wrapper.vm.gridCols).toBe('col-4')
		Object.defineProperty(window, 'width', { value: 400, writable: true })
		expect(wrapper.vm.gridCols).toBe('col-4')
		Object.defineProperty(window, 'width', { value: 800, writable: true })
		expect(wrapper.vm.gridCols).toBe('col-4')
	})

	it('displays the user name from localStorage', () => {
		expect(wrapper.html()).toContain('userName')
	})

	it('navigates to the root path when an item is clicked', async () => {
		await wrapper.findAll('.item')[0].trigger('click')
		expect(mockPush).toHaveBeenCalledWith('/')

		await wrapper.findAll('.item')[1].trigger('click')
		expect(mockPush).toHaveBeenCalledWith('/normalplay')
	})
})

describe('Owl', () => {
	let wrapper: any

	beforeEach(() => {
		wrapper = mount(Owl)
	})

	it('initializes with the first text and starts typing animation', () => {
		wrapper.vm.$nextTick()
		const firstText = wrapper.vm.texts[0]
		expect(wrapper.vm.typedText).not.toBe(firstText)
		expect(wrapper.vm.typedText).toBe(
			firstText.substring(0, wrapper.vm.typedText.length)
		)
	})

	it('shows full text or moves to next text on click', () => {
		wrapper.vm.showFullText()
		wrapper.vm.$nextTick()
		wrapper.find('.talktext').trigger('click')
		expect(wrapper.vm.textIndex).toBe(1)
	})
	it('conditionally displays action bar and drawing palette', async () => {
		wrapper.vm.textIndex = 4
		await wrapper.vm.$nextTick()
		expect(wrapper.vm.displayActionBar).toBe(true)

		wrapper.vm.textIndex = 5
		await wrapper.vm.$nextTick()
		expect(wrapper.vm.displayDrawingPalette).toBe(true)
	})
})

describe('NormalPlayGame', () => {
	let wrapper: any
	beforeEach(() => {
		wrapper = mount(NormalPlayGame, {
			global: {
				plugins: [PrimeVue, setActivePinia(createPinia())],
				mocks: {
					$store: {
						getLanguageDictItem: vi.fn((key) => key),
						predict: vi.fn(() => true),
						getModel: vi.fn(() => true),
					},
					checkCorrect: () => true,
				},
			},

			props: {
				selectedNumber: 1,
			},
		})
	})

	it('initializes with default values', () => {
		expect(wrapper.vm.score).toBe(0)
		expect(wrapper.vm.currentIndex).toBe(0)
		expect(wrapper.vm.end).toBe(false)
	})

	it('navigates away on quit', async () => {
		await wrapper.vm.quit()
		expect(mockPush).toHaveBeenCalledWith('/')
	})

	it('resets values on restart', async () => {
		await wrapper.vm.restart()
		expect(wrapper.vm.score).toBe(0)
		expect(wrapper.vm.currentIndex).toBe(0)
		expect(wrapper.vm.end).toBe(false)
	})

	it('renders score and game state correctly', () => {
		expect(wrapper.text()).toContain('A szavad')
		expect(wrapper.text()).toContain('0 / 0')
	})
})
