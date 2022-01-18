import { createStore } from 'vuex'

import nav from './nav'
import weather from './weather'

const store = createStore({
  namespace: true,
  modules: {
    nav,
    weather
  }
})

export default store