<template>
  <div class="Index" style="background: url('static/img/Bgimg.jpg'); background-size: 100% 100%;background-repeat: no-repeat;">
    <div class="modules">
      <Row type="flex" align="middle"  class="code-row-bg" style="width: 100%;height: 16.666%;">
        <Col :xs="{ span: 6}" class="ModuleItem ModuleItemSpecial">
          <Card style="width:100%;height: 100%;" dis-hover :bordered="false">
            <div style="text-align:center">
                <img src="static/img/入党申请.png" @click="GoToModule('Application')">
            </div>
          </Card>
        </Col>
      </Row>

      <Row type="flex" justify="center" align="middle"  class="code-row-bg" style="height: 20%;">
        <Col :xs="{ span: 6}" class="ModuleItem">
        </Col>
        <Col :xs="{ span: 6}" class="ModuleItem">
          <Card style="width:100%;height: 100%;" dis-hover :bordered="false">
            <div style="text-align:left">
                <img src="static/img/党建文化长廊.png" @click="GoToModule('djwhcl')">
            </div>
          </Card>
        </Col>
        <Col :xs="{ span: 6}" class="ModuleItem">
          <Card style="width:100%;height: 100%;" dis-hover :bordered="false">
            <div style="text-align:right">
                <img src="static/img/组织关系接转.png" @click="GoToModule('Transfer')">
            </div>
          </Card>
        </Col>
        <Col :xs="{ span: 6}" class="ModuleItem">
        </Col>
      </Row>

      <Row type="flex" justify="center" align="middle" class="code-row-bg" style="height: 16.666%;">
        <Col :xs="{ span: 6}" class="ModuleItem">
        </Col>
        <Col :xs="{ span: 6}" class="ModuleItem">
          <Card style="width:100%;height: 100%;margin-left: -25%" dis-hover :bordered="false">
            <div style="text-align:left">
                <img src="static/img/党员学习.png" @click="GoToModule('dyxx')">
            </div>
          </Card>
        </Col>
        <Col :xs="{ span: 6}" class="ModuleItem">
          <Card style="width:100%;height: 100%;margin-left: 75%" dis-hover :bordered="false">
            <div style="text-align:left">
                <img src="static/img/流动党员找组织.png" @click="GoToModule('FindOrganization')">
            </div>
          </Card>
        </Col>
        <Col :xs="{ span: 6}" class="ModuleItem">
        </Col>
      </Row>

      <Row type="flex" justify="center" align="middle" class="code-row-bg" style="height: 16.666%;">
        
        <Col :xs="{ span: 6}" class="ModuleItem">
          <Card style="width:100%;height: 100%;" class="specialCardL" dis-hover :bordered="false">
            <div style="text-align:right">
                <img src="static/img/党员档案.png" @click="GoToModule('dyda')">
            </div>
          </Card>
        </Col>
        <Col :xs="{ span: 6}" class="ModuleItem">
        </Col>
        <Col :xs="{ span: 6}" class="ModuleItem">
        </Col>
        <Col :xs="{ span: 6}" class="ModuleItem">
          <Card style="width:100%;height: 100%;" class="specialCardR" dis-hover :bordered="false">
            <div style="text-align:left">
                <img src="static/img/三会一课.png" @click="GoToModule('Learn')">
            </div>
          </Card>
        </Col>
        
      </Row>

      <Row type="flex" justify="center" align="middle"  class="code-row-bg" style="height: 16.666%;">
        <Col :xs="{ span: 6}" class="ModuleItem">
        </Col>
        <Col :xs="{ span: 6}" class="ModuleItem">
          <Card style="width:100%;height: 100%;" dis-hover :bordered="false">
            <div style="text-align:left">
                <img src="static/img/党建要闻.png" @click="GoToModule('djyw')">
            </div>
          </Card>
        </Col>
        <Col :xs="{ span: 6}" class="ModuleItem">
          <Card style="width:100%;height: 100%;" dis-hover :bordered="false">
            <div style="text-align:right">
                <img src="static/img/个人中心.png" @click="GoToModule('Login')">
            </div>
          </Card>
        </Col>
        <Col :xs="{ span: 6}" class="ModuleItem">
        </Col>
      </Row>

      <Row type="flex" align="middle"  class="code-row-bg" style="width: 100%;height: 16.666%;">
        <Col :xs="{ span: 6}" class="ModuleItem ModuleItemSpecial">
          <Card style="width:100%;height: 100%;" dis-hover :bordered="false">
            <div style="text-align:center">
                <img src="static/img/党费收缴.png" @click="GoToModule('dfsj')">
            </div>
          </Card>
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
                window.location.href = 'http://www.kd0472.com/index.php?g=Wap&m=Index&a=lists&classid=4151&token=dxqrie1491531059&wecha_id=0'
                break
                case 'dfsj': 
                window.location.href = 'http://www.kd0472.com/index.php?g=Wap&m=Index&a=lists&classid=3937&token=dxqrie1491531059&wecha_id=0'
                break
                case 'djyw':
                window.location.href = 'http://www.kd0472.com/index.php?g=Wap&m=Index&a=lists&classid=4097&token=dxqrie1491531059'
                break
                case 'dyda':
                window.location.href = 'http://www.kd0472.com/index.php?g=Wap&m=Index&a=lists&classid=4084&token=dxqrie1491531059&wecha_id=0'
                break
                case 'dyxx':
                window.location.href = 'http://www.kd0472.com/index.php?g=Wap&m=Index&a=lists&classid=4040&token=dxqrie1491531059&wecha_id=0'
                break
                case 'djwhcl':
                window.location.href = 'http://www.expoon.com/e/z1ded1yuzac/panorama?from=timeline'
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
    width: 100%;
    height:80%;
    display: flex;
    flex-direction: column;
    position: fixed;
    text-align: center;
    justify-content: space-around;
    align-items: center;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    -ms-transform:translate(-50%,-50%);  /* IE 9 */
    -moz-transform:translate(-50%,-50%);  /* Firefox */
    -webkit-transform:translate(-50%,-50%); /* Safari 和 Chrome */
    -o-transform:translate(-50%,-50%);
    @media screen and (max-width:414px){
      height:60%;
    }
    .ModuleItem{
      width: 25%;
      height: 100%;
      img{
        width: 60% !important;
        height: auto;
      }
      @media screen and (max-width:414px){
        img{
          width: 90% !important;
          height: auto;
        }
        .specialCardL{
          margin-left: 35%;
        }
        .specialCardR{
          margin-left: -15%;
        }
      }
    }
    .ModuleItemSpecial{
      margin-left: 37.5%;
      height: 100%;
      img{
        width: 50% !important;
        height: auto;
      }
    }
  } 
}
.ivu-card-body{
  padding: 0 10px !important;
  margin-top: 20px !important;
}
.ivu-card{
  background: transparent !important;
}
</style>