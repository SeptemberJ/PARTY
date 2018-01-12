<template>
  <div class="MemberCenter">
    <BackBar></BackBar>
      <div class="LoginBox">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" >
            <FormItem prop="id_card">
                <Input type="text" v-model="formInline.id_card" placeholder="请输入身份证号">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
                <Button type="text" style="float: right" @click="GoApplication">还不是党员去申请</Button>
            </FormItem>
        </Form>
      </div>
      <Spin v-if="ifLoading"></Spin>
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from 'components/BackBar'
import Spin from '../components/Spin'
  export default{
    data: function () {
      return {
        ifLoading:false,
        feedback:'',
        formInline: {
            id_card: '',
        },
        ruleInline: {
            id_card: [
                { required: true, message: '请输入身份证号！', trigger: 'blur' }
            ]
        }
      }
    },
    mounted: function () {
      
    },
    created: function () {
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
      BackBar,
      Spin

    },
    methods: {
      handleSubmit(name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                this.ifLoading = true
                  axios.get(R_PRE_URL+'/dy.do?fscard='+this.formInline.id_card
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
                      localStorage.setItem("user_ID",this.formInline.id_card)
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
                      this.$store.state.userInfo.IdCard = this.formInline.id_card
                      this.$store.state.userInfo.Type = Info.user_Type
                      this.$Message.success('欢迎登录!')
                      this.$router.push({name:'党员中心'});
                      break
                      case 1:
                      this.ifLoading = false
                      localStorage.setItem("user_Logined",true)
                      localStorage.setItem("user_ID",this.formInline.id_card)
                      localStorage.setItem("user_Name",UserInfo[1][0].fname)
                      localStorage.setItem("user_FeedBack",UserInfo[1][0].feedback)
                      localStorage.setItem("user_ZRFeedBack",UserInfo[1][0].zrfeedback)
                      localStorage.setItem("user_ydate",UserInfo[1][0].ydate)
                      localStorage.setItem("user_zrdate",UserInfo[1][0].zrdate)
                      localStorage.setItem("user_Type",UserInfo[0])
                      localStorage.setItem("user_SF",UserInfo[1][0].dangyuanzt)
                      this.$store.state.ifLogined = true
                      this.$store.state.userInfo.IdCard = this.formInline.id_card
                      this.$store.state.userInfo.Name = UserInfo[1][0].fname
                      this.$store.state.userInfo.FeedBack = UserInfo[1][0].feedback
                      this.$store.state.userInfo.ZRFeedBack = UserInfo[1][0].zrfeedback
                      this.$store.state.userInfo.ydate = UserInfo[1][0].ydate
                      this.$store.state.userInfo.zrdate = UserInfo[1][0].zrdate
                      this.$store.state.userInfo.Type = UserInfo[0]
                      this.$store.state.userInfo.SF = UserInfo[1][0].dangyuanzt
                      this.$Message.success('欢迎登录!')
                      this.$router.push({name:'党员中心'})
                      break
                      case 2:
                      this.ifLoading = false
                      this.$Message.error('输入的身份证号有误或还未申请党员!');
                      break

                    }
                  }).catch((error)=> {
                    console.log(error)
                  })
                  
                  
                  
              } else {
                  this.$Message.error('请输入身份证号!');
              }

          })
      },
      GoApplication(){
        this.$router.push({name:'入党申请'});
      }
    }
  }
</script>
<style lang="scss">
.MemberCenter{
  .LoginBox{
    width: 50%;
    margin: 70px auto 0 auto;
  }

}
</style>
