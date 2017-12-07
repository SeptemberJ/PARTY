<template>
     <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <Col span="8" class="layout-menu-left">
            <MemberSideBar></MemberSideBar>
            </Col>
            <Col span="16">
                <div class="layout-content">
                    <div class="layout-content-main">
                        <Row>
                            <Col span="12">
                                <Card :bordered="false" dis-hover>
                                    <div style="text-align:center">
                                        <img class="ImgHalf" src="https://file.iviewui.com/dist/76ecb6e76d2c438065f90cd7f8fa7371.png">
                                        <h4>十九大思维导图</h4>
                                    </div>
                                </Card>
                            </Col>
                            <Col span="12">
                                <Card :bordered="false" dis-hover>
                                    <div style="text-align:center">
                                        <img class="ImgHalf" src="https://file.iviewui.com/dist/76ecb6e76d2c438065f90cd7f8fa7371.png">
                                        <h4>党组织接转</h4>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <Card :bordered="false" dis-hover>
                                    <div style="text-align:center">
                                        <img class="ImgHalf" src="https://file.iviewui.com/dist/76ecb6e76d2c438065f90cd7f8fa7371.png" >
                                        <h4>入党申请</h4>
                                    </div>
                                </Card>
                            </Col>
                            <Col span="12">
                                <Card :bordered="false" dis-hover>
                                    <div style="text-align:center">
                                        <img class="ImgHalf" src="https://file.iviewui.com/dist/76ecb6e76d2c438065f90cd7f8fa7371.png" >
                                        <h4>三会一课</h4>
                                    </div>
                                </Card>
                            </Col>
                        </Row>

                        
                    </div>
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
import MemberSideBar from 'components/MemberSideBar'
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
            }
      
    },
    watch: {
      
    },
    components: {
      MemberSideBar
      

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
            }
     

    }
  }
</script>
<style lang="scss">
.Index{
    height: 100%;
    .ImgHalf{
        width: 50%;
        height: auto;
    }

    .layout{
        height:100%;
        border: 1px solid #d7dde4;
        position: relative;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        height: 100%;
        margin: 5px;
        overflow: hidden;
        border-radius: 4px;
    }
    .layout-content-main{
        height: 100%;
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        height: 100%;
        background: #495060;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        border-radius: 3px;
        margin: 15px auto;
    }
}
.ivu-row-flex{
    height:100%;
    overflow: hidden;
}
.ivu-row{
    height: 50%;
}
</style>
