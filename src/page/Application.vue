<template>
  <div class="Application">
    <BackBar></BackBar>
    <div class="MainBox">
      <Form ref="formApplication" :model="formApplication" :rules="ruleApplication" :label-width="80">
          <FormItem label="姓名" prop="name">
              <Input type="text" v-model="formApplication.name"></Input>
          </FormItem>
          <FormItem label="性别" prop="sex">
            <RadioGroup v-model="formApplication.sex">
              <Radio label="男">男</Radio>
              <Radio label="女">女</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="民族" prop="nation">
              <Input type="text" v-model="formApplication.nation"></Input>
          </FormItem>
          <FormItem label="身份证号" prop="id_card">
              <Input type="text" v-model="formApplication.id_card"></Input>
          </FormItem>
          <FormItem label="工作单位" prop="work">
              <Input type="text" v-model="formApplication.work"></Input>
          </FormItem>
          <FormItem label="职务" prop="position">
              <Input type="text" v-model="formApplication.position"></Input>
          </FormItem>
          <FormItem label="手机号" prop="phone">
              <Input type="text" v-model="formApplication.phone"></Input>
          </FormItem>
          <FormItem label="出生日期" prop="birthday">
              <DatePicker type="date" placeholder="" v-model="formApplication.birthday"></DatePicker>
          </FormItem>
          <FormItem label="学历" prop="education">
              <Select v-model="formApplication.education" style="width:200px">
                  <Option v-for="item in educationList" :value="item.XL" :key="item.ID">{{item.XL}}</Option>
              </Select>
          </FormItem>
          <FormItem label="家庭住址" prop="address">
              <Input type="text" v-model="formApplication.address"></Input>
          </FormItem>
          <FormItem label="思想汇报" prop="report">
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
          </FormItem>
          
          <FormItem>
              <Button type="primary" @click="handleSubmit('formApplication')">提交</Button>
              <Button type="ghost" @click="handleReset('formApplication')" style="margin-left: 8px">重置</Button>
          </FormItem>
      </Form>
    </div>
  </div> 



  


    
    
  


</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../components/BackBar'
  export default{
    data: function () {
      return {
        educationList:[],
        formApplication: {
                    name: '',
                    sex: '',
                    nation: '',
                    id_card: '',
                    work: '',
                    position: '',
                    phone: '',
                    birthday: '',
                    education: '',
                    address: '',
                    report: 'static/img/picture.png',
        },
        ruleApplication: {
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
            work: [
                { required: true, message: '请输入工作单位！', trigger: 'blur' }
            ],
            position: [
                { required: true, message: '请输入职务！', trigger: 'blur' }
            ],
            phone: [
                { required: true, message: '请输入手机号！', trigger: 'blur' }
            ],
            birthday: [
                { required: true, type: 'date', message: '请选择出生日期！', trigger: 'change' }
            ],
            education: [
                { required: true, message: '请选择学历！', trigger: 'change' }
            ],
            address: [
                { required: true, message: '请输入家庭住址！', trigger: 'blur' }
            ],
            report: [
                { required: true, message: '请上传思想汇报！', trigger: 'blur' }
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
    created: function () {
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
      BackBar
      

    },
    methods: {
      handleSubmit (name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                let reg = /^1[34578]\d{9}$/
                let Info = this.formApplication
                if (!reg.test(Info.phone)) {
                    this.$Message.error('手机号格式不对!')
                    return
                } 
                this.$Message.success('Success!')
                axios.post(R_PRE_URL+'/applyparty.do',Info
                ).then((res)=> {
                  // switch(res.data){
                  //   case 0:
                  //   this.$Message.error('提交失败!')
                  //   break
                  //   case 1:
                  //   this.$Message.error('提交成功!')
                  //   this.$route.push({name:'登录'})
                  //   break
                  //   default
                  //   this.$Message.error('接口报错!')
                  // }
                }).catch((error)=> {
                  console.log(error)
                })
              } else {
                  this.$Message.error('Fail!');
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
    width: 80%;
    margin: 20px auto;
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
