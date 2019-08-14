import Vue from 'vue'
import App from './App'
import countUp from './components/p-countUp/countUp.vue'

Vue.component('countup',countUp)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
