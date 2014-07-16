define(function(require,exports,module){
  var DefaultUser=require('../back/defaultuser');
  var ReplaceForm=require('../back/replaceform');
  var sites=require('../back/site');
  var Changes=require('../back/changes');
  var port=require('./port');
  console.log(port);
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
        /*下面这段记录填写中的表单的代码会导致重复发送的问题，暂时注释掉*/
        /*$("input",".step-1").bind("blur",function(){
          _.replaceform[$(this).attr("name")]=$(this).val();
          _.save();
          _.parent.saveLocal();
        });*/
        $("input[name='publish']").click(function(){
          var allFilled=true;
          var replaceForm={};
          var nameArr=[];//记录表单中的name的临时数组
          var key,value;

          $("input",".step-1").each(function(){
            if(nameArr.indexOf($(this).attr("name"))<0){
              nameArr.push($(this).attr("name"));
            }
            if($(this).val()===""){
              allFilled=false;
              alert($("label[for='"+$(this).attr("name")+"']").text().replace(/[:：]/,"")+"不能为空");
              return false;
            }/*else if($(this).val()!=="开始自动发布"){
              key=$(this).attr("name");
              if($(this).attr("type")==="radio"){
                console.log(this)
              }else{
                value=$(this).val();
              }
              replaceForm[key]=value;
              _.replaceform=replaceForm;

              _.save();
              _.parent.saveLocal();
            }*/
          });
          for(var i= 0,l=nameArr.length;i<l;i++){
            key=nameArr[i];
            value=$('[name="'+nameArr[i]+'"]'+($('[name="'+nameArr[i]+'"]').attr("type")==="radio"?':checked':'')).val();
            replaceForm[key]=value;
          }
          _.replaceform=replaceForm;
          _.save();
          _.parent.saveLocal();
          if(allFilled===true){//所有表单都已填写
            ReplaceForm.init(replaceForm)
            ReplaceForm.saveLocal();
            _._stepTo(2)
          }
        });
      },
      2:function(){
        var control=this;
        function init(){
          control._processTo(1);
        }
        function setUp(){
          console.log(control)
          if(control.process===0){
            init();
          }
          showProcess();//显示进度

        }
        function showProcess(){
          updateView();
          Changes.on("sites",function(){
            updateView()
          });
        }
        function updateView(){
          var html="";
					/*console.log("===============sites================");
					console.log(sites)*/
          sites.loadLocal(function(){
            var statusMap={
              0:"队列中...",
              1:"登录中...",
              2:"发布中...",
              3:"发布成功！",
              4:"需要手动填写验证码"
            }
						for(var id in sites.records){
              html+="<li>"
              html+="<span class='title'>"+sites.records[id].title+":</span>"
              html+="<span class='status'>"+statusMap[sites.records[id].status]+"</span>"
              html+="</li>"
            }
            $(".process",".step-2").html(html).css({
              height:$(this).height()
            });
            $(".process",".step-2").delegate("li","click",function(){
              port.postMessage({"selectTab":$(this).find(".title").html().replace(":","")});
            })
          })
        }
        setUp();
      }
    }
  }
});