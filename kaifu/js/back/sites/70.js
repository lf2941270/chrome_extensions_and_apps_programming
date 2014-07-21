/*模板*/
define(function(require,exports,module){
  module.exports={
    title:"kf2345",
		status:0,//0表示等待队列中，1表示登陆中，2表示处理中，3表示处理完毕
    page:{
      "status":0,//0表示需要登陆，1表示已有cookie无需登陆或者网站本身不需要登录
      "login":"http://www.kf2345.com/index.php?ac=company&op=login",
      "publish":"http://www.kf2345.com/index.php?ac=company&do=add&op=kf"
    },
    "user":{
      "default":false,
      "username":"baiyu0001",
      "password":"baiyu0001"
    },
    "loginForm":{
      "needVerifyCode":false,
      "selector":"form[action='index.php?ac=company&op=login']",//登录表单的jquery选择器
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
        "selector":"form[action='index.php?ac=company&op=login']",
        "trigger":"submit"
      }
    },
    "publishForm":{
      "content":[
        {
          "name":"gname",
          "replace":"game",
          "value":"经过格式化函数处理后的值"
        },{
          "name":"starttime",
          "value":"0",
          "format":9
        },{
          "name":"gserver",
          "format":6,
          "value":"经过格式化函数处理后的值"
        },{
          "name":"pname",
          "replace":"company",
          "value":"经过格式化函数处理后的值"
        },{
          "name":"gurl",
          "replace":"main_url",
          "value":"经过格式化函数处理后的值"
        }
      ],
      "submit":{
        "selector":".form",
        "trigger":"submit"
      }
    }
  }
});