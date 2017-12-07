import Vue from 'vue'
import Vuex from 'vuex'
import "babel-polyfill"
import * as types from "./types.js"
import * as Storage from "../util/storage.js";

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isMobile:false,
    userInfo:{
      Name:localStorage.getItem("user_Name"),
      Master:localStorage.getItem("user_Master"),
      JoinTime:localStorage.getItem("user_JoinTime"),
      LearnSituation:localStorage.getItem("user_LearnSituation"),
      Type:-1
    },
    ifLogined:false
    
    
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







