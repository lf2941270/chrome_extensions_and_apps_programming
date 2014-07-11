define(function(require,exports,module){
  var DefaultUser=require('../back/defaultuser');
  var ReplaceForm=require('../back/replaceform');
  var sites=require('../back/site');
  var Changes=require('../back/changes');
  module.exports={
    event:{
      0:function(){
        var _=this;
        $("input[name='submit']").click(function(){
          if($("#username").val()===""){
            alert("账号不能为空")
          }else if($("#password").val()===""){
            alert("密码不能为空")
          }else{
            DefaultUser.setUser($("#username").val(),$("#password").val());
            console.log(_)
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
          if(allFilled===true){//所有表单都已填写
            ReplaceForm.init(replaceForm)
            ReplaceForm.saveLocal();
            _._stepTo(2)
          }
        })
      },
      2:function(){
        Changes.emit("test");
        var control=this;
        function init(){
          control._processTo(1);
        }
        function setUp(){
          if(control.process===0){
            init();
          }else if(control.process===1){
            showProcess();//显示进度
          }
        }
        function showProcess(){
          updateView();
          Changes.on("sites",function(){
            updateView()
          });
        }
        function updateView(){
          var html="";
          sites.loadLocal(function(){

            for(var id in sites.records){
              html+="<li>"
              html+="<span>"+sites.records[id].user.username+"</span></br>"
              html+="<span>"+sites.records[id].user.password+"</span></br>"
              html+="</li>"
            }
            $(".process",".step-2").html(html).css({
              height:$(this).height()
            });
          })
        }
        setUp();
      }
    }
  }
});