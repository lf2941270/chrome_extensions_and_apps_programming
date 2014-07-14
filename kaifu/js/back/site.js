define(function(require,exports,module){
  var Model=require('./model');
  var Site=Model.create("sites");
	var DefaultUser=require('./defaultuser');
	var EventProxy=require('eventproxy');
	var proxy=new EventProxy;
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
				var sites=require('./sites/index');
				for(var i= 0,l=sites.length;i<l;i++){
					Site.init(sites[i]);
				}
				Site.saveLocal(cb);
			});
    },
		prevProcess:function(proxyOut){//对Site进行预处理
			var _=this;
			DefaultUser.loadLocal(function(){
				for(var id in _.records){
					if(_.records[id].user.default===true){
						_.records[id].user.username=DefaultUser.records.username;
						_.records[id].user.password=DefaultUser.records.password;
					}
          console.log(_.records[id].loginForm)
          if(_.records[id].loginForm.content[0]&&_.records[id].loginForm.content[1]){
            _.records[id].loginForm.content[0].value=_.records[id].user.username;
            _.records[id].loginForm.content[1].value=_.records[id].user.password;
          }
				}
        _.saveLocal();
				proxyOut.emit("well");
			})
		}
  });
  Site.include({
    pro:function(port){
      port.onMessage.addListener(function(msg){
        if(msg==="loginsuc"){
          port.postMessage({
            "event":"publish",
            "obj":this
          })
        }
      })
      if(this.page.status===0){//说明尚未登录过
        port.postMessage({
          "event":"tryLogin",
          "obj":this
        })
      }
    }
  })
  module.exports=Site;
});