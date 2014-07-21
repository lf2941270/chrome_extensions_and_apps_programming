/*模板*/
define(function(require,exports,module){
  module.exports={
    title:"96u",
		status:0,//0表示等待队列中，1表示登陆中，2表示处理中，3表示处理完毕
    page:{
      "status":0,//0表示需要登陆，1表示已有cookie无需登陆或者网站本身不需要登录
      "login":"http://kaifu.96u.com/login.html",
      "publish":"http://kaifu.96u.com/fabukaifu.html"
    },
    "user":{
      "default":false,
      "username":"baiyu0001",
      "password":"baiyu0001"
    },
    "loginForm":{
      "needVerifyCode":false,
      "selector":"form[action='/login.html']",//登录表单的jquery选择器
      "content":[
        {
          "name":"tcomuser1",
          "value":"值"
        },{
          "name":"tcompass",
          "value":"值"
        }
      ],
      "submit":{//登录表单的提交方式
        "selector":"form[action='/login.html']",
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
          "name":"year",
          "value":"0",
          "format":0
        },{
          "name":"month",
          "value":"0",
          "format":1
        },{
          "name":"day",
          "value":"0",
          "format":2
        },{
          "name":"hour",
          "value":"0",
          "format":3
        },{
          "name":"minute",
          "value":"0",
          "format":4
        },{
          "name":"gametype",
          "replace":"leixing",
          "value":"经过格式化函数处理后的值"
        },{
          "name":"gameserver[0]",
          "format":6,
          "value":"经过格式化函数处理后的值"
        },{
          "name":"oprcompany",
          "replace":"company",
          "value":"经过格式化函数处理后的值"
        },{
          "name":"urllogin",
          "replace":"main_url",
          "value":"经过格式化函数处理后的值"
        },{
          "name":"urlreg",
          "replace":"main_url",
          "value":"经过格式化函数处理后的值"
        },{
          "name":"activity",
          "replace":"info",
          "value":"0"
        }
      ],
      "submit":{
        "selector":"form[action='/company_gameform.php']",
        "trigger":"submit"
      }
    }
  }
});