define(function(require,exports,module){
  var Model=require('./model');
  var Site=Model.create("sites");
	var DefaultUser=require('./defaultuser');
	var EventProxy=require('eventproxy');
	var proxy=new EventProxy;
	var format=require('./format');
	var ReplaceForm=require('./replaceform');
  Site.include({
    setUser:function(username,password){//为账号密码不是默认的网站设置用户账号与密码
      this.user.default=false;
      this.user.username=username;
      this.user.password=password;
      this.save();
      this.parent.saveLocal();
    }
  })
  Site.extend({
    initBack:function(cb){
			this.removeLocal(function(){
//				var sites=require('./sites/indexdebug');
				var sites=require('./sites/index');
				for(var i= 0,l=sites.length;i<l;i++){
					Site.init(sites[i]);
				}
				Site.saveLocal(cb);
			});
    },
		prevProcess:function(proxyOut){//对Site进行预处理
			var _=this;5336
			proxy.assign("defaultuser","replaceform",function(defaultuser,replaceform){
				var publishForm;
				var input;
				for(var id in _.records){
          if(_.records[id].user&&_.records[id].loginForm){
            if(_.records[id].user.default===true){
              _.records[id].user.username=defaultuser.username;
              _.records[id].user.password=defaultuser.password;
            }
            if(_.records[id].loginForm.content[0]&&_.records[id].loginForm.content[1]){
              _.records[id].loginForm.content[0].value=_.records[id].user.username;
              _.records[id].loginForm.content[1].value=_.records[id].user.password;
            }
          }
					publishForm= _.records[id].publishForm;
					for(var i= 0,len=publishForm.content.length;i<len;i++){
						input=publishForm.content[i];
						publishForm.content[i]=format(input,replaceform);
					}
					_.records[id].publishForm=publishForm;
				}
				_.saveLocal();
				proxyOut.emit("well");
			});
			DefaultUser.loadLocal(function(){
				proxy.trigger("defaultuser",DefaultUser.records)
			});
			ReplaceForm.loadLocal(function(){
				proxy.trigger("replaceform",ReplaceForm.records)
			})

		}
  });
  Site.include({
    pro:function(port,proxy){
      if(this.status===1){//说明尚未登录过
        port.postMessage({
          "event":"tryLogin",
          "obj":this
        })
      }else if(this.status===2){
				port.postMessage({
					"event":"publish",
					"obj":this
				})
			}else if(this.status===3){
        //关闭标签页的，暂时注释掉
        /*chrome.tabs.remove(port.sender.tab.id, function(){
        });*/
      }
    }
  })
  module.exports=Site;
});