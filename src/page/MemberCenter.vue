<template>
  <div class="MemberCenter">
    <BackBar></BackBar>
    <PullRefresh :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData">
    <div class="InfoBox">
      <Row class="marginT_10">
        <Col span="12" class="TextRight"><b>姓名：</b></Col>
        <Col span="12" class="TextLeft">{{userInfo.Name}}</Col>
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
      <Row class="marginT_10" v-if="Type==1">
        <Col span="12" class="TextRight"><b>目前身份：</b></Col>
        <Col span="12" class="TextLeft">{{userInfo.SF}}</Col>
      </Row>
      <Row class="marginT_10" v-if="userInfo.FeedBack">
        <Col span="24">
          <Alert type="warning" class="TextLeft">
            {{userInfo.ydate}}
            <span slot="desc" style="padding: 10px;">
              {{userInfo.FeedBack}}
            </span>
          </Alert>
        </Col>
      </Row>

      <Row class="marginT_10" v-if="userInfo.ZRFeedBack">
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
      <Row class="marginT_10" v-if="reportSource">
        <Col span="24">
          <div class="demo-upload-list">
              <template>
                  <img class="reportImg" :src="reportSource">
              </template>
          </div>
        </Col>
      </Row>
      <Row class="marginT_10" v-if="reportSource">
        <Col span="24">
          <Button type="primary" @click="submitReport">提交</Button>
        </Col>
      </Row>

      <Row class="marginT_10">
        <Col span="24">
          <Button type="error" long @click="LoginOut">退出登录</Button>
        </Col>
      </Row>


      
      

      <!-- <Row>
        <Col span="10">
          <Upload
    ref="upload"
    :show-upload-list="false"
    :on-success="handleSuccess"
    :format="['jpg','jpeg','png']"
    :max-size="2048"
    :on-format-error="handleFormatError"
    :on-exceeded-size="handleMaxSize"
    :before-upload="handleBeforeUpload"
    multiple
    type="drag"
    action=""
    style="display: inline-block;">
            <div class="demo-upload-list">
              <img class="reportImg" :src="reportSource">
            </div>
          </Upload>
        </Col>
      </Row> -->
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
        reportSource:'',
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
            return this.$store.state.userInfo
      },
      Type(){
          return this.$store.state.userInfo.Type
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
      // handleView (name) {
      //           this.imgName = name;
      //           this.visible = true;
      // },
      // handleRemove (file) {
      //     const fileList = this.$refs.upload.fileList;
      //     this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      // },
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
          this.$Notice.warning({
              title: '图片大小警告',
              desc: '您上传的  ' + file.name + '太大了, 请不要超过2M!'
          });
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
          _this.reportSource = this.result
        } 
      },
      //提交思想汇报
      submitReport(){
        this.ifLoading = true
        let DATA = {
            id_card:this.$store.state.userInfo.IdCard,
            report:this.reportSource,
            fileName:this.FileName
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
              this.reportSource = ''
              this.FileName = ''
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
            //localStorage.setItem("user_ID",this.formInline.id_card)
            localStorage.setItem("user_Type",Info.user_Type)
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
            //this.$store.state.userInfo.IdCard = this.formInline.id_card
            this.$store.state.userInfo.Type = Info.user_Type
            this.$Message.success('欢迎登录!')
            this.$router.push({name:'党员中心'});
            break
            case 1:
            this.ifLoading = false
            localStorage.setItem("user_Logined",true)
            //localStorage.setItem("user_ID",this.formInline.id_card)
            localStorage.setItem("user_Name",UserInfo[1][0].fname)
            localStorage.setItem("user_FeedBack",UserInfo[1][0].feedback)
            localStorage.setItem("user_ZRFeedBack",UserInfo[1][0].zrfeedback)
            localStorage.setItem("user_ydate",UserInfo[1][0].ydate)
            localStorage.setItem("user_zrdate",UserInfo[1][0].zrdate)
            localStorage.setItem("user_Type",UserInfo[0])
            localStorage.setItem("user_SF",UserInfo[1][0].dangyuanzt)
            this.$store.state.ifLogined = true
            //this.$store.state.userInfo.IdCard = this.formInline.id_card
            this.$store.state.userInfo.Name = UserInfo[1][0].fname
            this.$store.state.userInfo.FeedBack = UserInfo[1][0].feedback
            this.$store.state.userInfo.ZRFeedBack = UserInfo[1][0].zrfeedback
            this.$store.state.userInfo.ydate = UserInfo[1][0].ydate
            this.$store.state.userInfo.zrdate = UserInfo[1][0].zrdate
            this.$store.state.userInfo.Type = UserInfo[0]
            this.$store.state.userInfo.SF = UserInfo[1][0].dangyuanzt
            this.$Message.success('欢迎登录!')
            //this.$router.push({name:'党员中心'})
            console.log(this.userInfo)
            console.log(this.$store.state.userInfo)
            break
            case 2:
            this.ifLoading = false
            this.$Message.error('输入的身份证号有误或还为申请党员!');
            break

          }
        }).catch((error)=> {
          console.log(error)
        })
      }
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
