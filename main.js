import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import Fun from "./common/function.js";
Vue.prototype.fun = Fun;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
