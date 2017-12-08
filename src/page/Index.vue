<template>
  <div class="Index" style="background: url('static/img/bg.jpg');background-repeat: no-repeat;background-size: cover; background-attachment: fixed;">
    <div class="FiveModule">
      <Row>
        <Col :xs="{ span: 4, offset: 0 }" class="ModuleItem">
          <img class="ModuleImg" src="static/img/Transfer.png" @click="GoToModule('OutLink')">
          <p @click="GoToModule('OutLink')">十九大思维导图</p>
        </Col>
        <Col :xs="{ span: 4, offset: 1 }" class="ModuleItem">
          <img class="ModuleImg" src="static/img/Transfer.png" @click="GoToModule('Transfer')">
          <p @click="GoToModule('Transfer')">党组织接转</p>
        </Col>
        <Col :xs="{ span: 5, offset: 1 }" class="ModuleItem">
          <img class="ModuleImg" src="static/img/Transfer.png" @click="GoToModule('Login')">
          <p @click="GoToModule('Login')">党员中心</p>
        </Col>
        <Col :xs="{ span: 4, offset: 1 }" class="ModuleItem">
          <img class="ModuleImg" src="static/img/Transfer.png" @click="GoToModule('Application')">
          <p @click="GoToModule('Application')">入党申请</p>
        </Col>
        <Col :xs="{ span: 4, offset: 0 }" class="ModuleItem" >
          <img class="ModuleImg" src="static/img/Transfer.png" @click="GoToModule('Learn')">
          <p @click="GoToModule('Learn')">三会一课</p>
        </Col>
    </Row>
    </div>
  </div> 



  


    
    
  


</template>
<script>
// import MemberSideBar from 'components/MemberSideBar'
  export default{
    data: function () {
      return {
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
      

    },
    methods: {
      GoToModule(KIND){
            switch(KIND){
                case 'OutLink':
                window.location.href = 'http://www.baidu.com'
                break
                case 'Transfer':
                this.$router.push({name:'党组织接转'})
                break
                case 'Login':
                if(this.$store.state.ifLogined){
                  this.$router.push({name:'党员中心'})
                }else{
                  this.$router.push({name:'登录'})
                }
                
                break
                case 'Application':
                this.$router.push({name:'入党申请'})
                break
                case 'Learn':
                this.$router.push({name:'三会一课'})
                break
            }
        }
    }
  }
</script>
<style lang="scss">
.Index{
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: block;
  background: pink;
  .FiveModule{
    width: 90%;
    height:500px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    -ms-transform:translate(-50%,-50%);   /* IE 9 */
    -moz-transform:translate(-50%,-50%);  /* Firefox */
    -webkit-transform:translate(-50%,-50%); /* Safari 和 Chrome */
    -o-transform:translate(-50%,-50%);  

  }
  .ivu-row{
    height: 100%;
  }
  .ModuleItem{
    height:100%;
    text-align: center;
  }
  .ModuleItem:nth-of-type(1){
    margin-top: 240px;
  }
  .ModuleItem:nth-of-type(2){
    margin-top: 170px;
  }
  .ModuleItem:nth-of-type(3){
    margin-top: 100px;
  }
  .ModuleItem:nth-of-type(4){
    margin-top: 170px;
  }
  .ModuleItem:nth-of-type(5){
    margin-top: 240px;
  }
  .ModuleImg{
    width: 50%;
    height: auto;
  }
  
  
  
}
</style>