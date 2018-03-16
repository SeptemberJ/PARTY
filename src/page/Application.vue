<template>
  <div class="Application">
    <BackBar></BackBar>
    <div class="MainBox">
      <Form ref="formApplication" :model="formApplication" :rules="ruleApplication" :label-width="100">
          <FormItem label="姓名" prop="name">
              <Input type="text" v-model="formApplication.name"></Input>
          </FormItem>
          <FormItem label="性别" prop="sex">
            <RadioGroup v-model="formApplication.sex">
              <Radio label="男">男</Radio>
              <Radio label="女">女</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="籍贯" prop="origin">
              <Input type="text" v-model="formApplication.origin"></Input>
          </FormItem>
          <FormItem label="民族" prop="nation">
              <Input type="text" v-model="formApplication.nation"></Input>
          </FormItem>
           <FormItem label="参加工作时间" prop="workTime">
              <DatePicker type="date" placeholder="请选择参加工作时间" v-model="formApplication.workTime" ></DatePicker>
          </FormItem>
          <FormItem label="身份证号" prop="id_card">
              <Input type="text" v-model="formApplication.id_card"></Input>
          </FormItem>
          <FormItem label="家庭住址" prop="address">
              <Input type="text" v-model="formApplication.address"></Input>
          </FormItem>
          <FormItem label="学历" prop="education">
              <Select v-model="formApplication.education" style="width:200px">
                  <Option v-for="item in educationList" :value="item.xl" :key="item.id">{{item.xl}}</Option>
              </Select>
          </FormItem>
          <FormItem label="学校" prop="school">
              <Input type="text" v-model="formApplication.school"></Input>
          </FormItem>
          <FormItem label="入学时间" prop="entryTime">
              <DatePicker type="date" placeholder="请选择入学时间" v-model="formApplication.entryTime"></DatePicker>
          </FormItem>
          <FormItem label="毕业时间" prop="graduationTime">
              <DatePicker type="date" placeholder="请选择毕业时间" v-model="formApplication.graduationTime"></DatePicker>
          </FormItem>
          <FormItem label="入党介绍人1" prop="introducer">
              <Input type="text" v-model="formApplication.introducer1" style="width:200px"></Input>
          </FormItem>
          <FormItem label="入党介绍人2" prop="introducer">
              <Input type="text" v-model="formApplication.introducer2" style="width:200px"></Input>
          </FormItem>
          <FormItem label="加入党组织" prop="partybranch">
              <Select v-model="formApplication.partybranch" style="width:200px">
                  <Option v-for="item in organizationList" :value="item.fparty" :key="item.id">{{item.fparty}}</Option>
              </Select>
          </FormItem>
          <!-- 相片 -->
          <FormItem label="个人免冠相片">
              <Row>
                <Col span="4">
                  <Upload
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
            <Row  type="flex" justify="start" class="code-row-bg marginT_10"  v-if="formApplication.personal_img">
              <Col span="4">
                <div class="demo-upload-list">
                    <template>
                        <img class="reportImg" :src="formApplication.personal_img">
                        <div class="demo-upload-list-cover">
                          <Icon style="color: #000;" type="close-circled" @click.native="handleRemove2(formApplication.personal_img)"></Icon>
                      </div>
                    </template>
                </div>
              </Col>
            </Row>
          </FormItem>
          <!-- 思想汇报 -->
          <FormItem label="入党申请书"  prop="report_img">
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
            :before-upload="handleBeforeUploadSX"
            type="drag"
            action=""
            style="display: inline-block;">
                        <Button type="ghost" icon="ios-cloud-upload-outline">请选择上传的图片</Button>
                  </Upload>
                </Col>
              </Row>
          </FormItem>
          <FormItem>
          <Row type="flex" justify="start" class="code-row-bg marginT_10" v-if="formApplication.report_img">
            <Col span="24">
              <div class="demo-upload-list" v-for="(Img,Idx) in formApplication.report_img">
                  <template>
                      <img :src="Img">
                      <div class="demo-upload-list-cover">
                          <Icon style="color: #000;" type="close-circled" @click.native="handleRemove(Img)"></Icon>
                      </div>
                  </template>
              </div>
            </Col>
          </Row>
            <!-- <Row class="marginT_10" v-if="formApplication.report_img">
              <Col span="24">
                <div class="demo-upload-list">
                    <template>
                        <img v-for="(Img,Idx) in formApplication.report_img" class="reportImg" :src="Img">
                    </template>
                </div>
              </Col>
            </Row> -->
          </FormItem>
          
          <FormItem class="marginT_20">
              <Button type="primary" @click="handleSubmit('formApplication')">提交</Button>
              <Button type="ghost" @click="handleReset('formApplication')" style="margin-left: 8px">重置</Button>
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
        formApplication: {
                    name: '',
                    sex: '',
                    origin:'',
                    nation: '',
                    workTime:'',
                    id_card: '',
                    address: '',
                    education: '',
                    school: '',
                    entryTime: '',
                    graduationTime: '',
                    introducer1: '',
                    introducer2: '',
                    partybranch:'',
                    personal_img:'',
                    report_img:[],
                    FileName:'',
                    FileName_report:''
        },
        ruleApplication: {
            name: [
                { required: true, message: '请输入姓名！', trigger: 'blur' }
            ],
            sex: [
                { required: true, message: '请选择性别！', trigger: 'change' }
            ],
            origin: [
                { required: true, message: '请输入籍贯！', trigger: 'blur' }
            ],
            nation: [
                { required: true, message: '请输入民族！', trigger: 'blur' }
            ],
            workTime: [
                { required: true, type: 'date', message: '请选择参加工作时间！', trigger: 'change' }
            ],
            id_card: [
                { required: true, message: '请输入身份证号！', trigger: 'blur' }
            ],
            address: [
                { required: true, message: '请输入家庭住址！', trigger: 'blur' }
            ],
            education: [
                { required: true, message: '请选择学历！', trigger: 'change' }
            ],
            school: [
                { required: true, message: '请输入学校！', trigger: 'blur' }
            ],
            entryTime: [
                { required: true, type: 'date', message: '请选择入学时间！', trigger: 'change' }
            ],
            graduationTime: [
                { required: true, type: 'date', message: '请选择毕业时间！', trigger: 'change' }
            ],
            introducer1: [
                { required: true, message: '请输入介绍人1！', trigger: 'blur' }
            ],
            introducer2: [
                { required: true, message: '请输入介绍人2！', trigger: 'blur' }
            ],
            partybranch: [
                { required: true, message: '请选择党支部！', trigger: 'blur' }
            ],
            // report_img: [
            //     { required: true, message: '请选择要上传的思想汇报！', trigger: 'change' }
            // ],
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
      //获取填写的申请资料
      //let ID = localStorage.getItem("user_ID")?localStorage.getItem("user_ID"):''
      axios.get(R_PRE_URL+'/information.do?fscard='+localStorage.getItem("user_ID")
      ).then((res)=> {
        if(res.data.length>0){
          this.ifCanChange = true
          this.formApplication.name = res.data[0].fname
          this.formApplication.sex = res.data[0].fsex
          this.formApplication.origin = res.data[0].fjg
          this.formApplication.nation = res.data[0].fmz
          this.formApplication.workTime = timestampToFormatTime(res.data[0].cjgzdate)
          this.formApplication.id_card = res.data[0].fscard
          this.formApplication.address = res.data[0].faddress
          this.formApplication.education = res.data[0].xl
          this.formApplication.school = res.data[0].fxx
          this.formApplication.entryTime = timestampToFormatTime(res.data[0].rxdate)
          this.formApplication.graduationTime = timestampToFormatTime(res.data[0].bydate)
          this.formApplication.introducer1 = res.data[0].rdjsr.split(",")[0]
          this.formApplication.introducer2 = res.data[0].rdjsr.split(",")[1]
          this.formApplication.partybranch = res.data[0].partybranch
          this.formApplication.personal_img = res.data[0].fimage
        }else{
          this.ifCanChange=false
        }
        
        
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
          const fileList = this.formApplication.report_img
          fileList.map((item,idx)=>{
            if(item == file){
              fileList.splice(idx, 1)
            }
          })
          this.formApplication.report_img = fileList
      },
      handleRemove2 (file) {
          this.formApplication.personal_img = ''
      },
      handleSubmit (name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                let reg = /^1[34578]\d{9}$/
                let DATA = {'Info':this.formApplication}
                console.log(DATA)
                this.ifLoading = true
                axios.post(R_PRE_URL+'/applyparty.do?',DATA
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
          this.formApplication.report_img = []
          this.formApplication.personal_img = ''
          this.formApplication.introducer1 = ''
          this.formApplication.introducer2 = ''
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
        _this.formApplication.FileName = file.name
        var reader = new FileReader();   
        reader.readAsDataURL(file);   
        reader.onload = function(e){
          _this.formApplication.personal_img = this.result
        } 
      },
      handleBeforeUploadSX (event) {
        var _this = this
        var file = event
        _this.formApplication.FileName_report = file.name
        var reader = new FileReader();   
        reader.readAsDataURL(file);   
        reader.onload = function(e){
          _this.formApplication.report_img.push(this.result)
        } 
      }
    }
  }
</script>
<style lang="scss">
.Application{
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
.reportImg{
      float: left;
}
@media screen and (max-width: 767px) {
    .MainBox{
      margin-left: 0px !important;
    }
  }
</style>
