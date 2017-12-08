<template>
  <div class="Index">
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <Col :span="spanLeft" class="layout-menu-left">
                <Menu active-name="1" theme="dark" width="auto" style="overflow: hidden;">
                    <div class="layout-logo-left TextCenter">
                        <img src="static/img/conows-portal-party.png" style="height:30px;">
                    </div>
                    <MenuItem name="1" style="background: transparent;" v-if="!ifLogined">
                        <!-- <Icon type="ios-navigate" :size="iconSize"></Icon> -->
                        <span class="layout-text fullBox" @click="GoLogin">党员中心</span>
                    </MenuItem>
                    <MenuItem name="2" style="background: transparent;" v-if="ifLogined">
                        <span class="layout-text fullBox TextLeft">姓名:</span>
                        <span class="layout-text fullBox">{{userInfo.Name}}</span>
                    </MenuItem>
                    <MenuItem name="3" style="background: transparent;" v-if="ifLogined">
                        <span class="layout-text fullBox TextLeft">所属支部:</span>
                        <span class="layout-text fullBox">{{userInfo.Master}}</span>
                    </MenuItem>
                    <MenuItem name="4" style="background: transparent;" v-if="ifLogined">
                        <span class="layout-text fullBox TextLeft">入党时间:</span>
                        <span class="layout-text fullBox">{{userInfo.JoinTime}}</span>
                    </MenuItem>
                    <!-- <MenuItem name="5" style="background: transparent;" v-if="ifLogined">
                        <span class="layout-text fullBox TextLeft">学习情况:</span>
                        <span class="layout-text fullBox">{{userInfo.LearnSituation}}</span>
                    </MenuItem> -->
                </Menu>
            </Col>
            <Col :span="spanRight">
                <div class="layout-header">
                    <Button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <!-- <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem href="#">Index</BreadcrumbItem>
                        <BreadcrumbItem href="#">Apps</BreadcrumbItem>
                        <BreadcrumbItem>App</BreadcrumbItem>
                    </Breadcrumb>
                </div> -->
                <div class="layout-content">
                    <div class="layout-content-main">
                        <MainModule></MainModule>
                    </div>
                </div>
                <div class="layout-copy">
                    <p>柏田科技提供技术支持</p>
                </div>
            </Col>
        </Row>
    </div>
  </div> 

<!--   <video id="myVideo" src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"   enable-danmu danmu-btn controls></video> -->


<!-- <Row>
        <Col span="24">
          <embed name="_v_p_595"  src="http://tv.people.com.cn/img/2011ptv2/playerByOsmf.swf" wmode="opaque" allowfullscreen="true" allowscriptaccess="always" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" flashvars="id=/pvservice/xml/2017/10/25/631ffb42-cc7a-4fb6-9944-492122b94ed9.xml&amp;width=1200&amp;height=675&amp;cdn=100%2C0%2C0%2C0&amp;sl=5&amp;key=人民电视:/61600/414636/414720/" type="application/x-shockwave-flash">
        </Col>

    </Row> -->


  


    
    
  


</template>
<script>
import MainModule from 'components/MainModule'
  export default{
    data: function () {
      return {
        spanLeft: 5,
        spanRight: 19
        // transitionName: 'slide-left',
      }
    },
    mounted: function () {
      
    },
    created: function () {
      
    },
    computed: {
        iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
        },
        ifLogined(){
            return this.$store.state.ifLogined
        },
        userInfo(){
            return this.$store.state.userInfo
        },
        Type(){
            return this.$store.state.Type
        }
      
    },
    watch: {
      
    },
    components: {
      MainModule
      

    },
    methods: {
        toggleClick () {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
            },
        GoLogin(){
            this.$router.push({name:'登录'});
        }
     

    }
  }
</script>
<style lang="scss">
.Index{
    height: 100%;
    .fullBox{
        width: 100%;
        display: block;
    }

    .layout{
        height:100%;
        border: 1px solid #d7dde4;
        position: relative;
        border-radius: 4px;
        overflow: hidden;

    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        width: 100%;
        height: 80%;
        min-height: 450px;
        margin: 5px;
        overflow: hidden;
        border-radius: 4px;
        position:absolute;
    }
    .layout-content-main{
        width: 100%;
        height: 100%;
        padding: 0px;
    }
    .layout-copy{
        width: 80%;
        height:10%;
        text-align: center;
        padding: 10px;
        color: #9ea7b4;
        position: fixed;
        bottom: 0px;
        right: 0px;
        
    }
    .layout-menu-left{
        height: 100%;
        background: #495060;
    }
    .layout-header{
        height: 10%;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
}
.ivu-btn{
    padding: 0 15px !important;
}
.ivu-row-flex{
    height:100%;
    overflow: hidden;
}

</style>
