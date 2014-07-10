/*控制器（控制器貌似弄得有点臃肿啊╮(╯▽╰)╭）*/
define(function(require,exports,module){
	var Model=require('./model')
  var SingleModel=require('./singlemodel');
  var Control=SingleModel.create("control");
  var Changes=require("./changes");
  var DefaultUser=require("./defaultuser");
  var ReplaceForm=require('./replaceform');
  Control.include({
    clear:function(){//清空扩展的本地存储数据，主要供开发时用的，要慎用！
      var _=this;
      chrome.storage.local.clear(function(){
        console.log('已清空扩展的本地存储数据');
        _.parent.setup();
      });
    }
  });
  /*供back中调用的方法*/
  Control.extend({
    setup:function(cb){
      this.loadLocal(this.proxy(function(){
        if(this.find().step===undefined){//说明本地存储为空，处于最初状态
          this.init({
            step:0,
            replaceform:{}
          });
          this.saveLocal();
        }
      }));
    }
  });

  /*popup页面中每个步骤所对应的事件绑定*/
  Control.extend({
    event:{
      all:function(){
        var _=this;
        $("#clear").click(function(){
          _.clear();
        })
      },
      0:function(){
        var _=this;
        $("input[name='submit']").click(function(){
          if($("#username").val()===""){
            alert("账号不能为空")
          }else if($("#password").val()===""){
            alert("密码不能为空")
          }else{
            DefaultUser.setUser($("#username").val(),$("#password").val());
            _._stepTo(1)
          }
        })
      },
      1:function(){
        var _=this;
        $("input",".step-1").each(function(){
          for(var i in _.replaceform){
            if($(this).attr("name")===i){
              $(this).val(_.replaceform[i]);
              return;
            }
          }
        })
        $("input[name='publish']").click(function(){
          var allFilled=true;
          var replaceForm={};
          var key,value;
          $("input",".step-1").each(function(){
            if($(this).val()===""){
              allFilled=false;
              alert($("label[for='"+$(this).attr("name")+"']").text().replace(/[:：]/,"")+"不能为空");
              return false;
            }else if($(this).val()!=="开始自动发布"){
              key=$(this).attr("name");
              value=$(this).val();
              replaceForm[key]=value;
              _.replaceform=replaceForm;
              _.save();
              _.parent.saveLocal();
            }
          });
          if(allFilled===true){//所有表单都填写
            ReplaceForm.init(replaceForm)
            ReplaceForm.saveLocal();
            _._stepTo(2)
          }
        })
      }
    }
  });
  /*供popup中调用的方法,统一以下划线开头*/
  Control.extend({
    _setup:function(){
      Changes.on(this.storageName,this.proxy(function(changes){
        this._setup();
      }))
      this.loadLocal(this.proxy(function(){
        var control=this.find();
        console.log(control)
        if(control!==undefined){
          control._stepInit();
        }
      }));
    }
  });
  Control.include({
    _stepInit:function(){
      $(".step-"+this.step).addClass("active").siblings().removeClass("active");
      this.proxy(this.parent.event[this.step])();
      this.proxy(this.parent.event.all)();
    }
  });
  Control.include({
    _stepTo:function(num){
      this.step=num;
      this.save();
      this.parent.saveLocal();
    }
  })
  module.exports=Control;
});