import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import "vue-toastification/dist/index.css";
import './assets/css/fontawesome.min.css'
import './assets/css/app.css'
import 'animate.css';

createApp(App)
    .use(createPinia())
    .use(router)
    .use(Toast)
    .mount('#app')