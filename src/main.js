import Vue from 'vue'
import Axios from 'axios'
import router from './router/router'
import Vuex from 'vuex'
import store from './store/store'
import VueResource from 'vue-resource'
import VueDND from 'awe-dnd'
import 'babel-polyfill'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// import 'theme/theme.less';



Vue.use(VueDND)
Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(iView)

//开启debug模式
Vue.config.debug = true
window.log = console.log

let data = {
  el:'#app',
  router,
  store
}
Vue.http.options.emulateJSON = true;




global.PRE_URL = ''
global.R_PRE_URL = 'https://zgeqscjdglj.org/dfjkorg'

 global.API_PROXY = 'https://bird.ioliu.cn/v1/?url='                    // 线上代理地址
 global.LOCAL_API_PROXY = 'http://192.168.10.18/proxy.php?apiProxy='    // 本地代理地址，主机ip

new Vue(data).$mount('#app')
