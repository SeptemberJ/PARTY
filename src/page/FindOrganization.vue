<template>
  <div class="FindOrganization">
    <BackBar></BackBar>
    <div class="MainBox">
      <Form ref="formFindOrganization" :model="formFindOrganization" :rules="ruleformFindOrganization" :label-width="100">
          <FormItem label="姓名" prop="name">
              <Input type="text" v-model="formFindOrganization.name"></Input>
          </FormItem>
          <FormItem label="性别" prop="sex">
            <RadioGroup v-model="formFindOrganization.sex">
              <Radio label="男">男</Radio>
              <Radio label="女">女</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="民族" prop="nation">
              <Input type="text" v-model="formFindOrganization.nation"></Input>
          </FormItem>
          <FormItem label="身份证号" prop="id_card">
              <Input type="text" v-model="formFindOrganization.id_card"></Input>
          </FormItem>
          <FormItem label="原组织名称" prop="OldOrg">
              <Input type="text" v-model="formFindOrganization.OldOrg"></Input>
          </FormItem>
          <FormItem label="转入组织名称" prop="JoinOrg">
              <Input type="text" v-model="formFindOrganization.JoinOrg"></Input>
          </FormItem>
          <FormItem label="学历" prop="education">
              <Select v-model="formFindOrganization.education" style="width:200px">
                  <Option v-for="item in educationList" :value="item.xl" :key="item.id">{{item.xl}}</Option>
              </Select>
          </FormItem>
          <FormItem label="手机号" prop="phone">
              <Input type="text" v-model="formFindOrganization.phone"></Input>
          </FormItem>
          <FormItem label="单位职务" prop="position">
              <Input type="text" v-model="formFindOrganization.position"></Input>
          </FormItem>
          <FormItem label="党费缴纳时间" prop="payDate">
              <DatePicker type="date" placeholder="请选择入学时间" v-model="formFindOrganization.payDate"></DatePicker>
          </FormItem>
          <FormItem label="入党时间" prop="entryPartyTime">
              <DatePicker type="date" placeholder="请选择入学时间" v-model="formFindOrganization.entryPartyTime"></DatePicker>
          </FormItem>
          <FormItem label="党员状态" prop="status">
              <Input type="text" v-model="formFindOrganization.status"></Input>
          </FormItem>
          <FormItem label="上传资料">
              <Row>
                <Col span="4">
                  <Upload
                  multiple
            ref="upload"
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
            <Row type="flex" justify="start" class="code-row-bg marginT_10">
              <Col span="24">
                <div class="demo-upload-list" v-for="(Img,Idx) in formFindOrganization.file">
                    <template>
                        <img :src="Img">
                        <div class="demo-upload-list-cover">
                            <Icon style="color: #000;" type="close-circled" @click.native="handleRemove(Img)"></Icon>
                        </div>
                    </template>
                </div>
              </Col>
            </Row>
            <!-- <Row class="marginT_10" v-if="formFindOrganization.file">
              <Col span="6">
                <div class="demo-upload-list">
                    <template>
                        <img class="ImgBlock" style="width: 150px;height: auto;margin: 0 auto;" :src="formFindOrganization.file">
                    </template>
                </div>
              </Col>
            </Row> -->
          </FormItem>

          
          <FormItem>
              <Button type="primary" @click="handleSubmit('formFindOrganization')">提交</Button>
              <Button type="ghost" @click="handleReset('formFindOrganization')" style="margin-left: 8px">重置</Button>
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
import {timestampToFormatTime} from '../util/utils'

import * as Moment from 'moment'
  export default{
    data: function () {
      return {
        ifLoading:false,
        ifCanChange:'', //是否显示提交按钮
        educationList:[],
        organizationList:[],
        formFindOrganization: {
                    name: '',
                    sex: '',
                    nation: '',
                    id_card: '',
                    OldOrg:'',
                    JoinOrg: '',
                    education: '',
                    phone: '',
                    position: '',
                    payDate: '',
                    entryPartyTime: '',
                    status: '',
                    file: [],
                    FileName:''

        },
        ruleformFindOrganization: {
            name: [
                { required: true, message: '请输入姓名！', trigger: 'blur' }
            ],
            sex: [
                { required: true, message: '请选择性别！', trigger: 'change' }
            ],
            nation: [
                { required: true, message: '请输入民族！', trigger: 'blur' }
            ],
            id_card: [
                { required: true, message: '请输入身份证号！', trigger: 'blur' }
            ],
            OldOrg: [
                { required: true, message: '请输入原组织名称！', trigger: 'change' }
            ],
            JoinOrg: [
                { required: true, message: '请输入转入组织名称！', trigger: 'change' }
            ],
            education: [
                { required: true, message: '请选择学历！', trigger: 'change' }
            ],
            phone: [
                { required: true, message: '请选择学历！', trigger: 'change' }
            ],
            position: [
                { required: true, message: '请输入手机号！', trigger: 'change' }
            ],
            payDate: [
                { required: true, type: 'date', message: '请选择党费缴纳时间！', trigger: 'change' }
            ],
            entryPartyTime: [
                { required: true, type: 'date', message: '请选择入党时间！', trigger: 'change' }
            ],
            status: [
                { required: true, message: '请选择党员状态！', trigger: 'change' }
            ],
            file: [
                { required: true, message: '请上传资料！', trigger: 'change' }
            ],

            
            
            
        },
        defaultList: [
        'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
        ],
        imgName: '',
        visible: false,
        uploadList: []
      }
    },
    mounted: function () {
      
    },
    created() {
      axios.get(R_PRE_URL+'/xl.do'
      ).then((res)=> {
        this.educationList = res.data
      }).catch((error)=> {
        console.log(error)
      })
      axios.get(R_PRE_URL+'/selectpartybranch.do'
      ).then((res)=> {
        this.organizationList = res.data
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
      //删除
      handleRemove (file) {
          const fileList = this.formFindOrganization.file;
          fileList.map((item,idx)=>{
            if(item == file){
              fileList.splice(idx, 1)
            }
          })
          this.formFindOrganization.file = fileList
      },
      handleSubmit (name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                let reg = /^1[34578]\d{9}$/
                let DATA = {'Info':this.formFindOrganization}
                console.log(DATA)
                if (!reg.test(this.formFindOrganization.phone)) {
                    this.$Message.error('手机号格式不对!')
                    return
                } 
                this.ifLoading = true
                axios.post(R_PRE_URL+'/lddyzzz.do?',DATA
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
          this.formFindOrganization.file = []
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
        _this.formFindOrganization.FileName = file.name
        var reader = new FileReader();   
        reader.readAsDataURL(file);   
        reader.onload = function(e){
          let reg = /^data:image\/(jpeg|png|gif);base64,/
          //console.log(this.result.replace(reg, ""))
          _this.formFindOrganization.file.push(this.result)
        } 
      }
    }
  }
</script>
<style lang="scss">
.FindOrganization{
  .MainBox{
    width: 90%;
    margin: 70px auto;
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
.ImgBlock{
}
@media screen and (max-width: 767px) {
    .MainBox{
      margin-left: 0px !important;
    }
  }
</style>
