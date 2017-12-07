<template>
  <div class="MemberSideBar">
    <!-- <p style="color: #fff;">姓名:<span class="displayBlock">某某某(党员)</span></p> -->
    <Menu theme="dark" width="auto" style="color: #fff;">   
      <!-- <MenuItem><Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" /></MenuItem>  -->             
      <MenuItem>姓名:<span class="displayBlock">某某某(党员)</span></MenuItem>
      <MenuItem>党支部:<span class="displayBlock">某某党支部</span></MenuItem>
      <MenuItem>入党时间:<span class="displayBlock">2017-09-09</span></MenuItem>
      <MenuItem>学习情况:<span class="displayBlock">已完成</span></MenuItem>                
    </Menu>
  </div>



  


    
    
  


</template>
<script>
//import TopBlock from 'components/PC/Common/TopBlock'
  export default{
    data: function () {
      return {
        // transitionName: 'slide-left',
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
     

    }
  }
</script>
<style lang="scss">
.MemberSideBar{
  width: 100%;
  height: 400px;
  position: absolute; left: 0; top: 0; right: 0; bottom: 0;
  margin: auto;
  


}
.ivu-menu-item{
  text-align: center;
  height: 80px;
}
</style>
