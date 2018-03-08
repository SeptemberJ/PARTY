<template>
  <div class="MemberCenter">
    <BackBar></BackBar>
    <PullRefresh :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData">
    <div class="InfoBox">
      <Row class="marginT_10">
        <Col span="12" class="TextRight"><b>姓名：</b></Col>
        <Col span="12" class="TextLeft">{{userInfo.Name}}</Col>
      </Row>
      <Row class="marginT_10">
        <Col span="12" class="TextRight"><b>身份证号：</b></Col>
        <Col span="12" class="TextLeft">{{userInfo.IdCard}}</Col>
      </Row>
      <Row class="marginT_10" v-if="Type==0">
        <Col span="12" class="TextRight"><b>局内职务：</b></Col>
        <Col span="12" class="TextLeft">{{userInfo.JNPosition}}</Col>
      </Row>
      <Row class="marginT_10" v-if="Type==0">
        <Col span="12" class="TextRight"><b>党内职务：</b></Col>
        <Col span="12" class="TextLeft">{{userInfo.PartyPosition}}</Col>
      </Row>
      <Row class="marginT_10" v-if="Type==0">
        <Col span="12" class="TextRight"><b>所属支部：</b></Col>
        <Col span="12" class="TextLeft">{{userInfo.Master}}</Col>
      </Row>
      <Row class="marginT_10" v-if="Type==0">
        <Col span="12" class="TextRight"><b>入党时间：</b></Col>
        <Col span="12" class="TextLeft">{{userInfo.JoinTime}}</Col>
      </Row>
      <Row class="marginT_10" v-if="Type==0">
        <Col span="12" class="TextRight"><b>所在部门：</b></Col>
        <Col span="12" class="TextLeft">{{userInfo.WorkUnit}}</Col>
      </Row>
      <Row class="marginT_10" v-if="Type==0">
        <Col span="12" class="TextRight"><b>党费：</b></Col>
        <Col span="12" class="TextLeft">{{userInfo.PartyCost}}</Col>
      </Row>
      <Row class="marginT_10" v-if="Type==1">
        <Col span="12" class="TextRight"><b>目前身份：</b></Col>
        <Col span="12" class="TextLeft">{{userInfo.SF}}</Col>
      </Row>
      <Row class="marginT_10" v-if="Type==0">
        <Col span="12" class="TextRight"><b>组织接转信息：</b></Col>
        <Col span="12" class="TextLeft">{{userInfo.TranferRelation}}</Col>
      </Row>
      <Row class="marginT_10" v-if="userInfo.FeedBack !='' && userInfo.FeedBack !='undefined'">
        <Col span="24">
          <Alert type="warning" class="TextLeft">
            {{userInfo.ydate}}
            <span slot="desc" style="padding: 10px;">
              {{userInfo.FeedBack}}
            </span>
          </Alert>
        </Col>
      </Row>

      <Row class="marginT_10" v-if="userInfo.ZRFeedBack && userInfo.ZRFeedBack != 'null'">
        <Col span="24">
          <Alert type="warning" class="TextLeft">
            {{userInfo.zrdate}}
            <span slot="desc" style="padding: 10px;">
              {{userInfo.ZRFeedBack}}
            </span>
          </Alert>
        </Col>
      </Row>

      <Row v-if="Type==1">
        <Col span="24">
          <Upload
          multiple
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            type="drag"
            :before-upload="handleBeforeUpload"
            action="">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击选择上传思想汇报</p>
        </div>
          </Upload>
        </Col>
      </Row>
      <Row type="flex" justify="start" class="code-row-bg marginT_10" v-if="reportSource.length>0">
        <Col span="24">
          <div class="demo-upload-list" v-for="(Img,Idx) in reportSource">
              <template>
                  <img :src="Img">
                  <div class="demo-upload-list-cover">
                      <Icon style="color: #000;" type="close-circled" @click.native="handleRemove(Img)"></Icon>
                  </div>
              </template>
          </div>
        </Col>
      </Row>
      <Row class="marginT_10" v-if="reportSource.length>0">
        <Col span="24">
          <Button type="primary" @click="submitReport">提交</Button>
        </Col>
      </Row>

      <Row type="flex" justify="center" class="code-row-bg marginT_10">
        <Col span="12">
          <Button type="error" long @click="LoginOut">退出登录</Button>
        </Col>
      </Row>
    </div>
    </PullRefresh>
    <Spin v-if="ifLoading"></Spin>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from 'components/BackBar'
