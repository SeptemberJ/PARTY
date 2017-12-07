<template>
  <div class="MainModule">
    <Row>
                            <Col span="12">
                                <Card :bordered="false" dis-hover >
                                    <div style="text-align:center" @click="GoToModule('OutLink')">
                                        <img class="ImgHalf" src="static/img/meeting.png">
                                        <h4>十九大思维导图</h4>
                                    </div>
                                </Card>
                            </Col>
                            <Col span="12">
                                <Card :bordered="false" dis-hover>
                                    <div style="text-align:center" @click="GoToModule('Transfer')">
                                        <img class="ImgHalf" src="static/img/Transfer.png">
                                        <h4>党组织接转</h4>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <Card :bordered="false" dis-hover>
                                    <div style="text-align:center" @click="GoToModule('Application')">
                                        <img class="ImgHalf" src="static/img/apply.png" >
                                        <h4>入党申请</h4>
                                    </div>
                                </Card>
                            </Col>
                            <Col span="12">
                                <Card :bordered="false" dis-hover>
                                    <div style="text-align:center" @click="GoToModule('Learn')">
                                        <img class="ImgHalf" src="static/img/learn.png" >
                                        <h4>三会一课</h4>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
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
        //十九大思维导图
        GoToModule(KIND){
            switch(KIND){
                case 'OutLink':
                window.location.href = 'http://www.baidu.com'
                break
                case 'Transfer':
                this.$router.push({name:'党组织接转'})
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
.MainModule{
    width: 100%;
    height: 100%;
    .ImgHalf{
        width: 25%;
        height: auto;
    }
}
</style>
