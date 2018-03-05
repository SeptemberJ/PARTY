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
              <!-- <Input type="text" v-model="formTransfer.work"></Input> -->
              <Select v-model="formTransfer.work" style="width:200px">
                  <Option v-for="item in WorkList" :value="item.typename" :key="item.typename">{{item.typename}}</Option>
              </Select>
          </FormItem>
           <FormItem label="转入党支部" prop="transferMaster">
              <Select v-model="formTransfer.transferMaster" style="width:200px">
                  <Option v-for="item in MasterList" :value="item.fparty" :key="item.id">{{item.fparty}}</Option>
              </Select>
          </FormItem>
           <FormItem label="转出原因" prop="transferReason">
              <!-- <Input type="text" v-model="formTransfer.transferReason"></Input> -->
              <Select v-model="formTransfer.transferReason" style="width:200px">
                  <Option v-for="item in ReasonList" :value="item.typename" :key="item.typename">{{item.typename}}</Option>
              </Select>
          </FormItem>
          <!-- 思想汇报 -->
          <FormItem label="介绍信"  prop="introduce_letter">
              <Row>
                <Col span="4">
                  <Upload
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            type="drag"
            action=""
            style="display: inline-block;">
                        <Button type="ghost" icon="ios-cloud-upload-outline">请选择上传的图片</Button>
                  </Upload>
                </Col>
              </Row>
          </FormItem>
          <FormItem>
            <Row class="marginT_10" v-if="formTransfer.introduce_letter">
              <Col span="4">
                <div class="demo-upload-list">
                    <template>
                        <img class="reportImg" :src="formTransfer.introduce_letter">
                    </template>
                </div>
              </Col>
            </Row>
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
        WorkList:[],
        ReasonList:[],
        formTransfer: {
                    name: '',
                    id_card: '',
                    work: '',
                    transferMaster:'',
                    transferReason:'',
                    FileName:'',
                    introduce_letter:''
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
            // introduce_letter: [
            //     { required: true, message: '请选择要上传的转出组织介绍信！', trigger: 'change' }
            // ],
            
        }
      }
    },
    mounted: function () {
      
    },
    created: function () {
      //支部下拉
      axios.get(R_PRE_URL+'/selectpartybranch.do'
      ).then((res)=> {
        this.MasterList = res.data
      }).catch((error)=> {
        console.log(error)
      })
      //工作单位下拉
      axios.post(R_PRE_URL+'/selectgzdw.do'
      ).then((res)=> {
        this.WorkList = res.data
      }).catch((error)=> {
        console.log(error)
      })
      //转出原因
      axios.post(R_PRE_URL+'/selectzcwhy.do'
      ).then((res)=> {
        this.ReasonList = res.data
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
        _this.formTransfer.FileName = file.name
        var reader = new FileReader();   
        reader.readAsDataURL(file);   
        reader.onload = function(e){
          _this.formTransfer.introduce_letter = this.result
        } 
      },
      handleSubmit (name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                console.log(this.formTransfer)
                let DATA = {Info:this.formTransfer}
                this.ifLoading = true
                axios.post(R_PRE_URL+'/updateparty.do',DATA
                ).then((res)=> {
                  switch(res.data[0]){
                    case 0:
                    this.ifLoading = false
                    this.$Message.error(res.data[1]+'!')
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
