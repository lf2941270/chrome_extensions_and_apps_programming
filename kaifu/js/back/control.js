/*控制器*/
define(function(require,exports,module){
	var Model=require('./model')
  var SingleModel=require('./singlemodel');
  var Control=SingleModel.create("control");
  Control.include({
    clear:function(){//清空扩展的本地存储数据，要慎用！
      chrome.storage.local.clear(function(){
        console.log('已清空扩展的本地存储数据');
      });
    }
  })
  /*供back中调用的方法*/
  Control.extend({
    setup:function(cb){
      this.loadLocal(this.proxy(function(){
//        if(this.find()===undefined){//说明本地存储为空，处于最初状态

				this.init({
					step:0,
					event:{
						aaa:function(){
							var _=this;
							$("input[type='button']").click(function(){
								_.step=1;
							})
						},
						bbb:function(){
							$("body").click(function(){
								alert('123');
							})
						}
					}
				});
          this.saveLocal();
//        }
      }))
    }
  });
  /*供popup中调用的方法,统一以下划线开头*/
  Control.extend({
    _setup:function(){
      this.loadLocal(this.proxy(function(res){
        var control=this.find();
				console.log(control)
        control._stepInit();
      }));
    }
  });
  Control.include({
    _stepInit:function(){
      $(".step-"+this.step).addClass("active").siblings().removeClass("active");
			console.log(this.event)
			this.proxy(this.event[this.step])();
    }
  })
  module.exports=Control;
});