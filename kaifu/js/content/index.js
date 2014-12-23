var port= chrome.extension.connect();

var proxy=new EventProxy;

var handleMap={
  "tryLogin":function(obj){
    if(obj.loginForm&&obj.loginForm.selector&&$(obj.loginForm.selector).length>0){//说明登录表单存在，确实需要登录
      for(var i in obj.loginForm.content){
        $('[name="'+obj.loginForm.content[i].name+'"]',obj.loginForm.selector).val(obj.loginForm.content[i].value);
      }
      if(obj.loginForm.needVerifyCode===false || obj.loginForm.needVerifyCode === undefined){//不需要验证码
        port.postMessage("loginsuc");
        port.postMessage("1")
        $(obj.loginForm.submit.selector).trigger(obj.loginForm.submit.trigger);
      }else{
				alert("请输入验证码后点击登录按钮");
			}
    }else{
      port.postMessage("loginsuc");
      port.postMessage("2")

      location.href=obj.page.publish;//跳转到发布页面
    }
  },
  "publish":function(obj){
    var input;
    if(location.href!==obj.page.publish){
      port.postMessage("loginsuc");
      port.postMessage("3")
      location.href=obj.page.publish;//跳转到发布页面
    }
		function writeForm(){
      for(var i in obj.publishForm.content){

        input=obj.publishForm.content[i];
        console.log(input)
				function fillInput(input){
					var inputEle;
					if(input.name){
						inputEle=$('[name="'+input.name+'"]');
					}else if(input.id){
						inputEle=$('#'+input.id);
					}
					console.log(inputEle);
					if(input.trigger){
						inputEle.trigger(input.trigger);
					}else{
						inputEle.trigger("focus");
					}
					if(inputEle.attr("type")==="radio"){
						inputEle.each(function(){
							console.log(this.nextSibling.data)
							if(((input.text&&this.nextSibling)?this.nextSibling.data.trim():$(this).val())===input.value){
								$(this).attr("checked",true);
							}else{
								$(this).attr("checked",false);
							}
						})
					}else if(input.text===true){
						inputEle.find("option").each(function(){
							if($(this).text()===input.value){
								$(this).attr("selected",true);
							}else{
								$(this).attr("selected",false);
							}
						})
					}
					else{
						inputEle.val(input.value);
					}
					inputEle.trigger("blur");
				}
        if(!input.later){
					fillInput(input);
        }else{
					setTimeout(function(){
						fillInput(input);
					},1000);
				}


      }
    }
    //发送成功消息
    setTimeout(function(){
      if($(obj.publishForm.submit.selector).length>0){
        writeForm();
        if(obj.publishForm.needVerifyCode===true){
          port.postMessage("needVerifyCode");
        }else{
          port.postMessage("publishsuc");
          //提交表单的，暂时注释掉，改成
//    location.reload()
//    $(obj.publishForm.submit.selector).trigger(obj.publishForm.submit.trigger);
        }
      }
    },500)

  }
}
$(function(){
  port.postMessage("");//先发个空消息说明页面已载入
})
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
    console.log("=============onMessage=============");
  console.log(msg.event)
  console.log(msg.obj)
    proxy.emit(msg.event,msg.obj);
});