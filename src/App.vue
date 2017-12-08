<template>
  <div class="com-app">
    <transition>
      <router-view class="child-view"></router-view>
    </transition>
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
      this.$Message.config({
          top: 70,
          duration: 1.5
      });
      
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
</style>
