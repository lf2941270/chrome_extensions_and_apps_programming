/*模板*/
define(function(require,exports,module){
  module.exports={
    title:"387a",
    "status":0,
    page:{
      "status":1,//无需登录
      "login":"http://www.387a.com",
      "publish":"http://www.387a.com/add.html"
    },
    "user":{
			"default":true,
			"username":"",
			"password":""
    },

    "publishForm":{
      "content":[
        {
          "name":"gname",
          "replace":"game",
          "value":"经过格式化函数处理后的值"
        },{
          "name":"classed",
          "replace":"leixing",
          "value":"经过格式化函数处理后的值"
        },{
          "name":"sname",
          "format":19,
          "value":"经过格式化函数处理后的值"
        },{
          "name":"operation",
          "replace":"company"
        },{
          "name":"regurl",
          "replace":"main_url",
          "value":"经过格式化函数处理后的值"
        },{
          "name":"offurl",
					"replace":"site_url",
					"value":"http://www.ibaiyu.cn"
        },{
          "name":"qq",
          "replace":"qq",
          "value":""
        },{
          "name":"about",
          "replace":"info",
          "value":"0"
        },{
          "name":"opendate",
          "value":"0",
          "format":5
        }
      ],
      "submit":{
        "selector":"input[name='Submit']",
        "trigger":"click"
      }
    }
  }
});