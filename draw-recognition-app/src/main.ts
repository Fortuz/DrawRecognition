import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router/main'
import Ripple from 'primevue/ripple'
import PrimeVue from 'primevue/config'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primeflex/primeflex.css'
import Tooltip from 'primevue/tooltip'
import { useStore } from './store'
const pinia = createPinia()
const app = createApp(App)
app.directive('ripple', Ripple)
app.directive('tooltip', Tooltip)
app.use(router)
app.use(PrimeVue, { ripple: true })
app.use(pinia)

const store = useStore()
store.initializeStore()

app.mount('#app')
