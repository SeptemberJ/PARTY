<template>
  <div class="Index" style="background: url('static/img/BgP.jpg'); background-size: 100% 100%;background-repeat: no-repeat;">
  <!-- <div class="Index" style="background: url('static/img/BgP.jpg');background-attachment: fixed;background-repeat: no-repeat;" :style="backgroundSize:600 300"> -->
    <div class="FiveModule">
      <div style="width: 100%;height: 120px;margin:0 auto;display: block; text-align: center;">
      <Row type="flex" justify="space-between" class="code-row-bg" style="">
          <Col :xs="{ span: 4, offset: 0 }" class="ModuleItem">
            <img class="ModuleImg" src="static/img/zzfz.png" @click="GoToModule('Application')">
          </Col>
          <Col :xs="{ span: 4, offset: 0 }" class="ModuleItem">
            <img class="ModuleImg" src="static/img/zzgxjz.png" @click="GoToModule('Transfer')">
          </Col>
          <Col :xs="{ span: 4, offset: 0 }" class="ModuleItem">
            <img class="ModuleImg" src="static/img/sjdfsgs.png" @click="GoToModule('OutLink')">
          </Col>
          <Col :xs="{ span: 4, offset: 0 }" class="ModuleItem" >
            <img class="ModuleImg" src="static/img/dygrzx.png" @click="GoToModule('Login')">
          </Col>
          <Col :xs="{ span: 4, offset: 0 }" class="ModuleItem">
            <img class="ModuleImg" src="static/img/ldtyzzz.png" @click="GoToModule('FindOrganization')">
          </Col>
          
      </Row>
      </div>
      <div style="width: 85%;height: auto;margin:0 auto;display: block;">
      <Row type="flex" justify="space-around" class="code-row-bg"  style="width: auto;height: 150px;margin: 0 auto;">
          <Col :xs="{ span: 5, offset: 0 }" class="ModuleItem">
            <img class="ModuleImg" src="static/img/fgdtj.png" @click="GoToModule('NotPartyBuild')">
          </Col>
          <Col :xs="{ span: 5, offset: 0 }" class="ModuleItem">
            <img class="ModuleImg" src="static/img/jgdj.png" @click="GoToModule('PartyBuild')">
          </Col>
          <Col :xs="{ span: 5, offset: 0 }" class="ModuleItem">
            <img class="ModuleImg" src="static/img/shyk.png" @click="GoToModule('Learn')">
          </Col>
          <Col :xs="{ span: 5, offset: 0 }" class="ModuleItem" >
            <img class="ModuleImg" src="static/img/zhdjzszx.png" @click="GoToModule('Display')">
          </Col>
      </Row>
      </div>
    </div>
  </div> 



  


    
    
  


</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import {imageUtil} from '../util/utils'
  export default{
    data: function () {
      return {
        LINK_lj:'',
        LINK_fgd:'',
        LINK_jgdj:'',
        LINK_zt:'',
        
      }
    },
    mounted: function () {
      
    },
    created: function () {
      axios.get(R_PRE_URL+'/selectdt.do'
      ).then((res)=> {
        this.LINK_lj = res.data[0].lj
        this.LINK_fgd = res.data[0].fgd
        this.LINK_jgdj = res.data[0].jgdj
        this.LINK_zt = res.data[0].zt
      }).catch((error)=> {
        console.log(error)
      })
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
      

    },
    methods: {
      GoToModule(KIND){
        var _this = this
            switch(KIND){
                case 'OutLink':
                window.location.href = _this.LINK_lj
                break
                case 'Transfer':
                this.$router.push({name:'组织关系接转'})
                break
                case 'Login':
                if(this.$store.state.ifLogined){
                  this.$router.push({name:'党员中心'})
                }else{
                  this.$router.push({name:'登录'})
                }
                break
                case 'Application':
                this.$router.push({name:'入党申请'})
                break
                case 'Learn':
                this.$router.push({name:'三会一课'})
                break
                case 'NotPartyBuild':
                window.location.href = _this.LINK_fgd
                break
                case 'PartyBuild':
                window.location.href = _this.LINK_jgdj
                break
                case 'FindOrganization':
                this.$router.push({name:'流动党员找组织'})
                break
                case 'Display':
                window.location.href = _this.LINK_zt
                break
            }
        }
    }
  }
</script>
<style lang="scss">
.Index{
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: block;
 
  .FiveModule{
    width: 90%;
    height:300px;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 47%;
    left: 42%;
    transform:translate(-50%,-50%);
    -ms-transform:translate(-50%,-50%);   /* IE 9 */
    -moz-transform:translate(-50%,-50%);  /* Firefox */
    -webkit-transform:translate(-50%,-50%); /* Safari 和 Chrome */
    -o-transform:translate(-50%,-50%);  

  }
  .ivu-row{
    height: 100%;
  }
  .ModuleItem{
    height:100%;
    text-align: center;
  }
  .ModuleImg{
      width: 45%;
      height: auto;
    }
  @media screen and (max-width:768px){
    .ModuleImg{
      width: 90%;
      height: auto;
    }
    .FiveModule{
    width: 90%;
    height:300px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    -ms-transform:translate(-50%,-50%);   /* IE 9 */
    -moz-transform:translate(-50%,-50%);  /* Firefox */
    -webkit-transform:translate(-50%,-50%); /* Safari 和 Chrome */
    -o-transform:translate(-50%,-50%);  

  }
  }
  
  
  
}
</style>