/*模板*/
define(function(require,exports,module){
  module.exports={
    title:"牛牛游戏",
		status:0,//0表示等待队列中，1表示登陆中，2表示处理中，3表示处理完毕
    page:{
      "status":0,//0表示需要登陆，1表示已有cookie无需登陆或者网站本身不需要登录
      "login":"http://www.nnyx.com/e/tg/login.php",
      "publish":"http://www.nnyx.com/e/tg/AddInfo.php?mid=16&enews=MAddInfo&classid=32"
    },
    "user":{
      "default":false,
      "username":"baiyu0001",
      "password":"baiyu0001"
    },
    "loginForm":{
      "needVerifyCode":false,
      "selector":"form[action='/e/member/doaction.php']",//登录表单的jquery选择器
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
        "selector":".loginbtn",
        "trigger":"click"
      }
    },
    "publishForm":{
      "content":[
				{
					"name":"title",
					"replace":"game",
					"value":"经过格式化函数处理后的值"
				},{
					"name":"fu",
					"value":"0",
					"format":6
				},{
					"name":"newstime",
					"value":"0",
					"format":5
				},{
					"name":"lei",
					"value":"0",
					"replace":"main_url"
				}
      ],
      "submit":{
        "selector":"[action='ecms.php']",
        "trigger":"submit"
      }
    }
  }
});