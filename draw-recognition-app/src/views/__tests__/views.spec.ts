import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useMockStore } from '../../__mocks__/store'
import PrimeVue from 'primevue/config'
import FreePlay from '../Play/FreePlay.vue'
import NormalPlay from '../Play/NormalPlay.vue'
import { config } from '@vue/test-utils'
import Helper from '../Helper.vue'
import Owl from '../../components/Owl.vue'
import DrawingPalette from '../../components/DrawingPalette.vue'
import Home from '../Home.vue'
import { useStore } from '../../store'
import ProgressSpinner from 'primevue/progressspinner'
import NavigationBar from '../../components/NavigationBar.vue'
import Main from '../Main.vue'
import ProfileCreator from '../ProfileCreator.vue'
const mockPush = vi.fn()
config.global.plugins.push(PrimeVue)
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

describe('FreePlay', () => {
	let wrapper: any

	beforeEach(() => {
		wrapper = mount(FreePlay, {
			global: {
				plugins: [setActivePinia(createPinia())],
			},
		})
	})

	it('renders prediction when available', async () => {
		await wrapper.find('.button').trigger('click')
		expect(wrapper.text()).toContain('Szivárvány')
	})

	it('displays language dictionary items correctly', () => {
		expect(wrapper.text()).toContain('Szabad játék')
		expect(wrapper.text()).toContain('Szerintem ez egy')
		expect(wrapper.text()).toContain('Kész')
	})
})

describe('Helper', () => {
	let wrapper: any

	beforeEach(() => {
		wrapper = mount(Helper, {
			global: {
				plugins: [setActivePinia(createPinia())],
			},
		})
	})

	it('should navigate to home page on end', async () => {
		window.localStorage.setItem('tutorialDoneToken', 'false')
		await wrapper.vm.onEnd()
		expect(window.localStorage.getItem('tutorialDoneToken')).toBe('true')
		expect(mockPush).toBeCalledWith('/')
	})

	it('should call onEnd and navigate home when skip button is clicked', async () => {
		await wrapper.find('.button').trigger('click')
		await wrapper.vm.$nextTick()
		expect(window.localStorage.getItem('tutorialDoneToken')).toBe('true')
		expect(mockPush).toBeCalledWith('/')
	})

	it('calls onEnd when the Owl component emits "end" event', async () => {
		const onEndSpy = vi.spyOn(wrapper.vm, 'onEnd')
		await wrapper.findComponent(Owl).vm.$emit('end')
		expect(onEndSpy).toHaveBeenCalled()
	})

	it('does not show DrawingPalette when displayDrawingPalette is false', async () => {
		const wrapper = mount(Helper, {
			props: {
				displayDrawingPalette: false,
			},
		})
		expect(wrapper.findComponent(DrawingPalette).exists()).toBe(false)
	})
})

describe('Home', () => {
	let wrapper: any

	beforeEach(() => {
		wrapper = mount(Home, {
			global: {
				plugins: [setActivePinia(createPinia())],
			},
		})
	})

	it('navigates to /normalplay on normal play click', async () => {
		await wrapper.findAll('.clickable')[0].trigger('click')
		expect(mockPush).toBeCalledWith('/normalplay')
	})

	it('navigates to /freeplay on free play click', async () => {
		await wrapper.findAll('.clickable')[1].trigger('click')
		expect(mockPush).toBeCalledWith('/freeplay')
	})

	it('navigates to /helper on helper click', async () => {
		await wrapper.findAll('.clickable')[2].trigger('click')
		expect(mockPush).toBeCalledWith('/helper')
	})

	it('calls changeLanguage method on language flag click', async () => {
		const changeLanguageSpy = vi.spyOn(useStore(), 'changeLanguage')
		await wrapper.findAll('.clickable')[3].trigger('click')
		expect(changeLanguageSpy).toHaveBeenCalled()
	})
})

describe('Main', () => {
	let wrapper: any

	beforeEach(() => {
		wrapper = mount(Main, {
			global: {
				plugins: [setActivePinia(createPinia())],
			},
		})
	})

	it('displays ProgressSpinner when loading', async () => {
		expect(wrapper.findComponent(ProgressSpinner).exists()).toBe(true)
		expect(wrapper.findComponent(NavigationBar).exists()).toBe(false)
	})
})

describe('ProfileCreator', () => {
	let wrapper: any

	beforeEach(() => {
		wrapper = mount(ProfileCreator, {
			global: {
				plugins: [setActivePinia(createPinia())],
			},
		})
	})

	it('validates input correctly', async () => {
		const input = wrapper.find('#playerNameInput')
		await input.setValue('')
		await input.trigger('change')
		expect(wrapper.vm.isError).toBe(true)
		expect(wrapper.vm.valid).toBe(false)

		await input.setValue('Test Name')
		await input.trigger('change')
		expect(wrapper.vm.isError).toBe(false)
		expect(wrapper.vm.valid).toBe(true)
	})

	it('navigates correctly and stores username', async () => {
		localStorage.removeItem('tutorialDoneToken')
		await wrapper.find('#playerNameInput').setValue('Test Name')
		localStorage.setItem('userNameToken', 'Test Name')
		await wrapper.find('.button').trigger('click')
		expect(localStorage.getItem('userNameToken')).toBe('Test Name')
		expect(mockPush).toHaveBeenCalledWith('/helper')
		localStorage.setItem('tutorialDoneToken', 'true')
		await wrapper.find('.button').trigger('click')
		expect(mockPush).toHaveBeenCalledWith('/')
	})

	it('calls changeLanguage on flag click', async () => {
		const changeLanguageSpy = vi.spyOn(wrapper.vm.store, 'changeLanguage')
		await wrapper.find('.clickable').trigger('click')
		expect(changeLanguageSpy).toHaveBeenCalled()
	})
})

describe('NormalPlay', () => {
	let wrapper: any

	beforeEach(() => {
		wrapper = shallowMount(NormalPlay, {
			global: {
				stubs: {
					NormalPlayGame: true,
				},
				plugins: [PrimeVue],
			},
		})
	})

	it('toggles the menu visibility on start and restart', async () => {
		expect(wrapper.vm.inMenu).toBe(true)
		await wrapper.vm.start()
		expect(wrapper.vm.inMenu).toBe(false)
		await wrapper.vm.onRestart()
		expect(wrapper.vm.inMenu).toBe(true)
	})

	it('should display the correct default category number', async () => {
		expect(wrapper.vm.categoryNumber).toBe(5)
	})

	it('should update the category number when changed', async () => {
		wrapper.vm.categoryNumber = 3
		expect(wrapper.vm.categoryNumber).toBe(3)
	})
})
