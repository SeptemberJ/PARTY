<template>
  <div class="Index" style="background: url('static/img/BgP.jpg'); background-size: 100% 100%;background-repeat: no-repeat;">
  <!-- <div class="Index" style="background: url('static/img/BgP.jpg');background-attachment: fixed;background-repeat: no-repeat;" :style="backgroundSize:600 300"> -->
    <div class="FiveModule">
      <Row type="flex" justify="center" class="code-row-bg">
          <Col :xs="{ span: 4, offset: 0 }" class="ModuleItem">
            <img class="ModuleImg" src="static/img/Application.jpg" @click="GoToModule('Application')">
          </Col>
          <Col :xs="{ span: 4, offset: 0 }" class="ModuleItem">
            <img class="ModuleImg" src="static/img/Transfer.jpg" @click="GoToModule('Transfer')">
          </Col>
          <Col :xs="{ span: 4, offset: 0 }" class="ModuleItem">
            <img class="ModuleImg" src="static/img/OutLink.jpg" @click="GoToModule('OutLink')">
          </Col>
          <Col :xs="{ span: 4, offset: 0 }" class="ModuleItem" >
            <img class="ModuleImg" src="static/img/Center.jpg" @click="GoToModule('Login')">
          </Col>
          <Col :xs="{ span: 4, offset: 0 }" class="ModuleItem">
            <img class="ModuleImg" src="static/img/Learn.jpg" @click="GoToModule('Learn')">
          </Col>
      </Row>
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
        LINK:'',
        
      }
    },
    mounted: function () {
      
    },
    created: function () {
      axios.get(R_PRE_URL+'/selectdt.do'
      ).then((res)=> {
        this.LINK = res.data[0].lj
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
                window.location.href = _this.LINK
                break
                case 'Transfer':
                this.$router.push({name:'党组织接转'})
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
    height:150px;
    position: fixed;
    top: 50%;
    left: 50%;
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
      width: 50%;
      height: auto;
    }
  @media screen and (max-width:768px){
    .ModuleImg{
      width: 90%;
      height: auto;
    }
  }
  
  
  
}
</style>