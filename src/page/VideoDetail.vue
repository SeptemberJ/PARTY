<template>
  <div class="LearnDetail">
    <BackBar></BackBar>
    <div class="DetailBox">
      <Row>
        <Col span="24">
          <h1>{{Detail.fname}}</h1>
          <h3>拍摄党支部：{{Detail.psdparty}}</h3>
          <p>拍摄时间：{{Detail.psdate}}</p>
          <Card :bordered="false" dis-hover>
              <div style="text-align:center">
                  <!-- <video id="VideoContain" :src="Detail.video1
"   enable-danmu danmu-btn controls>您的浏览器不支持改视频！</video>  -->

<video controls>
  <source :src="Detail.video1" type="video/mp4">
  <source :src="Detail.video1" type="video/ogg">
  <source :src="Detail.video1" type="video/webm">
  <object :data="Detail.video1" width="320" height="240">
    <embed :src="Detail.video1" width="320" height="240">
  </object> 
</video>

                  <div v-html="Detail.stud"></div>
              </div>
          </Card>
        </Col>
      </Row>
    </div>
  </div> 



  


    
    
  


</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../components/BackBar'
import {timestampToFormatTime} from '../util/utils'
  export default{
    data: function () {
      return {
        Detail:'',
        src1:'https://zgeqscjdglj.org/upload/upload/files/20171223/275_2372_01.AVI'
      }
    },
    mounted: function () {
      
    },
    created: function () {
      let ID = this.$router.history.current.params.id
      console.log(ID)
      axios.get(R_PRE_URL+'/selectvideonr.do?id='+ID
      ).then((res)=> {
        let reg = /[\\\/]/g
        let temp = res.data[0]
        temp.video1 = temp.video1.replace(reg, "/")
        temp.psdate = timestampToFormatTime(temp.psdate)
        this.Detail = temp
        console.log(this.Detail)
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
    }
  }
</script>
<style lang="scss">
.LearnDetail{
  .DetailBox{
    margin: 70px auto 0 auto;
    #VideoContain{
      width: 100%;
      height: auto;
    }
    .ivu-card{
      width: 100%;
      overflow: hidden;
    }
  }
}

</style>
