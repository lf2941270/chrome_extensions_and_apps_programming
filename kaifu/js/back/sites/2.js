/*模板*/
define(function(require,exports,module){
  module.exports={
    title:"GameG开服网",
    page:{
      "status":0,
      "cookie":"",
      "login":"http://www.gameg.cn/u/",
      "publish":"http://www.gameg.cn/add_game_kf/"
    },
    "user":{
			"default":false,
			"username":"baiyu0001",
			"password":"baiyu0001"
    },
    "loginForm":{
      "needVerifyCode":false,
      "selector":".logindiv form",//登录表单的jquery选择器
      "content":[
        {
          "name":"userid",
          "type":"表单类型",
          "value":"值"
        },{
          "name":"pwd",
          "type":"表单类型",
          "value":"值"
        }
      ],
      "submit":""
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