/*模板*/
define(function(require,exports,module){
  module.exports={
    title:"雷迅开服表",
		status:0,//0表示等待队列中，1表示登陆中，2表示处理中，3表示处理完毕
    page:{
      "status":0,//0表示需要登陆，1表示已有cookie无需登陆或者网站本身不需要登录
      "login":"http://www.leixunkf.com/Login.aspx",
      "publish":"http://www.leixunkf.com/User/UserAddKF.aspx?Action=Login"
    },
    "user":{
      "default":false,
      "username":"baiyu0001",
      "password":"baiyu0001"
    },
    "loginForm":{
      "needVerifyCode":false,
      "selector":"form[action='?action=login']",//登录表单的jquery选择器
      "content":[
        {
          "name":"username",
          "value":"值"
        },{
          "name":"password",
          "value":"值"
        }
      ],
      "submit":{//登录表单的提交方式
        "selector":"form[action='?action=login']",
        "trigger":"submit"
      }
    },
    "publishForm":{
      "content":[
        {
          "name":"gamename",
          "replace":"game",
          "value":"经过格式化函数处理后的值"
        },{
          "name":"kftime",
          "format":7
        },{
          "name":"kfhour",
          "format":3
        },{
          "name":"kfminute",
          "format":14
        },{
          "name":"servernum",
          "replace":"server"
        },{
          "name":"servername",
          "format":6,
          "value":"经过格式化函数处理后的值"
        },{
          "name":"regurl",
          "replace":"main_url",
          "value":"经过格式化函数处理后的值"
        }
      ],
      "submit":{
        "selector":"form[action='?Action=AddKF&ID=0']",
        "trigger":"submit"
      }
    }
  }
});