import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import Fun from "./common/function.js";
Vue.prototype.fun = Fun;
// 普通引入组件
import tkiFileManager from "@/components/tki-file-manager/tki-file-manager.vue"
Vue.component('tki-file-manager',tkiFileManager)

Vue.prototype.remoteUrl='http://7xstore.club//erp-bootstrap-0.0.1-SNAPSHOT';
// Vue.prototype.remoteUrl='http://192.168.1.3:8070';
Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
