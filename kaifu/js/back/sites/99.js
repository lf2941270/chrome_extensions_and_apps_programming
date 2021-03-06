/*模板*/
define(function(require,exports,module){
  module.exports={
    title:"9k9k",
		status:0,//0表示等待队列中，1表示登陆中，2表示处理中，3表示处理完毕
    page:{
      "status":0,//0表示需要登陆，1表示已有cookie无需登陆或者网站本身不需要登录
      "login":"http://www.9k9k.com/user.php?m=register_login",
      "publish":"http://www.9k9k.com/user.php?m=member_contributeindex"
    },
    "user":{
      "default":false,
      "username":"baiyu0001",
      "password":"baiyu0001"
    },
    "loginForm":{
      "needVerifyCode":false,
      "selector":"form[action='user.php?m=register_loginExe']",//登录表单的jquery选择器
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
        "selector":"form[action='user.php?m=register_loginExe']",
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
					"name":"servername",
					"value":"0",
					"replace":"server"
				},{
					"name":"servertime",
					"value":"0",
					"format":7
				},{
					"name":"hr",
					"value":"0",
					"format":8
				},{
					"name":"website",
					"replace":"main_url",
					"value":"经过格式化函数处理后的值"
				}
      ],
      "submit":{
        "selector":"#button",
        "trigger":"click"
      }
    }
  }
});