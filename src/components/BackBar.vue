<template>
  <div class="BackBar" @click="Back">
    <Icon type="chevron-left" size="16"></Icon>
    <span class="NavTxt">{{activeRoute}}</span>
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
      activeRoute(){
        return this.$store.state.activeRoute
      }
      
    },
    watch: {
      
    },
    components: {
      

    },
    methods: {
      Back(){
        window.history.back()
      }
    }
  }
</script>
<style lang="scss">
.BackBar{
  background: #495060;
  width: 100%;
  height: 42px;
  position: fixed;
  top: 0;
  left: 0;
  padding-left: 10px;
  line-height: 42px;
  color: #fff;
  z-index: 999999;
  .NavTxt{
    height:100%;
    margin-left: 20px;
  }
}
</style>
