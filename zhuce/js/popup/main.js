(function($){
	var backWindow;
	var ext;
	var bindEvent={
		1:function(){
			$("[name='publish']").click(function(){
				var allFilled=true;
				var formObj={};
				$("input",".step-1").each(function(){
					formObj[$(this).attr("name")]=$('[name="'+$(this).attr("name")+'"]'+($('[name="'+$(this).attr("name")+'"]').attr("type")==="radio"?':checked':'')).val();
					if($(this).val()===""){
						allFilled=false;
						alert($("label[for='"+$(this).attr("name")+"']").text().replace(/[:：]/,"")+"不能为空");
						return false;
					}
				});
				if(allFilled){
					ext.status=2;
					ext.formObj=formObj;
					backWindow.reg();
					init()
				}
			})
		},
		2:function(){
			update();
			$("#clear").click(function(){
				backWindow.ext={};
				init();
				console.log(ext)
				console.log(backWindow.ext)
			})
		}
	}
	function init(){
		backWindow=chrome.extension.getBackgroundPage();
		ext=backWindow.ext;
		ext.change=function(){
			update();
		}
		if(ext.status===undefined){
			ext.status=1;
		}
		$("#main").find(".step-"+ext.status).show().siblings().hide();
		bindEvent[ext.status]();
	}
	init();
	function update(){
		var html='';
		for(var i=0;i<ext.reg.length;i++){
			html+="<li title='"+ext.reg[i].username+"'>"
			if(ext.reg[i].href){
				html+='<a href="'+ext.reg[i].href+'" target="_blank">'
			}
			html+="<span class='num'>"+ext.reg[i].id+"</span>"
			html+="<span class='title'>"+ext.reg[i].username+":</span>"
			html+="<span class='status'>"+ext.reg[i].status+"</span>"
			if(ext.reg[i].href){
				html+='</a>'
			}
			html+="</li>"
		}
		console.log(html)
		$(".process",".step-2").html(html);
		$(".process",".step-2").css({height:$(".process",".step-2").height()})
		//进度条
		$(".progressBar .inside").css({width:ext.total/ext.all*($(".outside").width()-2)+"px"});
		$(".sucNum").text(ext.total);
		$(".allNum").text(ext.all);
	}
})(jQuery);
