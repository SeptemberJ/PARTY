
 export function imageUtil(e) {  
  var imageSize = {};
  var originalWidth = 3000;//图片原始宽  
  var originalHeight = 2000;//图片原始高  
  var originalScale = originalHeight/originalWidth;//图片高宽比  
  console.log('originalWidth: ' + originalWidth)  
  console.log('originalHeight: ' + originalHeight)  
  //var imageSize = {};  
  // var originalWidth = e.detail.width;//图片原始宽  
  // var originalHeight = e.detail.height;//图片原始高  
  // var originalScale = originalHeight/originalWidth;//图片高宽比  
  // console.log('originalWidth: ' + originalWidth)  
  // console.log('originalHeight: ' + originalHeight)  
  //获取屏幕宽高  

  var windowWidth = document.body.clientWidth;
  var windowHeight = document.body.clientHeight;
  var windowscale = windowHeight/windowWidth;//屏幕高宽比 
  imageSize.imageHeight = windowHeight;  
  imageSize.imageWidth = originalScale * originalHeight;  
//alert(imageSize.imageHeight +'--'+imageSize.imageWidth)
      // if(originalScale < windowscale){//图片高宽比小于屏幕高宽比  
      //   //图片缩放后的宽为屏幕宽  
      //    imageSize.imageWidth = windowWidth;  
      //    imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;  
      // }else{//图片高宽比大于屏幕高宽比  
      //   //图片缩放后的高为屏幕高  
      //    imageSize.imageHeight = windowHeight;  
      //    imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;  
      // } 

  //     if(originalScale < windowscale){//图片高宽比小于屏幕高宽比  
  //       //图片缩放后的宽为屏幕宽  
  //        imageSize.imageWidth = windowWidth;  
  //        imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;  
  //     }else{//图片高宽比大于屏幕高宽比  
  //       //图片缩放后的高为屏幕高  
  //        imageSize.imageHeight = windowHeight;  
  //        imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;  
  //     } 

  // wx.getSystemInfo({  
  //   success: function (res) {  
  //     var windowWidth = res.windowWidth;  
  //     var windowHeight = res.windowHeight;  
  //     var windowscale = windowHeight/windowWidth;//屏幕高宽比  
  //     console.log('windowWidth: ' + windowWidth)  
  //     console.log('windowHeight: ' + windowHeight)  
  //     if(originalScale < windowscale){//图片高宽比小于屏幕高宽比  
  //       //图片缩放后的宽为屏幕宽  
  //        imageSize.imageWidth = windowWidth;  
  //        imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;  
  //     }else{//图片高宽比大于屏幕高宽比  
  //       //图片缩放后的高为屏幕高  
  //        imageSize.imageHeight = windowHeight;  
  //        imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;  
  //     }  
       
  //   }  
  // })  
  // console.log('缩放后的宽: ' + imageSize.imageWidth)  
  // console.log('缩放后的高: ' + imageSize.imageHeight)  
   return imageSize;  
}  

 export function generateMixed(n) {
 	var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
 	var res = "";
     for(var i = 0; i < n ; i ++) {
         var id = Math.ceil(Math.random()*35);
         res += chars[id];
     }
     return res;
 }
 export function getOneYearMonth(n,limitDate) {
	//创建现在的时间  
    var data=new Date();  
    //获取年  
    var year=data.getFullYear();  
    //获取月  
    var mon
    //获取日  
    var day=data.getDate();
    if(day<limitDate){
      mon=data.getMonth(); 
    }else{
      mon=data.getMonth()+1; 
    } 
    var arry=new Array();  
    for(var i=0;i<n;i++){  
        mon=parseInt(mon)+1;
        
        if(parseInt(mon)>12){  
            year=year+1;  
            mon=mon-12;  
        }
        if(mon<10){ 
            mon='0'+mon;
        }
        arry[i]=year+"-"+mon;  
    }  
    return arry; 
 }
 export function removeByValue(arr,val) {
  for(let i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
  return arr;
}

export function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export function timestampToFormatTime(str){  
  function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  var oDate = new Date(str),  
  oYear = oDate.getFullYear(),  
  oMonth = oDate.getMonth()+1,  
  oDay = oDate.getDate(),  
  oHour = oDate.getHours(),  
  oMin = oDate.getMinutes(),  
  oSen = oDate.getSeconds(),  
  oTime = oYear +'-'+ formatNumber(oMonth) +'-'+ formatNumber(oDay) +' '+ formatNumber(oHour) +':'+ formatNumber(oMin) +':'+formatNumber(oSen)//最后拼接时间  
  return oTime
}


export function autoBirthday(CARDID){
    var birthday=getBirthday();
    switch(birthday){
      case 0:
      return '不能为空';
      break;
      case 1:
      return '格式不对';
      break;
      default: 
      return birthday;
    }  
  function getBirthday(){
    var a=CARDID;
    if(15==a.length || 18==a.length){
      var left=a.length-12;
      var right=a.length-4;
      var b=a.slice(left,right);
      if(8==b.length){
        return b;
      }
      else return 0;
    }else{
      return 1;
    }
  }
}      

// function getzf(num){  
//             if(parseInt(num) < 10){  
//                 num = '0'+num;  
//             }  
//             return num;  
//         }  
