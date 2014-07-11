/**/
define(function(require,exports,module){
  var Model=require('./model');
  var Site=Model.create("sites");
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
      var sites=require('./sites/index');
      for(var i= 0,l=sites.length;i<l;i++){
        Site.init(sites[i]);
      }
      Site.saveLocal();
    }
  });
  module.exports=Site;
});