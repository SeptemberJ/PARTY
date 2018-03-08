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
    userInfo:{
      Name:localStorage.getItem("user_Name"),
      Master:localStorage.getItem("user_Master"),
      JoinTime:localStorage.getItem("user_JoinTime"),
      PartyPosition:localStorage.getItem("user_PartyPosition"),
      LearnSituation:localStorage.getItem("user_LearnSituation"),
      IdCard:localStorage.getItem("user_ID"),
      WorkUnit:localStorage.getItem("user_WorkUnit"),
      JNPosition:localStorage.getItem("user_JNPosition"),
      PartyCost:localStorage.getItem("user_PartyCost"),
      TranferRelation:localStorage.getItem("user_TranferRelation"),
      Type:-1,
      FeedBack:localStorage.getItem("user_FeedBack"),
      ZRFeedBack:localStorage.getItem("user_ZRFeedBack"),
      ydate:localStorage.getItem("user_ydate"),
      zrdate:localStorage.getItem("user_zrdate"),
      SF:localStorage.getItem("user_SF"), //正式党员身份类型
    },
    ifLogined:localStorage.getItem("user_Logined"),
    VideoSource:''
    
    
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







