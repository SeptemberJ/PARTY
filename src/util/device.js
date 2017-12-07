 export function deviceInfo() {

 //获取访问的user-agent
 var ua = navigator.userAgent.toLowerCase() || window.navigator.userAgent.toLowerCase();
 //判断user-agent
 var isMobile = /mobile/i.test(ua); //微信端
 var isWX = /MicroMessenger/i.test(ua), //微信端
     isIOS = /(iPhone|iPad|iPod|iOS)/i.test(ua), //苹果家族
     isAndroid = /(android|nexus)/i.test(ua), //安卓家族
     isWindows = /(Windows Phone|windows[\s+]phone)/i.test(ua), //微软家族
     isBlackBerry = /BlackBerry/i.test(ua); //黑莓家族
     // console.log(ua)
     return  isMobile
 }