import Spin from '../components/Spin'
import PullRefresh from '../components/PullRefresh'
  export default{
    data: function () {
      return {
        ifLoading:false,
        feedback:'',
        reportSource:[],
        FileName:'',
        scrollData: {
            noFlag: false //暂无更多数据显示
        }
      }
    },
    mounted: function () {
      
    },
    created() {
      this.GetMemberInfo(this.$store.state.userInfo.IdCard)
    },
    computed: {
      userInfo(){
        console.log(this.$store.state.userInfo)
            return this.$store.state.userInfo
      },
      Type: {
          get: function () {
            return this.$store.state.userInfo.Type
          },
          set: function (newValue) {
            this.$store.state.userInfo.Type = newValue
          }
      }
      
    },
    watch: {
      
    },
    components: {
      BackBar,
      Spin,
      PullRefresh

    },
    methods: {
      onRefresh(done) {
          this.GetMemberInfo(this.$store.state.userInfo.IdCard);
          done(); // call done

      },
      onInfinite(done) {
        this.GetMemberInfo(this.$store.state.userInfo.IdCard);
        done();
      },
      // 退出登录
      LoginOut(){
        localStorage.clear()
        this.$store.state.ifLogined = false
        this.$router.push({name:'首页'});
      },
      //删除
      handleRemove (file) {
          const fileList = this.reportSource;
          fileList.map((item,idx)=>{
            if(item == file){
              fileList.splice(idx, 1)
            }
          })
          this.reportSource = fileList
      },
      handleSuccess (res, file) {
          // file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
          // file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      },
      handleFormatError (file) {
          this.$Notice.warning({
              title: '图片格式警告',
              desc: '您上传的' + file.name + '文件格式不支持!'
          });
      },
      handleMaxSize (file) {
          // this.$Notice.warning({
          //     title: '图片大小警告',
          //     desc: '您上传的  ' + file.name + '太大了, 请不要超过2M!'
          // });
      },
      handleBeforeUpload (event) {
        var _this = this
        var file = event
        console.log(file) 
        _this.FileName = file.name
        var reader = new FileReader() 
        reader.readAsDataURL(file);   
        reader.onload = function(e){
          let reg = /^data:image\/(jpeg|png|gif);base64,/
          //console.log(this.result.replace(reg, ""))
          console.log(this.result)
          _this.reportSource.push(this.result)
        } 
      },
      //提交思想汇报
      submitReport(){
        this.ifLoading = true
        let DATA = {
            id_card:this.$store.state.userInfo.IdCard,
            report:this.reportSource
          }
          axios.post(R_PRE_URL+'/updatesxhb.do?',DATA
          ).then((res)=> {
            switch(res.data){
              case 0:
              this.ifLoading = false
              this.$Message.error('提交失败!')
              break
              case 1:
              this.ifLoading = false
              this.$Message.success('提交成功!')
              this.reportSource = []
              break
              default:
              this.ifLoading = false
              this.$Message.error('接口报错!')
            }
            
          }).catch((error)=> {
            console.log(error)
          })
      },
      GetMemberInfo(IDCARD){
        this.ifLoading = true
        axios.get(R_PRE_URL+'/dy.do?fscard='+IDCARD
        ).then((res)=> {

          const UserInfo = res.data
          switch(UserInfo[0]){
            case 0:
            this.ifLoading = false
            this.Type = 0
            let Info = {
              user_Name:UserInfo[1][0].fname,
              user_Master:UserInfo[1][0].partybranch,
              user_JoinTime:UserInfo[1][0].partydate,
              user_PartyPosition:UserInfo[1][0].dnzw,
              user_LearnSituation:'已完成',
              user_Type:UserInfo[0]
            }
            localStorage.setItem("user_Logined",true)
            localStorage.setItem("user_Name",Info.user_Name)
            localStorage.setItem("user_FeedBack",UserInfo[1][0].feedback)
            localStorage.setItem("user_ZRFeedBack",UserInfo[1][0].zrfeedback)
            localStorage.setItem("user_ydate",UserInfo[1][0].ydate)
            localStorage.setItem("user_zrdate",UserInfo[1][0].zrdate)
            localStorage.setItem("user_Master",Info.user_Master)
            localStorage.setItem("user_JoinTime",Info.user_JoinTime)
            localStorage.setItem("user_PartyPosition",Info.user_PartyPosition)
            localStorage.setItem("user_LearnSituation",Info.user_LearnSituation)
            localStorage.setItem("user_ID",this.formInline.id_card)
            localStorage.setItem("user_Type",Info.user_Type)
            localStorage.setItem("user_PartyCost",UserInfo[1][0].partyprice)
            localStorage.setItem("user_WorkUnit",UserInfo[1][0].unit)
            localStorage.setItem("user_JNPosition",UserInfo[1][0].jnzw)
            localStorage.setItem("user_TranferRelation",UserInfo[1][0].zzrinfo)
            
            this.$store.state.ifLogined = true
            this.$store.state.userInfo.Name = Info.user_Name
            this.$store.state.userInfo.FeedBack = UserInfo[1][0].feedback
            this.$store.state.userInfo.ZRFeedBack = UserInfo[1][0].zrfeedback
            this.$store.state.userInfo.ydate = UserInfo[1][0].ydate
            this.$store.state.userInfo.zrdate = UserInfo[1][0].zrdate
            this.$store.state.userInfo.Master = Info.user_Master
            this.$store.state.userInfo.JoinTime = Info.user_JoinTime
            this.$store.state.userInfo.PartyPosition = Info.user_PartyPosition
            this.$store.state.userInfo.LearnSituation = Info.user_LearnSituation
            this.$store.state.userInfo.IdCard = this.formInline.id_card
            this.$store.state.userInfo.PartyCost = UserInfo[1][0].partyprice
            this.$store.state.userInfo.WorkUnit = UserInfo[1][0].unit
            this.$store.state.userInfo.JNPosition = UserInfo[1][0].jnzw
            this.$store.state.userInfo.TranferRelation = UserInfo[1][0].zzrinfo
            this.$store.state.userInfo.Type = Info.user_Type
            // localStorage.setItem("user_Logined",true)
            // localStorage.setItem("user_Name",Info.user_Name)
            // localStorage.setItem("user_FeedBack",UserInfo[1][0].feedback)
            // localStorage.setItem("user_ZRFeedBack",UserInfo[1][0].zrfeedback)
            // localStorage.setItem("user_ydate",UserInfo[1][0].ydate)
            // localStorage.setItem("user_zrdate",UserInfo[1][0].zrdate)
            // localStorage.setItem("user_Master",Info.user_Master)
            // localStorage.setItem("user_JoinTime",Info.user_JoinTime)
            // localStorage.setItem("user_PartyPosition",Info.user_PartyPosition)
            // localStorage.setItem("user_LearnSituation",Info.user_LearnSituation)
            //localStorage.setItem("user_ID",this.formInline.id_card)
            // localStorage.setItem("user_Type",0)
            // this.$store.state.ifLogined = true
            // this.$store.state.userInfo.Name = Info.user_Name
            // this.$store.state.userInfo.FeedBack = UserInfo[1][0].feedback
            // this.$store.state.userInfo.ZRFeedBack = UserInfo[1][0].zrfeedback
            // this.$store.state.userInfo.ydate = UserInfo[1][0].ydate
            // this.$store.state.userInfo.zrdate = UserInfo[1][0].zrdate
            // this.$store.state.userInfo.Master = Info.user_Master
            // this.$store.state.userInfo.JoinTime = Info.user_JoinTime
            // this.$store.state.userInfo.PartyPosition = Info.user_PartyPosition
            // this.$store.state.userInfo.LearnSituation = Info.user_LearnSituation
            // this.$store.state.userInfo.IdCard = UserInfo[1][0].fscard
            // this.$store.state.userInfo.Type = 0
            // this.$Message.success('欢迎登录!')
            break
            case 1:
            this.ifLoading = false
            this.Type = 1
            localStorage.setItem("user_Logined",true)
            localStorage.setItem("user_ID",this.formInline.id_card)
            localStorage.setItem("user_Name",UserInfo[1][0].fname)
            localStorage.setItem("user_FeedBack",UserInfo[1][0].feedback)
            localStorage.setItem("user_ZRFeedBack",null)
            localStorage.setItem("user_ydate",UserInfo[1][0].ydate)
            localStorage.setItem("user_zrdate",null)
            localStorage.setItem("user_Type",UserInfo[0])
            localStorage.setItem("user_SF",UserInfo[1][0].dangyuanzt)
            this.$store.state.ifLogined = true
            this.$store.state.userInfo.IdCard = this.formInline.id_card
            this.$store.state.userInfo.Name = UserInfo[1][0].fname
            this.$store.state.userInfo.FeedBack = UserInfo[1][0].feedback
            this.$store.state.userInfo.ZRFeedBack = null
            this.$store.state.userInfo.ydate = UserInfo[1][0].ydate
            this.$store.state.userInfo.zrdate = null
            this.$store.state.userInfo.Type = UserInfo[0]
            this.$store.state.userInfo.SF = UserInfo[1][0].dangyuanzt
            // localStorage.setItem("user_Logined",true)
            // localStorage.setItem("user_ID",this.formInline.id_card)
            // localStorage.setItem("user_Name",UserInfo[1][0].fname)
            // localStorage.setItem("user_FeedBack",UserInfo[1][0].feedback)
            // localStorage.setItem("user_ZRFeedBack",null)
            // localStorage.setItem("user_ydate",UserInfo[1][0].ydate)
            // localStorage.setItem("user_zrdate",null)
            // localStorage.setItem("user_Type",1)
            // localStorage.setItem("user_SF",UserInfo[1][0].dangyuanzt)
            // this.$store.state.ifLogined = true
            // this.$store.state.userInfo.IdCard = UserInfo[1][0].fscard
            // this.$store.state.userInfo.Name = UserInfo[1][0].fname
            // this.$store.state.userInfo.FeedBack = UserInfo[1][0].feedback
            // this.$store.state.userInfo.ZRFeedBack = null
            // this.$store.state.userInfo.ydate = UserInfo[1][0].ydate
            // this.$store.state.userInfo.zrdate = null
            // this.$store.state.userInfo.Type = 1
            // this.$store.state.userInfo.SF = UserInfo[1][0].dangyuanzt
            // this.$Message.success('欢迎登录!')
            break
            case 2:
            this.ifLoading = false
            this.$Message.error('输入的身份证号有误或还为申请党员!');
            break

          }
        }).catch((error)=> {
          console.log(error)
        })
      },
    }
  }
</script>
<style lang="scss">
.MemberCenter{
  .InfoBox{
    width: 50%;
    margin: 0px auto 0 auto;
    .lableItem{
      width: 200px;
      text-align: right;
      color: red;
    }
    .reportImg{
      width: 150px;
      height: auto;
    }
  }
   .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 10px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
        float: left;
    }
    .demo-upload-list-cover{
        display: block;
        position: absolute;
        top: -30px;
        bottom: 0;
        left: 0;
        right: -60px;
        
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
}
.ivu-row{
    text-align: center !important;
  }
.ivu-upload-drag{
    border:0px solid #ccc !important;
  }
  @media screen and (max-width: 767px) {
    .InfoBox{
      width: 80% !important;
    }
  }
</style>
