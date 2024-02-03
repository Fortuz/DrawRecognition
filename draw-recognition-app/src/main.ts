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
const pinia = createPinia()
const app = createApp(App)
app.directive('ripple', Ripple)
app.use(router)
app.use(PrimeVue, { ripple: true })
app.use(pinia)
app.mount('#app')
