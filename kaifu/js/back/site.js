/**/
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
    initBack:function(){
			this.removeLocal(function(){
				var sites=require('./sites/index');
				for(var i= 0,l=sites.length;i<l;i++){
					Site.init(sites[i]);
				}
				Site.saveLocal();
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
				}
				proxyOut.emit("well")
			})
		}
  });
  module.exports=Site;
});