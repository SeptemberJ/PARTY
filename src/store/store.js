import Vue from 'vue'
import Vuex from 'vuex'
import "babel-polyfill"
import * as types from "./types.js"
import * as Storage from "../util/storage.js";

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isMobile:false,
    activeRoute:'首页',
    userInfo2:{
      Name:'',
      Master:'',
      JoinTime:'',
      LearnSituation:'',
      IdCard:'',
      Type:-1,
      FeedBack:''
    },
    userInfo:{
      Name:localStorage.getItem("user_Name"),
      Master:localStorage.getItem("user_Master"),
      JoinTime:localStorage.getItem("user_JoinTime"),
      LearnSituation:localStorage.getItem("user_LearnSituation"),
      IdCard:localStorage.getItem("user_ID"),
      Type:-1,
      FeedBack:localStorage.getItem("user_FeedBack"),
    },
    ifLogined:localStorage.getItem("user_Logined"),
    
    
    },
  
  mutations:{
    [types.ROUTE_CHANGE](state,data){
      state.activeRoute = data.activeRoute
    },
    
  },
//   actions: {

//   },
  getter: {

  }
})
export default store







