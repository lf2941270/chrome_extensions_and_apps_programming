/*模板*/
define(function(require,exports,module){
  module.exports={
    title:"jjjgame",
    "status":0,
    page:{
      "status":1,//无需登录
      "login":"http://www.jjjgame.com/other/kfb_add.php",
      "publish":"http://www.jjjgame.com/other/kfb_add.php"
    },
    "user":{
			"default":true,
			"username":"",
			"password":""
    },

    "publishForm":{
      "content":[
        {
          "name":"name",
          "replace":"game",
          "value":"经过格式化函数处理后的值"
        },{
          "name":"gametype",
          "replace":"leixing",
          "value":"经过格式化函数处理后的值"
        },{
          "name":"servername",
          "format":6,
          "value":"经过格式化函数处理后的值"
        },{
          "name":"operatecompany",
          "replace":"company"
        },{
          "name":"url_reg",
          "replace":"main_url",
          "value":"经过格式化函数处理后的值"
        },{
          "name":"url_home",
					"replace":"site_url",
					"value":"http://www.ibaiyu.cn"
        },{
          "name":"content",
          "replace":"info",
          "value":"0"
        },{
          "name":"pubdate",
          "value":"0",
          "format":5
        }
      ],
      "submit":{
        "selector":"input[type='submit']",
        "trigger":"click"
      }
    }
  }
});