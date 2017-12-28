<template>
  <div class="Learn">
    <BackBar></BackBar>
    <div class="LearnBox">
      <Row>
        <Col span="12" v-for="(Video,VideoIdx) in dataVideo" class="marginT_10">
          <Card :bordered="false" dis-hover>
              <div style="text-align:center" @click="ToDetail(Video.id,Video.fimage)"> 
                  <img :src="Video.video1">
                  <h3>{{Video.fname}}</h3>
              </div>
          </Card>
          <!-- <Table :highlight-row="true" :columns="columns1" :data="dataVideo" :show-header="false" @on-current-change="chooseRow"></Table> -->
        </Col>
      </Row>
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
  export default{
    data: function () {
      return {
        Video:'',
        ifLoading:true,
        columns1: [
              {
                  type: 'index',
                  width: 60,
                  align: 'center'
              },
              {
                  title: 'title',
                  key: 'fname',
              },
              {
                  title: 'date',
                  key: 'psdate',
                  align:'right'
              }
          ],
        dataVideo: [],
        
      }
    },
    mounted: function () {
      
    },
    created: function () {

      this.getList()

      
      
    },
    computed: {

      
    },
    watch: {
      
    },
    components: {
      BackBar,
      Spin,
      

    },
    methods: {
      getList(){
        axios.get(R_PRE_URL+'/selectvideotitle.do'
        ).then((res)=> {
          let temp = res.data
          temp.map((Item,Idx)=>{
            Item.psdate = timestampToFormatTime(Item.psdate)
          })
          this.dataVideo = temp
          this.ifLoading = false
        }).catch((error)=> {
          console.log(error)
        })
      },
      chooseRow(event){
        this.$router.push({name:'详情',params: {id:event.id}})
      },
      ToDetail(ID,SOURCE){
        this.$store.state.VideoSource=SOURCE
//'https://zgeqscjdglj.org/upload/upload/files/20171226/20171208142206.mp4'
        this.$router.push({name:'详情',params: {id:ID}})
      },
    }
  }
</script>
<style lang="scss">
.Learn{
  .LearnBox{
    margin: 42px auto 0 auto;
  }
  h3{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  img{
    width: 50%;
  }
}
</style>
