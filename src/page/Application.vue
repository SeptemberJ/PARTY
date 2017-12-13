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
          <!-- <FormItem label="思想汇报" prop="report">
              <Row>
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
                      <img :src="formApplication.report">
                    </div>
                  </Upload>
                </Col>
              </Row>
          </FormItem> -->
          
          <FormItem>
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
import * as Moment from 'moment'
  export default{
    data: function () {
      return {
        ifLoading:false,
        educationList:[],
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
                let reg = /^1[34578]\d{9}$/
                var arr = ['entryTime','graduationTime','workTime']
                arr.map((Item,Idx)=>{
                    if(this.formApplication[Item]){
                        this.formApplication[Item] = Moment(this.formApplication[Item]).add(1,'days')
                    }
                })
                let DATA = {'Info':this.formApplication}
                console.log(DATA)
                // if (!reg.test(DATA.phone)) {
                //     this.$Message.error('手机号格式不对!')
                //     return
                // } 
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
                    this.$router.push({name:'登录'})
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
      handleSuccess (res, file) {
          file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
          file.name = '7eb99afb9d5f317c912f08b5212fd69a';
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
        var reader = new FileReader();   
        reader.readAsDataURL(file);   
        reader.onload = function(e){
          let reg = /^data:image\/(jpeg|png|gif);base64,/
          //console.log(this.result.replace(reg, ""))
          //console.log(this.result)
          _this.formApplication.report = this.result
          // axios.get(R_PRE_URL+'/uploadBase64.do?imgStr='+this.result.replace(reg, "")
          // ).then((res)=> {
          //   _this.AvatarSource[personal_detail] = res.data.fileName
          // }).catch((error)=> {
          //   console.log(error)
          // })
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
  demo-upload-list{
        display: inline-block;
        width: 150px;
        height: 150px;
        text-align: center;
        line-height: 150px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
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
    .ivu-upload-drag{
      border:0px solid #ccc !important;
    }
  
}
</style>
