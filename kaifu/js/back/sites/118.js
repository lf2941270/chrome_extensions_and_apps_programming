/*模板*/
define(function(require,exports,module){
  module.exports={
    title:"2333",
		status:0,//0表示等待队列中，1表示登陆中，2表示处理中，3表示处理完毕
    page:{
      "status":0,//0表示需要登陆，1表示已有cookie无需登陆或者网站本身不需要登录
      "login":"http://tg.2333.com/index.php",
      "publish":"http://tg.2333.com/index.php?tp=kfgame&op=add"
    },
    "user":{
      "default":false,
      "username":"baiyu0001",
      "password":"baiyu0001"
    },
    "loginForm":{
      "needVerifyCode":false,
      "selector":"form[action='index.php']",//登录表单的jquery选择器
      "content":[
        {
          "name":"username",
          "value":"值"
        },{
          "name":"password",
          "value":"值"
        },{
          "name":"re_password",
          "value":"1"
        }
      ],
      "submit":{//登录表单的提交方式
        "selector":"form[action='index.php']",
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
					"value":"0",
					"format":7
				},{
					"name":"h",
					"value":"0",
					"format":8
				},{
          "name":"servernum",
          "replace":"server",
          "value":"经过格式化函数处理后的值"
        },{
          "name":"ishot",
          "value":"0"
        },{
          "name":"reg",
          "value":"0",
          "replace":"main_url"
        }
      ],
      "submit":{
        "selector":"form[action='index.php?tp=kfgame']",
        "trigger":"submit"
      }
    }
  }
});