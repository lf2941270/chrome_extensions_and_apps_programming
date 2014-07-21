/*模板*/
define(function(require,exports,module){
  module.exports={
    title:"i1758",
		status:0,//0表示等待队列中，1表示登陆中，2表示处理中，3表示处理完毕
    page:{
      "status":0,//0表示需要登陆，1表示已有cookie无需登陆或者网站本身不需要登录
      "login":"http://www.i1758.com/user/login.php",
      "publish":"http://www.i1758.com/user/kaifu_add.php"
    },
    "user":{
      "default":false,
      "username":"baiyu0001",
      "password":"baiyu0001"
    },
    "loginForm":{
      "needVerifyCode":true,
      "selector":"form[action='login_form.php']",//登录表单的jquery选择器
      "content":[
        {
          "name":"user_name",
          "value":"值"
        },{
          "name":"user_pass",
          "value":"值"
        }
      ],
      "submit":{//登录表单的提交方式
        "selector":"form[action='login_form.php']",
        "trigger":"submit"
      }
    },
    "publishForm":{
      "content":[
				{
					"name":"kaifu_gname",
					"replace":"game",
					"value":"经过格式化函数处理后的值"
				},{
					"name":"kaifu_type",
					"value":"0",
					"replace":"leixing",
          "text":true
				},{
					"name":"kaifu_server",
					"value":"0",
					"replace":"server"
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
					"format":8
				},{
					"name":"minute",
					"value":"0",
					"format":4
				},{
					"name":"kaifu_url",
					"replace":"main_url",
					"value":"经过格式化函数处理后的值"
				},{
					"name":"kaifu_pingtai",
					"replace":"company",
					"value":"经过格式化函数处理后的值"
				}
      ],
      "submit":{
        "selector":"#imageField",
        "trigger":"click"
      }
    }
  }
});