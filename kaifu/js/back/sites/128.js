
/*模板*/
define(function(require,exports,module){
  module.exports={
    title:"ganzhe",
		status:0,//0表示等待队列中，1表示登陆中，2表示处理中，3表示处理完毕
    page:{
      "status":0,//0表示需要登陆，1表示已有cookie无需登陆或者网站本身不需要登录
      "login":"http://webgame.ganzhe.com/Doinfo/User_Login.asp",
      "publish":"http://www.ganzhe.com/webgame/fhcard/yxrk.asp?username=baiyu0001"
    },
    "user":{
      "default":false,
      "username":"baiyu0001",
      "password":"baiyu0001"
    },
    "loginForm":{
      "needVerifyCode":true,
      "selector":"form[action='User_ChkLogin.asp']",//登录表单的jquery选择器
      "content":[
        {
          "name":"UserName",
          "value":"值"
        },{
          "name":"UserPassword",
          "value":"值"
        },{
					"name":"CookieDate",
					"value":"3"
				}
      ],
      "submit":{//登录表单的提交方式
        "selector":"input[src='Images/User_Login_0_13.gif']",
        "trigger":"click"
      }
    },
    "publishForm":{
      "content":[
				{
					"name":"Title",
					"replace":"game",
					"value":"经过格式化函数处理后的值"
				},{
					"name":"MY_gameserver",
					"value":"0",
					"format":6
				},{
					"name":"MY_gongsi",
					"value":"0",
					"replace":'company'
				},{
					"name":"MY_gamelx",
					"value":"0",
					"replace":'leixing'
				},{
					"name":"nian",
					"value":"0",
					"format":0
				},{
					"name":"yue",
					"value":"0",
					"format":1
				},{
					"name":"ri",
					"value":"0",
					"format":2
				},{
					"name":"dian",
					"value":"0",
					"format":3
				},{
					"name":"MY_gameserverURL",
					"replace":"main_url",
					"value":"经过格式化函数处理后的值"
				}
      ],
      "submit":{
        "selector":"[name='Submit']",
        "trigger":"click"
      }
    }
  }
});