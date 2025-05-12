import { createApp } from 'vue'
// import { createPinia } from 'pinia' // Make sure Pinia is installed
import router from './router'
import App from './App.vue'
import './style.css' // Import the global styles

const app = createApp(App)

// app.use(createPinia()) // Use Pinia
app.use(router)
app.mount('#app')