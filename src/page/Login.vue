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
        <Alert type="warning" v-if="feedback">
            入党申请反馈结果
            <template slot="desc">
                {{feedback}}
            </template>
        </Alert>
        <!-- <Form ref="formLogin" :model="formLogin" :rules="ruleInline" inline>
          <FormItem prop="user">
              <Input type="text" v-model="formLogin.idCard" placeholder="请输入身份证号">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
          </FormItem>
          <FormItem>
              <Button type="primary" @click="handleSubmit('formLogin')">登录</Button>
              <Button type="text">还不是党员去申请</Button>
          </FormItem>
          </Form> -->
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
      BackBar

    },
    methods: {
      handleSubmit(name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                  axios.get(R_PRE_URL+'/dy.do?fscard='+this.formInline.id_card
                  ).then((res)=> {
                    const UserInfo = res.data
                    switch(UserInfo.type){
                      case 0:
                      let Info = {
                        user_Name:UserInfo.info[0].fname,
                        user_Master:UserInfo.info[0].partybranch,
                        user_JoinTime:UserInfo.info[0].partydate,
                        user_LearnSituation:'已完成'
                      }
                      localStorage.setItem("user_Name",Info.user_Name)
                      localStorage.setItem("user_Master",Info.user_Master)
                      localStorage.setItem("user_JoinTime",Info.user_JoinTime)
                      localStorage.setItem("user_LearnSituation",Info.user_LearnSituation)
                      this.$store.state.ifLogined = true
                      this.$store.state.userInfo.Name = Info.user_Name
                      this.$store.state.userInfo.Master = Info.user_Master
                      this.$store.state.userInfo.JoinTime = Info.user_JoinTime
                      this.$store.state.userInfo.LearnSituation = Info.user_LearnSituation
                      this.$Message.success('欢迎登录!')
                      this.$router.push({name:'首页'});
                      break
                      case 1:
                      this.feedback = UserInfo.info[0].feedback
                      break
                      case 2:
                      this.$Message.error('输入的身份证号有误或还为申请党员!');
                      break

                    }
                  }).catch((error)=> {
                    console.log(error)
                  })
                  
                  
                  
              } else {
                  this.$Message.error('您目前还不是党员!');
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
    margin: 40px auto;
  }

}
</style>
