/*模板*/
define(function(require,exports,module){
  module.exports={
    title:"521G",
		status:0,//0表示等待队列中，1表示登陆中，2表示处理中，3表示处理完毕
    page:{
      "status":0,//0表示需要登陆，1表示已有cookie无需登陆或者网站本身不需要登录
      "login":"http://op.521g.com/login.html",
      "publish":"http://op.521g.com/official/add.html"
    },
    "user":{
      "default":false,
      "username":"wsiayz",
      "password":"Yangzhi123"
    },
    "loginForm":{
      "needVerifyCode":false,
      "selector":".login-form form",//登录表单的jquery选择器
      "content":[
        {
          "name":"user",
          "value":"值"
        },{
          "name":"pwd",
          "value":"值"
        },{
          "name":"remember",
          "remember":true//表示这个是记住密码表单
        }
      ],
      "submit":{//登录表单的提交方式
        "selector":".loginBtn",
        "trigger":"click"
      }
    },
    "publishForm":{
      "content":[
        {
          "name":"game_name",
          "replace":"game",
          "value":"经过格式化函数处理后的值"
        },{
          "name":"server_open_time",
          "replace":"time",
          "format":5,
          "value":"经过格式化函数处理后的值"
        },{
          "name":"num",
          "replace":"server",
          "value":"经过格式化函数处理后的值"
        },{
          "name":"main_url",
          "replace":"main_url",
          "value":"经过格式化函数处理后的值"
        },{
          "name":"pros",
          "type":"radio",
          "value":"0"
        },{
          "name":"card",
          "type":"radio",
          "value":"0"
        },
      ],
      "submit":{
        "selector":".toSub",
        "trigger":"click"
      }
    }
  }
});