import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify' // path to vuetify export



// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';


// import fs from 'fs'
// import path from 'path'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  vuetify,
  template: '<App/>'
}).$mount('#app')

// let fileContents = fs.readFileSync(path.join(__static, '/someFile.txt'), 'utf8')

// console.log(fileContents)

// var pathToFfmpeg = require('ffmpeg-static');
// console.log(pathToFfmpeg);
