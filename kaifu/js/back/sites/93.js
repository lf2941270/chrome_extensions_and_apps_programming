/*模板*/
define(function(require,exports,module){
  module.exports={
    title:"ye40",
		status:0,//0表示等待队列中，1表示登陆中，2表示处理中，3表示处理完毕
    page:{
      "status":0,//0表示需要登陆，1表示已有cookie无需登陆或者网站本身不需要登录
      "login":"http://www.ye40.com/login.html",
      "publish":"http://www.ye40.com/add_game_kf.html"
    },
    "user":{
      "default":false,
      "username":"baiyu0001",
      "password":"baiyu0001"
    },
    "loginForm":{
      "needVerifyCode":false,
      "selector":"form[action='/member/tg_do.php']",//登录表单的jquery选择器
      "content":[
        {
          "name":"userid",
          "value":"值"
        },{
          "name":"pwd",
          "value":"值"
        }
      ],
      "submit":{//登录表单的提交方式
        "selector":"form[action='/member/tg_do.php']",
        "trigger":"submit"
      }
    },
    "publishForm":{
      "content":[
				{
					"name":"title",
					"replace":"game",
					"value":"经过格式化函数处理后的值"
				},{
					"name":"leixing",
					"value":"0",
					"replace":"leixing"
				},{
					"name":"qufu",
					"value":"0",
					"format":19
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
					"name":"zhuce",
					"replace":"main_url",
					"value":"经过格式化函数处理后的值"
				},{
					"name":"pingtai",
					"replace":"company",
					"value":"经过格式化函数处理后的值"
				}
      ],
      "submit":{
        "selector":".tijiao",
        "trigger":"click"
      }
    }
  }
});