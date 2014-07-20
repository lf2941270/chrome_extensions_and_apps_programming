/*模板*/
define(function(require,exports,module){
  module.exports={
    title:"526wan",
		status:0,//0表示等待队列中，1表示登陆中，2表示处理中，3表示处理完毕
    page:{
      "status":0,//0表示需要登陆，1表示已有cookie无需登陆或者网站本身不需要登录
      "login":"http://www.526wan.com/login.php",
      "publish":"http://www.526wan.com/user_fbxf.php"
    },
    "user":{
      "default":false,
      "username":"baiyu0001",
      "password":"baiyu0001"
    },
    "loginForm":{
      "needVerifyCode":false,
      "selector":"form[action='login.php?act=login']",//登录表单的jquery选择器
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
        "selector":"form[action='login.php?act=login']",
        "trigger":"submit"
      }
    },
    "publishForm":{
      "content":[
				{
					"name":"yxname",
					"replace":"game",
					"value":"经过格式化函数处理后的值"
				},{
					"name":"yy",
					"value":"0",
					"format":0
				},{
					"name":"m",
					"value":"0",
					"format":13
				},{
					"name":"d",
					"value":"0",
					"format":15
				},{
					"name":"h",
					"value":"0",
					"format":8
				},{
					"name":"i",
					"value":"0",
					"format":4
				},{
					"name":"pingtai",
					"value":"0",
					"replace":"company"
				},{
					"name":"xianlu",
					"value":"0",
					"format":6
				},{
					"name":"kfurl",
					"replace":"main_url",
					"value":"经过格式化函数处理后的值"
				},{
					"name":"kfjs",
					"replace":"info",
					"value":"经过格式化函数处理后的值"
				}
      ],
      "submit":{
        "selector":"input[src='images/tj.gif']",
        "trigger":"click"
      }
    }
  }
});