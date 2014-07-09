define(function(require,exports,module){
  var Model=require('./model');
  var DefaultUser=Model.create();
  DefaultUser.include({
    setUser:function(username,password){
      this.username=username;
      this.password=password;
      if(this.username!==undefined&&this.password!==undefined){
        this.hasset=true;
      }else{
        this.hasset=false;
      }
    }
  })
})