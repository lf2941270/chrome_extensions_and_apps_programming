/*控制器（控制器貌似弄得有点臃肿啊╮(╯▽╰)╭）*/
define(function(require,exports,module){
  var SingleModel=require('./singlemodel');
  var Control=SingleModel.create("control");
  var Changes=require("./changes");
  Control.extend({
    clear:function(){//清空扩展的本地存储数据，主要供开发时用的，要慎用！
      var _=this;
      chrome.storage.local.clear(function(){
        console.log('已清空扩展的本地存储数据');
        _.setup();
      });
    }
  });
	$("#clear").click(function(){
		Control.clear();
	})
  /*供back中调用的方法*/
  Control.extend({
    setup:function(cb){
      this.loadLocal(this.proxy(function(){
        if(this.find().step===undefined){//说明本地存储为空，处于最初状态
          this.init({
            step:1,
            process:0,/*主流程状态，0表示未初始化*/
            replaceform:{}
          });
          this.saveLocal();
        }
      }));
    }
  });

  /*popup页面中每个步骤所对应的事件绑定*/
  Control.extend(require('../popup/event'));
  /*供popup中调用的方法,统一以下划线开头*/
  Control.extend({
		bindChange:function(){
			var storageName=this.storageName;
			Changes.on(storageName,this.proxy(function(changes){
				if(!(changes[storageName].oldValue&&changes[storageName].newValue&&changes[storageName].oldValue.step===changes[storageName].newValue.step)){
					this._setup();
				}
			}))
		},
    _setup:function(){
      this.loadLocal(this.proxy(function(){
        var control=this.find();
        control._stepInit()
			/*	var record=this.init(control);
        if(record!==undefined){
					record._stepInit();
        }*/
      }));
    }
  });
  Control.include({
    _stepInit:function(){
      $(".step-"+this.step).addClass("active").siblings().removeClass("active");
			if(this.parent.event[this.step]){
				this.proxy(this.parent.event[this.step])();
			}
//      this.proxy(this.parent.event.all)();
    }
  });
  Control.include({
    _stepTo:function(num){
      this.step=num;

      this.save();
			this.parent.saveLocal();
    },
    _processTo:function(num){
      this.process=num;
      this.save();
      this.parent.saveLocal();
    }
  })
  module.exports=Control;
});