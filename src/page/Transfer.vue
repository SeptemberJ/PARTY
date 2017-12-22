<template>
  <div class="Transfer">
    <BackBar></BackBar>
    <div class="MainBox">
      <Form ref="formTransfer" :model="formTransfer" :rules="ruleTransfer" :label-width="100">
          <FormItem label="姓名" prop="name">
              <Input type="text" v-model="formTransfer.name"></Input>
          </FormItem>
           <FormItem label="身份证号" prop="id_card">
              <Input type="text" v-model="formTransfer.id_card"></Input>
          </FormItem>
          <FormItem label="工作单位" prop="work">
              <Input type="text" v-model="formTransfer.work"></Input>
          </FormItem>
           <FormItem label="转入党支部" prop="transferMaster">
              <Select v-model="formTransfer.transferMaster" style="width:200px">
                  <Option v-for="item in MasterList" :value="item.fparty" :key="item.id">{{item.fparty}}</Option>
              </Select>
          </FormItem>
           <FormItem label="转出原因" prop="transferReason">
              <Input type="text" v-model="formTransfer.transferReason"></Input>
          </FormItem>
          <FormItem>
              <Button type="primary" @click="handleSubmit('formTransfer')">提交</Button>
              <Button type="ghost" @click="handleReset('formTransfer')" style="margin-left: 8px">重置</Button>
          </FormItem>
      </Form>
    </div>
    <Spin v-if="ifLoading"></Spin>
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../components/BackBar'
import Spin from '../components/Spin'
  export default{
    data: function () {
      return {
        ifLoading:false,
        MasterList:[],
        formTransfer: {
                    name: '',
                    id_card: '',
                    work: '',
                    transferMaster:'',
                    transferReason:''
        },
        ruleTransfer: {
            name: [
                { required: true, message: '请输入姓名！', trigger: 'blur' }
            ],
            id_card: [
                { required: true, message: '请输入身份证号！', trigger: 'blur' }
            ],
            work: [
                { required: true, message: '请输入工作单位！', trigger: 'blur' }
            ],
            transferMaster: [
                { required: true, message: '请选择转入党支部！', trigger: 'change' }
            ],
            transferReason: [
                { required: true, message: '请输入转出原因！', trigger: 'blur' }
            ],
            
        }
      }
    },
    mounted: function () {
      
    },
    created: function () {
      axios.get(R_PRE_URL+'/selectpartybranch.do'
      ).then((res)=> {
        this.MasterList = res.data
      }).catch((error)=> {
        console.log(error)
      })
      
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
      handleSubmit (name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                console.log(this.formTransfer)
                let DATA = {Info:this.formTransfer}
                this.ifLoading = true
                axios.post(R_PRE_URL+'/updateparty.do',DATA
                ).then((res)=> {
                  switch(res.data){
                    case 0:
                    this.ifLoading = false
                    this.$Message.error('提交失败!')
                    break
                    case 1:
                    this.ifLoading = false
                    this.$Message.success('提交成功!')
                    this.$router.push({name:'首页'})
                    break
                    default:
                    this.ifLoading = false
                    this.$Message.error('接口报错!')
                  }
                }).catch((error)=> {
                  console.log(error)
                })
              } else {
                  this.$Message.error('带*号的为必填项!');
              }
          })
      },
      handleReset (name) {
          this.$refs[name].resetFields();
      },
    }
  }
</script>
<style lang="scss">
.Transfer{
  .MainBox{
    width: 90%;
    margin: 70px auto;
  }
}
@media screen and (max-width: 767px) {
    .MainBox{
      margin-left: 0px !important;
    }
  }
</style>
