var port= chrome.extension.connect();
port.postMessage("");//先发个空消息说明页面已载入
var proxy=new EventProxy;

var handleMap={
  "tryLogin":function(obj){
    console.log(obj);
    if(obj.loginForm&&obj.loginForm.selector&&$(obj.loginForm.selector).length>0){//说明登录表单存在，确实需要登录
      for(var i in obj.loginForm.content){
        if(obj.loginForm.content[i].remember===true){
          $('[name="'+obj.loginForm.content[i].name+'"]',obj.loginForm.selector).attr("checked","checked");//勾选记住密码
        }else{
          $('[name="'+obj.loginForm.content[i].name+'"]',obj.loginForm.selector).val(obj.loginForm.content[i].value);
        }
      }
      if(obj.loginForm.needVerifyCode===false){//不需要验证码
        $(obj.loginForm.submit.selector).trigger(obj.loginForm.submit.trigger);
//        eval(obj.loginForm.submit);//直接执行loginForm的submit中的代码来提交表单
      }
    }else{
      port.postMessage("loginsuc");
      location.href=obj.page.publish;//跳转到发布页面
    }
  },
  "publish":function(obj){
    var input;
		if(location.href!==obj.page.publish){
      port.postMessage("loginsuc");
      location.href=obj.page.publish;//跳转到发布页面

    }
		for(var i in obj.publishForm.content){

			input=obj.publishForm.content[i];
			if(!input.type){
				$('[name="'+input.name+'"]').val(input.value);
			}else if(input.type==="radio"){
				$('[name="'+input.name+'"][value="'+input.value+'"]').attr("checked","checked");
			}else if(input.type==="select"){
				$('[name="'+input.name+'"]').val(input.value)
				/*$('[name="'+input.name+'"]').find('option').each(function(){
				 if($(this).text()===input.value){
				 $(this).attr("selected",true);
				 }else{
				 $(this).attr("selected",false);
				 }
				 });*/
			}

			/*if(obj.loginForm.content[i].remember===true){
			 $('[name="'+obj.loginForm.content[i].name+'"]',obj.loginForm.selector).attr("checked","checked");//勾选记住密码
			 }else{
			 $('[name="'+obj.loginForm.content[i].name+'"]',obj.loginForm.selector).val(obj.loginForm.content[i].value);
			 }*/
		}
    //发送成功消息
    port.postMessage("publishsuc");
    //提交表单的，暂时注释掉
//    $(obj.publishForm.submit.selector).trigger(obj.publishForm.submit.trigger);



    //关闭标签页
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
   console.log(msg)
   proxy.emit(msg.event,msg.obj);
});