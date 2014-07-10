define(function(require,exports,module){
  var Model=require('./model');
  var SingleModel=require('./singlemodel');
  var DefaultUser=SingleModel.create("defaultuser");
  DefaultUser.extend({
    setUser:function(username,password){
      this.init({
        username:username,
        password:password,
        hasset:true
      });
      this.saveLocal();
    }
  });
  module.exports=DefaultUser;
})