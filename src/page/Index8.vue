<template>
  <div class="Index" style="background: url('static/img/BgP.jpg'); background-size: 100% 100%;background-repeat: no-repeat;">
    <div class="modules">
      <Row type="flex" justify="space-around" class="code-row-bg" style="height: 50%;">
        <Col :xs="{ span: 6}" class="ModuleItem">
          <Card style="width:100%;height: 100%;" dis-hover :bordered="false">
              <div style="text-align:center">
                  <img src="static/img/zzfz.png" @click="GoToModule('Application')">
                 <!--  <p>流动党员找组织</p> -->
              </div>
          </Card>
        </Col>
        <Col :xs="{ span: 6}" class="ModuleItem">
          <Card style="width:100%;height: 100%;" dis-hover :bordered="false">
              <div style="text-align:center">
                  <img src="static/img/zzgxjz.png" @click="GoToModule('Transfer')">
                  <!-- <p>入党申请</p> -->
              </div>
          </Card>
        </Col>
        <Col :xs="{ span: 6}" class="ModuleItem">
          <Card style="width:100%;height: 100%;" dis-hover :bordered="false" >
              <div style="text-align:center">
                  <img src="static/img/ldtyzzz.png" @click="GoToModule('FindOrganization')">
                  <!-- <p>入党申请</p> -->
              </div>
          </Card>
        </Col>
        <Col :xs="{ span: 6}" class="ModuleItem">
          <Card style="width:100%;height: 100%;" dis-hover :bordered="false">
              <div style="text-align:center">
                  <img src="static/img/shyk.png" @click="GoToModule('Learn')">
                  <!-- <p>入党申请</p> -->
              </div>
          </Card>
        </Col>
      </Row>

      <Row type="flex" justify="space-around" class="code-row-bg" style="height: 50%;">
        <Col :xs="{ span: 6}" class="ModuleItem">
          <Card style="width:100%;height: 100%;" dis-hover :bordered="false">
              <div style="text-align:center">
                  <img src="static/img/dygrzx.png" @click="GoToModule('Login')">
                 <!--  <p>流动党员找组织</p> -->
              </div>
          </Card>
        </Col>
        <Col :xs="{ span: 6}" class="ModuleItem">
          <Card style="width:100%;height: 100%;" dis-hover :bordered="false">
              <div style="text-align:center">
                  <img src="static/img/zzgxjz.png" @click="GoToModule('dfjngs')">
                  <!-- <p>入党申请</p> -->
              </div>
          </Card>
        </Col>
        <Col :xs="{ span: 6}" class="ModuleItem">
          <Card style="width:100%;height: 100%;" dis-hover :bordered="false">
              <div style="text-align:center">
                  <img src="static/img/ldtyzzz.png">
                  <!-- <p>入党申请</p> -->
              </div>
          </Card>
        </Col>
        <Col :xs="{ span: 6}" class="ModuleItem">
          <Card style="width:100%;height: 100%;" dis-hover :bordered="false">
              <div style="text-align:center">
                  <img src="static/img/sjdfsgs.png" @click="GoToModule('OutLink')">
                  <!-- <p>入党申请</p> -->
              </div>
          </Card>
        </Col>
      </Row>


    </div>
   <!--  <div class="FiveModule">
      <div class="DBlock" >
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
      <div class="DBlock" >
      <Row type="flex" justify="space-between" class="code-row-bg" style="">
          <Col :xs="{ span: 4, offset: 0 }" class="ModuleItem">
            <img class="ModuleImg" src="static/img/fgdtj.png" @click="GoToModule('NotPartyBuild')">
          </Col>
          <Col :xs="{ span: 4, offset: 0 }" class="ModuleItem">
            <img class="ModuleImg" src="static/img/jgdj.png" @click="GoToModule('PartyBuild')">
          </Col>
          <Col :xs="{ span: 4, offset: 0 }" class="ModuleItem">
            <img class="ModuleImg" src="static/img/shyk.png" @click="GoToModule('Learn')">
          </Col>
          <Col :xs="{ span: 4, offset: 0 }" class="ModuleItem" >
            <img class="ModuleImg" src="static/img/zhdjzszx.png" @click="GoToModule('Display')">
          </Col>
          <Col :xs="{ span: 4, offset: 0 }" class="ModuleItem">
            <img class="ModuleImg" src="static/img/dflz.png" @click="GoToModule('DFLZ')">
          </Col>
      </Row>
      </div>
    </div> -->
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
        LINK_dflz:''
        
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
        this.LINK_dflz = res.data[0].dflz
      }).catch((error)=> {
        console.log(error)
      })
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
                case 'dfjngs': 
                window.location.href = 'http://www.kd0472.com/index.php?g=Wap&m=Index&a=lists&classid=3937&token=dxqrie1491531059&wecha_id=0'
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
                case 'DFLZ':
                window.location.href = _this.LINK_dflz
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
  .modules{
    width: 90%;
    height:50%;
    display: flex;
    flex-direction: column;
    position: fixed;
    justify-content: space-around;
    bottom: 35%;
    left: 42%;
    transform:translateX(-50%);
    -ms-transform:translateX(-50%);  /* IE 9 */
    -moz-transform:translateX(-50%);  /* Firefox */
    -webkit-transform:translateX(-50%); /* Safari 和 Chrome */
    -o-transform:translateX(-50%);
    @media screen and (max-width:414px){
      height: 250px;
    }
    .ModuleItem{
      height:90%;
      img{
        width: 50% !important;
        height: auto;
      }
      p{
        font-weight: bold;
      }
      @media screen and (max-width:1366px){
        .ivu-card-body{
          padding: 0 10px !important;
          margin-top: 10px !important;
        }
        img{
          width: 40% !important;
        }
      }
      @media screen and (max-width:1024px){
        .ivu-card-body{
          padding: 0 10px !important;
          margin-top: 10px !important;
        }
        img{
          width: 60% !important;
          height: auto;
        }
      }
      @media screen and (max-width:768px){
        .ivu-card-body{
          padding: 0 10px !important;
          margin-top: 10px !important;
        }
        img{
          width: 80% !important;
          height: auto;
        }
      }
      @media screen and (max-width:414px){
        .ivu-card-body{
          padding: 0 10px !important;
          margin-top: 10px !important;
        }
        img{
          width: 100% !important;
          height: auto;
        }
        p{
          font-weight: 500;
          font-size: 10px;
          color: red;
        }
      }
    }
  } 
}
.ivu-card{
  background: transparent !important;
}
</style>