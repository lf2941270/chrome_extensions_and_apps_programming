/*模板*/
define(function(require,exports,module){
  module.exports={
    title:"521G",
		status:0,//0表示等待队列中，1表示登陆中，2表示处理中，3表示处理完毕
    page:{
      "status":0,//0表示需要登陆，1表示已有cookie无需登陆
      "cookie":"",
      "login":"http://op.521g.com/login.html",
			"loginsuc":"",//登陆成功后跳转的页面地址
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
      "submit":"$('.loginBtn').trigger('click')"
    },
    "publishForm":{
      "content":[
        {
          "name":"",
          "type":"表单类型",
          "replace":"用来替换的表单",
          "format":"用来格式化的函数",
          "value":"经过格式化函数处理后的值",
          "info":"备注"
        }
      ],
      "submit":""
    }
  }
});