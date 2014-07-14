var port= chrome.extension.connect();
var proxy=new EventProxy;

var handleMap={
  "tryLogin":function(obj){
    console.log(obj);
    if($(obj.loginForm.selector).length>0){//说明登录表单存在，确实需要登录
      for(var i in obj.loginForm.content){
        if(obj.loginForm.content[i].remember===true){
          $('[name="'+obj.loginForm.content[i].name+'"]',obj.loginForm.selector).attr("checked","checked");//勾选记住密码
        }else{
          $('[name="'+obj.loginForm.content[i].name+'"]',obj.loginForm.selector).val(obj.loginForm.content[i].value);
        }
      }
      if(obj.loginForm.needVerifyCode===false){//不需要验证码
        eval(obj.loginForm.submit);//直接执行loginForm的submit中的代码来提交表单
      }
    }else{
      location.href=obj.page.publish;//跳转到发布页面
      port.postMessage("loginsuc");
    }
  },
  "publish":function(obj){
    console.log("====publish=====");
    console.log(this);
  }
}
for(var event in handleMap){
  proxy.on(event,handleMap[event]);
}
port.onMessage.addListener(function(msg){
  /*msg格式为：
   * {
   *   event:"",
   *   obj:""
   * }
   * */
  proxy.emit(msg.event,msg.obj);
});