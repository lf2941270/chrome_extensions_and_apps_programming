/*模板*/
define(function(require,exports,module){
  module.exports={
    title:"6103",
		status:0,//0表示等待队列中，1表示登陆中，2表示处理中，3表示处理完毕
    page:{
      "status":0,//0表示需要登陆，1表示已有cookie无需登陆或者网站本身不需要登录
      "login":"http://www.6103.com/login.html",
      "publish":"http://www.6103.com/fabukaifu.html"
    },
    "user":{
      "default":false,
      "username":"baiyu0001",
      "password":"baiyu0001"
    },
    "loginForm":{
      "needVerifyCode":false,
      "selector":".logintab form",//登录表单的jquery选择器
      "content":[
        {
          "name":"tcomuser1",
          "value":"值"
        },{
          "name":"tcompass",
          "value":"值"
        },{
          "name":"checkremember",
          "remember":true//表示这个是记住密码表单
        }
      ],
      "submit":{//登录表单的提交方式
        "selector":".loginbtn",
        "trigger":"click"
      }
    },
    "publishForm":{
      "content":[
        {
          "name":"gamename",
          "replace":"game",
          "value":"经过格式化函数处理后的值"
        },{
          "name":"ktmei",
          "format":5,
          "value":"经过格式化函数处理后的值"
        },{
          "name":"qyfunum",
          "replace":"server",
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
          "type":"info",
          "value":"0"
        }
      ],
      "submit":{
        "selector":".publish",
        "trigger":"click"
      }
    }
  }
});