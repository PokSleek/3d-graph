import {
    createVuesticEssential, VaInput, VaButton,
} from 'vuestic-ui'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import 'vuestic-ui/css'
import './assets/main.css'


const app = createApp(App)

app.use(router)

app.use(createVuesticEssential({ components: { VaInput, VaButton } }));
app.mount('#app')
