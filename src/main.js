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




// http request 拦截器
// Axios.interceptors.request.use(function (config) {
//     config.headers.Authorization = sessionStorage.getItem("user_token")//将接口返回的token信息配置到接口请求中
//     console.log(config)
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });
// // http response 拦截器
// Axios.interceptors.response.use(function(response){
//     if(response.data.code=='1001'||response.data.code=='1002'){//具体的判断token失效的参数
//         sessionStorage.setItem("user_token",'')
//         sessionStorage.setItem("LoginUser",'{}')
//         alert(response.data.msg);
//         window.location.href='/login'//需求方要求一旦出错立即跳转登录，所以采取这种侵入式的手段。
//     }else{
//         return response
//     }
// }, function (error) {
//     return Promise.reject(error);
// });

global.PRE_URL = ''
global.R_PRE_URL = 'http://192.168.10.40:8082'

 global.API_PROXY = 'https://bird.ioliu.cn/v1/?url='                    // 线上代理地址
 global.LOCAL_API_PROXY = 'http://192.168.10.18/proxy.php?apiProxy='    // 本地代理地址，注意更改为你的主机ip
//创建一个app实例，并且挂载到选择符#app匹配的元素上
new Vue(data).$mount('#app')
