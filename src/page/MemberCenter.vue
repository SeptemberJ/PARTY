<template>
  <div class="MemberCenter">
    <BackBar></BackBar>
    <div class="InfoBox">
      <Row class="marginT_10">
        <Col span="12" class="TextRight"><b>姓名：</b></Col>
        <Col span="12" class="TextLeft">{{userInfo.Name}}</Col>
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
        <!-- <Col span="24" class="TextLeft"><b>入党时间：</b></Col> -->
        <Col span="24">
          <Alert type="warning" v-if="Type==1">
            {{userInfo.FeedBack==''?'暂无入党申请反馈结果':userInfo.FeedBack}}
            <!-- <template slot="desc">
                {{userInfo.FeedBack==''?'暂无反馈结果':userInfo.FeedBack}}
            </template> -->
          </Alert>
        </Col>
      </Row>

      <Row v-if="Type==1">
        <Col span="24">
          <Upload
        multiple
        type="drag"
        :before-upload="handleBeforeUpload"
        action="">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击上传思想汇报</p>
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
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from 'components/BackBar'
  export default{
    data: function () {
      return {
        feedback:'',
        reportSource:'',
        FileName:''
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
      BackBar

    },
    methods: {
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
              title: 'The file format is incorrect',
              desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
          });
      },
      handleMaxSize (file) {
          this.$Notice.warning({
              title: 'Exceeding file size limit',
              desc: 'File  ' + file.name + ' is too large, no more than 2M.'
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
        let DATA = {
            id_card:this.$store.state.userInfo.IdCard,
            report:this.reportSource,
            fileName:this.FileName
          }
          axios.post(R_PRE_URL+'/updatesxhb.do?',DATA
          ).then((res)=> {
            switch(res.data){
              case 0:
              this.$Message.error('提交失败!')
              break
              case 1:
              this.$Message.success('提交成功!')
              this.reportSource = ''
              this.FileName = ''
              break
              default:
              this.$Message.error('接口报错!')
            }
            
          }).catch((error)=> {
            console.log(error)
          })
      },
      GetMemberInfo(IDCARD){
        axios.get(R_PRE_URL+'/dy.do?fscard='+IDCARD
        ).then((res)=> {
          const UserInfo = res.data
          switch(UserInfo[0]){
            case 0:
            let Info = {
              user_Name:UserInfo[1][0].fname,
              user_Master:UserInfo[1][0].partybranch,
              user_JoinTime:UserInfo[1][0].partydate,
              user_LearnSituation:'已完成',
              user_Type:UserInfo[0]
            }
            localStorage.setItem("user_Logined",true)
                      localStorage.setItem("user_Name",Info.user_Name)
                      localStorage.setItem("user_Master",Info.user_Master)
                      localStorage.setItem("user_JoinTime",Info.user_JoinTime)
                      localStorage.setItem("user_LearnSituation",Info.user_LearnSituation)
                      localStorage.setItem("user_ID",this.formInline.id_card)
                      localStorage.setItem("user_Type",Info.user_Type)
                      this.$store.state.ifLogined = true
                      this.$store.state.userInfo.Name = Info.user_Name
                      this.$store.state.userInfo.Master = Info.user_Master
                      this.$store.state.userInfo.JoinTime = Info.user_JoinTime
                      this.$store.state.userInfo.LearnSituation = Info.user_LearnSituation
                      this.$store.state.userInfo.IdCard = this.formInline.id_card
                      this.$store.state.userInfo.Type = Info.user_Type
                      this.$Message.success('欢迎登录!')
                      this.$router.push({name:'党员中心'});
                      break
                      case 1:
                      localStorage.setItem("user_Logined",true)
                      localStorage.setItem("user_ID",this.formInline.id_card)
                      localStorage.setItem("user_Name",UserInfo[1][0].fname)
                      localStorage.setItem("user_FeedBack",UserInfo[1][0].feedback)
                      localStorage.setItem("user_Type",UserInfo[0])
                      this.$store.state.ifLogined = true
                      this.$store.state.userInfo.IdCard = this.formInline.id_card
                      this.$store.state.userInfo.Name = UserInfo[1][0].fname
                      this.$store.state.userInfo.FeedBack = UserInfo[1][0].feedback
                      this.$store.state.userInfo.Type = UserInfo[0]
                      this.$Message.success('欢迎登录!')
                      this.$router.push({name:'党员中心'})
            break
            case 2:
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
    margin: 70px auto 0 auto;
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
</style>
