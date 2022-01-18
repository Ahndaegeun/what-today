import { createApp } from 'vue'
import App from './App.vue'

import store from './store/index'
import router from './router'
import axios from 'axios'

const app = createApp(App)

app.config.globalProperties.axios = axios

app
  .use(router)
  .use(store)
  .mount('#app')
