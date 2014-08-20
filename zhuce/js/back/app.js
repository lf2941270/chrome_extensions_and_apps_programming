var ext={};

var popPage=chrome.extension.getViews();
console.log(popPage)
function reg(){
	init();
	var j=0;
	for(var i=ext.begin;i<=ext.end;i++){
		j++;
		ext.reg.push({id:j,username:ext.pre+i,status:"注册中"})
		ext.change()
	}
	for(var n=0;n<ext.reg.length;n++){
		send(n,ext.action,ext.reg[n],ext.password,function(i){
			return function(text){
				var n=i;
				if(text.indexOf("Success")>0){
					ext.reg[n].status="注册成功";
					ext.total++;
				}else{
					ext.reg[n].status="注册失败";
				}
				ext.change()

			}
		})
	}
}
function send(n,action,reg,pwd,callback){
	$.ajax({
		type:'post',
		url:'http://lj.ibaiyu.cn/Server/TgServer.ashx?method=KsReg',
		data:'Action='+action+'&UserName='+reg.username+'&Pwd='+pwd,
		success:callback(n)
	})
}
function init(){
	var form=ext.formObj;
	ext.pre=form['username-pre'];
	ext.begin=parseInt(form['username-num-begin']);
	ext.end=parseInt(form['username-num-end']);
	ext.action=form['site_url'].substring(form['site_url'].indexOf("action=")+7);
	ext.password=form['password']
	ext.all=ext.end-ext.begin+1;
	ext.total=0;
	ext.reg=[];
}