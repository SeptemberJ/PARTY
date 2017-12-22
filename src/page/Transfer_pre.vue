<template>
  <div class="Transfer_pre">
    <BackBar></BackBar>
      <div class="BgImg" :style="{background: 'url('+BgImg+') no-repeat top center/cover fixed'}">
        <Row type="flex" justify="center" class="code-row-bg GoBt">
            <Col span="6">
              <Button type="error" shape="circle" size="large" long @click="GoTransfer">申请</Button>
            </Col>
        </Row>
        
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
        BgImg:''
      }
    },
    mounted: function () {
      
    },
    created: function () {
      axios.get(R_PRE_URL+'/selectimage.do'
      ).then((res)=> {
        this.BgImg = res.data[0].zzgximage1
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
      GoTransfer(){
        this.$router.push({name:'组织关系接转资料填写'})
      }
    }
  }
</script>
<style lang="scss">
.Transfer_pre{
  width: 100%;
  height: 100%;
  .BgImg{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: block;
    margin-top: 42px;
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
