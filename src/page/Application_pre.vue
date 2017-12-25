<template>
  <div class="Application_pre">
    <BackBar></BackBar>
    <div class="MainBox">
      <Row type="flex" justify="center" class="code-row-bg">
          <Col span="6">
            <Button type="error" shape="circle" size="large" long @click="GoApplication">申请</Button>
          </Col>
      </Row>
      <Card :bordered="false" dis-hover>
          <div style="text-align:center">
              <img :src="BgImg">
          </div>
      </Card>
    </div>
      <!-- <div class="BgImg" :style="{background: 'url('+BgImg+') no-repeat top center/cover'}">
        <Row type="flex" justify="center" class="code-row-bg GoBt">
            <Col span="6">
              <Button type="error" shape="circle" size="large" long @click="GoApplication">申请</Button>
            </Col>
        </Row>
        
      </div> -->
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from 'components/BackBar'
  export default{
    data: function () {
      return {
        BgImg:''
      }
    },
    mounted: function () {
      
    },
    created: function () {
      axios.get(R_PRE_URL+'/selectimage.do'
      ).then((res)=> {
        this.BgImg = res.data[0].partyapplyimage1
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
      GoApplication(){
        this.$router.push({name:'入党申请资料填写'})
      }
    }
  }
</script>
<style lang="scss">
.Application_pre{
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: block;
  .MainBox{
    width: 100%;
    margin: 70px auto;
    img{
      width: 100%;
      height: auto;
    }
  }
  .BgImg{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: block;
    margin-top: 0px;
  }
  .GoBt{
    width: 100%;
    height:100px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    -ms-transform:translate(-50%,-50%);   /* IE 9 */
    -moz-transform:translate(-50%,-50%);  /* Firefox */
    -webkit-transform:translate(-50%,-50%); /* Safari 和 Chrome */
    -o-transform:translate(-50%,-50%);  
  }

}
</style>
