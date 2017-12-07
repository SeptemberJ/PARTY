<template>
  <div class="BackBar" @click="Back">
    <Icon type="chevron-left" size="18"></Icon>
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
  padding-left: 10px;
  padding-top: 12px;
  color: #fff;
}
</style>
